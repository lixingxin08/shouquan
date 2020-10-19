<template>
  <div class="flex_f father modelauthorization">
        <is-delete-dialog
      v-if="visible"
      @confirm="confirm"
      @cancle="cancel"
    ></is-delete-dialog>
    <div class="isleftmodel no_pagination">
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
        <template slot="index" slot-scope="text, record, index">{{
          index + 1 + (pagination.current - 1) * 10
        }}</template>
        <div slot="statusCode" class="flex_a" slot-scope="statusCode">
          <div v-if="statusCode == 1">启用</div>
          <div v-if="statusCode == 2">备用</div>
          <div v-if="statusCode == 0">关闭</div>
        </div>
      </a-table>
    </div>
    <div class="isright">
      <div class="isright_r">
        <div class="left_title_model">型号列表</div>
        <a-button type="primary" class="table-add-btn btn2" @click="addtogle()"
          >添加型号</a-button
        >
        <div class="tree_box tree_box1 tree_box2" v-if="!addmodel">
          <a-table
            :columns="tablecolumns2"
            :data-source="tabledata2"
            bordered
            :pagination="pagination2"
            v-if="tabletype"
          >
            <template slot="index2" slot-scope="text, record, index">{{
              index + 1 + (pagination2.current - 1) * 10
            }}</template>
            <template slot="edit" slot-scope="record">
              <div class="flexrow flexac flexjc">
                <div class="col_blue ispointer" @click="toedit(record)">
                  编辑
                </div>
                <div class="item-line"></div>
                <div
                  class="col_red ispointer"
                  @click="showdialogperson(record)"
                  v-if="record.useTotal == 0"
                >
                  <span>删除</span>
                </div>
                <div class="col_gray ispointer" v-else>
                  <span>删除</span>
                </div>
              </div>
            </template>
          </a-table>
        </div>
        <div class="add_model" v-if="addmodel">
          <div class="tree_box tree_box1 tree_box2">
            <div class="left_title_model add_model_t flex_b">
              <span> 新增型号</span>
              <a-icon type="close" style="cursor: pointer" @click="isclose()" />
            </div>
            <div class="flex_f">
              <div class="isright_l">
                <div class="tree_box tree_box1 tree_box3 isright_l_l">
                  <is-left
                    :treedata="treedata"
                    :replaceFields="replaceFields"
                    :defaultExpandedKeys="defaultExpandedKeys"
                    :defaultSelectedKeys="defaultSelectedKeys"
                    @selectdata="getselectdata"
                    v-if="showtree"
                  ></is-left>
                </div>
              </div>
              <div class="isright_r isright_r2">
                <div class="tree_box tree_box1 tree_box3">
                  <a-table
                    :columns="tablecolumns3"
                    :data-source="tabledata2"
                    :row-selection="{
                      selectedRowKeys: this.selectedRowKeys2,
                      onChange: onSelectChange2,
                      type: 'radio',
                    }"
                    bordered
                    :pagination="pagination2"
                    v-if="tabletype"
                  >
                    <template slot="index2" slot-scope="text, record, index">{{
                      index + 1 + (pagination2.current - 1) * 10
                    }}</template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
          <div class="r_b">
            <div class="flex_f authtotal">
              <span>授权个数:</span>
              <a-input
                class="num_inpt"
                v-model="form.authTotal"
                type="number"
                placeholder="请输入授权个数"
              />
              <span style="font-size: 14px">注:授权个数不能大于9999</span>

            </div>
            <div class="r_b_title">授权描述:</div>
            <div class="rb_text2">
              <a-textarea :maxlength="256" v-model="form.remark" :rows="5" />
              <div class="remarknum">{{ remarklen }}/256</div>
            </div>
          </div>
          <div class="flex_a rb_b2">
            <div class="flex_f">
              <div class="ok_btn" @click="getform()">授权</div>
              <div class="cancel_btn rb_b_btn" @click="reset()">重置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="isedit" v-if="edittype">
      <div class="left_title_model add_model_t flex_b">
        <span> 编辑</span>
        <a-icon type="close" style="cursor: pointer" @click="closeedit()" />
      </div>
      <div class="edit_c">
        <div class="edit_c_item flex_f">
          <span>型号名称:</span>
          <a-input class="edit_a_input" v-model="editdata.modelName" disabled />
        </div>
        <div class="edit_c_item flex_f">
          <span><span class="col_red">*</span>授权个数:</span>
          <a-input
            class="edit_a_input"
            v-model="editdata.authTotal"
            type="number"
          />
        </div>
        <div class="edit_c_item flex_f">
          <span>已用个数:</span>
          <span class="edit_a_input text_s" style="light-height: 32px">{{
            editdata.useTotal
          }}</span>
        </div>
        <div class="edit_c_item edit_c_item_area flex_f">
          <span>授权描述:</span>
          <div class="rb_text2 edit_a_input">
            <a-textarea :maxlength="500" v-model="editdata.remark" :rows="5" />
            <div class="remarknum">{{ editremarklen }}/500</div>
          </div>
        </div>
      </div>
      <div class="flex_a rb_b2">
        <div class="flex_f">
          <div class="ok_btn" @click="geteditform()">授权</div>
          <div class="cancel_btn rb_b_btn" @click="editreset()">重置</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isLeft from "../../../components/tree/tree2.vue";
