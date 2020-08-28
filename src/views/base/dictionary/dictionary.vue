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
      <div class="tree" @click="getdictionarytree()">树</div>
    <div class="tree" @click="getdictionarydetail()">划详情接口</div>
    <div class="tree" @click="getdictionaryform()">表单接口</div>
    <div class="tree" @click="getdictionarypage()">分页列表接口</div>
    <div class="tree" @click="getdictionaryremove()">删除接口</div>
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
    this.getdictionarytree();
  },
  methods: {
    //数据字典树接口
    async getdictionarytree() {
      this.showtree = false;
      let prame = {};
      let res = await this.$http.post(this.$api.dictionarytree, prame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
    },
    //数据字典详情接口
    async getdictionarydetail() {
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
      let res = await this.$http.post(this.$api.dictionarydetail, prame);
      console.log(res);
    },
    //表单接口
    async getdictionaryform() {
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
      let res = await this.$http.post(this.$api.dictionaryform, prame);
      console.log(res);
    },
    //分页列表接口
    async getdictionarypage() {
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
      let res = await this.$http.post(this.$api.dictionarypage, prame);
      console.log(res);
    },
    //删除接口
    async getdictionaryremove() {
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
      let res = await this.$http.post(this.$api.dictionaryremove, prame);
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