<template>
  <div class="flex_f father">
    <div class="isleftalar">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        
        :pagination="pagination"
        :customRow="customRow"
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
      <div class="left_title">警报列表</div>
      <div class="tree_box_aler">
        <is-left
          :treedata="treedata"
          :replaceFields="replaceFields"
          :defaultExpandedKeys="defaultExpandedKeys"
          @checkedKeys="getcheckedKeys"
          :checkedKeys="checkedKeys"
          v-if="showtree"
        ></is-left>
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
            <div class="ok_btn" @click="getform()">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/check_seltree.vue";
export default {
  inject: ["reload"],
  components: {
    isLeft,
  },
  computed: {
    remarklen() {
      return this.form.remark.length;
    },
  },
  data() {
    return {
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
        hideOnSinglePage:true
      },
      treedata: "",
      checkedKeys: [],
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      treeprame: {
        customerId: "",
      },
      listparam: {
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
        customerId: "",
      },
      form: {
        customerId: "",
        alarmIdList: "",
        remark: "",
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    customRow(record, index) {
        return {
          style: {
            // 行背景色
            'background-color': record.customerId==this.treeprame.customerId ? "#e6f7ff" : ''
          },
          on: {
            // 鼠标单击行
            click: event => {
                   this.treeprame.customerId = record.customerId;
                     this.gettree();
            console.log(record, "record", index);
            },
          },
        }
      },
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
        this.tabletype = true;
        this.treeprame.customerId = this.tabledata[0].customerId;
        this.gettree();
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getform() {
      console.log(this.checkedKeys, 55555555);
      this.form.customerId = this.treeprame.customerId;
      this.form.alarmIdList = this.checkedKeys;
      if (this.form.alarmIdList.length == 0) {
        return this.$message.error("请选择授权区域");
      }
      if (this.form.customerId == "") {
        return this.$message.error("请选择授权客户");
      }
      let res = await this.$http.post(this.$api.customeralarmform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.error("授权成功");
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },

    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(
        this.$api.customeralarmtree,
        this.treeprame
      );
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      this.showtree = true;
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
        if (this.data[i].checked == true) {
          this.checkedKeys.push(this.data[i].id);
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
      this.isselectdata = val;
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
      this.istotal.type = 1;
    },
    getcheckedKeys(val) {
      console.log(val, 44444);
      this.form.alarmIdList = val;
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
.isleftalar {
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
.tree_box_aler {
  width: 1232px;
  height: 384px;
  margin-top: 20px;
  margin-bottom: 182px;
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
  margin-top: 20px;
  position: relative;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}
.rb_b_btn {
  margin-right: 8px;
}
</style>