<template>
  <div class="content2">

    <div class="r_top flex_f">
      <div class="r_t_text" @click="showdialog()">邮箱帐号别名:</div>
      <a-input placeholder="请输入邮箱帐号别名" class="r_t_inp" v-model="runpageparam.keyword" @keydown.enter="tosearch()" />

      <div class="r_t_text" @click="showdialog()">邮箱网关类型:</div>
      <a-select show-search placeholder="全部" option-filter-prop="children" style="width: 200px;margin-right:20px"
        :filter-option="filterOption" v-model="runpageparam.statusCode" @change="handleChange">
        <a-select-option value>全部</a-select-option>
        <a-select-option v-for="(item,index) in wetchatTypeList" :key="index" :value="item.comboBoxId">{{item.comboBoxName}}</a-select-option>
      </a-select>
      <a-button type='primary' @click="tosearch()">查询</a-button>
      <a-button style='margin-left: 20px;' @click="clear()">清除</a-button>
    </div>
    <div class="view-title-line"></div>

      <a-button type="primary" class='table-add-btn' @click="toadd({})">
        <a-icon two-tone-color="#ffffff"  type="plus" /> 新增
      </a-button>
    

    <a-table :columns="tablecolumns" :data-source="tabledata" bordered size='small' :pagination="pagination" @change="handleTableChange">
      <div slot="emailConfigId" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*pagination.pageSize)}}</div>
      <div slot="edit" class="flexrow flexjc" slot-scope="childTotal,areaName">
        <div class="col_blue ispointer" @click="toadd(areaName)">编辑</div>
        <div class="item-line"></div>
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

        tablecolumns: [{
            width: 60,
            align: "center",
            title: "序号",
            dataIndex: "emailConfigId",
            key: "emailConfigId",
            ellipsis: true,
            scopedSlots: {
              customRender: "emailConfigId",
            },
          },
          {
            width: 158,
            align: "center",
            title: "邮箱帐号别名",
            dataIndex: "emailConfigName",
            key: "emailConfigName",
            ellipsis: true,
          },
          {
            width: 138,
            align: "center",
            title: "邮箱网关类型",
            dataIndex: "typeCode",
            key: "typeCode",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "发件邮箱",
            key: "sender",
            dataIndex: "sender",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "邮件服务地址",
            key: "emailHost",
            dataIndex: "emailHost",
          },
          {
            width: 158,
            align: "center",
            title: "是否身份验证",
            key: "authType",
            dataIndex: "authType",
          },

          {
            width: 158,
            align: "center",
            title: "采用安全链接",
            key: "sslType",
            dataIndex: "sslType",
          },

          {
            width: 158,
            align: "center",
            title: "打印调试模式",
            key: "debugType",
            dataIndex: "debugType",
          },
          {
            width: 158,
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
          page: 1,
          size: "default",
          pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
          showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },

        wetchatTypeList: [ //通信方式列表
        ],
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
      //微信类型
      async getdictionarycombobox() {
        let pram = {
          classCode: "message_type_email",
        };
        let res = await this.$http.post(this.$api.dictionarycombobox, pram);
        if (res.data.resultCode == "10000") {
          this.wetchatTypeList = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

      //列表接口
      async getpage() {
        this.tabledata = []
        if(this.pagination.current==1)
        this.pagination.total = 0
        this.runpageparam.pageIndex = this.pagination.current;
        this.runpageparam.pageSize = this.pagination.pageSize;
        let res = await this.$http.post(this.$api.emailAccountpage, this.runpageparam);
        if (res.data.resultCode == "10000") {
          if (res.data.data) {
            this.tabledata = res.data.data.list;
            this.runpageparam.keyword = "";
            this.runpageparam.typeCode = "";
            if (this.pagination.current == 1) {
              this.pagination.total = res.data.data.length;
            }
          }
        } else {
          this.tabledata=[]
          this.$message.error(res.data.resultMsg);
        }
      },
      //删除接口
      async getremove(item) {
        let removeparam = {
          emailConfigId: item.emailConfigId,
        }
        let res = await this.$http.post(
          this.$api.deleteByemailAccountId,
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
        console.log(id, 9899);
        this.$router.push({
          path: "/addemail",
          query: {
            id: id.emailConfigId,
          },
        });

      },
      //查询
      tosearch() {
        this.pagination.current = 1;
        this.pagination.pageSize = 10;
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
        console.log(`selected ${value}`);
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

  .right {
    width: 1372px;
    padding-left: 20px;
    padding-top: 20px;
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

  .r_t_text {
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    margin-right: 10px;
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

  .dialog {
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

  .dialog_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialog_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
