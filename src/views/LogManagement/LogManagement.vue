<template>
  <div class="administrativedivision flex_fs">
    <is-left class="isleft" :treedata="treedata" :replaceFields="replaceFields"
      :defaultSelectedKeys="defaultSelectedKeys" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
      v-if="showtree"></is-left>
    <div class="flexcolumn" style="width: 100%;padding: 20px;">
      <is-list v-show="isselectdata" ref="log"></is-list>
    </div>
  </div>
</template>
<script>
  import isLeft from "../../components/tree/tree.vue";
  import isList from './list/list.vue'
  export default {
    components: {
      isLeft,
      isList: isList
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
        defaultSelectedKeys: [],
        data: [],
      };
    },
    created() {
      this.getmenutree();
    },
    methods: {

      //数据字典树接口
      async getmenutree() {
        this.showtree = false;
        let prame = {};
        let res = await this.$http.post(this.$api.menutree, prame);
        if (res.data.resultCode == "10000"&& res.data.data) {
          this.data = res.data.data;
        }
        if(!this.data)
        return
        this.setdata();
        this.showtree = true;

        this.getselectdata(this.treedata[0])
        this.defaultSelectedKeys.push(this.treedata[0].id);
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
        this.defaultSelectedKeys = [];
        if (localStorage.getItem('logid')) {
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('logid')).id);
        } else {
          this.defaultSelectedKeys.push(this.treedata[0].id);
        }

      },
      getselectdata(val) {
        this.isselectdata = val;
          localStorage.setItem('logid', JSON.stringify(val))
        if (val)
          this.$refs.log.getLogInfo(val)
      },
    },
  };
</script>
<style scoped>
  .tree {
    text-align: left;
  }
</style>
