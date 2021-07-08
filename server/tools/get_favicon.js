const puppeteer = require('puppeteer')

module.exports = url => {
  return new Promise(async (resolve, reject) => {
    // 打开浏览器
    const browser = await puppeteer.launch({ headless: true })
    // 创建一个新页面
    const page = await browser.newPage()
    // 开启拦截器
    await page.setRequestInterception(true)
    page.on('request', req => {
      // 根据请求类型过滤，除了html全部过滤掉
      const resourceType = req.resourceType()
      if (resourceType !== 'document') {
        req.abort()
      } else {
        req.continue()
      }
    })
    try {
      // 打开url页面
      await page.goto(url)
    } catch (error) {
      return reject('err')
    }
    // 切割出域名
    const path = url.split('/').splice(0, 3).join('/')
    const result = await page.evaluate(async (path) => {
      // 获取所以的link标签
      let elements = document.getElementsByTagName('link')
      // 创建正则
      const icon = /(shortcut icon|shortcut)/i
      // 遍历link标签
      for (var element of elements) {
        // 用正则来判断link标签的rel
        if (icon.test(element.getAttribute('rel'))) {
          // 判断是否以 / 开头
          if (element.getAttribute('href')[0] === '/') {
            // 判断是否以 // 开头
            if (element.getAttribute('href')[1] === '/') {
              return path.split('/').splice(0, 1) + element.getAttribute('href')
            }
            return path + element.getAttribute('href')
          }
          // 判断是否以favicon开头
          if (element.getAttribute('href')[0] === 'f') {
            return path + '/' + element.getAttribute('href')
          }
          return element.getAttribute('href')
        }
      }
      // 创建正则
      const icon2 = /icon/i
      // 遍历link标签
      for (var element of elements) {
        // 用正则来判断link标签的rel
        if (icon2.test(element.getAttribute('rel'))) {
          // 判断是否以 / 开头
          if (element.getAttribute('href')[0] === '/') {
            // 判断是否以 // 开头
            if (element.getAttribute('href')[1] === '/') {
              return path.split('/').splice(0, 1) + element.getAttribute('href')
            }
            return path + element.getAttribute('href')
          }
          // 判断是否以favicon开头
          if (element.getAttribute('href')[0] === 'f') {
            return path + '/' + element.getAttribute('href')
          }
          return element.getAttribute('href')
        }
        if (element === elements[elements.length - 1]) {
          return path + '/favicon.ico'
        }
      }
    }, path)
    // 关闭浏览器
    browser.close()
    // 返回数据
    return resolve(result)
  })
}