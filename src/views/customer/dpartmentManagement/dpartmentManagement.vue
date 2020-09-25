<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-delete-dialog
        v-if="visible"
        @confirm="confirm"
        @cancle="cancel"
      ></is-delete-dialog>
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
    <div>
      <div class="right">
        <div class="r_top flex_f">
          <div class="r_t_text" @click="showdialogdpart()">部门名称</div>
          <a-input
            placeholder="请输入部门名称"
            class="r_t_inp"
            v-model="inp_data"
            @keydown.enter="tosearch()"
          />
          <div class="btn_blue btn" @click="tosearch()">查询</div>
          <div class="btn_gray" @click="clear()">清除</div>
        </div>
        <div class="isline"></div>
        <div class="btn_blue btn2" @click="toadd('add')">
          <a-icon
            two-tone-color="#ffffff"
            style="margin-right: 5px"
            type="plus"
          />新增
        </div>
        <div class="table" v-if="tabletype">
          <a-table
            :scroll="{ y: 610 }"
            :columns="tablecolumns"
            :data-source="tabledata"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="index" slot-scope="text, record, index">{{
              index + 1 + (pagination.current - 1) * 10
            }}</template>
            <div
              slot="edit"
              class="flexrow flexac flexjc"
              slot-scope="childTotal, val"
            >
              <div class="col_blue ispointer" @click="toadd('edit', val)">
                编辑
              </div>
              <div class="item-line"></div>
              <div
                class="col_red ispointer"
                v-if="val.personTotal == 0"
                @click="showdialogdpart(val)"
              >
                <span>删除</span>
              </div>
              <div class="col_gray ispointer" v-if="val.personTotal !== 0">
                删除
              </div>
            </div>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/tree.vue";
import isDeleteDialog from "../../../components/delete_confir/delete.vue";
export default {
  name: "dpartmentManagement",
  components: {
    isLeft,
    isDeleteDialog,
  },
  inject: ["reload"],
  data() {
    return {
      ModalText: "您确定要删除吗？",
      visible: false,
      showtree: false,
      treedata: null,
      tabletype: false,
      inp_data: "",
      isselectdata: {
        id: "",
        name: "",
        pid: "",
      },
      replaceFields: {
        title: "name",
        key: "id",
      },
      tablecolumns: [
        {
          width: 110,
          align: "center",
          title: "序号",
          dataIndex: "departmentId",
          key: "departmentId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index",
          },
        },
        {
          width: 100,
          align: "center",
          title: "部门名称",
          dataIndex: "departmentName",
          key: "departmentName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "上级部门名称",
          dataIndex: "parentName",
          key: "parentName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "直属员工数量",
          key: "personTotal",
          dataIndex: "personTotal",
          ellipsis: true,
        },

        {
          width: 108,
          align: "center",
          title: "操作",
          ellipsis: true,
          key: "2",
          dataIndex: "childTotal",
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata: "",
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
      data: "",
      pagination: {
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        showQuickJumper: true,
        current: 1,
        page: 1,
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      issearchdata: "",
      filterdata: [],

      departmenttreeprame: {
        //行政区划树接口参数
        customerId: "",
        departmentId: "",
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
      removeparam: {
        departmentId: "",
      },
      istotal: {
        type: 1,
      },
    };
  },
  created() {
    this.getdepartmenttree();
  },
  methods: {
    //树
    async getdepartmenttree() {
      this.showtree = false;
      let res = await this.$http.post(
        this.$api.departmenttree,
        this.departmenttreeprame
      );
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      this.showtree = true;
      this.getpage();
    },

    //分页列表接口
    async getpage() {
      this.tabletype = false;
      let prame = {
        departmentId: this.isselectdata.id,
        keyword: this.inp_data,
        pageIndex: this.pagination.page,
        pageSize: this.pagination.pageSize,
      };
      let res = await this.$http.post(this.$api.departmentpage, prame);
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //删除接口
    async getremove() {
      let res = await this.$http.post(
        this.$api.departmentdeleteByDepartmentId,
        this.removeparam
      );
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.reload();
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    confirm() {
      this.visible = false;
    },
    toadd(val, id) {
      if (val == "add") {
        if (this.isselectdata.id == "") {
          this.isselectdata.id = this.treedata[0].id;
          this.isselectdata.name = this.treedata[0].name;
          this.isselectdata.levelType = this.treedata[0].levelType;
        }
        this.$router.push({
          path: "/adddpartmentManagement",
          query: {
            type: val,
            id: this.isselectdata.id,
            name: this.isselectdata.name,
            levelType: this.isselectdata.levelType,
          },
        });
      } else {
        this.$router.push({
          path: "/adddpartmentManagement",
          query: {
            type: val,
            id: id.departmentId,
          },
        });
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
      this.defaultSelectedKeys = [];
      if (localStorage.getItem("dpartmentManagementid")) {
        this.defaultSelectedKeys.push(
          JSON.parse(localStorage.getItem("dpartmentManagementid"))
        );
        this.isselectdata.id = JSON.parse(
          localStorage.getItem("dpartmentManagementid")
        );
      } else {
        this.defaultSelectedKeys.push(this.treedata[0].id);
        this.isselectdata.id = this.treedata[0].id;
        this.isselectdata.name = this.treedata[0].name;
        this.isselectdata.levelType = this.treedata[0].levelType;
      }
    },
    //获取树搜索数据
    getsearchdata(val) {
      this.issearchdata = val;
      this.getdepartmenttree();
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
      localStorage.setItem("dpartmentManagementid", JSON.stringify(val.id));
      this.istotal.type = 1;
      this.getpage();
    },
    //查询
    tosearch() {
      this.istotal.type = 1;
      this.pagination.page = 1;
      this.pagination.pageSize = 10;
      this.getpage();
    },
    //清除
    clear() {
      this.isselectdata.name = "";
      this.inp_data = "";
      // this.getpage();
    },
    //弹窗
    showdialogdpart(val) {
      console.log(val, 221212);
      this.removeparam.departmentId = val.departmentId;
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.getremove();
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.page = pagination.current;
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getpage();
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
}

.r_t_inp:focus {
  border: 1px solid #1890ff;
}

.btn {
  margin-right: 20px;
  margin-left: 20px;
}

.btn2 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.table_list {
  height: 42px;
}

.dialogdpart {
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

.dialogdpart_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogdpart_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
