<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left :treedata="treedata" :replaceFields="replaceFields" :defaultSelectedKeys="defaultSelectedKeys"
        :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata" v-if="showtree"></is-left>
    </div>
    <div class="flexcolumn" style="width: 100%;padding: 20px;">
      <is-list v-show="isselectdata" ref="dictionarylist" @refreshtree='getdictionarytree'></is-list>
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
      this.getdictionarytree();
    },
    methods: {

      addDictionary() { //添加字典
        this.isShowAddDictionary = !this.isShowAddDictionary
      },
      //数据字典树接口
      async getdictionarytree() {
        this.showtree = false;
        let prame = {};
        let res = await this.$http.post(this.$api.dictionarytree, prame);
        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        }
        this.setdata();
        this.showtree = true;
        console.log(this.treedata)

        if (localStorage.getItem('dictionaryId')) {
          this.getselectdata(JSON.parse(localStorage.getItem('dictionaryId')));
        } else {
          this.getselectdata(this.treedata[0])
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
        this.defaultSelectedKeys = [];
        if (localStorage.getItem('dictionaryId')) {
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('dictionaryId')).id);
        } else {
          this.defaultSelectedKeys.push(this.treedata[0].id);
        }
      },
      getselectdata(val) {
        localStorage.setItem('dictionaryId', JSON.stringify(val))
        this.isselectdata = val;
        if (val)
        this.$refs.dictionarylist.getDictionnaryInfo(val)
      },
    },
  };
</script>
<style scoped>
  .tree {
    text-align: left;
  }
</style>
