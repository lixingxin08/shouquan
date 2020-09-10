<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增接口
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item" style="margin-top: 20px;">
        <a style="color: #FF0033;">*</a>
        <div class="item-title">接口名称：</div>
        <a-input v-model='item.actionName'></a-input>
      </div>
      <div class="flexrow flexac item">
        <a style="color: #FF0033;">*</a>
        <div class="item-title">URL地址：</div>
        <a-input v-model='item.linkURL'></a-input>
      </div>
      <div class="flexrow flexac item">
        <a style="color: #FFFFFF;">*</a>
        <div class="item-title">是否默认：</div>
        <a-switch :value='item.defaultFlag==1' @change="onChangeSwitch"></a-switch>
      </div>
      <a-button type='primary' style='margin-top: 120px;margin-bottom: 30px;' @click='submit'>确定</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        index: -1
      }
    },
    methods: {

      setItem(item, index) {
        this.item = item
        this.index = index
      },
      onChangeSwitch(checked) {
        console.log(this.item.defaultFlag)
      },
      submit() {
        if (!this.item.actionName) {
          this.$message.warning('接口名称不能为空');
          return
        }
        if (!this.item.linkURL) {
          this.$message.warning('URL地址不能为空');
          return
        }


        this.$emit('callback', this.item, this.index)
      },
      closedialog() {
        this.$emit('close')
      }
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
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;

    line-height: 14px;
    flex-shrink: 0;
  }
</style>
