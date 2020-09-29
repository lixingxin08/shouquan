<template>
  <div class="flex_f father">
    <div class="isleftmsg no_pagination">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="pagination"
        :customRow="customRow"
        rowKey="index"
      >
        <template
          slot="index"
          slot-scope="text, record,index"
        >{{(index+1)+((pagination.current-1)*10)}}</template>
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
      <div class="messtree_box" v-show="listtype=='wechat'">
        <a-table
         :scroll="{  y: 352 }"
          :columns="tablecolumns2"
          :data-source="tabledata2"
          :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange,type:'radio' }"
          bordered
          :pagination="pagination2"
          v-if="tabletype"
          rowKey="index2"
        >
          <template
            slot="index2"
            slot-scope="text, record,index"
          >{{(index+1)+((pagination2.current-1)*10)}}</template>
        </a-table>
      </div>
      <div class="messtree_box" v-show="listtype=='sms'">
        <a-table
         :scroll="{  y: 310 }"
          :columns="tablecolumns3"
          :data-source="tabledata3"
          :row-selection="{ selectedRowKeys: selectedRowKeys3, onChange: onSelectChange1,type:'radio'}"
          bordered
          :pagination="pagination3"
        >
          <template
            slot="index3"
            slot-scope="text, record,index"
          >{{(index+1)+((pagination3.current-1)*10)}}</template>
        </a-table>
      </div>
      <div class="messtree_box" v-show="listtype=='email'">
        <a-table
         :scroll="{  y: 310 }"
          :columns="tablecolumns4"
          :data-source="tabledata4"
          :row-selection="{ selectedRowKeys: selectedRowKeys4, onChange: onSelectChange2,type:'radio' }"
          bordered
          :pagination="pagination4"
        >
          <template
            slot="index4"
            slot-scope="text, record,index"
          >{{(index+1)+((pagination4.current-1)*10)}}</template>
        </a-table>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea :maxlength="500" v-model="form.remark" :rows="5" />
          <div class="remarknum">{{remarklen}}/500</div>
        </div>
        <div class="flex_a rb_b">
          <div class="flex_f">
            <div class="cancel_btn rb_b_btn" @click="cancel()">取消</div>
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
  inject: ["reload"],
  components: {
    isLeft,
  },
  data() {
    return {
      tablecolumns: [
        {
          width: 68,
          align: "center",
          title: "序号",
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index",
          },
        },
        {
          width: 131,
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
      pagination: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      tablecolumns2: [
        {
          width: 68,
          align: "center",
          title: "序号",
          dataIndex: "index2",
          key: "index2",
          ellipsis: true,
          scopedSlots: {
            customRender: "index2",
          },
        },
        {
          width: 131,
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
          width: 68,
          align: "center",
          title: "序号",
          dataIndex: "smsConfigId",
          key: "smsConfigId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index3",
          },
        },
        {
          width: 131,
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
          width: 68,
          align: "center",
          title: "序号",
          dataIndex: "emailConfigId",
          key: "emailConfigId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index4",
          },
        },
        {
          width: 131,
          align: "center",
          title: "邮箱帐号别名",
          dataIndex: "emailConfigName",
          key: "emailConfigName",
          ellipsis: true,
        },
      ],
      tabledata4: [],
      listparam: {
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
      },
      pagination2: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      pagination3: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      pagination4: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
    };
  },
  created() {
    this.getlist();
  },
  computed: {
    remarklen() {
      return this.form.remark.length;
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    customRow(record, index) {
      return {
        style: {
          // 行背景色
          "background-color":
            record.customerId == this.listparam.customerId ? "#e6f7ff" : "",
        },
        on: {
          // 鼠标单击行
          click: (event) => {
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
            console.log(record, "record", index);
          },
        },
      };
    },
    async getlist() {
      let res = await this.$http.post(
        this.$api.customerinformationlist,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].statusCode == 1) {
            this.tabledata.push(res.data.data[i]);
          }
        }
        this.listparam.customerId = this.tabledata[0].customerId;
            this.getwechatlist();
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getemailform() {
      this.form.emailConfigId = this.tabledata4[
        this.selectedRowKeys4[0]
      ].emailConfigId;
      let res = await this.$http.post(this.$api.customeremailform, this.form);
      if (res.data.resultCode == "10000") {
           this.getemaillist();
     return   this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getwechatlform() {
      this.form.wechatConfigId = this.tabledata2[
        this.selectedRowKeys2[0]
      ].wechatConfigId;
      let res = await this.$http.post(this.$api.customerwechatform, this.form);
      if (res.data.resultCode == "10000") {
         this.getwechatlist();
     return   this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getsmsform() {
      this.form.smsConfigId = this.tabledata3[
        this.selectedRowKeys3[0]
      ].smsConfigId;
      let res = await this.$http.post(this.$api.customersmsform, this.form);
      if (res.data.resultCode == "10000") {
          this.getsmslist();
      return  this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    setform() {
      this.form.customerId = this.listparam.customerId;
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
         this.selectedRowKeys4=[]
            for (let i = 0; i < this.tabledata4.length; i++) {
          if (this.tabledata4[i].authTotal!==0) {
            this.selectedRowKeys4.push(i)
              this.form.remark=this.tabledata2[i].remark
          }
        }
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
         this.selectedRowKeys3=[]
            for (let i = 0; i < this.tabledata3.length; i++) {
          if (this.tabledata3[i].authTotal!==0) {
            this.selectedRowKeys3.push(i)
              this.form.remark=this.tabledata2[i].remark
          }
        }
        console.log(this.selectedRowKeys3,8999);
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
         this.selectedRowKeys2=[]
        for (let i = 0; i < this.tabledata2.length; i++) {
          if (this.tabledata2[i].authTotal!==0) {
          this.selectedRowKeys2.push(i)
          this.form.remark=this.tabledata2[i].remark
          }
        }
        this.tabletype = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    changetab(val) {
      this.listtype = val;
      this.form.remark=""
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
      this.form.remark=this.tabledata2[selectedRowKeys2[0]].remark||""
    },
    //sms
    onSelectChange1(selectedRowKeys3) {
      console.log("selectedRowKeys changed: ", selectedRowKeys3);
      this.selectedRowKeys3 = selectedRowKeys3;
         this.form.remark=this.tabledata3[selectedRowKeys3[0]].remark||""
    },
    //email
    onSelectChange2(selectedRowKeys4) {
      console.log("selectedRowKeys changed: ", selectedRowKeys4);
      this.selectedRowKeys4 = selectedRowKeys4;
       this.form.remark=this.tabledata4[selectedRowKeys4[0]].remark||""
    },
    cancel() {
      this.reload();
    },
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isleftmsg {
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
.messtree_box {
  width: 1232px;
  height: 504px;
  margin-top: 20px;
  margin-bottom: 60px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  overflow: scroll;
}
.messtree_box::-webkit-scrollbar{
  display: none;
}
.r_b_title {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.rb_text {
  margin-top: 20px;
  position: relative;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}
.isright_t {
  width: 300px;
  padding-top: 20px;
}
</style>