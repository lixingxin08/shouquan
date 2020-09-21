<template>
  <div class="administrativedivision flex_fs">
    <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
    <div class="isleft">
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
    <div class="right_box">
      <div class="right right4">
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
        <div class="btn_blue btn2" @click="toadd('add')">
          <a-icon two-tone-color="#ffffff" style="margin-right: 5px;" type="plus" />新增
        </div>
        <div class="table" v-if="tabletype">
          <a-table
            :scroll="{  y: 610 }"
            :columns="tablecolumns"
            :data-source="tabledata"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template
              slot="index"
              slot-scope="text, record,index"
            >{{(index+1)+((pagination.current-1)*10)}}</template>
            <div slot="edit" class="flex_a" slot-scope="childTotal,areaName">
              <div class="col_blue ispointer" @click="toadd('edit',areaName)">编辑</div>
              <div
                class="col_red ispointer"
                v-if="childTotal==0"
                @click="showdialogadmin(areaName)"
              >
                <span>删除</span>
              </div>
              <div class="col_gray ispointer" v-if="childTotal!==0">删除</div>
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
  name: "administrativedivision",
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
          ellipsis: true,
          scopedSlots: {
            customRender: "index",
            title: "istitle",
          },
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
      defaultSelectedKeys: [],
      data: "",
      pagination: {
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        showQuickJumper: true,
        current: 1,
        page: 1,
        size: "default",
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
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      console.log(this.treedata, 66666);

      if (localStorage.getItem("administrativedivisionId")) {
        this.isselectdata.id = JSON.parse(
          localStorage.getItem("administrativedivisionId")
        );
      } else {
        this.isselectdata.id = this.treedata[0].pid;
      }
      this.getareapage();
    },
    //行政区划分页列表接口
    async getareapage() {
      this.tabletype = false;
      let prame = {
        keyword: this.inp_data,
        latitude: 0,
        list: [{}],
        longitude: 0,
        parentId: this.isselectdata.id,
        pageIndex: this.pagination.page,
        pageSize: this.pagination.pageSize,
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
      } else {
        this.tabletype = true;
        this.tabledata = "";

        return this.$message.error(res.data.resultMsg);
      }
    },
    //行政区划删除接口
    async getarearemove() {
      let res = await this.$http.post(this.$api.arearemove, this.removeparam);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.reload();
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    toadd(val, id) {
      console.log(this.isselectdata, 898989);
      if (val == "add") {
        if (this.isselectdata.levelType >= 6) {
          return this.$message.error("只能新增区划等级5级及5级以下的区域");
        }
        if (this.isselectdata.id == "") {
          this.isselectdata.id = this.treedata[0].id;
          this.isselectdata.name = this.treedata[0].name;
          this.isselectdata.levelType = this.treedata[0].levelType;
        }
        this.$router.push({
          path: "/addadministrativedivision",
          query: {
            type: val,
            id: this.isselectdata.id,
            name: this.isselectdata.name,
            levelType: this.isselectdata.levelType,
          },
        });
      } else {
        this.$router.push({
          path: "/addadministrativedivision",
          query: {
            type: val,
            id: id.areaId,
            name: id.name,
            levelType: id.levelType,
            pid: id.pid,
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
        if (this.data[i].levelType >= 6) {
          this.data[i].disabled = true;
          this.data.splice(i, 1);
        }
      }
      this.treedata = this.toTree(this.data);
      this.defaultSelectedKeys = [];
  
      if (localStorage.getItem("administrativedivisionId")) {
         this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem("administrativedivisionId")));
         console.log(111);
      } else {
           this.defaultSelectedKeys.push(this.treedata[0].id);
      }
      this.isselectdata.id = this.treedata[0].id;
      this.isselectdata.name = this.treedata[0].name; 
      
      this.isselectdata.pid = this.treedata[0].pid;
      this.isselectdata.levelType = this.treedata[0].levelType;
      this.showtree = true;
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
      console.log(val, 2222);
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
      this.isselectdata.levelType = val.levelType;
      this.istotal.type = 1;
      this.inp_data = "";
      localStorage.setItem("administrativedivisionId", JSON.stringify(val.id));
      this.getareapage();
    },
    //查询
    tosearch() {
      this.isselectdata.levelType = "";
      this.istotal.type = 1;
      this.pagination.page = 1;
      this.pagination.pageSize = 10;
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
      this.visible = false;
      this.getareatree();
      this.getarearemove();
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.page = pagination.current;
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getareapage();
    },
  },
};
</script>
<style scoped>
.tree {
  text-align: left;
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
