<template>
  <div class="flex_f father">
    <div class="isleftmodel">
      <div class="left_title">客户列表</div>
      <a-table
        :columns="tablecolumns"
        :data-source="tabledata"
        bordered
        :pagination="false"
        :customRow="rowClick"
      >
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode==1">启用</div>
          <div v-if="statusCode==2">备用</div>
          <div v-if="statusCode==0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="flex_f">
        <div class="isright_l">
          <div class="left_title_model">设备类型</div>
          <div class="tree_box tree_box1">
            <is-left
              :treedata="treedata"
              :replaceFields="replaceFields"
              :defaultExpandedKeys="defaultExpandedKeys"
                @selectdata="getselectdata"
              @checkedKeys="getcheckedKeys"
              v-if="showtree"
            ></is-left>
          </div>
        </div>
        <div class="isright_r">
          <div class="left_title_model">型号列表</div>
          <div class="tree_box">
            <a-table
              :columns="tablecolumns2"
              :data-source="tabledata2"
              :row-selection="rowSelection"    
              bordered
              :pagination="false"
            ></a-table>
          </div>
        </div>
      </div>
      <div class="r_b">
        <div class="r_b_title">授权描述:</div>
        <div class="rb_text">
          <a-textarea :maxlength="500" v-model="form.remark" :rows="5" />
          <div class="edit_number">{{remarklen}}/500</div>
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
import isLeft from "../../../components/tree/tree.vue";
export default {
  inject:['reload'],
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
      remark:"",
     isdefaultChecked :'路灯控制器NB版',
      rowSelection: {
         getCheckboxProps: record => ({
          props: {
            defaultChecked: record.modelName === this.isdefaultChecked, // Column configuration not to be checked
            name: record.modelName,
          },
        }),
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows, 2222);
          this.form.modelIdList = [];
          if (selectedRows.length > 0) {
            selectedRows.forEach((item) => {
              this.form.modelIdList.push(item.modelId);
            });
          }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows, 1111);
          this.form.modelIdList = [];
          if (selected == true) {
            selectedRows.forEach((item) => {
              this.form.modelIdList.push(item.modelId);
            });
          
          }
        }, 
      },
      tablecolumns: [
        {
          width: 58,
          align: "center",
          title: "序号",
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
        },
        {
          width: 141,
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
      tabletype: false,
      tabletype2: false,
      tablecolumns2: [
        {
          width: 58,
          align: "center",
          title: "型号序号",
          dataIndex: "modelId",
          key: "modelId",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "型号名称",
          dataIndex: "modelName",
          key: "modelName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "型号品牌",
          dataIndex: "brandName",
          key: "brandName",
          ellipsis: true,
        },
        {
          width: 141,
          align: "center",
          title: "设备类型",
          dataIndex: "deviceTypeName",
          key: "deviceTypeName",
          ellipsis: true,
        },
      ],
      tabledata2: [],
      treedata: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      treeprame: {
        customerId: "",
        operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
      },
      listparam: {
        operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
        customerId: "",
      },
      modellistparam: {
        operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
        customerId: "",
      },
      treemodelparam:{
        id:"",
        levelType:""
      },
      treemodeldata:"",
      customerId: "",
      form: {
        modelIdList: [],
        accountId: "",
        remark: "",
         operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
      },
      rowClick: (record) => ({
        // 事件
        on: {
          click: () => {
            // 点击改行时要做的事情
            // ......

           this.modellistparam.customerId= record.customerId;
            this.getmodellist();
            console.log(record, "record", this.customerId);
          },
        },
      }),
    };
  },
  created() {
    this.getlist();
    this.getareatree();
  },
  methods: {
    async getlist() {
      this.tabletype = false;
      let res = await this.$http.post(
        this.$api.customeraccountmylist,
        this.listparam
      );
      if (res.data.resultCode == "10000") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].statusCode == 1) {
            this.tabledata.push(res.data.data[i]);
          }
        }
        this.modellistparam.customerId = this.tabledata[0].customerId;
        this.form.customerId = this.tabledata[0].customerId; 
        this.getmodellist();
        this.tabletype = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getmodellist() {
      this.tabletype2 = false;
      let res = await this.$http.post(
        this.$api.customermodellist,
        this.modellistparam
      );
      if (res.data.resultCode == "10000") {
          this.tabledata2 = res.data.data;

        this.tabletype2 = true;
      } else {
         this.tabledata2 =''
        return this.$message.error(res.data.resultMsg);
      }
    },
        async gettreemodellist() {
      this.tabletype2 = false;
      let res = await this.$http.post(
        this.$api.devicemodelrelist,
        this.treemodelparam
      );
      if (res.data.resultCode == "10000") {
         console.log(res.data.data,7778888);
         this.treemodeldata=res.data.data
        this.tabletype2 = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getform() {
      this.tabletype2 = false;
      console.log(this.form,111111111111);
       this.form.customerId=this.modellistparam.customerId
      let res = await this.$http.post(this.$api.customermodelform, this.form);
      if (res.data.resultCode == "10000") {
        return this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getareatree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.devicetypetree, this.treeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
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
      console.log(val,544444);
           this.treemodelparam.id=val.id
      this.treemodelparam.levelType=val.levelType
      this.gettreemodellist()
    },
    getcheckedKeys(val) {
      console.log(val, 44444);
 
    },
    cancel(){
      this.reload()
    }
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isleftmodel {
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
.isright_l {
  width: 300px;
  margin-right: 20px;
  overflow: scroll;
}
.isright_l::-webkit-scrollbar {
  display: none;
}
.isright_r {
  width: 100%;
}
.left_title_model {
  width: 120px;
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
  width: 100%;
  height: 384px;
  margin-top: 20px;
  margin-bottom: 222px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
}
.tree_box1{
  padding: 20px;
  overflow: scroll;
}
.tree_box1::-webkit-scrollbar{
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
.rb_b_btn {
  margin-right: 8px;
}
</style>