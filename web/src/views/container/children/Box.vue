<template>
  <div class="box" :class="[types[type], {editStatus: $store.state.editStatus}]" v-if="!textBox">
    <div class="jump" @click="jumpWeb" :title="title">
      <img :src="imgPath" :alt="title">
    </div>
    <div class="editBox" v-show="$store.state.editStatus" @click="editBox"></div>
    <div class="del" v-show="$store.state.editStatus" @click="removeBox"></div>
    <div class="change" @click="changeBoxType" v-show="$store.state.editStatus"></div>
  </div>
  <div class="box" :class="{editStatus: $store.state.editStatus}" v-else>
    <div class="text" @click="jumpWeb">{{title}}</div>
    <div class="editBox" v-show="$store.state.editStatus" @click="editBox"></div>
    <div class="del" v-show="$store.state.editStatus" @click="removeBox"></div>
    <div class="changeText" @click="jumpWeb"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      defalut: 'm'
    },
    path: {
      type: String
    },
    imgPath: {
      type: String
    },
    title: {
      type: String
    },
    textBox: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      types: { m: 'm', h: 'h', c: 'c' }
    }
  },
  methods: {
    // 改变样式
    changeBoxType () {
      const array = ['m', 'h', 'c']
      let index = array.indexOf(this.type)
      index = index >= array.length - 1 ? 0 : index + 1
      this.$emit('changeBoxType', array[index])
    },
    // 跳转页面
    jumpWeb () {
      // 判断是否处于编辑状态
      if (!this.$store.state.editStatus) {
        window.open(this.path)
      }
    },
    // 删除
    removeBox () {
      this.$emit('removeBox')
    },
    //  打开编辑界面
    editBox () {
      this.$emit('editBox')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  transition-property: width, height;
  transition-duration: 0.3s;
  &.editStatus {
    animation: editStatus 0.225s infinite ease-in-out alternate;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  }
  &:active {
    opacity: 0.8;
    transform: scale(1);
  }
  .jump {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 12px;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 40%;
    }
  }
  .del {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ff4a54;
    background-image: url("~assets/images/icon/delete.svg");
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .editBox {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(~assets/images/icon/qh.svg);
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
  }
  .change {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgb(164, 212, 190);
    cursor: pointer;
  }
  &.m {
    width: 80px;
    height: 80px;
  }
  &.h {
    width: 130px;
    height: 80px;
  }
  &.c {
    width: 80px;
    height: 130px;
    .jump {
      img {
        height: 40%;
        width: auto;
      }
    }
  }
  .text {
    min-width: 100px;
    height: auto;
    padding: 10px 20px;
    text-align: center;
    font-weight: bold;
    padding-bottom: 15px;
    font-family: "微软雅黑";
    color: #8ebda6;
    cursor: default;
  }
  .changeText {
    width: 50%;
    height: 5px;
    background-color: #8ebda6;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
@keyframes editStatus {
  0% {
    transform: rotate(3.8deg);
  }
  25% {
    transform: rotate(1.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(-3.8deg);
  }
}
</style>
