<template>
  <div class="content2">

          <div class="r_top flex_f">
            <div class="r_t_text" @click="showdialogsms()">短信帐号别名:</div>
            <a-input placeholder="请输入短信帐号别名"  class="r_t_inp" v-model="runpageparam.keyword" @keydown.enter="tosearch()" />

            <div class="r_t_text" @click="showdialogsms()">短信类型:</div>
            <a-select show-search placeholder="全部" option-filter-prop="children" style="width: 200px;margin-right:20px"
              :filter-option="filterOption" v-model="runpageparam.typeCode" 
              @change="handleChange">
              <a-select-option value>全部</a-select-option>
              <a-select-option v-for="(item,index) in sel_data" :key="index" :value="item.comboBoxId">{{item.comboBoxName}}</a-select-option>
            </a-select>
            <div class="btn_blue btn" @click="tosearch()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <div class="view-title-line"></div>
 <a-button class='addbtn' type="primary" @click="toadd({})">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增
    </a-button>

        <a-table  :columns="tablecolumns" :data-source="tabledata"
          bordered size='small' :pagination="pagination" @change="handleTableChange">
          <div slot="smsConfigId" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</div>
          <div slot="edit" class="flex_a" slot-scope="childTotal,areaName">
            <div class="col_blue ispointer" @click="toadd(areaName)">编辑</div>
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="getremove(areaName)">
              <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
            </a-popconfirm>
          </div>
        </a-table>

  </div>
</template>
<script>
  export default {

    data() {
      return {
        sel_data: [
        ],
        tablecolumns: [{
            width: 60,
            align: "center",
            title: "序号",
            dataIndex: "smsConfigId",
            key: "smsConfigId",
            ellipsis: true,
            scopedSlots: {
              customRender: "smsConfigId",
            },
          },
          {
            width: 158,
            align: "center",
            title: "短信账号别名",
            dataIndex: "smsConfigName",
            key: "smsConfigName",
            ellipsis: true,
          },
          {
            width: 138,
            align: "center",
            title: "网关类型",
            dataIndex: "typeCode",
            key: "typeCode",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "帐号应用标识",
            key: "smsAppId",
            dataIndex: "smsAppId",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "账号应用密钥",
            key: "smsKey",
            dataIndex: "smsKey",
          },
          {
            width: 158,
            align: "center",
            title: "短信签名",
            key: "signName",
            dataIndex: "signName",
          },
          {
            width: 158,
            align: "center",
            title: "短信价格",
            key: "price",
            dataIndex: "price",
          },
          {
            width: 208,
            align: "center",
            title: "操作",
            ellipsis: true,
            scopedSlots: {
              customRender: "edit",
            },
          },
        ],
        tabledata: [],
        pagination: {
          total: 0,
          pageSize: 10, //每页中显示10条数据
          showSizeChanger: true,
          current: 1,
          size: "default",
          page: 1,
          pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
          showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },

        runpageparam: {
          typeCode: "",
          keyword: "",
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
          pageIndex: 1,
          pageSize: 10,
        },
      };
    },
    created() {
      this.getpage();
      this.getdictionarycombobox();
    },
    methods: {
      //短信类型
      async getdictionarycombobox() {
        let pram = {
          classCode: "message_type_sms",
        };
        let res = await this.$http.post(this.$api.dictionarycombobox, pram);
        console.log(res, 12221);
        if (res.data.resultCode == "10000") {
          this.sel_data = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

      //列表接口
      async getpage() {
        this.tabledata=[]
        this.runpageparam.pageIndex = this.pagination.current;
        this.runpageparam.pageSize = this.pagination.pageSize;
        let res = await this.$http.post(this.$api.smspage, this.runpageparam);
        if (res.data.resultCode == "10000") {
          this.tabledata = res.data.data.list;
          this.runpageparam.keyword = "";
          this.runpageparam.parameterCode = "";
          if (this.pagination.current == 1) {
            this.pagination.total = res.data.data.length;
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      //删除接口
      async getremove(item) {
        let removeparam = {
          smsConfigId: item.smsConfigId
        }
        let res = await this.$http.post(
          this.$api.smsremove,
          removeparam
        );
        if (res.data.resultCode == "10000") {
          this.$message.success(res.data.resultMsg);
          this.getpage();
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      toadd(id) {

        this.$router.push({
          path: "/addsms",
          query: {
            id: id.smsConfigId,
          },
        });

      },
      //查询
      tosearch() {
        this.pagination.current = 1;
        this.pagination.pageSize = 10;
        this.istotal.type = 1;
        this.getpage();
      },
      //清除
      clear() {
        this.runpageparam.keyword = "";
        this.runpageparam.typeCode = "";
        // this.getareapage();
      },


      //分页
      handleTableChange(pagination) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getpage();
      },

      handleChange(value) {
        this.runpageparam.typeCode = value;
        console.log(this.runpageparam);
      },

      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
        );
      },
    },
  };
</script>
<style scoped>
  .tree {
    text-align: left;
  }

  .r_t_text {
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    margin-right: 10px;
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
  .r_t_inp {
    width: 200px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .r_t_inp:focus {
    border: 1px solid #1890ff;
  }

  .btn {
    margin-right: 20px;
    margin-left: 20px;
  }

  .btn2 {
    margin-bottom: 20px;
  }

  .table_list {
    height: 42px;
  }

  .dialogsms {
    width: 920px;
    height: 492px;
    position: relative;
    left: 50%;
    top: -870px;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    margin-top: 330px;
    border-radius: 8px;
    background-color: #fff;
    z-index: 2;
  }

  .dialogsms_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogsms_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
