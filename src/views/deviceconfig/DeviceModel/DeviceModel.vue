<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>类型名称/代码:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入名称/代码" />
      <div class='title_tx' style="margin-left: 20px;">设备品牌:</div>
      <a-select :value="brandSelect?brandSelect:'全部'" style="width: 200px;" @change="brandSelectChange">
        <a-select-option v-for='(item,index) in brandList' :key='index' :value="item.brandId">
          {{item.brandName}}
        </a-select-option>
      </a-select>
      <div class='title_tx' style="margin-left: 20px;">设备类型:</div>
      <a-select :value="typeSelect?typeSelect:'全部'" style="width: 200px;" @change="deviceTypeSelectChange">
        <a-select-option v-for='(item,index) in typeList' :key='index' :value="item.deviceTypeId">
          {{item.deviceTypeName}}
        </a-select-option>
      </a-select>
      <div class='title_tx' style="margin-left: 20px;">业务类别:</div>
      <a-select :value="severSelect?severSelect:'全部'" style="width: 200px;" @change="serviceSelectChange">
        <a-select-option v-for='(item,index) in severList' :key='index' :value="item.comboBoxId">
          {{item.comboBoxName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" class="title_btn" @click='getDeviceData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div style="width: 100%;height: 1px;background: #cccccc;margin: 20px auto;"></div>
    <a-button class='addbtn' type="primary" @click="add">
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
          <div class="item-line"></div>
          <a href="#" style='font-size: 12px;' @click="paramDevice(record)">运行参数</a>
          <div class="item-line"></div>
          <a href="#" style='font-size: 12px;' @click="deviceInfo(record)">属性值</a>
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
        brandList: [{ //设备品牌
          brandName: '全部',
          brandId: ''
        }],
        brandSelect: '', //设备品牌选择
        typeList: [{ //设备类型
          deviceTypeName: '全部',
          deviceTypeId: ''
        }],
        typeSelect: '', //设备类型选择
        severList: [{ //业务类别
          comboBoxId: '',
          comboBoxName: '全部'
        }],
        severSelect: '', //业务类别选择
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        deviceList: [], //设备型号数据
        pagination: {
          total:0,
           size:"default",
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
        pageSize: 20,
        pageIndex: 1,
      }
    },
    created() {
      this.getBrandList()
      this.getTypeList()
      this.getCombobox()
      this.getDeviceData()
    },
    methods: {
      /* table 页面 页码更改*/
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getDeviceData()
      },
/* 获取设备类型 */
      async getDeviceData() {
        let param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          serviceType: this.severSelect, //业务类别
          deviceTypeId: this.typeSelect, //设备类型
          brandId: this.brandSelect, //设备品牌
          keyword: this.keyword //搜索条件
        }
        let res = await this.$http.post(this.$api.devicemodelpage, param)
        if (res.data.resultCode == 10000) {
          this.deviceList = res.data.data.list
        this.pagination.total = res.data.data.length;
        } else {
          this.deviceList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 确定删除*/
      async confirmDelete(item) {
        let param = {
          modelId: item.modelId
        }
        let res = await this.$http.post(this.$api.devicemodelremove, param);
        if (res.data.resultCode == 10000) {
          this.getDeviceData()
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索条件*/
      cleanKeyWord() {
        this.keyword = ''
        this.severSelect = ''
        this.typeSelect = ''
        this.brandSelect = ''
        this.getDeviceData()
      },
      /* 获取品牌列表*/
      async getBrandList() {
        let param = {
          pageIndex: 1,
          pageSize: 200,
          keyword: ''
        }
        let res = await this.$http.post(this.$api.devicebrandspage, param)
        if (res.data.resultCode == 10000) {
          this.brandList = this.brandList.concat(res.data.data.list)
        }
      },
      /* 获取设备类型列表*/
      async getTypeList() {
        let param = {
          keyword: '',
          serviceType: '',
          pageIndex: 1,
          pageSize: 200
        }
        let res = await this.$http.post(this.$api.devicetypepage, param)
        if (res.data.resultCode == 10000) {
          this.typeList = this.typeList.concat(res.data.data.list)
        }
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'device_service_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)

        if (res.data.resultCode == 10000) {
          this.severList = this.severList.concat(res.data.data)
        }
      },
      /* 新增*/
      add() {
        this.$router.push({
          path: '/adddeviceModel',
          query: {
            id: ""
          }
        });
      },
     /* 運行參數*/
      paramDevice(item) {

        this.$router.push({
          path: '/deviceModelParam',
          query: {
            id: item.modelId
          }
        });
      },
      /* 屬性值*/
      deviceInfo(item) {
        this.$router.push({
          path: '/deviceModelAtt',
          query: {
            id: item.modelId
          }
        });
      },
      /* 編輯*/
      editDevice(item) {
        this.$router.push({
          path: '/adddeviceModel',
          query: {
            id: item.modelId
          }
        });
      },
      /* 业务类别*/
      serviceSelectChange(e) {
        this.severSelect = e
      },
      /* 设备类型*/
      deviceTypeSelectChange(e) {
        this.typeSelect = e
      },
      /* 品牌类别*/
      brandSelectChange(e) {
        this.brandSelect = e
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
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
