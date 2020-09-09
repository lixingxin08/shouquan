<template>
  <div class="flex_f father">
    <div class="isleft">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="false"
        :customRow="rowClick2"
      >
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode==1">启用</div>
          <div v-if="statusCode==2">备用</div>
          <div v-if="statusCode==0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="tree_box flex_f">
        <div class="tree_box_i tree_box_i_l">
          <div class="left_title">选择授权模板</div>
          <a-table
            :columns="tablecolumns2"
            :data-source="tabledata2"
            bordered
            :customRow="rowClick"
          ></a-table>
        </div>

        <div class="tree_box_i">
          <div class="flex_f templatetree_sel">
            <span>服务子系统：</span>
            <div>
              <a-select
                show-search
                placeholder="全部"
                option-filter-prop="children"
                style="width:200px;margin-right:20px;height:36px;border-radius: 8px;"
                @change="handleChange2"
                v-if="showtree"
              >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option
                  v-for="(item,index) in oldtreedata"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </div>
          </div>
          <is-left
          ref='select'
            :treedata="treedata"
            :replaceFields="replaceFields"
            :defaultExpandedKeys="defaultExpandedKeys"
            @checkedKeys="getcheckedKeys"
            :checkedKeys="checkedKeys"
            v-if="showtree"
          ></is-left>
        </div>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea placeholder="Basic usage" :rows="5" />
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
          key: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
      ],
      tabledata: [],
      treedata: "",
      tabletype: false,
      tabletype2: false,
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      checkedKeys: [],
      tablecolumns2: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "templateId",
          key: "templateId",
        },
        {
          width: 141,
          align: "center",
          title: "模板名称",
          dataIndex: "templateName",
          key: "templateName",
        },
      ],
      tabledata2: [
        {
          key: "1",
          name: "John Brown",
          templateId: 32,
          templateName: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          templateId: 42,
          templateName: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
      ],
      treedata2: "",

      replaceFields2: {
        title: "name",
        key: "id",
      },
      data: "",
      showtree: false,
      listparam: {
        operatorId: "1",
        customerId: "",
      },
      pagination: {
        total: 50,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        current: 1,
        page: 1,
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      istotal: {
        type: 1,
      },
      treeprame: {
        templateId: "",
      },
      detailparame: {
        pageIndex: "",
        pageSize: "",
      },
      form: {
        customerId: "",
        templateId: "",
        menuIdList: "",
        remark: "",
      },
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
      rowClick2: (record) => ({
        // 事件
        on: {
          click: () => {
            // 点击改行时要做的事情
            // ......

            this.form.customerId = record.customerId;
            console.log(this.form.customerId, "record");
          },
        },
      }),
    };
  },
  created() {
    this.getlist();
    this.getdetail();
    console.log(localStorage.getItem("user"), 111);
  },
  methods: {
    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.templatetree, this.treeprame);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
      this.oldtreedata = this.treedata;
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
        this.form.customerId = this.tabledata[0].customerId;
        this.gettree();
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getdetail() {
      this.tabletype2 = false;
      this.detailparame.pageIndex = this.pagination.page;
      this.detailparame.pageSize = this.pagination.pageSize;
      let res = await this.$http.post(
        this.$api.templatelist,
        this.detailparame
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getform() {
      this.form.operatorId = 1;
      if (this.form.menuIdList == "") {
        return this.$message.error("请选择授权系统");
      }
      let res = await this.$http.post(
        this.$api.customertemplateform,
        this.form
      );
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.$router.go(-1);
      } else {
        return this.$message.error(res.data.resultMsg);
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
        if (this.data[i].checked == true) {
          this.checkedKeys.push(this.data[i].id);
        }
      }
      this.treedata = this.toTree(this.data);
    },
    //获取树搜索数据
    getsearchdata(val) {
      this.issearchdata = val;
      this.gettree();
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
      this.form.menuIdList = val;
    },
    handleChange2(value, key) {
      console.log(value,key);
      this.showtree = false;
      this.treedata = this.oldtreedata;
      if (value == "all") {
        this.treedata = this.oldtreedata;
        this.checkedKeys=this.checkedKeys
        this.$refs.select.setSelectKey(this.checkedKeys)
      } else {
        let filterTreeNode = "";
        for (let i = 0; i < this.treedata.length; i++) {
          if (this.treedata[i].id == value) {
            filterTreeNode = this.treedata[i];
          }
        }
        this.treedata = Array(filterTreeNode);
      }
      this.showtree = true;
      console.log(this.checkedKeys,5544444);
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
  margin-bottom: 170px;
  background: #ffffff;
}
.tree_box_i {
  width: 600px;
  height: 353px;
  overflow: scroll;
}
.tree_box_i::-webkit-scrollbar {
  display: none;
}
.tree_box_i_l {
  padding-left: 20px;
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
