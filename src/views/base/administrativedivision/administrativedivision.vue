<template>
  <div class="administrativedivision flex_fs">
    <is-left
      :treedata="treedata"
      :replaceFields="replaceFields"
      :defaultExpandedKeys="defaultExpandedKeys"
      @selectdata="getselectdata"
      v-if="showtree"
    ></is-left>
    <div>
      <div class="right">
        <div class="r_top flex_f">
          <div class="r_t_text">区划名称</div>
          <a-input placeholder="请输入区划名称" class="r_t_inp" v-model="inp_data" />
          <div class="btn_blue btn" @click="search()">查询</div>
          <div class="btn_gray" @click="clear()">清除</div>
        </div>
        <div class="btn_blue btn2">新增</div>
        <div class="table" v-if="tabletype">
          <a-table
            :columns="tablecolumns"
            :data-source="tabledata"
            bordered
            :pagination="pagination"
          >
            <div slot="edit" class="flex_a" slot-scope="childTotal">
              <div class="col_blue">编辑 {{childTotal}}</div>
              <div class="col_red" v-if="condition==0">删除</div>
              <div class="col_gray" v-if="condition!==0">删除</div>
            </div>
          </a-table>
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
      showtree: false,
      treedata: null,
      tabletype: false,
      inp_data:'',
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
    };
  },
  created() {
    this.getareatree();
  },
  methods: {
    //行政区划树
    async getareatree() {
      this.showtree = false;
      let prame = {
        areaId: "",
      };
      let res = await this.$http.post(this.$api.areatree, prame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
       this.getareapage();
    },
    //行政区划详情接口
    async getareadetail() {
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
      let res = await this.$http.post(this.$api.areadetail, prame);
      console.log(res);
    },
    //行政区划表单接口
    async getareaform() {
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
      let res = await this.$http.post(this.$api.areaform, prame);
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
    getselectdata(val) {
      this.isselectdata = val;
      console.log(this.isselectdata, 9999);
    },
    //查询
    search(){
     this.isselectdata.name= this.inp_data
      this.getareapage();
    },
    //清除
    clear(){
        this.isselectdata.name= ""
        this.inp_data=""
      this.getareapage();
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
</style>