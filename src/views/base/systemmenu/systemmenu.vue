<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left :treedata="treedata" :defaultSelectedKeys="defaultSelectedKeys" :replaceFields="replaceFields"
        :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata" v-if="showtree"></is-left>
    </div>
    <div class="flexcolumn" style="width: 100%;padding: 20px;">
      <is-list ref="menulist" @refreshtree='getmenutree'></is-list>
    </div>
  </div>
</template>
<script>
  import isLeft from "../../../components/tree/tree.vue";
  import isList from './list.vue'
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
        data: "",
      };
    },
    created() {
      this.getmenutree();
    },
    methods: {


      //菜单树接口
      async getmenutree() {
        this.showtree = false;
        let prame = {};
        let res = await this.$http.post(this.$api.menutree, prame);
        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        }
        this.setdata();
        this.showtree = true;
        if (localStorage.getItem('systemmenuId')) {
          this.getselectdata(JSON.parse(localStorage.getItem('systemmenuId')));
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('systemmenuId')).id);
        } else {
          this.getselectdata(this.treedata[0])
           this.defaultSelectedKeys.push(this.treedata[0].id);
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
            if (this.data[i].levelType >= 4) {
              this.data[i].disabled = true;
            }
          }
        }
        this.treedata = this.toTree(this.data);
      },
      getselectdata(val) {
        if (!val)
          return
        localStorage.setItem('systemmenuId', JSON.stringify(val))
        this.isselectdata = val;
        this.$refs.menulist.setMenuItem(val)
      },
    },
  };
</script>
<style scoped>
  .tree {
    text-align: left;
  }
</style>
