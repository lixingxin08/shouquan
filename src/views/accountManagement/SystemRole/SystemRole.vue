<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>角色名称:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入角色名称" />


      <a-button type="primary" class="title_btn" @click='getTableData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div class="view-title-line"></div>
    <div class="flexrow" > <a-button type="primary" class='table-add-btn' @click="edit({})">
      <a-icon two-tone-color="#ffffff" type="plus" /> 新增
    </a-button></div>

    <a-table :scroll="{  y: 610 }" :columns="tableTitle" :data-source="tableList" bordered size="small" :pagination="pagination"
      @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{(index+1)+((pagination.current-1)*pagination.pageSize)}}
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          <div class="item-line"></div>
            <a href="#" v-if='record.totalno<=0' style='color: #FF0000;font-size: 12px;' @click="deleteItem(record)">删除</a>
         
          <a v-else style="color: #DCDCDC; font-size: 12px;">删除</a>
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

        tableTitle: tableTitleData.data.tableTitle,
        tableList: [], //设备型号数据
      pagination: this.$config.pagination,
        pageSize: 20,
        pageIndex: 1,
      }
    },
    created() {
      this.getTableData()
    },
    methods: {
      /* table 页面 页码更改*/
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getTableData()
      },
      /* 获取设备类型 */
      async getTableData() {
         (this.pagination.current == 1)
          this.pagination.total=0
           this.tableList = []
        let param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          keyword: this.keyword //搜索条件
        }
        let res = await this.$http.post(this.$api.rolesystempage, param)
        if (res.data.resultCode == 10000) {
          this.tableList = res.data.data.list
          if (this.pagination.current == 1)
            this.pagination.total = res.data.data.length
        } else {
          this.tableList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      deleteItem(item){
             this.$refs.delete.show(item)
           },
      /* 确定删除*/
      async confirmDelete(item) {
        let param = {
          roleId: item.roleId
        }
        let res = await this.$http.post(this.$api.rolesystemremove, param);
        if (res.data.resultCode == 10000) {
          this.getTableData()
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索条件*/
      cleanKeyWord() {
        this.keyword = ''
        this.getTableData()
      },


      /* 新增、編輯*/
      edit(item) {
        this.$router.push({
          path: '/addsystemRole',
          query: {
            id: item.roleId
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
