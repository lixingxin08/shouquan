<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增接口
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item" style="margin-top: 20px;">
        <a style="color: #FF0033;">*</a>
        <div class="item-title">接口名称：</div>
        <a-input v-model='autoName'></a-input>
      </div>
      <div class="flexrow flexac item">
        <a style="color: #FF0033;">*</a>
        <div class="item-title">URL地址：</div>
        <a-input v-model='autoCode'></a-input>
      </div>
      <div class="flexrow flexac item">
        <a style="color: #FFFFFF;">*</a>
        <div class="item-title">是否默认：</div>
        <a-switch :default-checked='defaultFlag' @change="onChange"></a-switch>
      </div>
      <a-button type='primary' style='margin-top: 120px;margin-bottom: 30px;' @click='submit'>确定</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        autoName: "", //名称
        autoCode: '', //代码
        defaultFlag: false //描述
      }
    },
    methods: {
       onChange(checked) {
         
          this.defaultFlag=checked
          },
      submit() {
        if (!this.autoName) {
          this.$message.warning('接口名称不能为空');
          return
        }
        if (!this.autoCode) {
          this.$message.warning('URL地址不能为空');
          return
        }

        let param = {
          actionName: this.autoName,
          linkURL: this.autoCode,
          defaultFlag: this.defaultFlag
        }
        this.$emit('callback', param)
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
