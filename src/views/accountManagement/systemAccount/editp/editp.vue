<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增数值
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item_zzx" style="margin-top: 20px;">


        <div class="item-title_zzx"> <a style="color: #FF0033;">*</a>密码：</div>

        <a-input-password  v-model='password' :maxLength='16'></a-input-password >
      </div>
      <div class="flexrow flexac item_zzx">
        <a style="color: #FF0033;">*</a>
        <div class="item-title_zzx">确认密码：</div>
        <a-input-password  v-model='password2' :maxLength='16'></a-input-password >
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
      }
    },
    methods: {
      submit() {
        if (!this.password && this.password2) {
          this.$message.warning('请输入修改的密码');
          return
        }
        if (!this.password.length<5 | this.password2.length<5) {
          this.$message.warning('密码要求5-16位');
          return
        }
        if (this.password2 != this.password) {
          this.$message.warning('两次输入的密码不一致');
          return
        }

        this.$emit('confirmPass', this.password)
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

  .item_zzx {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .item-title_zzx {
    width: 80px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;

    line-height: 14px;
    flex-shrink: 0;
  }
</style>
