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
          <a-input placeholder="请输入区划名称" class="r_t_inp" />
          <div class="btn_blue btn">查询</div>
          <div class="btn_gray">清除</div>
        </div>
        <div class="btn_blue btn2">新增</div>
        <!-- <div class="tree" @click="getareatree()">行政区划树</div>
      <div class="tree" @click="getareadetail()">行政区划详情接口</div>
      <div class="tree" @click="getareaform()">行政区划表单接口</div>
      <div class="tree" @click="getareapage()">行政区划分页列表接口</div>
        <div class="tree" @click="getarearemove()">行政区划删除接口</div>-->
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
      isselectdata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
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
        areaName: "",
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: 1,
        pageSize: 20,
        parentId: "",
        remark: "",
        searchIndex: 0,
      };
      let res = await this.$http.post(this.$api.areatree, prame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
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
      let res = await this.$http.post(this.$api.areapage, prame);
      console.log(res);
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
  },
};
</script>
<style  scoped>
.tree {
  text-align: left;
}
.right {
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
</style>