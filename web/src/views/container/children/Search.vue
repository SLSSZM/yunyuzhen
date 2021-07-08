<template>
  <div class="search">
    <h1 class="logo">yunyuzhen</h1>
    <input class="input" type="text" v-model="wd" @input="oninput($event)" @keydown="keydown($event)" autofocus />
    <div class="searchClick" title="搜索" @click="openWeb"></div>
    <ul class="info" v-show="arr.length > 0 && wd !== ''">
      <li class="li1" v-for="(item,index) in arr" :key="index" :class="{'activeLi':index===listIndex}" @click="click(index)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Baidusearch',
  data () {
    return {
      wd: '', // 搜索的关键词
      arr: [], // 用于储存关键词的搜索词条
      listIndex: -1// 设置初始索引，数组从0开始，因此初始成-1
    }
  },
  methods: {
    // 这个函数我们在input标签输入关键词的时候不断的给百度服务器发送请求获取搜索词条，并且不断的复制给data中的数组arr
    oninput (event) {
      if (this.wd === '') return
      // 如果我按的是上下键，那么就不发送请求了
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) return
      this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
        wd: this.wd,
        callbackQuery: 'cb'
      }).then((res) => {
        this.arr = res.s
      })
      // console.log(this.arr)
    },
    // 监听鼠标的点击事件
    click (index) {
      this.wd = this.arr[index]
      window.open('https://www.baidu.com/s?wd=' + this.wd)
    },
    // 监听键盘的事件
    // 如果按down，则增加当前listIndex+1，因此arr[this.listIndex]就能代表当前的词条
    // 我们通过对listIndex的修改来得到当前词条在arr中的索引，然后就可以得到词条的具体信息，然后发送请求了
    keydown (event) {
      // console.log(event)
      // 下键：40 上键：38
      if (event.keyCode === 38) {
        // 按的上键
        this.listIndex--
        if (this.listIndex < 0) {
          this.listIndex = this.arr.length - 1
        }
        this.wd = this.arr[this.listIndex]
      } else if (event.keyCode === 40) {
        // 说明你按的是下键
        this.listIndex++
        if (this.listIndex > this.arr.length - 1) {
          this.listIndex = 0
        }
        this.wd = this.arr[this.listIndex]
      } else if (event.keyCode === 13) {
        // 如果你按的是enter，那么就跳转到百度搜索结果
        window.open('https://www.baidu.com/s?wd=' + this.wd)
      }
    },
    openWeb () {
      if (this.wd === '') return
      window.open('https://www.baidu.com/s?wd=' + this.wd)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  z-index: 2;
  .logo {
    font-size: 4.6154rem;
    color: #fff;
    text-align: center;
    margin: 15px 0;
    font-family: "宋体";
    letter-spacing: 5px;
  }
  .input {
    border-radius: 30px;
    width: 55%;
    height: 45px;
    border: 3.5px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    padding: 0 50px 0 10px;
    font-size: 1.5385rem;
    margin-left: 20%;
  }
  .searchClick {
    width: 25px;
    height: 25px;
    position: relative;
    display: inline-block;
    border-radius: 50%;
    border: 3.5px solid #fff;
    right: 50px;
    top: 10px;
    cursor: pointer;
    transition: border 0.3s;
    &:hover {
      transform: scale(1.1);
      border: 3.5px solid rgb(240, 223, 223);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .info {
    list-style: none;
    background-color: #fff;
    width: 52%;
    margin-left: 22%;
    padding: 5px 10px 10px 10px;
    border-radius: 12px;
    margin-top: 0;
    position: absolute;
    // z-index: 9999;
    box-shadow: 0 1px 5px rgba($color: #000000, $alpha: 0.5);
    li {
      font-size: 13px;
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      &:hover {
        background-color: #eee;
      }
    }
    .activeLi {
      background-color: #eee;
    }
  }
}
</style>
