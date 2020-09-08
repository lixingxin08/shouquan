<template>
  <div class="administrativedivision">
    <div class="flex_fs">
      <div class="isleft">
      <is-left
        :treedata="treedata"
        :replaceFields="replaceFields"
        :defaultExpandedKeys="defaultExpandedKeys"
        @selectdata="getselectdata"
        @searchdata="getsearchdata"
        v-if="showtree"
      ></is-left>
      </div>
      <div>
        <div class="right">
          <div class="r_top flex_f">
            <div class="r_t_text">人员姓名/手机号码:</div>
            <a-input
              placeholder="请输入人员姓名/手机号码"
              class="r_t_inp"
              v-model="pageparam.keyword"
              @keydown.enter="tosearch()"
            />
            <div class="r_t_text">人员状态:</div>
            <a-select
              show-search
              placeholder="全部"
              option-filter-prop="children"
              style="width: 200px;margin-right:20px;height:36px;border-radius: 8px;"
              v-model="pageparam.statusCode"
              @change="handleChange"
            >
              <a-select-option value>全部</a-select-option>
              <a-select-option
                v-for="(item,index) in statusCode"
                :key="index"
                :value="item.id"
              >{{item.val}}</a-select-option>
            </a-select>
            <div class="btn_blue btn" @click="tosearch()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <div class="btn_blue btn2" @click="toadd('add')">新增</div>
          <div class="table" v-if="tabletype">
            <a-table
              :columns="tablecolumns"
              :data-source="tabledata"
              bordered
              :pagination="pagination"
              @change="handleTableChange"
            >
              <div slot="gender" class="flex_a" slot-scope="gender">
                <div v-if="gender==1">男</div>
                <div v-else>女</div>
              </div>
              <div slot="statusCode" class="flex_a" slot-scope="statusCode">
                <div v-if="statusCode==1">正常</div>
                <div v-if="statusCode==0">休假</div>
                <div v-if="statusCode==2">离岗</div>
              </div>
              <div slot="existsFlag" class="flex_a" slot-scope="existsFlag">
                <div v-if="existsFlag==1">是</div>
                <div v-if="existsFlag==0">否</div>
              </div>
              <div slot="edit" class="flex_a" slot-scope="val,departmentId">
                <div class="col_blue ispointer" @click="toadd('edit',departmentId)">编辑</div>
                <div class="col_red ispointer" v-if="val.existsFlag==0" @click="showdialog(val)">
                  <span>删除</span>
                </div>
                <div class="col_gray ispointer" v-if="val.existsFlag!==0">删除</div>
              </div>
            </a-table>
          </div>
          <div class="table" v-if="!tabletype">无</div>
        </div>
      </div>
    </div>
    <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/tree.vue";
import isDeleteDialog from "../../../components/delete_confir/delete.vue";
export default {
  components: {
    isLeft,
    isDeleteDialog,
  },
  data() {
    return {
      ModalText: "您确定要删除吗？",
      visible: false,
      showtree: false,
      treedata: null,
      tabletype: false,
      inp_data: "",
      inp_data2: "",
      isselectdata: {
        id: "",
        name: "",
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
        },
        {
          width: 100,
          align: "center",
          title: "人员姓名",
          dataIndex: "realName",
          key: "realName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "人员性别",
          dataIndex: "gender",
          key: "gender",
          ellipsis: true,
          scopedSlots: {
            customRender: "gender",
          },
        },
        {
          width: 208,
          align: "center",
          title: "手机号码",
          key: "mobilePhone",
          dataIndex: "mobilePhone",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "员工状态",
          key: "statusCode",
          dataIndex: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
        {
          width: 108,
          align: "center",
          title: "所属部门",
          key: "departmentName",
          dataIndex: "departmentName",
          ellipsis: true,
        },
        {
          width: 108,
          align: "center",
          title: "是否分配账号",
          ellipsis: true,
          key: "existsFlag",
          dataIndex: "existsFlag",
          scopedSlots: {
            customRender: "existsFlag",
          },
        },
        {
          width: 108,
          align: "center",
          title: "操作",
          ellipsis: true,
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata: "",
      defaultExpandedKeys: [],
      pageparam: {
        keyword: "",
        statusCode: "",
      },
      statusCode: [
        { id: 1, val: "正常" },
        { id: 0, val: "休假" },
        { id: 2, val: "离岗" },
      ],
      data: "",
      pagination: {
        total: 50,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        current: 1,
        page: 1,
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      issearchdata: "",
      filterdata: [],

      treeprame: {
        //树接口参数
        departmentId: "",
        operatorId: "1",
        customerId: "",
      },
      removeparam: {
        personId: "",
        operatorId: "1",
      },
      istotal: {
        type: 1,
      },
    };
  },
  created() {
    this.getareatree();
  },
  methods: {
    //树
    async getareatree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.departmenttree, this.treeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      this.showtree = true;
      this.getpersonpage();
    },
    //分页列表接口
    async getpersonpage() {
      this.tabletype = false;
      let prame = {
        departmentId: this.isselectdata.id,
        keyword: this.pageparam.keyword,
        statusCode: this.pageparam.statusCode,
        pageIndex: this.pagination.page,
        pageSize: this.pagination.pageSize,
      };
      let res = await this.$http.post(this.$api.personpage, prame);
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      } else {
        this.tabletype = false;
        this.$message.success(res.data.resultMsg);
      }
    },
    //删除接口
    async getremove() {
      let res = await this.$http.post(
        this.$api.persondeleteByPersonId,
        this.removeparam
      );
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.getpersonpage();
        this.visible = false;
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
        }
        this.$router.push({
          path: "/addpersonnelManagement",
          query: {
            type: val,
            id: this.isselectdata.id,
            name: this.isselectdata.name,
          },
        });
      } else {
        this.$router.push({
          path: "/addpersonnelManagement",
          query: {
            type: val,
            id: id.personId,
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
      console.log(this.isselectdata, 98899);
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.istotal.type = 1;
      this.getpersonpage();
    },
    //查询
    tosearch() {
      this.istotal.type = 1;
      this.pagination.page = 1;
      this.pagination.pageSize = 10;
      this.isselectdata.id = "";
      this.getpersonpage();
    },
    //清除
    clear() {
      this.pageparam.keyword = "";
      this.pageparam.statusCode = "";
    },
    //弹窗
    showdialog(val) {
      console.log(val, 221212);
      this.removeparam.personId = val.personId;
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
      this.getpersonpage();
    },
    handleChange(val) {
      console.log(val, 5555);
      this.pageparam.statusCode = val;
    },
  },
};
</script>
<style scoped>
.administrativedivision {
  height: 100%;
  width: 100%;
  position: relative;
}

.tree {
  text-align: left;
}

.right {
  width: 1372px;
  padding-left: 20px;
  padding-top: 20px;
}

.r_t_text {
  height: 16px;
  font-size: 12px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-right: 10px;
}

.r_t_inp {
  width: 200px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-right: 20px;
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

.dialog {
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

.dialog_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialog_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
