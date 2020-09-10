<template>
  <div class="content2">
    <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>字典名称:</div>
        <a-input placeholder="请输入字典名称" v-model="dicName" />

        <a-button type="primary" class="title_btn" @click='getDictionnaryData'>查询</a-button>
        <a-button @click='cleanTxt'>清除</a-button>
      </div>
      <a-button type="primary" @click="add">新增</a-button>
    </div>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="dictonaryList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{index+1}}</template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirm(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
          <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 20px;margin-right: 20px;"></div>
          <a href="#" style='font-size: 12px;' @click="editDictionary(record)">编辑</a>
        </div>
      </template>
    </a-table>
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
        pagination: {
			total:0,
       size:"default",
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
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
      async getDictionnaryData() {

        let param = {
          keyword: this.dicName,
          parentId: this.parentItem.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        let res = await this.$http.post(this.$api.dictionarypage, param);
        if (res.data.resultCode == "10000") {
          this.dictonaryList = res.data.data.list;
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
