<template>
  <div class="flex_f father">
    <div class="isleftcu">
      <div class="left_title">系统帐号</div>
      <is-left
        :treedata="treedata"
        :replaceFields="replaceFields"
        :defaultExpandedKeys="defaultExpandedKeys"
        :defaultSelectedKeys="defaultSelectedKeys"
        @selectdata="getselectdata"
        @searchdata="getsearchdata"
        v-if="showtree"
      ></is-left>
    </div>
    <div class="isright">
      <div class="left_title">客户列表</div>
      <div class="tree_box tree_box22">
        <a-table
          v-if="tabletype"
          :columns="tablecolumns"
          :data-source="tabledata"
          bordered
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :pagination="pagination"
          rowKey="index"
        >
          <template
            slot="index"
            slot-scope="text, record,index"
          >{{(index+1)+((pagination.current-1)*10)}}</template>

          <div slot="statusCode" class="flex_a" slot-scope="statusCode">
            <div v-if="statusCode==1">启用</div>
            <div v-if="statusCode==0">锁定</div>
            <div v-if="statusCode==2">备用</div>
          </div>
        </a-table>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea placeholder="Basic usage" v-model="form.remark" :rows="5" />
        </div>
        <div class="flex_a rb_b">
          <div class="flex_f">
            <div class="cancel_btn rb_b_btn">取消</div>
            <div class="ok_btn" @click="getform()">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/tree.vue";
export default {
  components: {
    isLeft,
  },
  data() {
    return {
      pagination: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
      },
      tablecolumns: [
        {
          width: 58,
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
          width: 141,
          align: "center",
          title: "客户全称",
          dataIndex: "customerName",
          key: "customerName",
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
         selectedRowKeys: [],
      treedata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      tabletype: false,
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
      data: "",
      showtree: false,
      treeprame: {
        accountId: "",
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
      listparam: {
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
        accountId: "",
      },
      istotal: {
        type: 1,
      },
      form: {
        customerIdList: [],
        accountId: "",
        remark: "",
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
    };
  },
  created() {
    this.gettree();
  },
  methods: {
        onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.form.customerIdList=this.selectedRowKeys
    },
    async getlist() {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customeraccountmylist,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data;
        this.istotal.type++;
        this.selectedRowKeys=[]
        for (let i = 0; i <  this.tabledata.length; i++) {
        if (this.tabledata[i].selected==1) {
          this.selectedRowKeys.push(i)
        }
        }
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },

    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.persontree, this.treeprame);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
        this.setdata();
        this.showtree = true;
        this.form.accountId = this.treedata[0].id;
        this.listparam.accountId = this.form.accountId;
        this.defaultSelectedKeys = [];
        this.defaultSelectedKeys.push(this.form.accountId);
        this.getlist();
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    async getform() {
          this.form.customerIdList=[]
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.form.customerIdList.push(this.tabledata[i].customerId)      
      }
      if (this.form.customerIdList.length == 0) {
        return this.$message.error("请选择授权客户");
      }
      let res = await this.$http.post(this.$api.customeraccountform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },


    toTree(data) {
      let result = [];
      if (!Array.isArray(data)) {
        return result;
      }
      data.forEach((item) => {
        delete item.children;
      });
      let map = {};
      data.forEach((item) => {
        map[item.id] = item;
      });
      data.forEach((item) => {
        let parent = map[item.pid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
    setdata() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].open == true) {
          this.defaultExpandedKeys.push(this.data[i].id);
        }
      }

      this.treedata = this.toTree(this.data);
    },
    //获取树搜索数据
    getsearchdata(val) {
      this.issearchdata = val;
      this.getareatree();
      if (val == "") {
        return;
      }

      this.filterdata = [];
      this.setfilltertree(this.treedata, this.issearchdata);
    },
    //过滤树搜索数据
    setfilltertree(datas, filtersdata) {
      let _that = this;
      for (var i in datas) {
        let name = datas[i].name + "";
        if (name.search(_that.issearchdata) != -1) {
          _that.filterdata.push(datas[i]);
        }
        if (datas[i].children) {
          _that.setfilltertree(datas[i].children);
        }
      }
      _that.treedata = _that.toTree(this.filterdata);
    },
    getselectdata(val) {
      console.log(2222);
      this.form.accountId = val.id;
      this.listparam.accountId = this.form.accountId;
      this.getlist();
    },
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isleftcu {
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
  width: 72px;
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
.tree_box22 {
  overflow: scroll;
}
.tree_box22::-webkit-scrollbar {
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
  margin-top: 30px;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}
.rb_b_btn {
  margin-right: 8px;
}
</style>