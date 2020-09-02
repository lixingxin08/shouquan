<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>品牌名称/代码:</div>
      <a-input style='width: 200px;' placeholder="请输入名称/代码" />

      <a-button type="primary" v-model='keyword' class="title_btn" @click='getDeviceData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div style="width: 100%;height: 1px;background: #cccccc;margin: 20px auto;"></div>
    <div class="flexrow flexjc flexac addbtn" @click="add">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增
    </div>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="deviceList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <template slot="authFlag" slot-scope="text, record,index">
        <div v-if="record.authFlag==0">默认拥有类</div>
        <div v-if="record.authFlag==1">系统配置类</div>
        <div v-if="record.authFlag==2">客户授权类</div>
        <div v-if="record.authFlag==2">均可操作类</div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDevice(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirm">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>

        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
  import tableTitleData from "./table.json";
  const plainOptions = ['页签', '按钮'];
  export default {
    data() {
      return {
        keyword: '',
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        deviceList: [{}], //字典数据
        pagination: {
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
        pageSize: 20,
        pageIndex: 1,
      }
    },
    methods: {
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getDeviceData()
      },
      handleSelectChange(e) {},
      getDeviceData() {},
      confirm(){//确定

      },
      cleanKeyWord(){

      },
      add() {//新增
        this.$router.push({
          path: '/addbrand',
          query: {
            add: true
          }
        });
      },
      editDevice(){
        this.$router.push({
          path: '/addbrand',
          query: {
            add: false
          }
        });
      },
      deviceAtt(){
        this.$router.push({
          path: '/devicetypesatt',
          query: {
            add: true
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
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
