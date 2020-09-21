<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
window.addEventListener(
  "message",
  function (e) {
    if (e.data.type !== "webpackOk") {
      if (e.data.accountId == "" || e.data.accountId == undefined) {
      } else {
        localStorage.setItem("usermsg", JSON.stringify(e.data), 10000000000000);
      }
    }
  },
  false
);
import DevicePixelRatio from "./utils/device.js";
export default {
  name: "App",
  data() {
    return {
      zhCN,
      ivews: "login,home", //缓存组件
    };
  },
  created() {},
  mounted() {
    if (window.location.host.indexOf("localhost") >= 0) {
      //本地测试
      let usermsg = {
        accountId: "4e815e64411c4aabab668cbee89077e8",
        customerId: "100000000000000000000000000000",
        token:"eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzIjoxNjAwNjkxMzUwNjMwLCJ0b2tlbklkIjoiY2M1NmEwZjQyZDc3NDNiMTgzOGI1Nzk3Y2RlZWZmNWIiLCJ1c2VySWQiOiI0ZTgxNWU2NDQxMWM0YWFiYWI2NjhjYmVlODkwNzdlOCJ9.B8e1TphWsVu1ozwBzo6rU_4_DeapOhmw-WVXfjG9Kmc",
      };
      localStorage.setItem("usermsg", JSON.stringify(usermsg));
    } else {
    }
  },
  methods: {
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
      console.info(document.cookie);
    },
  },
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
  min-width: 1920px;
  height: 100%;
  overflow: scroll;
}
</style>
