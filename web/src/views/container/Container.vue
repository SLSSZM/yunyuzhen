<template>
  <div class="container">
    <search></search>
    <div class="content" ref="content">
      <box v-for="(item, index) in model.items" :key="item.path" :imgPath="item.imgPath" :type="item.type" :path="item.path" :title="item.title" :textBox="item.textBox" :ref="item.ref" @changeBoxType="changeBoxType($event, index)" @editBox="editBox(index)" @removeBox="removeBox(index)" @mousedown.native="drag(item.ref, index, $event)"></box>
    </div>
    <created-box @newBox="newBox" @editBoxOk="editBoxOk"></created-box>
  </div>
</template>

<script>
import Search from 'views/container/children/Search'
import Box from 'views/container/children/Box'
import CreatedBox from 'views/container/children/CreatedBox'

export default {
  components: {
    Search,
    Box,
    CreatedBox
  },
  data () {
    return {
      model: {
        items: [
          { type: 'm', left: 200, top: 200, title: '百度', imgPath: 'https://www.baidu.com/favicon.ico', path: 'https://www.baidu.com', ref: 'https://www.baidu.com', textBox: false },
          { type: 'h', left: 100, top: 400, title: '哔哩哔哩', imgPath: 'https://www.bilibili.com/favicon.ico', path: 'https://www.bilibili.com', ref: 'https://www.bilibili.com', textBox: false }
        ]
      }
    }
  },
  methods: {
    // 改变box样式
    changeBoxType (type, index) {
      this.model.items[index].type = type
    },
    // 拖拽box
    drag (ref, index, event) {
      const el = this.$refs[ref]
      if (this.$store.state.editStatus) {
        // 关闭点击后快速滑动鼠标的默认事件
        if (event.preventDefault) {
          event.preventDefault()
        } else {
          event.returnValue = false
        }
        // 关闭鼠标右键菜单
        document.oncontextmenu = function () {
          return false
        }
        // 算出鼠标相对元素的位置
        const elX = event.clientX - el[0].$el.offsetLeft
        const elY = event.clientY - el[0].$el.offsetTop
        document.onmousemove = (e) => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - elX
          let top = e.clientY - elY
          // 判断是否靠边
          if (left <= 10) {
            left = 10
          } else if (left >= this.$refs.content.offsetWidth - el[0].$el.offsetWidth) {
            left = this.$refs.content.offsetWidth - el[0].$el.offsetWidth - 10
          }
          if (top <= 10) {
            top = 10
          } else if (top >= this.$refs.content.offsetHeight - el[0].$el.offsetHeight) {
            top = this.$refs.content.offsetHeight - el[0].$el.offsetHeight - 10
          }
          // 移动当前元素
          this.$set(this.model.items[index], 'left', left)
          this.$set(this.model.items[index], 'top', top)
          el[0].$el.style.left = this.model.items[index].left + 'px'
          el[0].$el.style.top = this.model.items[index].top + 'px'
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
          setTimeout(() => {
            // 开启鼠标右键菜单
            document.oncontextmenu = function () {
              return true
            }
          }, 100)
        }
      }
    },
    // 初始化位置
    positionInit () {
      // 判断是否超出屏幕
      this.model.items.forEach(item => {
        if (item.left <= 10) {
          item.left = 10
        } else if (item.left >= this.$refs.content.offsetWidth - this.$refs[item.ref][0].$el.offsetWidth) {
          item.left = this.$refs.content.offsetWidth - this.$refs[item.ref][0].$el.offsetWidth - 10
        }
        if (item.top <= 10) {
          item.top = 10
        } else if (item.top >= this.$refs.content.offsetHeight - this.$refs[item.ref][0].$el.offsetHeight) {
          item.top = this.$refs.content.offsetHeight - this.$refs[item.ref][0].$el.offsetHeight - 10
        }
        this.$refs[item.ref][0].$el.style.left = item.left + 'px'
        this.$refs[item.ref][0].$el.style.top = item.top + 'px'
      })
    },
    // 删除box
    removeBox (index) {
      this.model.items.splice(index, 1)
    },
    // 从浏览器获取数据并初始化数据
    fetchLocalStorage () {
      if (!window.localStorage) {
        alert('不支持当前浏览器')
      } else {
        const model = JSON.parse(window.localStorage.getItem('yunyuzhen-model'))
        if (!model) {
          this.$nextTick(() => {
            // 初始化位置
            this.positionInit()
          })
          return
        }
        this.model = model
        this.$nextTick(() => {
          // 初始化位置
          this.positionInit()
        })
      }
    },
    // 创建新box
    newBox (newitem) {
      const model = JSON.parse(window.localStorage.getItem('yunyuzhen-model'))
      model.items.push(newitem)
      const newModel = JSON.stringify(model)
      window.localStorage.removeItem('yunyuzhen-item')
      window.localStorage.setItem('yunyuzhen-model', newModel)
      this.fetchLocalStorage()
      this.$store.commit('setCreatedStatus')
    },
    editBox (index) {
      const model = JSON.parse(window.localStorage.getItem('yunyuzhen-model'))
      const item = model.items[index]
      item.boxIndex = index
      this.$store.commit('setItem', item)
    },
    editBoxOk () {
      this.fetchLocalStorage()
    }
  },
  mounted () {
    this.fetchLocalStorage()
    // 保存编辑更新数据
    this.bus.$on('saveEdit', () => {
      window.localStorage.removeItem('yunyuzhen-model')
      const newModel = JSON.stringify(this.model)
      window.localStorage.setItem('yunyuzhen-model', newModel)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  height: 100%;
  background-color: #8ebda6;
  border-top-left-radius: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .content {
    flex: 1;
    // z-index: 2;
    position: relative;
  }
}
</style>
