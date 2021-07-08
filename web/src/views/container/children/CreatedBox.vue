<template>
  <right-box ref="createdBox">
    <div class="created">
      <div class="logo">注意：如果获取的图标模糊的话建议使用文字模式</div>
      <div class="content">
        <h3>{{$store.state.editStatus ? '编辑' : '新建'}}导航</h3>
        <div class="items">
          <input type="text" name="web" placeholder="完整的网址" v-model="model.path">
          <input type="text" name="name" placeholder="名称" v-model="model.title">
          <div class="tips" ref="tips"></div>
          <div class="buttons">
            <button @click="clickOK">{{$store.state.editStatus ? '编辑' : '新建'}}</button>
            <button @click="$store.commit('setCreatedStatus', false); $store.commit('setBoxEditStatus', false)">取消</button>
          </div>
        </div>
      </div>
      <div class="selectType">
        <h3>选择样式</h3>
        <div class="types">
          <div title="图片模式" class="select" ref="imgModel" @click="selectImg">
            <img src="~assets/images/icon/pic.svg">
          </div>
          <div ref="textModel" @click="selectText">
            <span>文字模式</span>
          </div>
        </div>
      </div>
    </div>
  </right-box>
</template>

<script>
import RightBox from 'components/RightBox'

export default {
  components: {
    RightBox
  },
  data () {
    return {
      model: {
        type: 'm',
        path: '',
        imgPath: '',
        ref: '',
        title: '',
        left: 10,
        right: 10,
        textBox: false
      }
    }
  },
  methods: {
    clickOK () {
      if (!this.$store.state.boxEditStatus) {
        this.createBox()
      } else {
        this.editBox()
      }
    },
    async createBox () {
      clearTimeout(this.timer)
      if (!this.model.path || !this.model.title) {
        this.$refs.tips.innerHTML = '请输入完整的网址和名称'
        return
      }
      const all = JSON.parse(window.localStorage.getItem('yunyuzhen-model'))
      if (all.items.find(item => item.path === this.model.path)) {
        this.$refs.tips.innerHTML = '网址已存在'
        return
      }
      const res = await this.$http.get('/icon', { params: { url: this.model.path } })
      if (res.data.status !== 200) {
        this.$refs.tips.innerHTML = res.data.msg
        return console.log(res.data)
      }
      this.$set(this.model, 'imgPath', res.data.result)
      this.model.ref = this.model.path
      this.timer = setTimeout(() => {
        this.$emit('newBox', this.model)
      }, 100)
    },
    editBox () {
      this.model.ref = this.model.path
      let model = JSON.parse(window.localStorage.getItem('yunyuzhen-model'))
      model.items.splice(this.model.boxIndex, 1, this.model)
      model = JSON.stringify(model)
      window.localStorage.removeItem('yunyuzhen-model')
      window.localStorage.setItem('yunyuzhen-model', model)
      this.$store.commit('setBoxEditStatus', false)
      this.$emit('editBoxOk')
    },
    selectImg () {
      this.$set(this.model, 'textBox', false)
      this.$refs.textModel.classList.remove('select')
      this.$refs.imgModel.classList.add('select')
    },
    selectText () {
      this.$set(this.model, 'textBox', true)
      this.$refs.imgModel.classList.remove('select')
      this.$refs.textModel.classList.add('select')
    }
  },
  mounted () {
    this.bus.$on('createdStatus', status => {
      if (status) {
        this.$refs.createdBox.$el.style.right = 3 + '%'
      } else {
        this.$refs.createdBox.$el.style.right = -50 + '%'
        const model = {
          type: 'm',
          path: '',
          imgPath: '',
          ref: '',
          title: '',
          left: 10,
          right: 10,
          textBox: false
        }
        this.model = model
        this.$refs.tips.innerHTML = ''
      }
    })
    this.bus.$on('boxEditStatus', status => {
      if (status) {
        this.$refs.createdBox.$el.style.right = 3 + '%'
        this.model = this.$store.state.item
      } else {
        const model = {
          type: 'm',
          path: '',
          imgPath: '',
          ref: '',
          title: '',
          left: 10,
          right: 10,
          textBox: false
        }
        this.model = model
        this.$refs.createdBox.$el.style.right = -50 + '%'
        this.$refs.tips.innerHTML = ''
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.created {
  width: 100%;
  border-radius: 10px;
  height: 100%;
  background-color: #8ebda6;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    width: 80%;
    font-size: 14px;
    padding: 5%;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 10px;
    color: #757575;
  }
  .content {
    border-radius: 10px;
    width: 90%;
    background: #fff;
    padding-bottom: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h3 {
      color: #a5a5a5;
      font-size: 23px;
      margin: 10px 5px 5px;
    }
    .items {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      input {
        margin: 8px;
        border: none;
        border-bottom: 1.5px solid #858585;
        height: 30px;
        width: 75%;
        outline: none;
        color: #858585;
        font-size: 13.5px;
        transition: 0.3s;
        &:focus {
          font-size: 14px;
          background-color: rgb(245, 245, 245);
          border-radius: 5px;
          padding: 0 10px;
          border-bottom: 2.5px solid #8ebda6;
        }
      }
      .tips {
        color: red;
        position: absolute;
        bottom: 55px;
        font-size: 12px;
      }
      .buttons {
        margin-top: 20px;
        button {
          outline: none;
          width: 60px;
          height: 30px;
          margin: 0 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          &:nth-child(1) {
            background-color: #8ebda6;
            color: #fff;
          }
        }
      }
    }
  }
  .selectType {
    width: 90%;
    height: 30%;
    border-radius: 10px;
    background: #fff;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      margin: 8px;
      margin-bottom: 0px;
      color: #a5a5a5;
      font-size: 18px;
    }
    .types {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      width: 90%;
      margin: 10px;
      div {
        width: 80%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8ebda6;
        font-size: 18px;
        font-weight: bold;
        border-radius: 12px;
        cursor: pointer;
        img {
          width: 35%;
        }
        span {
          border-bottom: 3px solid #8ebda6;
        }
        &.select {
          background-color: rgb(248, 248, 248);
        }
      }
    }
  }
}
</style>
