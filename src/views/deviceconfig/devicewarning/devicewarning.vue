<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>警报名称/代码:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入名称/代码" />
      <div class='title_tx' style="margin-left: 20px;">警报类别:</div>
      <a-select :value="warningSelect?warningSelect:'全部'" style="width: 200px;" @change="handleSelectChange">
        <a-select-option v-for='(item,index) in warningTypeList' :key='index' :value="item.comboBoxId">
          {{item.comboBoxName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" class="title_btn" @click='getWariningData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div class="view-title-line"></div>


    <a-button class='table-add-btn' type="primary" @click='edit({})'>
      <a-icon two-tone-color="#ffffff" type="plus" /> 新增
    </a-button>

    <a-table :scroll="{  y: 610 }" :columns="dictionaryColumns" :data-source="warningList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{(index+1)+((pagination.current-1)*pagination.pageSize)}}
      </template>
      <div slot="gradeno" slot-scope="text, record">
        <div v-if="record.gradeno==0||record.gradeno==3">忽略</div>
        <div style="color: #1890FF;" v-if="record.gradeno==2">普通</div>
        <div style="color: #FF0033;" v-if="record.gradeno==1">高危</div>
      </div>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          <div class="item-line"></div>
          <a href="#" v-if='record.authTotal<=0' style='color: #FF0000;font-size: 12px;' @click="deleteItem(record)">删除</a>
          <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
        </div>
      </template>
    </a-table>
    <a-popconfirm-delete ref='delete' @confirm="deleteConfirm">
    </a-popconfirm-delete>
  </div>
</template>
<script>
  import tableTitleData from "./table.json";
  export default {
    data() {
      return {
        keyword: '',
        warningTypeList: [{ //警报类型
          comboBoxId: '',
          comboBoxName: '全部'
        }],
        warningSelect: '', //警报选择
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        warningList: [], //字典数据
        pagination: this.$config.pagination,
      }
    },
    created() {
      this.getCombobox()
      this.getWariningData()
    },
    methods: {
      /* 页面 页码 切换事件*/
      handleTableChange(pagination) {
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getWariningData()
      },
      deleteItem(item) {
        this.$refs.delete.show(item)
      },
      /* 警报类型更改*/
      handleSelectChange(e) {
        this.warningSelect = e
      },
      /* 获取警报列表事件*/
      async getWariningData() {
        this.warningList = []
        if (this.pagination.current == 1)
          this.pagination.total = 0
        let param = {
          keyword: this.keyword,
          alarmType: this.warningSelect,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        let res = await this.$http.post(this.$api.alramlist, param)

        if (res.data.resultCode == 10000) {
          if (this.pagination.current == 1) {
            this.pagination.total = res.data.data.length;
          }

          this.warningList = res.data.data.list
        } else {
          this.warningList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 删除警报确定*/
      async deleteConfirm(item) {
        let param = {
          alarmId: item.alarmId
        }
        let res = await this.$http.post(this.$api.alramremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getWariningData()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索条件*/
      cleanKeyWord() {
        this.warningSelect = ''
        this.keyword = ''
        this.getWariningData()
      },
      /* 获取业务类别 */
      async getCombobox() {
        let param = {
          classCode: 'device_alarm_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)

        if (res.data.resultCode == 10000) {
          this.warningTypeList = this.warningTypeList.concat(res.data.data)
        }
      },
      /*
      编辑/增加警报事件
      */
      edit(item) {
        this.$router.push({
          path: '/adddevicewarning',
          query: {
            id: item.alarmId
          }
        });
      },

    }
  }
</script>
<style>
  .title_tx {
    flex-shrink: 0;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    margin-right: 20px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }

  .addbtn {

    width: 80px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
