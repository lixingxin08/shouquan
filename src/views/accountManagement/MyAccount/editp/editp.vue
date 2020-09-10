<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增数值
        <a-icon type="close" @click='closedialog' />
      </div>
      <div class="flexrow flexac item" style="margin-top: 20px;">
        <div class="item-title"> <a style="color: #FF0033;">*</a>当前密码：</div>
        <a-input-password v-model='toalword'></a-input-password>
      </div>
      <div class="flexrow flexac item" style="margin-top: 20px;">
        <div class="item-title"> <a style="color: #FF0033;">*</a>密码：</div>
        <a-input-password v-model='password'></a-input-password>
      </div>
      <div class="flexrow flexac item">
        <a style="color: #FF0033;">*</a>
        <div class="item-title">确认密码：</div>
        <a-input-password v-model='password2'></a-input-password>
      </div>
      <a-button type='primary' style='margin-top: 30px;margin-bottom: 30px;' @click='submit'>确定</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: "", //名称
        password2: '', //代码
        toalword: ''
      }
    },
    methods: {
      submit() {
        if (!this.toalword) {
          this.$message.warning('当前密码不能为空');
          return
        }
        if (!this.password && this.password2) {
          this.$message.warning('请输入修改的密码');
          return
        }
        if (this.password2 != this.password) {
          this.$message.warning('两次输入的密码不一致');
          return
        }
        let param = {
          cipher: this.password
        }
        this.$emit('confirmPass', param)
      },
      closedialog() {
        this.$emit('cancle')
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
    width: 90px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;

    line-height: 14px;
    flex-shrink: 0;
  }
</style>
