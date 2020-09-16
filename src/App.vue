<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  window.addEventListener(
    "message",
    function(e) {

      if (e.data.type !== "webpackOk") {
        if (e.data.accountId == '' || e.data.accountId == undefined) {} else {
          localStorage.setItem("usermsg", JSON.stringify(e.data), 10000000000000);
        }
      }
    },
    false
  );
import DevicePixelRatio from './utils/device.js';
  export default {

    name: "App",
    data() {
      return {
        zhCN,
        ivews: "login,home" //缓存组件
      }
    },
    created() {
    },
    mounted() {
      if (window.location.host.indexOf("localhost") >= 0) {//本地测试
        let usermsg = {
          accountId: "23tg43qrfdrr4wrtggrtr434tr4tt4rtrt43tt"
        }
        localStorage.setItem('usermsg', JSON.stringify(usermsg))
      } else {
        let sessionid = JSON.parse(localStorage.getItem('usermsg')).iscookie || "asdkasgdkjakkj"
        this.setCookie('session', sessionid, 10000)
      }


    },
    methods: {
      setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
      },
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
    min-width: 1920px;
    height: 100%;
    overflow: scroll;
  }
</style>
