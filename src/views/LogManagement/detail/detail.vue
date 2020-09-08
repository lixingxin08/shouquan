<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">日志详情
        <a-icon type="close" @click='sure' />
      </div>
      <div class="flexcolumn" style="align-items: flex-start;padding-left: 50px;margin-top: 30px;">
      <div class="item-title">菜单序号:sdsdsafd</div>
      <div class="item-title">接口地址:</div>
      <div class="item-title">结果代码:</div>
      <div class="item-title">结果消息:</div>
      <div class="item-title">业务序号:</div>
      <div class="item-title">参数集合:</div>
      <div class="item-title">接口耗时:</div>
      <div class="item-title">来源地址:</div>
      <div class="item-title">服务地址:</div>
      <div class="item-title">操作帐号:</div>
      <div class="item-title">请求时间:</div>
      <div class="item-title">入库时间:</div>
      </div>
      <a-button type='primary' style='margin-top: 30px;margin-bottom: 30px;' @click='sure'>确定</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {}
      }
    },
    methods: {
      setItem(item) {
        this.item = item
      },
      sure() {
        this.$emit('confirm')
      },

    }
  }
</script>

<style>
  .dialog-title {
    background: #1890FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 24px;
    height: 72px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    color: #ffffff;
    line-height: 14px;
  }

  .item {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .item-title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin: 10px;
    line-height: 14px;
    flex-shrink: 0;
  }
</style>
