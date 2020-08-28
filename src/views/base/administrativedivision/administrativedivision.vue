<template>
  <div class="administrativedivision flex_fs">
    <is-left
      :treedata="treedata"
      :replaceFields="replaceFields"
      :defaultExpandedKeys="defaultExpandedKeys"
      @selectdata="getselectdata"
    ></is-left>
    <div class="tree" @click="gettree()">gettree</div>
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
      treedata: null,
      isselectdata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: [
        {
          id: "100000000000000000000000000000000000000000000000000000000000",
          name: "中国",
          isParent: true,
          levelType: 1,
          open: true,
          pid: "0",
        },
        {
          id: "100001000000000000000000000000000000000000000000000000000000",
          name: "北京",
          isParent: true,
          levelType: 2,
          open: true,
          pid: "100000000000000000000000000000000000000000000000000000000000",
        },
        {
          id: "100001001000000000000000000000000000000000000000000000000000",
          name: "北京市",
          isParent: true,
          levelType: 3,
          open: true,
          pid: "100001000000000000000000000000000000000000000000000000000000",
        },
        {
          id: "100001001001000000000000000000000000000000000000000000000000",
          name: "东城区",
          isParent: true,
          levelType: 4,
          open: true,
          pid: "100001001000000000000000000000000000000000000000000000000000",
        },
        {
          id: "100001001001001000000000000000000000000000000000000000000000",
          name: "东四街道",
          isParent: true,
          levelType: 5,
          open: false,
          pid: "100001001001000000000000000000000000000000000000000000000000",
        },
        {
          id: "100001001001001001000000000000000000000000000000000000000000",
          name: "二条社区",
          isParent: false,
          levelType: 6,
          open: false,
          pid: "100001001001001000000000000000000000000000000000000000000000",
        },
        {
          id: "100002000000000000000000000000000000000000000000000000000000",
          name: "天津",
          isParent: true,
          levelType: 2,
          open: true,
          pid: "100000000000000000000000000000000000000000000000000000000000",
        },
        {
          id: "100002001000000000000000000000000000000000000000000000000000",
          name: "天津市",
          isParent: false,
          levelType: 3,
          open: true,
          pid: "100002000000000000000000000000000000000000000000000000000000",
        },
      ],
    };
  },
  created() {
    this.setdata();
  },
  methods: {
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
      console.log(this.isselectdata, 3333);
    },
    gettree() {
      this.$http
        .post(this.$api.areatree, {
          areaId:
            "100000000000000000000000000000000000000000000000000000000000",
        })
        .then((res) => {
          console.log(res, 11);
        });
    },
  },
};
</script>
<style  scoped>
.tree {
  text-align: left;
}
</style>