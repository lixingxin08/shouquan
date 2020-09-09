<template>
  <div class="content2">
    <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>接口名称/操作账号:</div>
        <a-input style='width: 200px;' placeholder="接口名称/操作账号" v-model="keyword" />
        <div class='title_tx'>请求时间:</div>
        <a-range-picker :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
          show-time :value='timeValue' :placeholder="['开始时间', '结束时间']" format="YYYY/MM/DD HH:mm:ss" @change="onChange" />
        <a-button type="primary" class="title_btn" @click='getTableData()'>查询</a-button>
        <a-button @click='cleanTxt'>清除</a-button>
      </div>
    </div>
    <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableList" bordered size="small" :pagination="pagination"
      @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{index+1}}</template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="detail(record)">详情</a>
        </div>
      </template>
    </a-table>
    <is-detail v-show="isShow" ref='detail' @confirm='confirm'></is-detail>
  </div>
</template>

<script>
  import tableTitleData from "../table.json";
  import isDetail from '../detail/detail.vue'
  import moment from 'moment';
  export default {
    components: {
      isDetail
    },
    data() {
      return {
        isShow: false,
        tableTitle: tableTitleData.data.tableTitle, //数值标头
        tableList: [], //日志数据
        keyword: '', //搜索
        dateFormat: 'YYYY/MM/DD',
        monthFormat: 'YYYY/MM',
        pagination: {
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
        timeValue: ['', ''],
        parentItem: null, //父级信息
        pageSize: 20, //请求的每页的大小
        pageIndex: 1 //请求第几页
      }
    },

    methods: {
      moment,
      onChange(dates, dateStrings) {
        this.timeValue = dateStrings
      },
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getTableData()
      },

      cleanTxt() { //清除搜索条件
        this.keyword = '';
        this.timeValue = ['', '']
        this.getTableData()
      },
      getDictionnaryInfo(val) {
        this.parentItem = val
        this.getTableData()
      },
      async getTableData() {

        let param = {
          keyword: this.dicName,
          parentId: this.parentItem.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        let res = await this.$http.post(this.$api.dictionarypage, param);
        if (res.data.resultCode == "10000") {
          this.tableList = res.data.data.list;
          this.$forceUpdate();
        } else {
          this.tableList = []
        }
      },

      detail(item) {
        this.$refs.detail.setItem(item)
        this.isShow = true
      },
      confirm() {
        this.isShow = false
      }

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
    margin-right: 10px;
    margin-left: 10px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
