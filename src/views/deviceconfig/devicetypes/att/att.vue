<template>
  <div class="content2">
    <div class="flexcolumn" v-for="(item,index) in groups" :key='index'>
      <div class="flexrow flexac" style="margin-top: 10px;margin-bottom: 10px;">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>类型名称:</div>
        <a-input class='edit_a_input' v-model='item.typeName' placeholder="注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <a-button class='top-btn' type='primary'>保存</a-button>
        <a-button class='top-btn' :disabled='item.typeName==""||!item.typeName' @click='addGroupAtt(index)'>新增属性</a-button>
        <a-button class='top-btn' :disabled='item.typeName==""||!item.typeName'>删除</a-button>
      </div>
      <a-table v-if='item.attList&&item.attList.length>0' style='margin-top: 20px;margin-bottom: 20px;' :columns="dictionaryColumns"
        :data-source="item.attList" :pagination='false' :bordered='true' size='small'>
        <template slot="index2" slot-scope="text, record, index2">
          <div>{{index2+1}}</div>
        </template>
        <template v-for="col in ['name', 'code', 'remark']" :slot="col" slot-scope="text, record, index2">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index2, col,index)" />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index2">
          <div class="flexrow flexjc">

            <a @click="() => save(index2)">保存</a>
            <div class="item-line"></div>
            <a-popconfirm v-if="record.delete" title="确定删除数值吗?" @confirm="() => cancel(record)">
              <a style="color: #FF0033;">删除</a>

            </a-popconfirm>
            <a v-else style="color: #DCDCDC;">删除</a>
          </div>
        </template>
      </a-table>
    </div>
    <div class="flexrow flexjc flexac addbtn" @click="add">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增分组
    </div>
  </div>
</template>

<script>
  import tableTitleData from "../table.json";
  export default {
    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        groups: [{
          typeName: '',
          attList: [{
            name: '',
            code: '',
            remark: ''
          }]
        }],

      }
    },
    methods: {
      save() {},
      cancel(item) {},
      add() {
        this.groups.push({
          typeName: '',
          attList: []
        })
      },
      addGroupAtt(index) {
        console.log(this.groups[index])
        this.groups[index].attList.push({
          name: '',
          code: '',
          remark: ''
        })
      },

      handleChange(value, chilidIndex, column, groupIndex) { //修改数值

        const newData = [...this.groups];
        const target = newData[groupIndex].attList[chilidIndex];
        if (target) {
          target[column] = value;
          target['edit'] = true
          this.groups = newData;
        }
      },
    }
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

  .addbtn {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    width: 80px;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 36px;
    background: #1890ff;
    border: 1px solid #1890ff;
    border-radius: 8px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 10px;
    margin-right: 10px;
  }

  .top-btn {
    margin-left: 5px;
    margin-right: 5px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }
</style>
