<template>
  <div class="flex_f father">
    <div class="isleft no_pagination">
      <div class="left_title">客户列表</div>
      <a-table
       :scroll="{ y: 780 }"
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="pagination"
        :customRow="customRow"
        rowKey="index"
      >
        <template
          slot="index"
          slot-scope="text, record,index"
        >{{(index+1)+((pagination.current-1)*10)}}</template>
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode==1">启用</div>
          <div v-if="statusCode==2">备用</div>
          <div v-if="statusCode==0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="tree_boxmenu flex_f">
        <div class="tree_box_i tree_box_i_l no_pagination">
          <div class="left_title">选择授权模板</div>
          <div class="isscroll">
            <a-table
              :scroll="{  y: 340 }"
              :columns="tablecolumns2"
              :data-source="tabledata2"
              bordered
              :pagination="pagination2"
              :customRow="rowClick"
              rowKey="index2"
            >
              <template
              slot="index2"
              slot-scope="text, record,index"
            >{{(index+1)+((pagination2.current-1)*10)}}</template>
            </a-table>
          
          </div>
        </div>

        <div class="tree_box_i tree_box_i_r">
          <div class="flex_f templatetree_sel">
            <span>服务子系统：</span>
            <div>
              <a-select
                show-search
                placeholder="全部"
                option-filter-prop="children"
                style="width:200px;margin-right:20px;height:36px;border-radius: 8px;"
                @change="handleChange2"
                v-if="showtree"
              >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option
                  v-for="(item,index) in oldtreedata"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="tree_box_i_rtree">
            <div class="istree_box2">
              <is-left
                ref="select"
                :treedata="treedata"
                :replaceFields="replaceFields"
                :defaultExpandedKeys="defaultExpandedKeys"
                @checkedKeyslist="getcheckedKeys"
                :checkedKeys="checkedKeys"
                v-if="showtree"
              ></is-left>
            </div>
          </div>
        </div>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea :maxlength="500" v-model="form.remark" :rows="5" />
          <div class="remarknum">{{remarklen}}/500</div>
        </div>
        <div class="flex_a rb_b">
          <div class="flex_f">
            <div class="cancel_btn rb_b_btn" @click="cancel()">取消</div>
            <div class="ok_btn" @click="getform()">授权</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/check_seltree.vue";
