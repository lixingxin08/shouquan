<template>
  <div class="administrativedivision">
        <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
    <div class="flex_fs">
        <div class="right2 proj_box">
          <div class="r_top flex_f">
            <div class="r_t_text">项目名称:</div>
            <a-input
              placeholder="请输入项目名称"
              class="r_t_inp"
              v-model="pageparam.keyword"
              @keydown.enter="tosearch()"
            />
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
                <div v-if="statusCode==0">关闭</div>
              </div>
             <div slot="defaultChecked" class="flex_a" slot-scope="defaultChecked">
                <div v-if="defaultChecked==1">已选中</div>
                <div v-if="defaultChecked==0">未选中</div>
              </div>
              <div slot="edit" class="flexrow flexac flexjc" slot-scope="childTotal,areaName">
                <div class="col_blue ispointer" @click="toadd('edit',areaName)">编辑</div>
                <div class="item-line"></div>
                <div class="col_blue ispointer" @click="tostage(areaName)">阶段信息</div>
                 <div class="item-line"></div>
                <div class="col_red ispointer" @click="showdialogproj(areaName)">
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
  inject:['reload'],
  data() {
    return {
      ModalText: "您确定要删除吗？",
      visible: false,
      tabletype: false,
      tablecolumns: [
        {
          width: 158,
          align: "center",
          title: "项目序号",
          dataIndex: "projectId",
          key: "projectId",
          ellipsis: true,
           ellipsis: true,
              scopedSlots: {
            customRender: "index",
          }, 
        },
        {
          width: 208,
          align: "center",
          title: "项目名称",
          dataIndex: "projectName",
          key: "projectName",
          ellipsis: true,
        },
        {
          width: 108,
          align: "center",
          title: "合同编号",
          dataIndex: "contractNo",
          key: "contractNo",
          ellipsis: true,
        },
        {
          width: 88,
          align: "center",
          title: "开始日期",
          key: "startDate",
          dataIndex: "startDate",
          ellipsis: true,
        },
        {
          width: 88,
          align: "center",
          title: "结束日期",
          key: "endDate",
          dataIndex: "endDate",
          ellipsis: true,
        },
        {
          width: 88,
          align: "center",
          title: "项目状态",
          key: "statusCode",
          dataIndex: "statusCode",
          ellipsis: true,
          scopedSlots: {
            customRender: "statusCode",
          },
        },
        {
          width: 88,
          align: "center",
          title: "默认标识",
          key: "defaultChecked",
          dataIndex: "defaultChecked",
          ellipsis: true,
          scopedSlots: {
            customRender: "defaultChecked",
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
      removeparam: {
        projectId: "",
      },
      istotal: {
        type: 1,
      },
      pageparam: {
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
    //运行参数列表接口
    async getpage() {
      this.tabletype = false;
      this.pageparam.pageIndex = this.pagination.current;
      this.pageparam.pageSize = this.pagination.pageSize;
      let res = await this.$http.post(this.$api.projectpage, this.pageparam);
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data.list;
        if (this.istotal.type == 1) {
          this.pagination.total = res.data.data.length;
        }
        this.istotal.type++;
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //行政区划删除接口
    async getarearemove() {
      let res = await this.$http.post(this.$api.deleteByProjectId, this.removeparam);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.reload()
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    toadd(val, id) {
      if (val == "add") {
        this.$router.push({
          path: "/addproject",
          query: {
            type: val,
          },
        });
      } else {
        this.$router.push({
          path: "/addproject",
          query: {
            type: val,
            id: id.projectId,
          },
        });
      }
    },
    tostage(val){
      this.$router.push({
          path: "/stageproject",
          query: {
            id: val.projectId,
            name:val.projectName,
            customerId:val.customerId
          },
        });
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
      this.pageparam.keyword = "";
    },
    //弹窗
    showdialogproj(val) {
      console.log(val, 221212);
      this.removeparam.projectId = val.projectId;
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.visible = false;
      this.getarearemove();
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
.proj_box{
  padding-left: 20px;
  padding-top: 20px;
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

.dialogproj {
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

.dialogproj_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogproj_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
