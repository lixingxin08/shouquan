<template>
  <div class="content2">
    <is-delete-dialog v-if="visible" @confirm='confirmDialog' @cancle='cancelDialog'></is-delete-dialog>
    <div class="flexcolumn" v-for="(item,index) in groups" :key='index'>
      <div class="flexrow flexac" style="margin-top: 10px;margin-bottom: 10px;">
        <div class="edit_item_title3"><a style="color: #FF0000;">*</a>属性分组:</div>
        <a-input class='edit_a_input' v-model='item.propertyName' placeholder="注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <a-button class='top-btn' type='primary' @click='saveGroup(item)'>保存</a-button>
        <a-button class='top-btn' :disabled='!item.propertyId' @click='addGroupAtt(index)'>新增属性</a-button>
        <a-button class='top-btn' :disabled='!item.propertyId' @click='deleteGroup(item)'>删除</a-button>
      </div>
      <div class="min_table">
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
    </div>
    <div class="flexrow flexjc flexac addbtn" @click="add">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增分组
    </div>

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
        visible: false, //是否显示删除确认框
        dictionaryColumns: tableTitleData.data.attList, //table title
        groups: [], //分组列表
        id: '', //设备类型id
        deleteItem: "" //删除的item 缓存记录
      }
    },
    created() {
      this.id = this.$route.query.id //获取传入的设备id
      this.getProperty()
    },
    methods: {
      /* 保存属性 */
      async save(item, groupItem) {
        let param = {
          propertyDesc: item.propertyDesc, //属性描述
          propertyName: item.propertyName, //属性名称
          propertyCode: item.propertyCode, //属性代码
          propertyId: item.propertyId,
          deviceTypeId: this.id, //属性id 为空新增
          parentId: groupItem.propertyId, //父级属性id
          operatorId: JSON.parse(localStorage.getItem('authorization')).accountId
        }
        let res = await this.$http.post(this.$api.propertyform, param)
        if (res.data.resultCode == 10000) {
          //this.getProperty()
          this.$message.success(res.data.resultMsg);
          this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 删除某个分组下的子属性*/
      async cancel(item) {
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
      /* 添加分组*/
      add() {
        this.groups.push({})
      },
      /* 添加分组的子属性*/
      addGroupAtt(index) {
        this.groups[index].childrenList.push({
          propertyCode: '',
          propertyId: '',
          propertyName: '',
          propertyDesc: ''
        })
      },
      /* 删除属性分组 */
      deleteGroup(item) {
        this.deleteItem = item
        this.visible = true
      },
      /* 获取分组信息*/
      async getProperty() {

        let param = {
          deviceTypeId: this.id
        }
        let res = await this.$http.post(this.$api.propertylist, param)

        if (res.data.resultCode == 10000) {
          let data = []
          res.data.data.result.forEach((item) => {
            if (item.parentId == '100000000000000000000000000000000000000000000000000000000000') {
              item.childrenList = []
              res.data.data.result.forEach((childItem) => {
                if (childItem.parentId == item.propertyId) {
                  item.childrenList.push(childItem)
                }
              })
              data.push(item)
            }
          })
          this.groups = data


        } else { //没有分组信息时本地添加一个空的
           this.groups=[{}]
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 添加保存分组*/
      async saveGroup(item) {
        if (!item.propertyName) {
          this.$message.warning('属性分组名称不能为空')
          return
        }

        let param = {
          propertyId: item.propertyId,
          propertyName: item.propertyName, //分组名称
          deviceTypeId: this.id, //为空 新增 不能为空编辑
          operatorId: JSON.parse(localStorage.getItem('authorization')).accountId //操作者id
        }
        let res = await this.$http.post(this.$api.propertyform, param)
        if (res.data.resultCode == 10000) {
          this.getProperty()
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 修改某个编辑框，实时更新list 数据*/
      handleChange(value, chilidIndex, column, groupIndex) { //修改数值
        const newData = [...this.groups];
        const target = newData[groupIndex].childrenList[chilidIndex];
        if (target) {
          target[column] = value;
          this.groups = newData;
        }
      },
      /* 确认删除后请求*/
      async confirmDialog() {
        this.visible = false
        let param = {
          propertyId: this.deleteItem.propertyId //分组的id
        }
        let res = await this.$http.post(this.$api.propertyremove, param)

        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getProperty()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 取消*/
      cancleDialog() {
        this.visible = false
      },

    }
  }
</script>

<style>
  .edit_item_title3 {
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
