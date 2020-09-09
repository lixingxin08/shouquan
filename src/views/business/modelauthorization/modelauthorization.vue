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
      <div class="flex_f">
        <div class="isright_l">
          <div class="left_title">设备类型</div>
          <div class="tree_box">
            <is-left
              :treedata="treedata"
              :replaceFields="replaceFields"
              :defaultExpandedKeys="defaultExpandedKeys"
              @checkedKeys="getcheckedKeys"
              v-if="showtree"
            ></is-left>
          </div>
        </div>
        <div class="isright_r">
          <div class="left_title">型号列表</div>
          <div class="tree_box">
            <a-table
              :columns="tablecolumns2"
              :data-source="tabledata2"
              :row-selection="rowSelection"
              bordered
              :pagination="false"
            ></a-table>
          </div>
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
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows, 2222);
          this.form.customerIdList = [];
          if (selectedRows.length > 0) {
            selectedRows.forEach((item) => {
              this.form.customerIdList.push(item.customerId);
            });
            console.log(this.form, 1235455);
          }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows, 1111);
          this.form.customerIdList = [];
          if (selected == true) {
            selectedRows.forEach((item) => {
              this.form.customerIdList.push(item.customerId);
            });
            console.log(this.form, 1235455);
          }
        },
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
          key: "statusCode 1",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
      ],
      tabledata: [],
      tabletype: false,
      tabletype2: false,
      tablecolumns2: [
        {
          width: 58,
          align: "center",
          title: "型号序号",
          dataIndex: "modelId",
          key: "modelId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "型号名称",
          dataIndex: "modelName",
          key: "modelName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "型号品牌",
          dataIndex: "brandName",
          key: "brandName 1",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "设备类型",
          dataIndex: "deviceTypeName",
          key: "deviceTypeName",
          ellipsis: true,
        },
      ],
      tabledata2: [],
      treedata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      areatreeprame: {
        //行政区划树接口参数
        areaId: "",
        keyword: "",
        keyword: "",
        latitude: 0,
        longitude: 0,
        operatorId: "",
        pageIndex: 0,
        pageSize: 10,
        parentId: "",
        remark: "",
      },
      listparam: {
        operatorId: "1",
        customerId: "",
      },
      modellistparam: {
        operatorId: "1",
        customerId: "",
      },
      customerId: "",
      form: {
        customerIdList: [],
        accountId: "",
        remark: "",
      },
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
    this.getareatree();
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
        this.getmodellist();
        this.tabletype = true;
      } else {
     return   this.$message.error(res.data.resultMsg);
      }
    },
    async getmodellist() {
      this.tabletype2 = false;
      console.log(this.tabledata[0].customerId, 11122222);
      if (this.modellistparam.customerId == "") {
        this.modellistparam.customerId = this.tabledata[0].customerId;
      }
      let res = await this.$http.post(
        this.$api.customermodellist,
        this.modellistparam
      );
      if (res.data.resultCode == "10000") {
        for (let i = 0; i < res.data.data.length; i++) {
          this.tabledata2 = res.data.data;
        }
        this.tabletype2 = true;
      } else {
      return  this.$message.error(res.data.resultMsg);
      }
    },
    async getareatree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.areatree, this.areatreeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
     return   this.$message.error(res.data.resultMsg);
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
.isright_l {
  width: 300px;
  margin-right: 20px;
  overflow: scroll;
}
.isright_l::-webkit-scrollbar {
  display: none;
}
.isright_r {
  width: 100%;
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
  width: 100%;
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