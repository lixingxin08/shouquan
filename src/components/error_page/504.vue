<template>
  <div class="error-page">
    <div class="img" style=" background-image: url('/img/bg/500.svg');"></div>
    <div class="content">
      <h1>504</h1>
      <div class="desc">抱歉，服务器出错了</div>
      <div class="actions">
        <router-link :to="{path:'/'}">
          <a-button type="primary">返回首页</a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-500",
};
</script>
<style scoped>
@import "./style.css";
</style>
