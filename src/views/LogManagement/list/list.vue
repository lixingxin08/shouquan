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
    <a-table :scroll="{  y: 610 }" :columns="tableTitle" :data-source="tableList" bordered size="small" :pagination="pagination"
      @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*pagination.pageSize)}}</template>
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
        dateFormat: 'YYYY-MM-DD',
        monthFormat: 'YYYY/MM',
       pagination: this.$config.pagination,
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
        this.pagination.pageSize = pagination.pageSize
        this.pagination.current = pagination.current
        this.getTableData()
      },

      cleanTxt() { //清除搜索条件
        this.keyword = '';
        this.timeValue = ['', '']
        this.getTableData()
      },
      getLogInfo(val) {
        this.parentItem = val
        this.getTableData()
      },
      async getTableData() {
        //,
        if(!this.parentItem)
        return
        this.tableList =[]
        if (this.pagination.current == 1)
          this.pagination.total =0;
        let param = {
          actionName: this.keyword,
          pageSize: this.pagination.pageSize,
          menuId: this.parentItem.id,
          startTime: this.timeValue[0] ? this.timeValue[0].toString().replace(new RegExp('/', 'gm'), '-') : '',
          endTime: this.timeValue[1] ? this.timeValue[1].toString().replace(new RegExp('/', 'gm'), '-') : '',
          pageIndex: this.pagination.current
        };
        let res = await this.$http.post(this.$api.journalpage, param);
        if (res.data.resultCode == "10000") {
          if (res.data.data) {
            this.tableList = res.data.data.list;
            if (this.pagination.current == 1)
              this.pagination.total = res.data.data.length;
            this.$forceUpdate();
          }
        } else {
          this.tableList = []
          this.pagination.total=0
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
