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
    <div style="width: 100%;height: 1px;margin: 10px auto;"></div>
    <a-button class='addbtn' type="primary" @click="editDevice({})">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增
    </a-button>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="deviceList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDevice(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
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
        pagination: {
          total: 0,
          current:1,
          size: "default",
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
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
        let param = {
          pageSize: this.pagination.pageSize,
          pageIndex: this.pagination.current,
          keyword: this.keyword,
          eventType: this.eventSelect
        }
        let res = await this.$http.post(this.$api.deviceeventpage, param)
        if (res.data.resultCode == 10000) {
          this.deviceList = res.data.data.list
          this.pagination.total = res.data.data.length;
        } else {
          this.deviceList = []
          this.$message.error(res.data.resultMsg);
        }
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
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    width: 80px;
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
</style>
