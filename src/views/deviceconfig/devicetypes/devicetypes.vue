<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>类型名称/代码:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入名称/代码" />
      <div class='title_tx' style="margin-left: 20px;">业务类别:</div>
      <a-select :value="serviceType?serviceType:'全部'" style="width: 200px;" @change="handleSelectChange">
        <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxId">
          {{item.comboBoxName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" class="title_btn" @click='getDeviceData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div class="view-title-line"></div>
    
    <div class="flexrow" style="margin-bottom: 20px;">
      <a-button type="primary" @click="editDevice({})">
        <a-icon two-tone-color="#ffffff"  type="plus" /> 新增
      </a-button>
    </div>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="deviceList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{(index+1)+((pagination.current-1)*pagination.pageSize)}}
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDevice(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm v-if="record.modelTotal<=0" title="确定删除?" ok-text="确定" cancel-text="取消" @confirm="confirm(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
          <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
          <div class="item-line"></div>
          <a href="#" style='font-size: 12px;' @click="deviceAtt(record)">属性</a>
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
        keyword: '',
        selectList: [{
          comboBoxId: "",
          comboBoxName: "全部"
        }], //业务列表下拉列表
        serviceType: "",
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        deviceList: [], //设备类型数据
        pagination: {
          total: 0,
          size: "default",//展示尺寸
          current: 1,//选中当前页
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
           showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },
      }
    },
    created() {
      this.getCombobox()
      this.getDeviceData()
    },
    methods: {
      /* 切换分页，选页的回调*/
      handleTableChange(pagination) {
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getDeviceData()
      },
      /* 下拉查询*/
      handleSelectChange(e) {
        this.serviceType = e
        //this.getDeviceData()
      },
      /* 获取设备类型list*/
      async getDeviceData() {
        let param = {
          keyword: this.keyword,
          serviceType: this.serviceType,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        let res = await this.$http.post(this.$api.devicetypepage, param)
        if (res.data.resultCode == 10000) {
          this.deviceList = res.data.data.list
          if (this.pagination.current == 1)
            this.pagination.total = res.data.data.length;
        } else {
          this.deviceList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 确认删除某个item*/
      async confirm(item) {
        let param = {
          deviceTypeId: item.deviceTypeId
        }
        let res = await this.$http.post(this.$api.devicetyperemove, param);
        if (res.data.resultCode == 10000) {
          this.getDeviceData();
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索条件*/
      cleanKeyWord() {
        this.keyword = ''
        this.serviceType = ''
        this.getDeviceData()
      },
      /* 获取业务类型list*/
      async getCombobox() {
        let param = {
          classCode: 'device_service_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        for (let i = 0; i < res.data.data.length; i++) {
          this.selectList.push(res.data.data[i])
        }
      },
      /* 新增 、编辑*/
      editDevice(item) {
        this.$router.push({
          path: '/adddevicetypes',
          query: {
            id: item.deviceTypeId
          }
        });
      },
      /* 属性值*/
      deviceAtt(item) {
        this.$router.push({
          path: '/devicetypesatt',
          query: {
            id: item.deviceTypeId
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
