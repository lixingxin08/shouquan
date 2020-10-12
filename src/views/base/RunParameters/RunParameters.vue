<template>
  <div class="administrativedivision">
    <is-delete-dialog
      v-if="visible"
      @confirm="confirm"
      @cancle="cancel"
    ></is-delete-dialog>
    <div class="flex_fs">
      <div>
        <div class="right right2">
          <div class="r_top flex_f">
            <div class="r_t_text" @click="showdialogrunn()">参数分组:</div>
            <a-select
              show-search
              placeholder="全部"
              option-filter-prop="children"
              style="width: 200px; margin-right: 20px"
              :filter-option="filterOption"
              v-model="runpageparam.typeCode"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
              <a-select-option value>全部</a-select-option>
              <a-select-option
                v-for="(item, index) in sel_data"
                :key="index"
                :value="item.comboBoxId"
                >{{ item.comboBoxName }}</a-select-option
              >
            </a-select>
            <div class="r_t_text" @click="showdialogrunn()">参数名称/代码:</div>
            <a-input
              placeholder="请输入名称/代码"
              class="r_t_inp"
              v-model="inp_data"
              @keydown.enter="tosearch()"
            />
            <div class="btn_blue btn" @click="tosearch()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <div class="isline"></div>
          <div class="flex_f">
            <a-button
              type="primary"
              class="table-add-btn btn2"
              @click="toadd('add')"
            >
              <a-icon two-tone-color="#ffffff" type="plus" />新增</a-button
            >
          </div>
          <div class="table" v-if="tabletype">
            <a-table
              :scroll="{ y: 610 }"
              :columns="tablecolumns"
              :data-source="tabledata"
              bordered
              :pagination="pagination"
              @change="handleTableChange"
            >
              <div
                slot="edit"
                class="flexrow flexac flexjc"
                slot-scope="childTotal, areaName"
              >
                <div
                  class="col_blue ispointer"
                  @click="toadd('edit', areaName)"
                >
                  编辑
                </div>
                <div class="item-line"></div>
                <div
                  class="col_red ispointer"
                  @click="showdialogrunn(areaName)"
                >
                  <span>删除</span>
                </div>
              </div>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isDeleteDialog from "../../../components/delete_confir/delete.vue";
export default {
  components: {
    isDeleteDialog,
  },
  data() {
    return {
      ModalText: "您确定要删除吗？",
      visible: false,
      showtree: false,
      tabletype: false,
      inp_data: "",
      sel_data: "",
      replaceFields: {
        title: "name",
        key: "id",
      },
      tablecolumns: [
        {
          width: 110,
          align: "center",
          title: "序号",
          dataIndex: "parameterId",
          key: "parameterId",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "参数名称",
          dataIndex: "parameterName",
          key: "parameterName",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "参数代码",
          dataIndex: "parameterCode",
          key: "parameterCode",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "参数数值",
          key: "parameterValue",
          dataIndex: "parameterValue",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "参数分组",
          key: "typeName",
          dataIndex: "typeName",
          ellipsis: true,
        },
        {
          width: 488,
          align: "center",
          title: "参数描述",
          key: "description",
          dataIndex: "description",
          ellipsis: true,
        },
        {
          width: 208,
          align: "center",
          title: "操作",
          ellipsis: true,
          key: "2",
          dataIndex: "childTotal",
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata: "",
      pagination: this.$config.pagination,
      issearchdata: "",
      removeparam: {
        parameterId: "",
      },
      runpageparam: {
        description: "",
        keyword: "",
        operatorId: "",
        pageIndex: 1,
        pageSize: 10,
        parameterCode: "",
        parameterId: "",
        parameterName: "",
        parameterValue: "",
        typeCode: "",
      },
    };
  },
  created() {
    this.getdictionarycombobox();
    this.getrunpage();
  },
  methods: {
    //数据字典下拉列表框接口
    async getdictionarycombobox() {
      let pram = {
        classCode: "runngin_parameter_type",
      };
      let res = await this.$http.post(this.$api.dictionarycombobox, pram);
      console.log(res, 12221);
      if (res.data.resultCode == "10000") {
        this.sel_data = res.data.data;
      } else {
        // this.$message.error(res.data.resultMsg);
      }
    },

    //运行参数列表接口
    async getrunpage() {
      this.tabletype = false;
      this.runpageparam.pageIndex = this.pagination.current;
      this.runpageparam.pageSize = this.pagination.pageSize;
      // if (this.vify_cn2(this.inp_data) == true) {//统一放keyword
        this.runpageparam.keyword = this.inp_data;
      // } else {
      //   this.runpageparam.parameterCode = this.inp_data;
      // }
      let res = await this.$http.post(this.$api.runpage, this.runpageparam);
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        this.runpageparam.keyword = "";
        this.runpageparam.parameterCode = "";
     if (this.pagination.current == 1){
             this.pagination.total = res.data.data.length;
          }
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //删除接口
    async getarunremove() {
      let prame = { parameterId: this.removeparam.parameterId };
      let res = await this.$http.post(this.$api.runremove, prame);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.getrunpage();
        this.visible = false;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    toadd(val, id) {
      localStorage.setItem("sel", JSON.stringify(this.sel_data));
      if (val == "add") {
        this.$router.push({
          path: "/addRunParameters",
          query: {
            type: val,
          },
        });
      } else {
        this.$router.push({
          path: "/addRunParameters",
          query: {
            type: val,
            id: id.parameterId,
            typeName: id.typeName,
          },
        });
      }
    },
    //查询
    tosearch() {
      this.pagination.current = 1;
      this.pagination.pageSize = 20;
      this.getrunpage();
    },
    //清除
    clear() {
      this.inp_data = "";
      this.runpageparam.keyword=''
      this.runpageparam.typeCode = "";
      // this.getareapage();
    },
    //弹窗
    showdialogrunn(val) {
      console.log(val, 221212);
      this.removeparam.parameterId = val.parameterId;
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.visible = false;
      this.getarunremove();
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.page = pagination.current;
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getrunpage();
    },

    handleChange(value) {
      console.log(`selected ${value}`);
      this.runpageparam.typeCode = value;
      console.log(this.runpageparam);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style scoped>
.tree {
  text-align: left;
}
.r_t_inp {
  width: 200px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-sizing: border-box;
}

.r_t_inp:focus {
  border: 1px solid #1890ff;
}

.btn {
  margin-right: 20px;
  margin-left: 20px;
}

.btn2 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.table_list {
  height: 42px;
}

.dialogrunn {
  width: 920px;
  height: 492px;
  position: relative;
  left: 50%;
  top: -870px;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  margin-top: 330px;
  border-radius: 8px;
  background-color: #fff;
  z-index: 2;
}

.dialogrunn_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogrunn_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
