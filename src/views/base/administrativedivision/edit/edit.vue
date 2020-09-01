<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">上级区域:</div>
      <a-input class='edit_a_input'  />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">区划等级:</div>
      <a-input class='edit_a_input' />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>区划名称:</div>
      <a-input class='edit_a_input' placeholder="2-16个中文汉字组合" />
      <div class="edit_item_toast">注：区划名字不超过30个字</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>地图位置:</div>
      <a-input class='edit_a_input' placeholder="在地图定位后获取" />
      <div class="edit_item_toast btn_blue mapbtn"> 
          <a-icon type="environment"></a-icon>   
         地图定位 
      </div>

    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">备注:</div>
      <div style="position: relative;">
        <a-textarea class='edit_a_input' :rows="5"  placeholder="格式不限制，256个字符以内，包含标点符号" />
        <div class="edit_number">0/256</div>
      </div>
      <div class=" edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button>保存</a-button>
      <a-button type="primary" style="margin-left: 20px;">重置</a-button>
    </div>    
  </div>
</template>

<script>
</script>

<style>

  .edit_item_title {
    width: 315px;
    text-align: right;
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
  .mapbtn{
      width: 100px;
      color: #fff;
      text-align: center;
  }
</style>