export default {
  inject: ["reload"],
  components: {
    isLeft,
  },
  computed: {
    remarklen() {
      return this.form.remark.length;
    },
  },
  data() {
    return {
      pagination2: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
      },
      pagination: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      tablecolumns: [
        {
          width: 68,
          align: "center",
          title: "序号",
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index",
          },
        },
        {
          width: 131,
          align: "center",
          title: "客户简称",
          dataIndex: "shortName",
          key: "shortName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "客户状态",
          dataIndex: "statusCode",
          key: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
      ],
      tabledata: [],
      treedata: "",
      tabletype: false,
      tabletype2: false,
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      checkedKeys: [],
      tablecolumns2: [
        {
          width: 68,
          align: "center",
          title: "序号",
          ellipsis: true,
          scopedSlots: {
            customRender: "index2",
          },
        },
        {
          width: 160,
          align: "center",
          title: "模板名称",
          dataIndex: "templateName",
          key: "templateName",
          ellipsis: true,
        },
      ],
      tabledata2: [],
      treedata2: "",

      replaceFields2: {
        title: "name",
        key: "id",
      },
      firsttype:true,
      data: "",
      showtree: false,
      listparam: {
        operatorId: JSON.parse(localStorage.getItem("auth")).accountId,
        customerId: "",
      },
      pagination: {
        total: 0,
        pageSize: 1000, //每页中显示10条数据
        showSizeChanger: false,
        showQuickJumper: false,
        current: 1,
        page: 1,
        // pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        // showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      treeprame: {
        templateId: "",
      },
      customertreeprame: {
        customerId: "",
      },
      detailparame: {
        pageIndex: "",
        pageSize: "",
      },
      form: {
        customerId: "",
        templateId: "",
        menuIdList: "",
        remark: "",
      },
      rowClick: (record, index) => ({
        // 事件
               style: {
          // 行背景色
          "background-color":
            record.templateId == this.treeprame.templateId ? "#e6f7ff" : "",
        },
        on: {
          click: () => {
            // 点击改行时要做的事情
            // ......
            console.log(record, "record", index);
                this.firsttype=true
            this.treeprame.templateId = record.templateId;
            this.gettemplatetree();
          },
        },
      }),
    };
  },
  created() {
    this.getlist();
    this.getdetail();
    console.log(localStorage.getItem("user"), 111);
  },
  methods: {
    customRow(record, index) {
      return {
        style: {
          // 行背景色
          "background-color":
            record.customerId == this.form.customerId ? "#e6f7ff" : "",
        },
        on: {
          // 鼠标单击行
          click: (event) => {
            this.firsttype=true
            this.form.customerId = record.customerId;
            this.customertreeprame.customerId = record.customerId;
            this.treeprame.templateId=""
            this.gettree();
            console.log(record, "record", index);
          },
        },
      };
    },
    async gettemplatetree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.templatetree, this.treeprame);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
      this.oldtreedata = this.treedata;
      console.log(this.oldtreedata, 9089080);
    },
    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(
        this.$api.customertemplatetree,
        this.customertreeprame
      );
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
      this.oldtreedata = this.treedata;
      console.log(this.oldtreedata, 9089080);
    },
    async getlist() {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customerinformationlist,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].statusCode == 1) {
            this.tabledata.push(res.data.data[i]);
          }
        }
        this.form.customerId = this.tabledata[0].customerId;
        this.customertreeprame.customerId = this.tabledata[0].customerId;
        this.gettree();
        if (this.pagination.current == 1){
             this.pagination.total = res.data.data.length;
          }
        this.tabletype = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getdetail() {
      this.tabletype2 = false;
      this.detailparame.pageIndex = this.pagination.page;
      this.detailparame.pageSize = this.pagination.pageSize;
      let res = await this.$http.post(
        this.$api.templatelist,
        this.detailparame
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
      this.tabletype2 = true;
    },
    async getform() {
      this.form.operatorId = 1;
      if (this.firsttype==true) {      
      }else{
        this.form.menuIdList = this.checkedKeys;
      }    
      if (this.form.menuIdList == "" || this.form.menuIdList == []) {
        return this.$message.error("请选择授权系统");
      }
      let res = await this.$http.post(
        this.$api.customertemplateform,
        this.form
      );
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
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
      console.log(11222);
      this.defaultExpandedKeys=[]
      this.checkedKeys=[]
      this.form.menuIdList=[]
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].open == true) {
          this.defaultExpandedKeys.push(this.data[i].id);
        }
        if (this.data[i].checked == true&&this.data[i].isParent==false) {
          this.checkedKeys.push(this.data[i].id);
        }
         if (this.data[i].checked == true) {
           this.form.menuIdList.push(this.data[i].id);
        }
      }
      
      console.log(this.form.menuIdList,111111);
      this.treedata = this.toTree(this.data);
    },
    getcheckedKeys(val) {
      this.firsttype=false
      this.checkedKeys = val;
      this.form.menuIdList = val;
    },
    handleChange2(value, key) {
      console.log(value, key);
      this.showtree = false;
      this.treedata = this.oldtreedata;
      if (value == "all") {
        this.checkedKeys;
      } else {
        let filterTreeNode = "";
        for (let i = 0; i < this.treedata.length; i++) {
          if (this.treedata[i].id == value) {
            filterTreeNode = this.treedata[i];
          }
        }
        this.treedata = Array(filterTreeNode);
      }
      this.showtree = true;
      console.log(this.checkedKeys, 5544444);
    },
    cancel() {
      this.reload();
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
  padding-left: 20px;
  text-align: left;
  background: #ffffff;
}
.left_title {
  width: 120px;
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 16px;
}
.r_t_inp {
  margin-left: 10px;
}
.btn {
  margin-left: 20px;
}
.tree_boxmenu {
  width: 1232px;
  height: 460px;
  margin-bottom: 180px;
  background: #ffffff;
}
.tree_box_i {
  width: 600px;
  height: 460px;
}
.tree_box_i_l {
  padding-left: 20px;
  width: 356px;
  padding-right: 60px;
}
.isscroll {
  width: 100%;
  height: 100%;
  max-height: 436px;
  padding-right: 20px;
  box-sizing: border-box;
}
.tree_box_i_r {
  width: 896px;
  color: #333;
}
.templatetree_sel {
  width: 100%;
  height: 76px;
  border: 1px solid #dcdcdc;
  margin-top: 20px;
  box-sizing: border-box;
}
.tree_box_i_rtree {
  width: 100%;
  padding-top: 28px;
  height: 512px;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-top: none;
    overflow: scroll;
}
.tree_box_i_rtree::-webkit-scrollbar {
  display: none;
}
.istree_box2 {
  width: 100%;
  height: 4865x;
  margin: 0 auto;
  overflow: scroll;
  box-sizing: border-box;
}
.istree_box2::-webkit-scrollbar {
  display: none;
}
.r_b_title {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.rb_text {
  margin-top: 20px;
  position: relative;
}
.rb_b {
  margin-top: 40px;
  text-align: center;
}

</style>
