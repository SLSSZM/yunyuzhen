<template>
  <div class="menu-bar">
    <div class="user"></div>
    <div class="button-group">
      <button @click="$store.commit('setCreatedStatus')" :class="{createBox: $store.state.createdStatus}"></button>
      <button @click="$store.commit('setEditStatus')" :class="{saveEdit: $store.state.editStatus}"></button>
      <button></button>
    </div>
    <div class="mode">夜间模式</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.menu-bar {
  width: 45px;
  height: 100vh;
  position: relative;
  .user {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #f2ff9f;
    margin: 5px 0 0 4px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  .button-group {
    margin-top: 20px;
    width: 100%;
    button {
      display: block;
      margin: 15px auto;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      color: #fff;
      transition: transform 0.2s;
      &:nth-child(1) {
        background-color: #719d91;
        &:hover {
          background-image: url("~assets/images/icon/create.svg");
        }
      }
      &:nth-child(2) {
        background-color: #ff4a54;
        &:hover {
          background-image: url("~assets/images/icon/edit.svg");
        }
      }
      &:nth-child(3) {
        background-color: #44b8e3;
        &:hover {
          background-image: url("~assets/images/icon/about.svg");
        }
      }
      &:hover {
        background-size: 18px;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.25);
      }
      &:active {
        transform: scale(0.9);
      }
    }
    .createBox {
      background-size: 20px;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #719d91;
      background-image: url("~assets/images/icon/create.svg");
      animation: Status 3s infinite ease-in-out alternate;
      &:hover {
        background-size: 20px;
        background-image: url("~assets/images/icon/create.svg") !important;
      }
    }
    .saveEdit {
      background-size: 18px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("~assets/images/icon/save.svg");
      animation: Status 3s infinite ease-in-out alternate;
      &:hover {
        background-image: url("~assets/images/icon/save.svg") !important;
      }
    }
  }
  .mode {
    width: 23px;
    height: 88px;
    padding: 12px 3px 0;
    background-color: #cccccc;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
  @keyframes Status {
    0% {
      transform: rotate(0deg) scale(1.25);
    }
    100% {
      transform: rotate(360deg) scale(1.25);
    }
  }
}
</style>
