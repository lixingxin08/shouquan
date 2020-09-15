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
            <div class="r_t_text" @click="showdialogadmin()">区划名称</div>
            <a-input
              placeholder="请输入区划名称"
              class="r_t_inp"
              v-model="inp_data"
              @keydown.enter="tosearch()"
            />
            <div class="btn_blue btn" @click="tosearch()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <div class="isline"></div>
          <div class="btn_blue btn2" @click="toadd('add')">新增</div>
          <div class="table" v-if="tabletype">
            <a-table
              :columns="tablecolumns"
              :data-source="tabledata"
              bordered
              :pagination="pagination"
              @change="handleTableChange"
            >
              <div slot="edit" class="flex_a" slot-scope="childTotal,areaName">
                <div class="col_blue ispointer" @click="toadd('edit',areaName)">编辑</div>
                <div class="col_red ispointer" v-if="childTotal==0" @click="showdialogadmin(areaName)">
                  <span>删除</span>
                </div>
                <div class="col_gray ispointer" v-if="childTotal!==0">删除</div>
              </div>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <is-delete-dialogadmin v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialogadmin>
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
      isselectdata: {
        id: "",
        icon: "",
        isParent: "",
        levelType: "",
        name: "",
        open: "",
        pid: "",
        switcherIcon: "",
        title: "",
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
          dataIndex: "areaId",
          key: "areaId",
          ellipsis: true,
        },
        {
          width: 100,
          align: "center",
          title: "区划名称",
          dataIndex: "areaName",
          key: "areaName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "区划等级",
          dataIndex: "levelType",
          key: "levelType",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "上级区划",
          key: "parentName",
          dataIndex: "parentName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "子节点数",
          key: "childTotal",
          dataIndex: "childTotal",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "授权次数",
          key: "authTotal",
          dataIndex: "authTotal",
          ellipsis: true,
        },
        {
          width: 108,
          align: "center",
          title: "操作",
          ellipsis: true,
           key: "1",
          dataIndex: "childTotal",
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata: "",
      defaultExpandedKeys: [],
      data: "",
      pagination: {
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        current: 1,
        page: 1,
         size:"default",
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      issearchdata: "",
      filterdata: [],

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
      removeparam: {
        areaName: "",
        areaId: "",
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
    //行政区划树
    async getareatree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.areatree, this.areatreeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      this.showtree = true;
      console.log(1111111);
      this.getareapage();
    },

    //行政区划分页列表接口
    async getareapage() {
      this.tabletype = false;
      let prame = {
        areaId: this.isselectdata.id,
        keyword: this.isselectdata.name,
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: this.pagination.page,
        pageSize: this.pagination.pageSize,
        parentId: this.isselectdata.pid,
        remark: "",
        searchIndex: 0,
      };
      let res = await this.$http.post(this.$api.areapage, prame);
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      }else{
        return this.$message.error(res.data.resultMsg);
      }
    },
    //行政区划删除接口
    async getarearemove() {
      let res = await this.$http.post(this.$api.arearemove, this.removeparam);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.getareapage()
        this.visible = false;
      } else {
    return    this.$message.error(res.data.resultMsg);
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
          path: "/addadministrativedivision",
          query: {
            type: val,
            id: this.isselectdata.id,
            name: this.isselectdata.name,
          },
        });
      } else {
        this.$router.push({
          path: "/addadministrativedivision",
          query: {
            type: val,
            id: id.areaId,
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
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
      this.istotal.type = 1;
      this.getareapage();
    },
    //查询
    tosearch() {
      this.isselectdata.name = this.inp_data;
      this.isselectdata.id = "";
      this.isselectdata.pid = "";
      this.istotal.type = 1;
      this.pagination.page = 1;
      this.pagination.pageSize = 10;
      console.log(33333);
      this.getareapage();
    },
    //清除
    clear() {
      this.isselectdata.name = "";
      this.inp_data = "";
      // this.getareapage();
    },
    //弹窗
    showdialogadmin(val) {
      console.log(val, 221212);
      this.removeparam.areaName = val.areaName;
      this.removeparam.areaId = val.areaId;
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.getarearemove();
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
      console.log(4444);
      this.getareapage();
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
  width: 70px;
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

.dialogadmin {
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

.dialogadmin_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogadmin_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
