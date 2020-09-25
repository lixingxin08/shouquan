<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">日志详情
        <a-icon type="close" @click='sure' />
      </div>
      <div class="flexcolumn" style="align-items: flex-start;padding-left: 50px;margin-top: 30px;padding-right: 50px;">
        <div class="item-title-log">菜单序号:{{item.menuId}}</div>
        <div class="item-title-log">接口名称:{{item.actionName}}</div>
        <div class="item-title-log">接口地址:{{item.actionURI}}</div>
        <div class="item-title-log">结果代码:{{item.resultCode}}</div>
        <div class="item-title-log">结果消息:{{item.resultMsg}}</div>
        <div class="item-title-log">客户序号:{{item.customerId}}</div>
        <div class="item-title-log">参数集合:{{item.dataJson}}</div>
        <div class="item-title-log">接口耗时:{{item.timeTotal}}毫秒</div>
        <div class="item-title-log">来源地址:{{item.remoteIP}}</div>
        <div class="item-title-log">服务地址:{{item.serverIP}}</div>
        <div class="item-title-log">操作帐号:{{item.accountId}}</div>
        <div class="item-title-log">请求时间:{{item.requestTime}}</div>
        <div class="item-title-log">入库时间:{{item.insertTime}}</div>
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
      async setItem(item) {
        let param = {
          logId: item.logId
        }
        let res = await this.$http.post(this.$api.journaldetail, param)
        if (res.data.resultCode == 10000) {
          this.item = res.data.data
        }
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

  .item-title-log {
    white-space: normal;

  word-break: break-all;
    font-size: 14px;
    width: 100%;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    text-align: left;
    margin: 10px;
  }
</style>
