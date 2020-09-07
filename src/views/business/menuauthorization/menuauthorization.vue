<template>
  <div class="flex_f father">
    <div class="isleft">
      <div class="left_title">客户列表</div>
      <a-table :columns="tablecolumns" :data-source="tabledata" bordered :pagination="false"></a-table>
    </div>
    <div class="isright">
      <div class="r_t flex_f">
        <div>区划名称:</div>
        <div>
          <a-input placeholder="请输入区划名称" class="r_t_inp" />
        </div>
        <div class="btn_blue btn">查询</div>
      </div>
      <div class="tree_box">
        <is-left
          :treedata="treedata"
          :replaceFields="replaceFields"
          :defaultExpandedKeys="defaultExpandedKeys"
          @checkedKeys="getcheckedKeys"
          v-if="showtree"
        ></is-left>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea placeholder="Basic usage" :rows="5" />
        </div>
        <div class="flex_a rb_b">
          <div class="flex_f">
            <div class="cancel_btn rb_b_btn">取消</div>
            <div class="ok_btn">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/seltree.vue";
export default {
  components: {
    isLeft,
  },
  data() {
    return {
      tablecolumns: [
        {
          width: 58,
          align: "center",
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          width: 141,
          align: "center",
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          width: 141,
          align: "center",
          title: "Address",
          dataIndex: "address",
          key: "address 1",
          ellipsis: true,
        },
      ],
      tabledata: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
      treedata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      areatreeprame: {
        //行政区划树接口参数
        areaId: "",
        keyword: "",
        keyword: "",
        latitude: 0,
        longitude: 0,
        operatorId: "",
        pageIndex: 0,
        pageSize: 10,
        parentId: "",
        remark: "",
      },
    };
  },
  created() {
    this.getareatree();
  },
  methods: {
    async getareatree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.areatree, this.areatreeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      this.setdata();
      this.showtree = true;
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
    //获取树搜索数据
    getsearchdata(val) {
      this.issearchdata = val;
      this.getareatree();
      if (val == "") {
        return;
      }

      this.filterdata = [];
      this.setfilltertree(this.treedata, this.issearchdata);
    },
    //过滤树搜索数据
    setfilltertree(datas, filtersdata) {
      let _that = this;
      for (var i in datas) {
        let name = datas[i].name + "";
        if (name.search(_that.issearchdata) != -1) {
          _that.filterdata.push(datas[i]);
        }
        if (datas[i].children) {
          _that.setfilltertree(datas[i].children);
        }
      }
      _that.treedata = _that.toTree(this.filterdata);
    },
    getselectdata(val) {
      this.isselectdata = val;
      this.isselectdata.id = val.id;
      this.isselectdata.name = val.name;
      this.isselectdata.pid = val.pid;
      this.istotal.type = 1;
    },
    getcheckedKeys(val) {
      console.log(val, 44444);
    },
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isleft {
  width: 400px;
  padding: 0 20px;
  height: 100%;
  background: #ffffff;
  border-right: 20px solid #f0f2f5;
  box-sizing: border-box;
}
.isright {
  width: 1272px;
  height: 100%;
  padding: 20px;
  text-align: left;
  background: #ffffff;
}
.left_title {
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 20px;
}
.r_t_inp {
  margin-left: 10px;
}
.btn {
  margin-left: 20px;
}
.tree_box {
  width: 1232px;
  height: 353px;
  margin-top: 20px;
  margin-bottom: 170px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
}
.r_b_title {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.rb_text {
  margin-top: 30px;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}
.rb_b_btn {
  margin-right: 8px;
}
</style>