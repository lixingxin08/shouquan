<template>
  <div class="administrativedivision">
    <div class="flex_fs">
      <div>
        <div class="right">
          <div class="r_top flex_f">
            <div class="r_t_text" @click="showdialog()">区划名称</div>
            <a-input placeholder="请输入区划名称" class="r_t_inp" v-model="inp_data" />
            <div class="btn_blue btn" @click="search()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <router-link to="/addadministrativedivision">
            <div class="btn_blue btn2">新增</div>
          </router-link>
          <div class="table" v-if="tabletype">
            <a-table
              :columns="tablecolumns"
              :data-source="tabledata"
              bordered
              :pagination="pagination"
            >
              <div slot="edit" class="flex_a" slot-scope="childTotal">
                <div class="col_blue">编辑 {{childTotal}}</div>
                <div class="col_red" v-if="childTotal==0">删除</div>
                <div class="col_gray" v-if="childTotal!==0">删除</div>
              </div>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="visible">
      <div class="dialog_t flex_b">
        <div></div>
        <div @click="cancel()">
          <a-icon type="close" />
        </div>
      </div>
      <div class="dialog_c flex_a">您确定要删除吗？</div>
      <div class="dialog_f flex_a">
        <div class="flex_f">
          <div class="ok_btn">确定</div>
          <div class="cancel_btn" @click="cancel()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
          key: "2",
          dataIndex: "childTotal",
          scopedSlots: { customRender: "edit" },
        },
      ],
      tabledata: "",
      defaultExpandedKeys: [],
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
      filterdata:[]
    };
  },
  created() {
    this.getareatree();
  },
  methods: {
    //运行参数详情接口
    async getrundetail() {
      let prame = {
        areaId: "string",
        areaName: "string",
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: 0,
        pageSize: 0,
        parentId: "string",
        remark: "string",
        searchIndex: 0,
      };
      let res = await this.$http.post(this.$api.rundetail, prame);
      console.log(res);
    },
    //运行参数表单接
    async getrunform() {
      let prame = {
        areaId: "string",
        areaName: "string",
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: 0,
        pageSize: 0,
        parentId: "string",
        remark: "string",
        searchIndex: 0,
      };
      let res = await this.$http.post(this.$api.runform, prame);
      console.log(res);
    },
    //行政区划分页列表接口
    async getareapage() {
      this.tabletype = false;
      let prame = {
        areaId: this.isselectdata.id,
        areaName: this.isselectdata.name,
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
      console.log(res, "getareapage");
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        this.pagination.total = res.data.data.length;
        this.tabletype = true;
      }
    },
    //行政区划删除接口
    async getarearemove() {
      let prame = {
        areaId: "string",
        areaName: "string",
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: 0,
        pageSize: 0,
        parentId: "string",
        remark: "string",
        searchIndex: 0,
      };
      let res = await this.$http.post(this.$api.arearemove, prame);
      console.log(res);
    },

    //查询
    search() {
      this.isselectdata.name = this.inp_data;
      this.getareapage();
    },
    //清除
    clear() {
      this.isselectdata.name = "";
      this.inp_data = "";
      this.getareapage();
    },
    //弹窗
    showdialog() {
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.queryParam.page = pagination.current;
      this.queryParam.size = pagination.pageSize;
    },
  },
};
</script>
<style  scoped>
.administrativedivision {
  height: 100%;
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

.dialog {
  width: 920px;
  height: 492px;
  position: relative;
  left: 50%;
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