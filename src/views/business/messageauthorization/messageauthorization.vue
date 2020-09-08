<template>
  <div class="flex_f father">
    <div class="isleft">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="false"
        :customRow="rowClick"
      >
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode==1">启用</div>
          <div v-if="statusCode==2">备用</div>
          <div v-if="statusCode==0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="flex_f isright_t">
        <div :class="listtype=='wechat'?'tab_blue':'tab_gray'" @click="changetab('wechat')">微信帐号</div>
        <div :class="listtype=='sms'?'tab_blue':'tab_gray'" @click="changetab('sms')">短信帐号</div>
        <div :class="listtype=='email'?'tab_blue':'tab_gray'" @click="changetab('email')">邮箱帐号</div>
      </div>
      <div class="tree_box">
        <a-table
          :columns="tablecolumns"
          :data-source="tabledata"
          :rowSelection="{ onChange: onSelectChange, type: 'radio' }"
          bordered
          :pagination="false"
        ></a-table>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea placeholder="Basic usage" :rows="5" />
        </div>
        <div class="flex_a rb_b">
          <div class="flex_f">
            <div class="cancel_btn rb_b_btn">取消</div>
            <div class="ok_btn">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/seltree.vue";
export default {
  components: {
    isLeft,
  },
  data() {
    return {
      rowClick: (record) => ({
        // 事件
        on: {
          click: () => {
            // 点击改行时要做的事情
            // ......
            console.log(record, "record");
            this.treeprame.templateId = record.templateId;
            this.gettree();
          },
        },
      }),
      form: {
        customerId: "",
        wechatConfigIdList: [],
        smsConfigIdList: [],
        emailConfigId: [],
        menuIdList: "",
        remark: "",
      },
      tablecolumns: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "客户简称",
          dataIndex: "shortName",
          key: "shortName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "客户状态",
          dataIndex: "statusCode",
          key: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
      ],
      tabledata: [],
      tablecolumns2: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "wechatConfigId",
          key: "wechatConfigId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "微信帐号别名",
          dataIndex: "wechatConfigName",
          key: "wechatConfigName",
          ellipsis: true,
        },
      ],
      tabledata2: [],
      listparam: {
        operatorId: "1",
        customerId: "",
      },
      listtype: "wechat",
    };
  },
  created() {
    this.getlist();
    this.getwechatlist();
  },
  methods: {
    async getlist() {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customeraccountmylist,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].statusCode == 1) {
            this.tabledata.push(res.data.data[i]);
          }
        }
        this.listparam.customerId = this.tabledata[0].customerId;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    async getemaillist(val) {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customeremaildetail,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    async getsmslist(val) {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customeresmsdetail,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    async getwechatlist(val) {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customerwechatdetail,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    changetab(val) {
      this.listtype = val;
      if (val == "wechat") {
        this.tablecolumns2[1].title = "微信帐号别名";
        this.tablecolumns2[0].dataIndex = "wechatConfigId";
        this.tablecolumns2[0].key = "wechatConfigId";
        this.tablecolumns2[1].dataIndex = "wechatConfigName";
        this.tablecolumns2[1].key = "wechatConfigName";
        this.getwechatlist();
      }
      if (val == "sms") {
        this.tablecolumns2[1].title = "短信帐号别名";
        this.tablecolumns2[0].dataIndex = "smsConfigId";
        this.tablecolumns2[0].key = "smsConfigId";
        this.tablecolumns2[1].dataIndex = "wechatConfigName";
        this.tablecolumns2[1].key = "smsConfigName";
        this.getsmslist();
      }
      if (val == "email") {
        this.tablecolumns2[1].title = "邮箱帐号别名";
        this.tablecolumns2[0].dataIndex = "emailConfigId";
        this.tablecolumns2[0].key = "emailConfigId";
        this.tablecolumns2[1].dataIndex = "emailConfigName";
        this.tablecolumns2[1].key = "emailConfigName";
        this.getemaillist();
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(
        selectedRowKeys,
        selectedRows,
        "selectedRowKeys, selectedRows"
      );
    },
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isleft {
  width: 400px;
  padding: 0 20px;
  height: 100%;
  background: #ffffff;
  border-right: 20px solid #f0f2f5;
  box-sizing: border-box;
}
.isright {
  width: 1272px;
  height: 100%;
  padding-left: 20px;
  text-align: left;
  background: #ffffff;
}
.left_title {
  width: 120px;
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 20px;
}
.r_t_inp {
  margin-left: 10px;
}
.btn {
  margin-left: 20px;
}
.tree_box {
  width: 1232px;
  height: 353px;
  margin-top: 20px;
  margin-bottom: 170px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
}
.r_b_title {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.rb_text {
  margin-top: 30px;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}
.rb_b_btn {
  margin-right: 8px;
}
.isright_t {
  width: 300px;
  padding-top: 20px;
}
</style>