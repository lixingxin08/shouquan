<template>
  <div class="administrativedivision">
      <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
    <div class="flex_fs">
      
      <div>
        
        <div class="right right2">
           <div class="r_t_text" style="font-size:18px">阶段信息</div>
           <div class="isline"></div>
          <div class="btn_blue btn2" @click="toadd('add')"> <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" />新增</div>
          <div class="table" v-if="tabletype">
            <a-table
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
                <div class="col_red ispointer" @click="showdialogstage(areaName)">
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
          title: "阶段序号",
          dataIndex: "phaseId",
          key: "phaseId",
          ellipsis: true,
           ellipsis: true,
              scopedSlots: {
            customRender: "index",
          }, 
        },
        {
          width: 208,
          align: "center",
          title: "阶段名称",
          dataIndex: "phaseName",
          key: "phaseName",
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
          title: "阶段期始",
          key: "startDate",
          dataIndex: "startDate",
          ellipsis: true,
        },
        {
          width: 88,
          align: "center",
          title: "阶段期止",
          key: "endDate",
          dataIndex: "endDate",
          ellipsis: true,
        },
        {
          width: 88,
          align: "center",
          title: "阶段状态",
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
          title: "默认选中",
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
      pagination: this.$config.pagination,
      removeparam: {
        phaseId: "",
      },
      pageparam: {
        projectId: "",
        operatorId: JSON.parse(localStorage.getItem('authorization')).accountId,
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
      this.pageparam.projectId = this.$route.query.id;
      this.pageparam.pageIndex = this.pagination.current;
      this.pageparam.pageSize = this.pagination.pageSize;
      let res = await this.$http.post(
        this.$api.projectPhaselist,
        this.pageparam
      );
      if (res.data.resultCode == "10000") {
        this.tabledata = res.data.data;
         if (this.pagination.current == 1){
             this.pagination.total = res.data.data.length;
          }
        this.tabletype = true;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //行政区划删除接口
    async getarearemove() {
      let res = await this.$http.post(this.$api.deleteByProjectPhaseId, this.removeparam);
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
          path: "/addstageproject",
          query: {
            type: val,
            projectid:this.$route.query.id,
            name: this.$route.query.name,
            customerId: this.$route.query.customerId,
          },
        });
      } else {
        this.$router.push({
          path: "/addstageproject",
          query: {
            type: val,
            id: id.phaseId,
            projectid: id.projectId,
            name: this.$route.query.name,
            customerId: this.$route.query.customerId,
          },
        });
      }
    },
    //弹窗
    showdialogstage(val) {
      console.log(val, 221212);
      this.removeparam.phaseId = val.phaseId;
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

.dialogstage {
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

.dialogstage_t {
  width: 920px;
  height: 72px;
  background: #1890ff;
  border: 1px solid #1890ff;
  padding: 0 40px;
  color: #fff;
  font-size: 24px;
}

.dialogstage_c {
  height: 348px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
</style>
