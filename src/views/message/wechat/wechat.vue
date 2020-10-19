<template>
  <div class="content2">


    <div class="r_top flex_f">
      <div class="r_t_text">微信帐号别名:</div>
      <a-input placeholder="请输入微信帐号别名" class="r_t_inp" v-model="runpageparam.keyword" @keydown.enter="tosearch()" />

      <div class="r_t_text" @click="showdialogwechat()">微信帐号类型:</div>
      <a-select show-search placeholder="全部" style="width: 200px;margin-right:20px" :filter-option="filterOption"
        v-model="runpageparam.typeCode" @change="handleChange">
        <a-select-option value>全部</a-select-option>
        <a-select-option v-for="(item,index) in wetchatTypeList" :key="index" :value="item.comboBoxId">{{item.comboBoxName}}</a-select-option>
      </a-select>
      <a-button type='primary' @click="tosearch()">查询</a-button>
      <a-button style='margin-left: 20px;' @click="clear()">清除</a-button>
    </div>
    <div class="view-title-line"></div>

    <a-button class='table-add-btn' type="primary" @click="toadd({})">
      <a-icon two-tone-color="#ffffff" type="plus" /> 新增
    </a-button>

    <a-table :columns="tablecolumns" :data-source="tabledata" bordered :pagination="pagination" size='small' @change="handleTableChange">
      <div slot="wechatConfigId" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*pagination.pageSize)}}</div>
      <div slot="edit" class="flexrow flexjc" slot-scope="childTotal,areaName">
        <div class="col_blue ispointer" @click="toadd(areaName)">编辑</div>
        <div class="item-line"></div>
        <a href="#" v-if='areaName.authTotal<=0' style='color: #FF0000;font-size: 12px;' @click="deleteItem(areaName)">删除</a>
        <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
      </div>
    </a-table>

    <a-popconfirm-delete ref='delete' @confirm="getremove">
    </a-popconfirm-delete>
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
            dataIndex: "wechatConfigId",
            key: "wechatConfigId",
            ellipsis: true,
            scopedSlots: {
              customRender: "wechatConfigId",
            },
          },
          {
            width: 158,
            align: "center",
            title: "微信账号别名",
            dataIndex: "wechatConfigName",
            key: "wechatConfigName",
            ellipsis: true,
          },
          {
            width: 138,
            align: "center",
            title: "微信应用标识",
            dataIndex: "wechatAppId",
            key: "wechatAppId",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "令牌过期时间",
            key: "expirationTime",
            dataIndex: "expirationTime",
            ellipsis: true,
          },
          {
            width: 158,
            align: "center",
            title: "微信账号类型",
            key: "typeCode",
            dataIndex: "typeCode",
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
        pagination: this.$config.pagination,

        wetchatTypeList: [{ //通信方式列表
          comboBoxId: 'account_wechat_type',
          comboBoxName: '公众号'
        }, {
          comboBoxId: 'wechat_account_small',
          comboBoxName: '服务号'
        }],
        runpageparam: {
          typeCode: "",
          keyword: "",
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
      deleteItem(item) {
        this.$refs.delete.show(item)
      },
      //微信类型
      async getdictionarycombobox() {
        let pram = {
          classCode: "message_type_wechat",
        };
        let res = await this.$http.post(this.$api.dictionarycombobox, pram);
        console.log(res, 12221);
        if (res.data.resultCode == "10000") {
          this.wetchatTypeList = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

      //列表接口
      async getpage() {
        if (this.pagination.current == 1)
          this.pagination.total = 0
        this.tabledata = []
        this.runpageparam.pageIndex = this.pagination.current;
        this.runpageparam.pageSize = this.pagination.pageSize;
        let res = await this.$http.post(this.$api.wechatpage, this.runpageparam);
        if (res.data.resultCode == "10000") {
          if (res.data.data) {
            this.tabledata = res.data.data.list;
            this.runpageparam.keyword = "";
            this.runpageparam.parameterCode = "";
            if (this.pagination.current == 1)
              this.pagination.total = res.data.data.length;
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      //删除接口
      async getremove(item) {
        let removeparam = {
          wechatConfigId: item.wechatConfigId
        }
        let res = await this.$http.post(
          this.$api.deleteByWechatAccountId,
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
          path: "/addwechat",
          query: {
            id: id.wechatConfigId,
          },
        });

      },
      //查询
      tosearch() {
        this.pagination.current = 1;
        this.pagination.pageSize = 20;
        this.getpage();
      },
      //清除
      clear() {
        this.runpageparam.keyword = "";
        this.runpageparam.statusCode = "";
        this.runpageparam.typeCode = ''
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



  .r_t_inp {
    width: 200px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    box-sizing: border-box;
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

  .dialogwechat {
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

  .dialogwechat_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogwechat_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
