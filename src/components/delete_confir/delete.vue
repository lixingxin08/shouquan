<template>
  <div class="dialogdel">
    <div class="dialogdel_t flex_b">
      <div></div>
      <div @click="cancel()">
        <a-icon type="close" />
      </div>
    </div>
    <div class="dialogdel_c flex_a">您确定要删除吗？</div>
    <div class="dialogdel_f flex_a">
      <div class="flex_f">
        <div class="ok_btn" @click="confirm()">确定</div>
        <div class="cancel_btn" @click="cancel()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      confirm() {
        //  this.isremove()
        this.$emit("confirm")
      },
      cancel() {
        this.$emit("cancle")
      },
    },
  }
</script>

<style>
  .dialogdel {
    width: 600px;
    height: 392px;
    position: absolute;
    left: 50%;
    top: 250px;
    transform: translate(-50%); 
box-shadow: 0px 0px 20px #CCCCCC;
    border-radius: 8px;
    background-color: #fff;
    z-index: 2;
  }

  .dialogdel_t {
    width: 600px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogdel_c {
    height: 248px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
