<template>
  <div class="administrativedivision flex_fs">
    <is-left :treedata="treedata" :replaceFields="replaceFields" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
      v-if="showtree"></is-left>
    <div class="flexcolumn" style="width: 100%;padding: 20px;">

     <!-- <div class="tree" @click="getdictionarytree()">树</div>
      <div class="tree" @click="getdictionarydetail()">划详情接口</div>
      <div class="tree" @click="getdictionaryform()">表单接口</div>
      <div class="tree" @click="getdictionarypage()">分页列表接口</div>
      <div class="tree" @click="getdictionaryremove()">删除接口</div> -->

     <is-list v-show="isselectdata" ref="dictionarylist"></is-list>

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
        let prame = {
        };
        let res = await this.$http.post(this.$api.dictionarytree, prame);
        console.log(res, 11);
        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        }
        this.setdata();
        this.showtree = true;
        console.log(this.treedata)
        this.getselectdata(this.treedata[0])
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
        if(this.$refs.dictionarylist)
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
