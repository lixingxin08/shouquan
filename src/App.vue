<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
window.addEventListener(
  "message",
  function (e) {

    if (e.data.type !== "webpackOk") {
    if (e.data.accountId==''||e.data.accountId==undefined) {
    }else{
        localStorage.setItem("usermsg", JSON.stringify(e.data),10000000000000);
    }
    }
  },
  false
);

export default {
  
  name: "App",
  data() {
    return {
      ivews:"login,home"//缓存组件
    }
  },
  mounted() {
  },
  methods:{
  }

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
  height: 100%;
}
</style>
