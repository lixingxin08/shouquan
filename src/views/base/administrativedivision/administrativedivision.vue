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
      <div class="tree" @click="getareatree()">行政区划树</div>
    <div class="tree" @click="getareadetail()">行政区划详情接口</div>
    <div class="tree" @click="getareaform()">行政区划表单接口</div>
    <div class="tree" @click="getareapage()">行政区划分页列表接口</div>
    <div class="tree" @click="getarearemove()">行政区划删除接口</div>
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
      let prame = {};
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
    },
  },
};
</script>
<style  scoped>
.tree {
  text-align: left;
}
</style>