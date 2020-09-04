<template>
  <div class="content2">
    <div class="flexcolumn" v-for="(item,index) in groups" :key='index'>
      <div class="flexrow flexac" style="margin-top: 10px;margin-bottom: 10px;">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>属性分组:</div>
        <a-input class='edit_a_input' v-model='item.propertyName' placeholder="注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <a-button class='top-btn' type='primary' @click='saveGroup(item)'>保存</a-button>
        <a-button class='top-btn' :disabled='!item.propertyId' @click='addGroupAtt(index)'>新增属性</a-button>
        <a-button class='top-btn' :disabled='!item.propertyId' @click='deleteGroup(item)'>删除</a-button>
      </div>
      <a-table v-if='item.childrenList&&item.childrenList.length>0' style='margin-top: 20px;margin-bottom: 20px;'
        :columns="dictionaryColumns" :data-source="item.childrenList" :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>
        <template v-for="col in ['propertyName', 'propertyCode', 'propertyDesc']" :slot="col" slot-scope="text, record, index2">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index2, col,index)" />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index2">
          <div class="flexrow flexjc">

            <a @click="() => save(record,item)">保存</a>
            <div class="item-line"></div>
            <a-popconfirm v-if="record.hasValueNum<=0" title="确定删除数值吗?" @confirm="() => cancel(record)">
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
    <is-delete-dialog v-if="visible" @confirm='confirmDialog' @cancle='cancelDialog'></is-delete-dialog>
  </div>
</template>

<script>
  import tableTitleData from "../table.json";
  import isDeleteDialog from '../../../../components/delete_confir/delete.vue'
  export default {
    components: {
      isDeleteDialog
    },
    data() {

      return {
        visible: false,
        dictionaryColumns: tableTitleData.data.attList,
        groups: [],
        id: '',
        deleteItem: ""
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getProperty()
    },
    methods: {
      async save(item, groupItem) {//保存属性
        let param = {
          propertyDesc: item.propertyDesc, //属性描述
          propertyName: item.propertyName, //属性名称
          propertyCode: item.propertyCode, //属性代码
          propertyId: item.propertyId ? this.propertyId : "",
          deviceTypeId: this.id, //属性id 为空新增
          parentId: groupItem.propertyId, //父级属性id
          operatorId: '5172dadd6d7c404e8ac657f32f81d969'
        }
        let res = await this.$http.post(this.$api.propertyform, param)
        if (res.data.resultCode == 10000) {
          this.getProperty()
          this.$message.success(res.data.resultMsg);
          //this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
     async cancel(item) {//删除子属性
        let param = {
          propertyId: item.propertyId
        }
        let res = await this.$http.post(this.$api.propertyremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      add() { //添加分组
        this.groups.push({})
      },
      addGroupAtt(index) { //添加子属性
        this.groups[index].childrenList.push({
          propertyCode: '',
          propertyId: '',
          propertyName: '',
          propertyDesc: ''
        })
      },

      deleteGroup(item) { //删除属性分组
        this.deleteItem = item
        this.visible = true
      },
      async getProperty() { //获取分组信息
        let param = {
          deviceTypeId: this.id
        }
        let res = await this.$http.post(this.$api.propertylist, param)
        console.log(param)
        console.log(res)
        if (res.data.resultCode == 10000) {
          let data = res.data.data
          for (let i = 0; i < data.length; i++) {

            if (!data[i].childrenList) {
              data[i].childrenList = []
            }
          }
          this.groups = data

        } else {
          this.groups.push({})
          this.$message.error(res.data.resultMsg);
        }
      },
      async saveGroup(item) {
        if (!item.propertyName) {
          this.$message.warning('属性分组名称不能为空')
          return
        }

        let param = {
          propertyName: item.propertyName,
          deviceTypeId: this.id,
          operatorId: '5172dadd6d7c404e8ac657f32f81d969'
        }
        let res = await this.$http.post(this.$api.propertyform, param)
        if (res.data.resultCode == 10000) {
          this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      handleChange(value, chilidIndex, column, groupIndex) { //修改数值
        const newData = [...this.groups];
        const target = newData[groupIndex].childrenList[chilidIndex];
        if (target) {
          target[column] = value;
          this.groups = newData;
        }
      },
      async confirmDialog() {
        this.visible = false
        let param = {
          propertyId: this.deleteItem.propertyId
        }
        let res = await this.$http.post(this.$api.propertyremove, param)

        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      cancleDialog() {
        this.visible = false
      }
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
    margin-left: 20px;
    margin-right: 20px;
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
