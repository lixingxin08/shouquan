<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>事件名称/代码:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入名称/代码" />
      <div class='title_tx' style="margin-left: 20px;">事件类别:</div>
      <a-select :value="eventSelect?eventSelect:'全部'" style="width: 200px;" @change="eventSelectChange">
        <a-select-option v-for='(item,index) in eventList' :key='index' :value="item.comboBoxId">
          {{item.comboBoxName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" class="title_btn" @click='getEvent'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
      <div class="view-title-line"></div>
     <a-button  type="primary" class='table-add-btn' @click="editDevice({})">
      <a-icon two-tone-color="#ffffff"  type="plus" /> 新增
    </a-button>

    <a-table :scroll="{  y: 610 }" :columns="dictionaryColumns" :data-source="deviceList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{(index+1)+((pagination.current-1)*pagination.pageSize)}}
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDevice(record)">编辑</a>
          <div class="item-line"></div>
         
            <a  v-if='record.alarmTotal<=0' href="#" style='color: #FF0000;font-size: 12px;' @click="deleteItem(record)">删除</a>
        
          <div v-else style="color: #CCCCCC;font-size: 12px;">
            删除
          </div>
        </div>
      </template>
    </a-table>
    <a-popconfirm-delete ref='delete' @confirm="confirmDelete">
       </a-popconfirm-delete>
  </div>
</template>
<script>
  import tableTitleData from "./table.json";
  export default {
    data() {
      return {
        keyword: '', //搜索条件
        eventSelect: '', //事件选择
        eventList: [{ //事件类型
          comboBoxId: '',
          comboBoxName: '全部'
        }],
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        deviceList: [], //字典数据
     pagination: this.$config.pagination,
      }
    },
    created() {
      this.getCombobox()
      this.getEvent();
    },
    methods: {
      /* 切换页面 页码事件*/
      handleTableChange(pagination) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getEvent()
      },
      /* 更换类型事件*/
      eventSelectChange(e) {
        this.eventSelect = e
      },
      /* 获取类型列表*/
      async getEvent() {
        this.deviceList = []
       if(this.pagination.current==1)
       this.pagination.total = 0
        let param = {
          pageSize: this.pagination.pageSize,
          pageIndex: this.pagination.current,
          keyword: this.keyword,
          eventType: this.eventSelect
        }
        let res = await this.$http.post(this.$api.deviceeventpage, param)
        if (res.data.resultCode == 10000) {
          this.deviceList = res.data.data.list
           if(this.pagination.current==1)
          this.pagination.total = res.data.data.length;
        } else {
          this.deviceList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      deleteItem(item){
        this.$refs.delete.show(item)
      },
      /* 确定*/
      async confirmDelete(item) {
        let param = {
          eventId: item.eventId,
        }
        let res = await this.$http.post(this.$api.deviceeventremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getEvent()
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索事件*/
      cleanKeyWord() {
        this.keyword = ''
        this.eventSelect = ''
        this.getEvent()
      },
      /* 获取业务类别 */
      async getCombobox() {
        let param = {
          classCode: 'device_event_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)

        if (res.data.resultCode == 10000) {
          this.eventList = this.eventList.concat(res.data.data)
        }
      },
      /* 编辑事件*/
      editDevice(item) {
        this.$router.push({
          path: '/adddeviceevent',
          query: {
            id: item.eventId
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
    margin-bottom: 20px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
