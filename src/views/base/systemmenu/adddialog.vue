<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增接口
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flex_f item_menu" style="margin-top: 20px;">
        <a style="color: #FF0033;">*</a>
        <div class="item-title_menu">接口名称：</div>
        <a-input v-model='item.actionName'></a-input>
      </div>
      <div class="flexrow flex_f item_menu">
        <a style="color: #FF0033;">*</a>
        <div class="item-title_menu">URL地址：</div>
        <a-input v-model='item.linkURL'></a-input>
      </div>
      <div class="flexrow flex_f item_menu">
        <a style="color: #FFFFFF;">*</a>
        <div class="item-title_menu">是否默认：</div>
        <a-switch v-model='item.defaultFlag==1' @change="onChangeSwitch"></a-switch>
      </div>
      <div class="flexrow flexjc" style='margin-top: 120px;margin-bottom: 30px;'>
        <a-button type='primary' @click='submit'>确定</a-button>
        <a-button style='margin-left: 30px;' @click='reset'>重置</a-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {
          defaultFlag: 0
        },
        cacheItem: {},
        index: -1
      }
    },
    methods: {

      setItem(item, index) {
        localStorage.setItem('systemitem', JSON.stringify(item))
        this.item = item
        this.index = index
      },
      onChangeSwitch(checked) {
        this.item.defaultFlag = checked ? 1 : 0
      },
      reset() {
        this.item = JSON.parse(localStorage.getItem('systemitem'))
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

  .item_menu {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .item-title_menu {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;

    line-height: 14px;
    flex-shrink: 0;
  }
</style>