import isDeleteDialog from "../../../components/delete_confir/delete.vue";
export default {
  inject: ["reload"],
  components: {
    isLeft,
      isDeleteDialog,
  },
  computed: {
    remarklen() {
      return this.form.remark.length;
    },
    editremarklen() {
      return this.editdata.remark.length;
    },
  },
  data() {
    return {
      authTotal: "",
      defaultSelectedKeys: [],
      selectedRowKeys2: [],
      selectedRowKeys1: [],
      remark: "",
      addtype: false,
      edittype: false,
      isdefaultChecked: "路灯控制器NB版",
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
          width: 141,
          align: "center",
          title: "客户简称",
          dataIndex: "shortName",
          key: "shortName",
          ellipsis: true,
        },
        {
          width: 131,
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
      pagination: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      pagination2: {
        total: 0,
        pageSize: 10000, //每页中显示10条数据
        current: 1,
        page: 1,
        hideOnSinglePage: true,
      },
      editdata: {},
      tabletype: false,
      tablecolumns2: [
        {
          width: 38,
          align: "center",
          title: "序号",
          dataIndex: "modelId",
          key: "modelId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index2",
          },
        },
        {
          width: 101,
          align: "center",
          title: "型号名称",
          dataIndex: "modelName",
          key: "modelName",
          ellipsis: true,
        },
        {
          width: 101,
          align: "center",
          title: "设备品牌",
          dataIndex: "brandName",
          key: "brandName",
          ellipsis: true,
        },
        {
          width: 101,
          align: "center",
          title: "设备类型",
          dataIndex: "deviceTypeName",
          key: "deviceTypeName",
          ellipsis: true,
        },
        {
          width: 101,
          align: "center",
          title: "授权个数",
          dataIndex: "authTotal",
          key: "authTotal",
          ellipsis: true,
        },
        {
          width: 101,
          align: "center",
          title: "已用个数",
          dataIndex: "useTotal",
          key: "useTotal",
          ellipsis: true,
        },
        {
          width: 101,
          align: "center",
          title: "挂载设备数",
          dataIndex: "useTotal",
          key: "useTotal",
          ellipsis: true,
        },
        {
          width: 68,
          align: "center",
          title: "操作",
          ellipsis: true,
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tablecolumns3: [
        {
          width: 38,
          align: "center",
          title: "序号",
          dataIndex: "modelId",
          key: "modelId",
          ellipsis: true,
          scopedSlots: {
            customRender: "index2",
          },
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
          title: "设备品牌",
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
        key: "idpid",
      },
      defaultExpandedKeys: [],
      data: "",
      showtree: false,
      addmodel: false,
      treeprame: {
        customerId: "",
      },
      listparam: {
        customerId: "",
      },
      modellistparam: {
        customerId: "",
      },
      treemodelparam: {
        id: "",
        levelType: "",
        customerId: "",
        deviceTypeId: "",
      },

      customerId: "",
      form: {
        modelId: "",
        accountId: "",
        remark: "",
        authTotal: "",
        customerId: "",
      },
      oldeditdata: "",
      visible:false,
      removeparam:{
        modelId:""
      }
    };
  },
  created() {
    this.getlist();
  },
  methods: {
     confirm() {
      this.visible = false;
      this.getremove(this.removeparam)
    },
     cancel() {
      this.visible = false;
    },
    onSelectChange2(selectedRowKeys3) {
      console.log("selectedRowKeys changed: ", selectedRowKeys3);
      this.selectedRowKeys2 = [];
      this.form.modelId = "";
      for (let i = 0; i < selectedRowKeys3.length; i++) {
        this.selectedRowKeys2.push(selectedRowKeys3[i]);
        this.form.modelId = this.tabledata2[selectedRowKeys3[i]].modelId;
      }
      console.log(this.form.modelId, 111);
    },
    toedit(val) {
      this.editdata = JSON.parse(JSON.stringify(val));
      this.oldeditdata = JSON.parse(JSON.stringify(val));

      this.edittype = true;
    },
    closeedit() {
      this.edittype = false;
      this.editdata = "";
      this.getmodellist();
    },
    isclose() {
      this.addmodel = false;
      this.getmodellist();
    },
    addtogle() {
      console.log(111);
      this.addmodel = true;
      this.edittype = false;
      this.getareatree();
    },
    reset() {
      this.selectedRowKeys2 = [];
      this.form.modelId = "";
      this.form.authTotal = "";
      this.form.remark = "";
      this.getareatree();
    },
    editreset() {
      this.editdata = JSON.parse(JSON.stringify(this.oldeditdata));
    },
    customRow(record, index) {
      return {
        style: {
          // 行背景色
          "background-color":
            record.customerId == this.modellistparam.customerId
              ? "#e6f7ff"
              : "",
        },
        on: {
          // 鼠标单击行
          click: (event) => {
            this.selectedRowKeys1 = [];
            this.form.modelId = "";
            this.addmodel = false;
            this.closeedit();
            this.modellistparam.customerId = record.customerId;
            this.treeprame.customerId = record.customerId;
             this.form.customerId= record.customerId;
            this.authTotal = record.authTotal;
            this.getmodellist();
            console.log(record, "record", index);
          },
        },
      };
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
        this.modellistparam.customerId = this.tabledata[0].customerId;
        this.form.customerId = this.tabledata[0].customerId;
        this.treeprame.customerId = this.tabledata[0].customerId;
        this.authTotal = this.tabledata[0].authTotal;

        this.getmodellist();
        this.tabletype = true;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getmodellist() {
      this.tabletype = false;
      this.tabledata2 = [];
      let res = await this.$http.post(
        this.$api.customermodellist,
        this.modellistparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
      } else {
        this.tabledata2 = "";
        return this.$message.error(res.data.resultMsg);
      }
      this.tabletype = true;
    },
    async gettreemodellist() {
      this.treemodelparam.customerId = this.form.customerId;
      this.tabledata2 = [];
      let res = await this.$http.post(
        this.$api.devicemodelrelist,
        this.treemodelparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata2 = res.data.data;
      } else {
        this.tabledata2 = "";
        return this.$message.error(res.data.resultMsg);
      }
    },
    //删除customermodelremove
    async getremove(val) {
      console.log(val);
      let parame = {
        customerId: this.form.customerId,
        modelId: val.modelId,
      };
      let res = await this.$http.post(this.$api.customermodelremove, parame);
      if (res.data.resultCode == "10000") {
        this.getmodellist();
        return this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
       //弹窗
    showdialogperson(val) {
      this.removeparam.modelId = val.modelId;
      this.visible = true;
    },
    geteditform() {
      this.form.modelId = this.editdata.modelId;
      this.form.remark = this.editdata.remark;
      this.form.authTotal = this.editdata.authTotal;
      this.getform();
    },
    async getform() {
      if (this.form.authTotal.length >= 5) {
        return this.$message.error("授权个数不能大于9999");
      }
      this.form.customerId = this.modellistparam.customerId;
      let res = await this.$http.post(this.$api.customermodelform, this.form);
      if (res.data.resultCode == "10000") {
          this.addmodel = false;
           this.edittype = false;
           this.getmodellist();
        return this.$message.success(res.data.resultMsg);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    async getareatree() {
      this.showtree = false;
      this.tabletype = false;
      let res = await this.$http.post(this.$api.devicetypetree, this.treeprame);
      console.log(res, 11);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      } else {
        return this.$message.error(res.data.resultMsg);
      }
      this.setdata();

      this.treemodelparam.id = this.treedata[0].id;
      this.treemodelparam.levelType = this.treedata[0].levelType;
      this.gettreemodellist();
      this.tabletype = true;
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
        this.data[i].idpid=this.data[i].id+this.data[i].pid
        if (this.data[i].open == true) {
          this.defaultExpandedKeys.push(this.data[i].id);
        }
      }
      this.defaultSelectedKeys = [];
      this.treedata = this.toTree(this.data);
      this.defaultSelectedKeys.push(this.treedata[0].idpid);
      console.log(this.defaultSelectedKeys, 77766);
    },
    getselectdata(val) {
      this.selectedRowKeys2 = [];
      this.form.modelId = "";
      this.treemodelparam.id = val.id;
      this.treemodelparam.levelType = val.levelType;
      this.treemodelparam.deviceTypeId = val.pid;
      this.gettreemodellist();
    },
  },
};
</script>
<style  scoped>
.father {
  height: 100%;
}
.isedit {
  position: absolute;
  width: 1250px;
  height: 600px;
  right: 10px;
  top: 100px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
}
.edit_c {
  padding-left: 100px;
  min-height: 350px;
  box-sizing: border-box;
}
.edit_c_item {
  margin-top: 20px;
}
.edit_c_item_area {
  margin-top: 50px;
}
.edit_a_input {
  margin-left: 20px;
}
.modelauthorization {
  position: relative;
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
  width: 280px;
  margin-right: 20px;
  margin-left: 20px;
  overflow: scroll;
}
.isright_l::-webkit-scrollbar {
  display: none;
}
.isright_r {
  width: 100%;
}
.isright_r2 {
  margin-right: 20px;
}

.add_model {
  height: 800px;
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
  width: 100%;
  height: 536px;
  margin-top: 20px;
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
}
.isright_l_l {
  padding: 20px;
  box-sizing: border-box;
}
.tree_box1 {
  overflow: scroll;
}
.tree_box1::-webkit-scrollbar {
  display: none;
}
.tree_box2 {
  margin-top: 0;
  height: 484px;
}
.tree_box3 {
  margin-top: 0;
  height: 384px;
  margin-bottom: 5px;
}
.authtotal {
  font-size: 18px;
  margin-bottom: 10px;
}
.num_inpt {
  width: 200px;
  height: 32px;
  margin-left: 20px;
  margin-right: 20px;
}
.r_b_title {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.rb_text2 {
  margin-top: 10px;
  position: relative;
}
.rb_b2 {
  margin-top: 20px;
  text-align: center;
}
</style>