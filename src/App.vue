<template>
  <div id="root">
    <TheSideBar></TheSideBar>
    <div id="main">
      <TheHeader></TheHeader>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script>
// B1: import vào component muốn dùng
// Hoặc có thể import global bên main.js
export default {
  name: "App",
  components: {
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@import url(@/css/components/icon.css);
@import url(@/css/main.css);
</style>
