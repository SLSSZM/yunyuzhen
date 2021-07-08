<template>
  <div class="right-box">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.right-box {
  width: 280px;
  height: 91%;
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  right: -50%;
  transform: translateY(-50%);
  border-radius: 15px;
  transition: right 0.5s;
  overflow: hidden;
  padding: 5px;
  z-index: 10;
}
</style>
