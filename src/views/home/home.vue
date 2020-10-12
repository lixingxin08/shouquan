<template>
  <div id="home">
    <a-layout id="components-layout-demo-custom-trigger">
      <isnav :iscollapsed="collapsed"></isnav>
      <a-layout class='scroller'>
        <ishead @tocollapsed="getcollapsed"></ishead>
        <a-layout-content style='margin: 20px; background-color: #FFFFFF;'>
            <router-view v-if="isRouterShow"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import isnav from "../../components/pages/nav";
import ishead from "../../components/pages/header";

export default {
  name: "home",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      collapsed: false,
      searchdata: "",
      isRouterShow: true,
    };
  },
  components: {
    isnav,
    ishead,
  },
  created() {
   let m = function(e){e.preventDefault();};
   	  document.body.style.overflow='hidden';
   	  document.addEventListener("touchmove",m,{ passive:false });//禁止页面滑动
  },
  methods: {
    getcollapsed(val) {
      this.collapsed = val;
    },
    async reload() {
      this.isRouterShow = false;
      await this.$nextTick()
      this.isRouterShow = true;
    },
  },
  created() {},
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
.scroller {
 overflow: initial;
  height: 100vh;


  min-Width:80vw;
}
.scroller::-webkit-scrollbar{
  display: none;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
