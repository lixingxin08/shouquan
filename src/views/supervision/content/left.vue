<template>
  <div id="search">
    <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>
    <div class="istree">
      <a-tree :show-line="showLine" @select="onSelect" :tree-data="treeData2">
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
      searchdata: "",
      treeData2: [
        {
          title: "parent 1",
          key: "1",
          children: [
            {
              title: "parent 1-0",
              key: "12",
              children: [
                { title: "leaf", key: "121" },
                { title: "leaf2", key: "122" },
              ],
            },
            {
              title: "parent 1-1",
              key: "0-0-1",
              children: [{ title: "leaf",key: "0-0-1-0", }],
            },
          ],
        },
      ],
    };
  },
  props: {
    treedata: Array,
  },
  created() {
    console.log(this.treedata);
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onSearch(value) {
      this.searchdata = value;
      this.$emit("searchdata", this.searchdata);
    },
    arrayToTree(arr, parentId) {
      //  arr 是返回的数据  parendId 父id
      let temp = [];
      let treeArr = arr;
      treeArr.forEach((item, index) => {
        if (item.parentId == parentId) {
          if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
            // 递归调用此函数
            treeArr[index].children = arrayToTree(treeArr, treeArr[index].id);
          }
          temp.push(treeArr[index]);
        }
      });

      return temp;
    },
  },
};
</script>
<style scoped>
#search {
  width: 280px;
  height: 840px;
  padding: 20px;
  background-color: #fff;
}
.search {
  width: 240px;
}
.istree {
  text-align: left;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.istree::-webkit-scrollbar {
  display: none;
}
</style>
