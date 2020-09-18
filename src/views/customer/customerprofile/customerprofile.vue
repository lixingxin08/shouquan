<template>
  <div class="administrativedivision iscusto">
      <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
    <div class="flex_fs custor_box">
        <div class="right2">
          <div class="r_top flex_f">
            <div class="r_t_text" @click="showdialogcumfile()">客户名称:</div>
            <a-input
              placeholder="请输入客户名称"
              class="r_t_inp"
              v-model="runpageparam.keyword"
              @keydown.enter="tosearch()"
            />

            <div class="r_t_text" @click="showdialogcumfile()">客户状态:</div>
            <a-select
              show-search
              placeholder="全部"
              option-filter-prop="children"
              style="width: 200px;margin-right:20px"
              :filter-option="filterOption"
              v-model="runpageparam.statusCode"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option
                v-for="(item,index) in sel_data"
                :key="index"
                :value="item.id"
              >{{item.val}}</a-select-option>
            </a-select>
            <div class="btn_blue btn" @click="tosearch()">查询</div>
            <div class="btn_gray" @click="clear()">清除</div>
          </div>
          <div class="isline"></div>
          <div class="btn_blue btn2" @click="toadd('add')"> <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" />新增</div>
          <div class="table" v-if="tabletype">
            <a-table
              :scroll="{  y: 610 }"
              :columns="tablecolumns"
              :data-source="tabledata"
              bordered
              :pagination="pagination"
              @change="handleTableChange"
            >
             <template
                slot="index"
                slot-scope="text, record,index"
              >{{(index+1)+((pagination.current-1)*10)}}</template>
              <div slot="statusCode" class="flex_a" slot-scope="statusCode">
                <div v-if="statusCode==1">启用</div>
                <div v-if="statusCode==2">备用</div>
                <div v-if="statusCode==0">锁定</div>
              </div>
              <div slot="Integer" class="flex_a" slot-scope="Integer">
                <div v-if="Integer==1">是</div>
                <div v-if="Integer==0">否</div>
              </div>
              <div slot="existDepartment" class="flex_a" slot-scope="existDepartment">
                <div v-if="existDepartment==1">是</div>
                <div v-if="existDepartment==0">否</div>
              </div>

              <div slot="edit" class="flex_a" slot-scope="childTotal,areaName">
                <div class="col_blue ispointer" @click="toadd('edit',areaName)">编辑</div>
                <div class="col_red ispointer" @click="showdialogcumfile(areaName)">
                  <span>删除</span>
                </div>
              </div>
            </a-table>
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
      tabletype: false,
      sel_data: [{val:"启用",id:1},{val:"备用",id:2},{val:"锁定",id:0},],
      tablecolumns: [
        {
          width: 208,
          align: "center",
          title: "序号",
          dataIndex: "customerId",
          key: "customerId",
          ellipsis: true,
             ellipsis: true,
            scopedSlots: {
            customRender: "index",
          },  
        },
        {
          width: 158,
          align: "center",
          title: "客户全称",
          dataIndex: "customerName",
          key: "customerName",
          ellipsis: true,
        },
        {
          width: 138,
          align: "center",
          title: "客户简称",
          dataIndex: "shortName",
          key: "shortName",
          ellipsis: true,
        },
        {
          width: 158,
          align: "center",
          title: "联系人姓名",
          key: "linkman",
          dataIndex: "linkman",
          ellipsis: true,
        },
        {
          width: 108,
          align: "center",
          title: "联系人手机",
          key: "linkphone",
          dataIndex: "linkphone",
          ellipsis: true,
        },
        {
          width: 158,
          align: "center",
          title: "客户状态",
          key: "statusCode",
          dataIndex: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
        {
          width: 108,
          align: "center",
          title: "是否授权",
          key: "Integer",
          dataIndex: "Integer",
          ellipsis: true,
          scopedSlots: {
            customRender: "Integer",
          },
        },
        {
          width: 158,
          align: "center",
          title: "是否建立部门",
          key: "existDepartment",
          dataIndex: "existDepartment",
          ellipsis: true,
          scopedSlots: {
            customRender: "existDepartment",
          },
        },
        {
          width: 208,
          align: "center",
          title: "操作",
          ellipsis: true,
          scopedSlots: {
            customRender: "edit",
          },
        },
      ],
      tabledata: "",
      pagination: {
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        showQuickJumper:true,
        current: 1,
        page: 1,
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      issearchdata: "",
      removeparam: {
        customerId: "",
      },
      istotal: {
        type: 1,
      },
      runpageparam: {
        statusCode: "",
        keyword: "",
        operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getpage();
  },
  methods: {
    //列表接口
    async getpage() {
      this.tabletype = false;
      this.runpageparam.pageIndex = this.pagination.current;
      this.runpageparam.pageSize = this.pagination.pageSize;
      let res = await this.$http.post(
        this.$api.informationpage,
        this.runpageparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        this.runpageparam.keyword = "";
        this.runpageparam.parameterCode = "";
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //删除接口
    async getremove() {
      let res = await this.$http.post(this.$api.deleteByInformationId, this.removeparam);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.getpage();
        this.visible = false;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    toadd(val, id) {

      if (val == "add") {
        this.$router.push({
          path: "/addcustomerprofile",
          query: {
            type: val,
          },
        });
      } else {
        console.log(id, 9899);
        this.$router.push({
          path: "/addcustomerprofile",
          query: {
            type: val,
            id: id.customerId,
          },
        });
      }
    },
    //查询
    tosearch() {
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.istotal.type = 1;
      this.getpage();
    },
    //清除
    clear() {
      this.runpageparam.keyword = "";
      this.runpageparam.statusCode = "";
      // this.getareapage();
    },
    //弹窗
    showdialogcumfile(val) {
      console.log(val, 221212);
      this.removeparam.customerId = val.customerId;
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.getremove();
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getpage();
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

.custor_box{
  width: 1672px;
}
.iscusto{
  padding-left: 20px;
}
.r_t_text {
  height: 16px;
  font-size: 12px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  margin-right: 10px;
}

.r_t_inp {
  width: 200px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-right: 20px;
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

.dialogcumfile {
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

.dialogcumfile_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogcumfile_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
