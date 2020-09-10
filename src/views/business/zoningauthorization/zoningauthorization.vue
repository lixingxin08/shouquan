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
      <div class="r_t flex_f">
        <div>区划名称:</div>
        <div>
          <a-input v-model="issearchdata" placeholder="请输入区划名称" class="r_t_inp" />
        </div>
        <div class="btn_blue btn" @click="searchtree()">查询</div>
      </div>
      <div class="tree_box">
        <is-left
          :treedata="treedata"
          :replaceFields="replaceFields"
          :defaultExpandedKeys="defaultExpandedKeys"
          @checkedKeys="getcheckedKeys"
          v-if="showtree"
        ></is-left>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea placeholder="Basic usage" v-model="remark" :rows="5" />
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
import isLeft from "../../../components/tree/seltree.vue";
export default {
  components: {
    isLeft,
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
          key: "statusCode 1",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
      ],
      tabledata: [],
      issearchdata:"",
      treedata: "",
      filterdata:[],
      oldtreedata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      tabletype: false,
      treeprame: {
        customerId: "",
        operatorId: "",
      },
      runpageparam: {
        statusCode: "",
        keyword: "",
        accountId: "",
        operatorId: "1",
        pageIndex: 1,
        pageSize: 10,
      },
      istotal: {
        type: 1,
      },
      form: [],
      ischeck: [],
      remark: "",
      listparam: {
        operatorId: "1",
        customerId: "",
      },

      customerId: "",
      rowClick: (record) => ({
        // 事件
        on: {
          click: () => {
            // 点击改行时要做的事情
            // ......

            this.customerId = record.customerId;
            console.log(record, "record", this.customerId);
          },
        },
      }),
    };
  },
  created() {
    this.getlist();
    this.gettree();
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
        this.customerId=this.tabledata[0].customerId
        this.form.customerId=this.tabledata[0].customerId
        this.istotal.type++;
        this.tabletype = true;
      } else {
      return  this.$message.error(res.data.resultMsg);
      }
    },
    async getform() {
      let aa = {
        customerId: "",
        areaId: "",
        areaName: "",
        grade: "",
        parentId: "",
        remark: "",
        operatorId: "1",
      };
      if (this.ischeck.length == 0) {
        return this.$message.error("请选择授权区域");
      }
      if (this.customerId == "") {
        return this.$message.error("请选择授权客户");
      }
      for (let i = 0; i < this.ischeck.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (this.ischeck[i] == this.data[j].id) {
            this.form.push(aa);
            this.form[i].customerId = this.customerId;
            this.form[i].areaId = this.data[j].id;
            this.form[i].areaName = this.data[j].name;
            this.form[i].grade = this.data[j].levelType;
            this.form[i].parentId = this.data[j].pid;
            this.form[i].remark = this.remark;
          }
        }
      }
      let res = await this.$http.post(this.$api.customerareaform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.error("授权成功");
      } else {
      return  this.$message.error(res.data.resultMsg);
      }
    },

    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(
        this.$api.customerareatree,
        this.treeprame
      );
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
      return  this.$message.error(res.data.resultMsg);
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
      }
      this.treedata = this.toTree(this.data);
      this.oldtreedata = this.treedata;
    },

    searchtree() {
      this.treedata=this.oldtreedata  
      if (this.issearchdata=='') {
        return
      }
      let aa=  this.oldtreedata
        this.setfilltertree(aa)
    },
    
    //过滤树搜索数据
    setfilltertree(datas) {
      let _that = this;
      for (var i in datas) {
        let name = datas[i].name + "";
        if (name.search(_that.issearchdata) != -1) {
          _that.filterdata.push(datas[i]);
          console.log(_that.filterdata,22222);
        }
        if (datas[i].children) {
          _that.setfilltertree(datas[i].children);
        }
      }
      console.log(this.filtersdata,111111);
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
      this.ischeck = val;
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
  padding: 20px;
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