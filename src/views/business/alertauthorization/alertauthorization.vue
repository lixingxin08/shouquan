<template>
  <div class="flex_f father">
    <div class="isleftalar no_pagination">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="pagination"
        :customRow="customRow"
      >
        <template slot="index" slot-scope="text, record, index">{{
          index + 1 + (pagination.current - 1) * 10
        }}</template>
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode == 1">启用</div>
          <div v-if="statusCode == 2">备用</div>
          <div v-if="statusCode == 0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="left_title">警报列表</div>
      <a-button type="primary" class="table-add-btn btn2" @click="addtogle()"
        >添加警报</a-button
      >
      <div class="tree_box tree_box1 tree_box2" v-if="!addmodel">
        <a-table
          :columns="tablecolumns2"
          :data-source="tabledata2"
          bordered
          :pagination="pagination2"
        >
          <template slot="index2" slot-scope="text, record, index">{{
            index + 1 + (pagination2.current - 1) * 10
          }}</template>
          <template slot="edit" slot-scope="record">
            <div class="flexrow flexac flexjc">
              <div class="col_red ispointer" @click="getremove(record)">
                <span>删除</span>
              </div>
            </div>
          </template>
        </a-table>
      </div>
      <div v-if="addmodel">
        <div class="add_model_t flex_b">
          <span> 新增警报</span>
          <a-icon type="close" style="cursor: pointer" @click="isclose()" />
        </div>
        <div class="tree_box_aler">
          <is-left
            :treedata="treedata"
            :replaceFields="replaceFields"
            :defaultExpandedKeys="defaultExpandedKeys"
            @checkedKeyslist="getcheckedKeys"
            :checkedKeys="checkedKeys"
            v-if="showtree"
          ></is-left>
        </div>
        <div class="r_b">
          <div class="r_b_title">授权描述:</div>
          <div class="rb_text">
            <a-textarea :maxlength="500" v-model="form.remark" :rows="5" />
            <div class="remarknum">{{ remarklen }}/500</div>
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
      addmodel: false,
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
      pagination2: {
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
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index2",
          },
        },
        {
          width: 131,
          align: "center",
          title: "警报名称",
          dataIndex: "alarmName",
          key: "alarmName",
          ellipsis: true,
        },
        {
          width: 131,
          align: "center",
          title: "型号名称",
          dataIndex: "customerName",
          key: "customerName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "是否生成警报",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
        {
          width: 141,
          align: "center",
          title: "操作",
          ellipsis: true,
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata2: [],
      pagination: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
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
        customerId: JSON.parse(localStorage.getItem("authorization")).customerId,
      },
      form: {
        customerId: "",
        alarmIdList: "",
        remark: "",
      },
      checkelists:[]
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    addtogle() {
      this.addmodel = true;
      this.gettree();
    },
    isclose() {
      this.addmodel = false;
      this.getalerlist();
    },
    customRow(record, index) {
      return {
        style: {
          // 行背景色
          "background-color":
            record.customerId == this.treeprame.customerId ? "#e6f7ff" : "",
        },
        on: {
          // 鼠标单击行
          click: (event) => {
            this.treeprame.customerId = record.customerId;
            this.getalerlist();
            console.log(record, "record", index);
          },
        },
      };
    },
    async getlist() {
      this.tabletype = false;
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
        this.tabletype = true;
        this.treeprame.customerId = this.tabledata[0].customerId;
        this.getalerlist();
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getalerlist() {
      let parame = {
        customerId: this.treeprame.customerId,
      };
      let res = await this.$http.post(this.$api.customeralarmlist, parame);
      console.log(res, "resres");
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
        this.addmodel = false;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getremove(val) {
      console.log(val, 1222);
      let parame = {
        customerId: this.treeprame.customerId,
        alarmId:val.alarmId
      };
      let res = await this.$http.post(this.$api.customeralarmremove, parame);
        if (res.data.resultCode == "10000") {
          this.getalerlist()
           return this.$message.success(res.data.resultMsg);
        }else{
           return this.$message.error(res.data.resultMsg);
        }
    },
    async getform() {
      this.form.customerId = this.treeprame.customerId;
      this.form.alarmIdList=[]
      for (let i = 0; i <this.checkelists.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
           if (this.checkelists[i]==this.data[j].id) {
             if (this.data[j].nodeType=="alarm") {
               this.form.alarmIdList.push(this.checkelists[i])
             }
           }
        }
      }
      if (this.form.alarmIdList.length == 0) {
        return this.$message.error("请选择授权区域");
      }
      if (this.form.customerId == "") {
        return this.$message.error("请选择授权客户");
      }
      this.form.alarmIdList=[...new Set(this.form.alarmIdList)]
      let res = await this.$http.post(this.$api.customeralarmform, this.form);
      if (res.data.resultCode == "10000") {
        this.getalerlist();
        this.$message.success("授权成功");
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
      console.log(554444433);
      this.isselectdata = val;
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
    },
    getcheckedKeys(val) {
      console.log(val, 44444);
      this.checkelists = val;
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
  height: 422px;
  margin-top: 16px;
  margin-bottom: 60px;
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
</style>