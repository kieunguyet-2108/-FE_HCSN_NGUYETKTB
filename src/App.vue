<template>
  <div id="root">
    <template v-if="isLogin">
      <TheSideBar></TheSideBar>
      <div id="main">
        <TheHeader></TheHeader>
        <TheContent></TheContent>
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
// B1: import vào component muốn dùng
// Hoặc có thể import global bên main.js
export default {
  name: "App",
  components: {},
  computed: {
    isLogin() {
      return this.$store.state.auth.token !== null;
    },
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
