<template>
  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级名称:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;"></div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级代码:</div>
       <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;"></div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典名称:</div>
        <a-input class='edit_a_input' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <div class="edit_item_toast">注：区划名字不超过30个字</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典代码:</div>
        <a-input class='edit_a_input' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典等级:</div>
          <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;"></div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" placeholder="顶级字典" />
          <div class="edit_number">0/256</div>
        </div>
      </div>
      <div class="flexrow " style="margin-top: 30px;justify-item: flex-start;margin-left: 80px;">
        <a-button>保存</a-button>
        <a-button type="primary" style="margin-left: 20px;">重置</a-button>
      </div>
      <div class="flexrow edit_item_title" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">数值列表</div>

      <a-table :columns="dictionaryColumns" :data-source="szList" :pagination='false' :bordered='true' size='small'>
        <template v-for="col in ['name', 'code', 'info']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;background-color: !;" :value="text" @change="e => handleChange(e.target.value, index, col)" />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span >
              <a v-if='!record.name' @click="() => save(record.key)">保存</a>
              <a-popconfirm v-else title="确定删除数值吗?" @confirm="() => cancel(record.key)">
                <a style="color: ff0000;">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
      <div class="flexrow edit_item_title" style="margin-top: 10px;justify-item: flex-start;margin-bottom: 50px;font-size: 16px;"><a-button type='primary' @click='addLine'>新增行</a-button></div>

    </div>

  </div>
</template>

<script>
  import tableTitleData from "./dictionary.json";

  export default {
    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        editingKey:'',
        cacheData:[{
          name: "1",
          code: "1111",
          info: "1111111"
        }],
        szList: [{
        },{},{},{},{}]
      }
    },
    methods: {
      addLine(){
        this.szList.push({})
      },

      handleChange(value, key, column) {
        const newData = [...this.szList];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.szList = newData;
        }
      },
      edit(key) {
        const newData = [...this.szList];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.szList = newData;
        }
      },
      save(key) {
        const newData = [...this.szList];
        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => key === item.key)[0];
        const targetCache = newCacheData.filter(item => key === item.key)[0];
        if (target && targetCache) {
          delete target.editable;
          this.szList = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        }
        this.editingKey = '';
      },
      cancel(key) {
        const newData = [...this.szList];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.szList = newData;
        }
      },
    },
  }
</script>

<style>
  .edit_item_title {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item {
    margin: 0 auto;
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
