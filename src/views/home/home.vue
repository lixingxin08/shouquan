<template>
  <div id="home">
    <a-layout id="components-layout-demo-custom-trigger">
      <isnav :iscollapsed="collapsed"></isnav>
      <a-layout>
        <ishead @tocollapsed="getcollapsed"></ishead>
        <a-layout-content
          :style="{ margin: '20px 20px', background: '#fff', minHeight: '280px' ,minWidth:'1672px'}"
        >
        <keep-alive :include="isinclude">
         <router-view></router-view>
        </keep-alive>
         
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import isnav from "../../components/pages/nav";
import ishead from "../../components/pages/header";
// let echarts = require("echarts/lib/echarts");
// import isroute from "./home.json";
// require("echarts/lib/chart/line");
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/legendScroll");
export default {
  name: "home",
  data() {
    return {
      collapsed: false,
      searchdata: "",
      localSearchData: "homeHisData",
      isinclude:"supervision,header,nav",
      test: "tesss",
      // option: {
      //   xAxis: {
      //     type: "category",
      //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       data: [820, 932, 901, 934, 1290, 1330, 1320],
      //       type: "line",
      //     },
      //   ],
      // },
    };
  },
  components: {
    isnav,
    ishead,
  },
  methods: {
    getcollapsed(val) {
      this.collapsed = val;
    },
    async getdata(val) {
      const res = await this.$http.get(this.$api.login);
    },
    tologin() {
      this.$router.push({ name: "error_404" });
    },
    // ischarts() {
    //   let myChart = echarts.init(document.getElementById("main"));
    //   myChart.setOption(this.option);
    // },
  },
  created() {
    // this.$nextTick(() => {
    //   this.ischarts();
    // });
  },
};
</script>
<style>
#home {
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
