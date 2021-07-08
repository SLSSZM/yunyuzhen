<template>
  <div id="app">
    <menu-bar></menu-bar>
    <container></container>
  </div>
</template>

<script>
import MenuBar from 'views/menuBar/MenuBar'
import Container from 'views/container/Container'
export default {
  name: 'App',
  components: {
    MenuBar,
    Container
  }
}
</script>

<style lang="scss">
@import "assets/css/global.scss";
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  min-width: 800px;
  overflow: hidden;
  background-color: #fff;
}
</style>
