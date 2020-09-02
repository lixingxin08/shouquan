<template>
  <div class="administrativedivision">
    <div class="flex_fs">
      <is-left
        :treedata="treedata"
        :replaceFields="replaceFields"
        :defaultExpandedKeys="defaultExpandedKeys"
        @selectdata="getselectdata"
        @searchdata="getsearchdata"
        v-if="showtree"
      ></is-left>
      <div>
        <div class="right">
          <div class="r_top flex_f">
            <div class="r_t_text" @click="showdialog()">区划名称</div>
            <a-input
              placeholder="请输入区划名称"
              class="r_t_inp"
              v-model="inp_data"
              @keydown.enter="tosearch()"
            />
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
              <div slot="edit" class="flex_a" slot-scope="childTotal,areaName">
                <div class="col_blue ispointer" @click="toadd('edit',areaName)">编辑</div>
                <div class="col_red ispointer" v-if="childTotal==0" @click="showdialog(areaName)">
                  <span>删除</span>
                </div>
                <div class="col_gray ispointer" v-if="childTotal!==0">删除</div>
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
          <div class="ok_btn" @click="getarearemove()">确定</div>
          <div class="cancel_btn" @click="cancel()">取消</div>
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
      ModalText: "您确定要删除吗？",
      visible: false,
      showtree: false,
      treedata: null,
      tabletype: false,
      totoltype:true,
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
        areaId: "",
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
      this.getareapage();
    },
    //行政区划分页列表接口
    async getareapage() {
      this.tabletype = false;
      let prame = {
        areaId: this.isselectdata.id,
        keyword: this.isselectdata.name,
        pageIndex: this.pagination.current,
        pageSize: this.pagination.pageSize,
        parentId: this.isselectdata.pid,
      };
      let res = await this.$http.post(this.$api.areapage, prame);
      console.log(res, "getareapage");
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        this.pagination.total = res.data.data.length;
        this.tabletype = true;
      }else{      
        this.$message.error(res.data.resultMsg)
      }
    },
    //行政区划删除接口
    async getarearemove() {
      console.log(this.removeparam);
      let res = await this.$http.post(this.$api.arearemove, this.removeparam);
      if (res.data.resultCode == "10000") {
        this.visible = false;
        this.getareatree();
        this.getareapage();
      } else {
        this.$message.error(res.data.resultMsg);
      }
      console.log(res, 898989);
    },

    toadd(val, id) {
      if (val == "add") {
        this.$router.push({
          path: "/addadministrativedivision",
          query: { type: val, id: this.treedata[0].id },
        });
      } else {
        console.log(id, 898989);
        this.$router.push({
          path: "/addadministrativedivision",
          query: { type: val, id: id.areaId },
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
      this.isselectdata = val;
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.getareapage();
    },
    //查询
    tosearch() {
      this.isselectdata.name = this.inp_data;
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.getareapage();
    },
    //清除
    clear() {
      this.isselectdata.name = "";
      this.inp_data = "";
    },
    //弹窗
    showdialog(val) {
      console.log(val, 222);
      this.removeparam.areaId = val.areaId;
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
      console.log(pagination, 88878);
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getareapage();
    },
  },
};
</script>
<style  scoped>
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
  height: 276px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>