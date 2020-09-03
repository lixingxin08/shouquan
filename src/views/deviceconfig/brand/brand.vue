<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>品牌名称/代码:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入名称/代码" />

      <a-button type="primary" class="title_btn" @click='getBrandData'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div style="width: 100%;height: 1px;background: #FFFFFF;margin: 10px auto;"></div>
    <div class="flexrow flexjc flexac addbtn" @click="add">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增
    </div>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="brandList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDevice(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirm(record)">
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
        keyword: '',
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        brandList: [], //字典数据
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
    created() {
      this.getBrandData()
    },
    methods: {
      handleTableChange(pagination) { //切换分页
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getBrandData()
      },

      async getBrandData() {
        let param = {
          keyword: this.keyword,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        let res = await this.$http.post(this.$api.devicebrandspage, param)
        if (res.data.resultCode == 10000) {
          this.brandList = res.data.data.list
        } else {
          this.brandList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      async confirm(item) { //删除品牌确定
        let param = {
          brandId: item.brandId
        }
        let res =await this.$http.post(this.$api.devicebrandsremove,param)
        if (res.data.resultCode == 10000) {
          this.getBrandData()
         this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      cleanKeyWord() {
        this.keyword = ''
        this.getBrandData()
      },
      add() { //新增品牌
        this.$router.push({
          path: '/addbrand'
        });
      },
      editDevice(item) { //编辑品牌
        this.$router.push({
          path: '/addbrand',
          query: {
            id: item.brandId
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
