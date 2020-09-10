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
      <div class="tree_box" v-show="listtype=='wechat'">
        <a-table
          :columns="tablecolumns2"
          :data-source="tabledata2"
          :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange,type:'radio' }"
          bordered
          :pagination="false"
          v-if="tabletype"
        ></a-table>
      </div>
      <div class="tree_box" v-show="listtype=='sms'">
        <a-table
          :columns="tablecolumns3"
          :data-source="tabledata3"
          :row-selection="{ selectedRowKeys: selectedRowKeys3, onChange: onSelectChange1,type:'radio'}"
          bordered
          :pagination="false"
        ></a-table>
      </div>
      <div class="tree_box" v-show="listtype=='email'">
        <a-table
          :columns="tablecolumns4"
          :data-source="tabledata4"
          :row-selection="{ selectedRowKeys: selectedRowKeys4, onChange: onSelectChange2,type:'radio' }"
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
            <div class="cancel_btn rb_b_btn"  @click="cancel()">取消</div>
            <div class="ok_btn" @click="setform()">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/seltree.vue";
export default {
   inject:['reload'],
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
            this.listparam.customerId = record.customerId;
            if (this.listtype == "wechat") {
              this.getwechatlist();
            }
            if (this.listtype == "sms") {
              this.getsmslist();
            }
            if (this.listtype == "email") {
              this.getemaillist();
            }
          },
        },
      }),
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
      tablecolumns3: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "smsConfigId",
          key: "smsConfigId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "短信帐号别名",
          dataIndex: "smsConfigName",
          key: "smsConfigName",
          ellipsis: true,
        },
      ],
      tabledata3: [],
      tablecolumns4: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "emailConfigId",
          key: "emailConfigId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "邮箱帐号别名",
          dataIndex: "emailConfigName",
          key: "emailConfigName",
          ellipsis: true,
        },
      ],
      tabledata4: [],
      listparam: {
        operatorId: "1",
        customerId: "",
      },
      selectedRowKeys: [],
      selectedRowKeys2: [],
      selectedRowKeys3: [],
      selectedRowKeys4: [],

      listtype: "wechat",
      tabletype: false,
      form: {
        customerId: "",
        wechatConfigId: [],
        smsConfigId: [],
        emailConfigId: [],
        remark: "",
         operatorId: "1",
      },
    };
  },
  created() {
    this.getlist();
    this.getwechatlist();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    async getlist() {
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
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getemailform() {
       this.form.emailConfigId= this.tabledata4[this.selectedRowKeys4[0]].emailConfigId
      let res = await this.$http.post(this.$api.customeremailform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getwechatlform() {

      this.form.wechatConfigId= this.tabledata2[this.selectedRowKeys2[0]].wechatConfigId
      let res = await this.$http.post(this.$api.customerwechatform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getsmsform() {
       this.form.smsConfigId= this.tabledata3[this.selectedRowKeys3[0]].smsConfigId
      let res = await this.$http.post(this.$api.customersmsform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    setform() {
      this.form.customerId =this.listparam.customerId 
      if (this.listtype == "wechat") {
        this.getwechatlform();
      }
      if (this.listtype == "email") {
        this.getemailform();
      }
      if (this.listtype == "sms") {
        this.getsmsform();
      }
    },
    async getemaillist() {
      let res = await this.$http.post(
        this.$api.customeremaildetail,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata4 = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getsmslist() {
      let res = await this.$http.post(
        this.$api.customersmsdetail,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata3 = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
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
        return this.$message.error(res.data.resultMsg);
      }
    },
    changetab(val) {
      this.listtype = val;
      if (val == "wechat") {
        this.getwechatlist();
      }
      if (val == "sms") {
        this.getsmslist();
      }
      if (val == "email") {
        this.getemaillist();
      }
    },
    onSelectChange(selectedRowKeys2) {
      console.log("selectedRowKeys changed: ", selectedRowKeys2);
      this.selectedRowKeys2 = selectedRowKeys2;
    },
    //sms
    onSelectChange1(selectedRowKeys3) {
      console.log("selectedRowKeys changed: ", selectedRowKeys3);
      this.selectedRowKeys3 = selectedRowKeys3;
    },
    //email
    onSelectChange2(selectedRowKeys4) {
      console.log("selectedRowKeys changed: ", selectedRowKeys4);
      this.selectedRowKeys4 = selectedRowKeys4;
    },
    cancel(){
      this.reload()
    }
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