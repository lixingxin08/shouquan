<template>
  <div class="supervisionhome">
    <is-top></is-top>
    <div class="content flex_fs">
      <div class="changlist" @click="changelist()">切换列表</div>
      <is-left @searchdata="getsearchdata" :treedata="treedata"></is-left>
      <is-map v-show="listtype"></is-map>
      <is-list v-show="!listtype"></is-list>
    </div>
  </div>
</template>
<script>
import isTop from "./top/top";
import isList from "./list/list";
import isLeft from "./content/left";
import isMap from "./content/map";
export default {
  name: "supervision",
  data() {
    return {
      listtype: false,
      searchdata: "",
      treedata: null,
      data: [
        {
          id: "Cn",
          name: "father",
          isParent: true, //是否存在子节点：true=有，false=没有
          levelType: 1, //当前节点等级
          open: true, //节点默认打开：true=打开，false=关闭
          pId: "0",
        },
        {
          id: "shenzheng",
          name: "child",
          isParent: true, //是否存在子节点：true=有，false=没有
          levelType: 2, //当前节点等级
          open: true, //节点默认打开：true=打开，false=关闭
          pId: "Cn",
        },
        {
          id: "baoan",
          name: "child",
          isParent: false, //是否存在子节点：true=有，false=没有
          levelType: 3, //当前节点等级
          open: true, //节点默认打开：true=打开，false=关闭
          pId: "shenzheng",
        },
         {
          id: "Kr",
          name: "child",
          isParent: true, //是否存在子节点：true=有，false=没有
          levelType: 1, //当前节点等级
          open: true, //节点默认打开：true=打开，false=关闭
          pId: "0",
        },
         {
          id: "树节点序号",
          name: "child",
          isParent: true, //是否存在子节点：true=有，false=没有
          levelType: 2, //当前节点等级
          open: true, //节点默认打开：true=打开，false=关闭
          pId: "Kr",
        },
      ],
    };
  },
  components: {
    isTop,
    isLeft,
    isMap,
    isList,
  },
  methods: {
    getsearchdata(val) {
      this.searchdata = val;
      console.log(this.searchdata, 444);
    },
    changelist() {
      console.log(this.searchdata);
      this.listtype = !this.listtype;
    },
    optionData(data) {
      console.log("开始转换为树形数据");
      let cloneData = JSON.parse(JSON.stringify(data)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.pId
        ); // 返回每一项的子级数组
        father.key="0"
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.pId == 0; //返回第一层
      });
    },
    setdata() {
      this.treedata = this.optionData(this.data);
      console.log(this.treedata, 666);
    },
  },
  created() {
    this.setdata();
  },
};
</script>
<style  scoped>
.supervisionhome {
  height: 960px;
}
.content {
  width: 100%;
  height: 860px;
  position: relative;
  background-color: #fff;
  margin-bottom: 20px;
}
.changlist {
  width: 88px;
  height: 32px;
  line-height: 32px;
  background: rgba(24, 144, 255, 1);
  border: 1px solid rgba(24, 144, 255, 1);
  box-shadow: 0px 0px 6px rgba(24, 144, 255, 1);
  color: #fff;
  opacity: 1;
  border-radius: 4px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  cursor: pointer;
}
</style>