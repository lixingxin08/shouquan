<template>
  <div class="search">
    <!-- <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>-->
    <div class="istree">
      <a-tree
        :show-line="showLine"
        @select="onSelect"
        :tree-data="treedata"
        :replaceFields="replaceFields"
        :default-selected-keys='defaultSelectedKeys'
        :default-expanded-keys="defaultExpandedKeys"
      >
        <a-icon slot="icon" type="carry-out" />
      </a-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLine: true,
      showIcon: true,
      olddata:""
    };
  },
  props: {
    treedata: Array, //树数据
    replaceFields: Object, //替换属性
    defaultExpandedKeys: Array, //默认展开
    defaultSelectedKeys:Array
  },
  created() {},
  beforeUpdate() {
                this.$config.pagination= {
          "total": 0, //总页数
          "pageSize": 20, //每页中显示10条数据
          "showSizeChanger": true,
          "current": 1, //当前页
          "page": 1, //几页
          "size": "default",
          "pageSizeOptions": ["20", "50", "100"], //每页中显示的数据
          "showTotal": (total) => `共有 ${total} 条数据`, //分页中显示总的数据
}
  },
  methods: {
    onSelect(selectedKeys, selectedNodes) {
             this.$config.pagination= {
          "total": 0, //总页数
          "pageSize": 20, //每页中显示10条数据
          "showSizeChanger": true,
          "current": 1, //当前页
          "page": 1, //几页
          "size": "default",
          "pageSizeOptions": ["20", "50", "100"], //每页中显示的数据
          "showTotal": (total) => `共有 ${total} 条数据`, //分页中显示总的数据
}
      if (selectedNodes.selected==false) {
        return
      }
      this.olddata=selectedNodes.selectedNodes[0].data.props
      this.$emit("selectdata", selectedNodes.selectedNodes[0].data.props || "");
    },
    onSearch(value) {
      console.log(value, 88292);
      this.$emit("searchdata", value);
    },
  },
};
</script>
<style scoped>

.istree {
  width: 100%;
  text-align: left;
  height: 90vh;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  overflow-y: scroll;
}
.istree::-webkit-scrollbar {
  display: none;
}
</style>
