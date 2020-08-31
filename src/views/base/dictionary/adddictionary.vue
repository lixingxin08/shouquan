<template>
  <div style="margin: 0 auto;">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">上级名称:</div>
      <a-input class='edit_a_input' placeholder="顶级字典" />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">上级代码:</div>
      <a-input class='edit_a_input' placeholder="顶级字典" />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">字典名称:</div>
      <a-input class='edit_a_input' placeholder="顶级字典" />
      <div class="edit_item_toast">注：区划名字不超过30个字</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">字典代码:</div>
      <a-input class='edit_a_input' placeholder="顶级字典" />

    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">字典等级:</div>
      <div style="position: relative;">
        <a-textarea class='edit_a_input' :rows="5" placeholder="顶级字典" />
        <div class="edit_number">0/256</div>
      </div>
      <div class=" edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow "style="margin-top: 30px;justify-item: flex-start;margin-left: 70px;">
      <a-button>保存</a-button>
      <a-button type="primary" style="margin-left: 20px;">重置</a-button>
    </div>
    <div>数值列表</div>
    
  </div>
</template>

<script>
</script>

<style>
  .edit_item_title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item {
    margin-top: 24px;
  }

  .edit_item_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input {
    width: 667px;
    height: 32px;
  }

  .edit_number {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }
</style>
