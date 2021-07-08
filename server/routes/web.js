module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const get_favicon = require('../tools/get_favicon.js')
  // 获取图标
  router.get('/icon', async (req, res) => {
    try {
      const result = await get_favicon(req.query.url)
      res.send({ result, status: 200 })
    } catch (error) {
      console.log(error)
      return res.send({ status: 400, msg: '网址错误' })
    }
  })

  app.use('/web/api', router)
}