<template>
  <div class="content2">
    <div class='flexrow flexac flexsb'>
      <div class="flexrow flexac">
        <div class='title_tx'>字典名称:</div>
        <a-input placeholder="请输入字典名称" v-model="dicName" />
        <a-button type="primary" class="title_btn" @click='getDictionnaryData'>查询</a-button>
        <a-button @click='cleanTxt'>清除</a-button>
      </div>

    </div>
    <div class="view-title-line"></div>
    <a-button type="primary" class='table-add-btn' @click="add">
      <a-icon two-tone-color="#ffffff" type="plus" />新增</a-button>
    <a-table :scroll="{  y: 610 }" :columns="dictionaryColumns" :data-source="dictonaryList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*pagination.pageSize)}}</template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">

          <a href="#" style='font-size: 12px;' @click="editDictionary(record)">编辑</a>
          <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 20px;margin-right: 20px;"></div>
          <a v-if='record.childTotal<=0' href="#" style='color: #FF0000;font-size: 12px;' @click="deleteItem(record)">删除</a>
          <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
        </div>
      </template>
    </a-table>
    <a-popconfirm-delete ref='delete' @confirm="confirm">
    </a-popconfirm-delete>
  </div>
</template>

<script>
  import tableTitleData from "./dictionary.json";
  export default {

    data() {
      return {
        dictionaryColumns: tableTitleData.data.dictionaryColumns, //数值标头
        dictonaryList: [], //字典数据
        dicName: '', //搜索字典名称
        pagination: this.$config.pagination,
        parentItem: null, //父级信息
        pageSize: 20, //请求的每页的大小
        pageIndex: 1 //请求第几页
      }
    },

    methods: {

      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getDictionnaryData()
      },

      cleanTxt() { //清除搜索条件
        this.dicName = '';
        this.dicCode = ''
        this.getDictionnaryData()
      },
      getDictionnaryInfo(val) {
        this.parentItem = val
        this.getDictionnaryData()
      },
      deleteItem(item){
        this.$refs.delete.show(item)
      },
      async getDictionnaryData() {
        this.dictonaryList = []
        if (this.pagination.current == 1)
          this.pagination.total = 0
        let param = {
          keyword: this.dicName,
          parentId: this.parentItem.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        let res = await this.$http.post(this.$api.dictionarypage, param);
        if (res.data.resultCode == "10000") {
          this.dictonaryList = res.data.data.list;
          if (this.pagination.current == 1)
            this.pagination.total = res.data.data.length;
          this.$forceUpdate();
        } else {
          this.dictonaryList = []
        }
      },
      add() {
        this.$router.push({
          path: '/adddictionary',
          query: {
            add: true,
            dictid: this.parentItem.id
          }
        });
      },
      async confirm(item) {
        let param = {
          dictionaryId: item.dictionaryId
        }
        let res = await this.$http.post(this.$api.dictionaryremove, param);
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getDictionnaryData()
        } else {
          this.$message.error(res.data.resultMsg);
        }
        this.$emit('refreshtree')
      },
      editDictionary(item) {

        this.$router.push({
          path: '/adddictionary',
          query: {
            add: false,
            dictid: item.dictionaryId,
          }
        });
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
    margin-right: 20px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
