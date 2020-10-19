<template>
  <div class="content2">

    <a-table :scroll="{  y: 610 }" :columns="tableTitle" :data-source="tableList" bordered size="small" :pagination="false">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <div slot="statusCode" slot-scope="text, record,index">
        {{text==1?'启用':'禁用'}}
      </div>
      <img href="#"  slot="customerLogo" slot-scope="text, record,index" style='width: 30px;height: 30px;' :src="text">去维护</img>
      <a href="#" slot="operation" slot-scope="text, record,index" style='font-size: 12px;' @click="safeguard(record)">去维护</a>
    </a-table>
  </div>
</template>
<script>
  import tableTitleData from "./table.json";
  export default {
    data() {
      return {
        tableTitle: tableTitleData.data.tableTitle,
        tableList: [],
      }
    },
    created() {
      this.getClientsList()
    },
    methods: {
     async getClientsList() {
      let res=await this.$http.post(this.$api.mycustomerlist,{})
      if(res.data.resultCode==10000){
        this.tableList=res.data.data
      }
      },
      safeguard(item) {
		  let aa = window.location.href.split("/#");
		  let bb = aa[0].split("/html/auth");
		  window.location.href = bb[0] + "/#/home?customerId="+item.customerId;
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
