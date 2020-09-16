<template>
  <div class="content2">
       <is-delete-dialog v-if="visible" @confirm="confirm" @cancle="cancel"></is-delete-dialog>
    <div class="flex_fs">
      <is-left :treedata="treedata" :replaceFields="replaceFields" :defaultExpandedKeys="defaultExpandedKeys"
        @selectdata="getselectdata" @searchdata="getsearchdata" v-if="showtree"></is-left>
      <div>
        <div class="right" style="margin-left: 40px;padding: 0px;">
          <div class="r_top flex_f" style="margin: 0px;">
            <div class="r_t_text">帐号名称/手机号:</div>
            <a-input placeholder="请输入人员姓名/手机号码" class="r_t_inp" v-model="pageparam.keyword" @keydown.enter="tosearch()" />
            <div class="r_t_text">帐号状态:</div>
            <a-select show-search placeholder="全部" option-filter-prop="children" style="width: 200px;margin-right:20px;height:36px;border-radius: 8px;"
              v-model="pageparam.statusCode" @change="handleChange">
              <a-select-option value>全部</a-select-option>
              <a-select-option v-for="(item,index) in statusCode" :key="index" :value="item.id">{{item.val}}</a-select-option>
            </a-select>
            <a-button type='primary' class="btn_blue btn" @click="tosearch()">查询</a-button>
            <a-button class="btn_gray" @click="clear()">清除</a-button>
          </div>
              <div class="view-title-line"></div>
          <a-button type='primary' class="btn_blue btn2" @click="toadd({})">新增</a-button>
          <div class="table" v-if="tabletype">
            <a-table :columns="tablecolumns" :data-source="tabledata" bordered :pagination="pagination" @change="handleTableChange"
              size='small'>

              <div slot="accountId" slot-scope="text, record,index">
            {{(index+1)+((pagination.current-1)*10)}}
              </div>
              <div slot="statusCode" class="flex_a" slot-scope="statusCode">
                <div v-if="statusCode==1">启用</div>
                <div v-if="statusCode==0">锁定</div>
              </div>

              <div slot="edit" class="flex_a" slot-scope="val,departmentId">
                <div class="col_blue ispointer" @click="toadd(departmentId)">编辑</div>
                <div class="col_blue ispointer" @click="toedit(departmentId)">修改密码</div>
                <div class="col_red ispointer" @click="showdialogsys(val)">
                  <span>删除</span>
                </div>

              </div>
            </a-table>
          </div>
          <div class="table" v-if="!tabletype">无</div>
        </div>
      </div>
    </div>
 
    <is-edit-pass-word v-if="visiblePass" @confirmPass="confirmPass" @cancle='cancelPass'></is-edit-pass-word>
  </div>
</template>
<script>
  import isLeft from "../../../components/tree/tree.vue";
  import isDeleteDialog from "../../../components/delete_confir/delete.vue";
  import isEditPassWord from './editp/editp.vue'
  export default {
    components: {
      isLeft, //菜单
      isDeleteDialog, //是否删除
      isEditPassWord //修改密码
    },
    data() {
      return {
        ModalText: "您确定要删除吗？",
        visible: false, //是否展示删除确认框
        visiblePass: false, //是否展示修改密码
        showtree: false, //是否展示左边菜单
        treedata: null, //左边菜单数据
        tabletype: false, //是否展示table
        isselectdata: { //选中的菜单数据结构
          id: "",
          name: "",
        },
        replaceFields: { //菜单数据结构
          title: "name",
          key: "id",
        },
        tablecolumns: [{ //表格title数据
            width: 60,
            align: "center",
            title: "序号",
            dataIndex: "accountId",
            ellipsis: true,
            scopedSlots: {
              customRender: "accountId",
            },
          },
          {
            width: 100,
            align: "center",
            title: "账号名称",
            dataIndex: "userName",
            key: "userName",
            ellipsis: true,
          },
          {
            width: 208,
            align: "center",
            title: "姓名",
            dataIndex: "realName",
            key: "realName",
            ellipsis: true,
            scopedSlots: {
              customRender: "realName",
            },
          },
          {
            width: 208,
            align: "center",
            title: "手机号码",
            key: "mobilePhone",
            dataIndex: "mobilePhone",
            ellipsis: true,
          },
          {
            width: 208,
            align: "center",
            title: "账号状态",
            key: "statusCode",
            dataIndex: "statusCode",
            ellipsis: true,
            scopedSlots: {
              customRender: "statusCode",
            },
          },

          {
            width: 180,
            align: "center",
            title: "操作",
            ellipsis: true,
            scopedSlots: {
              customRender: "edit",
            },
          },
        ],
        tabledata: "", //表格数据
        defaultExpandedKeys: [], //菜单选中key
        pageparam: { //账号请求的数据参数
          keyword: "",
          statusCode: "",
        },
        statusCode: [{ //人员状态下拉列表
            id: 1,
            val: "正常"
          },
          {
            id: 0,
            val: "冻结"
          },
        ],
        data: "", //菜单原始数据
        pagination: { //分页数据
          total: 0,
          pageSize: 10, //每页中显示10条数据
          showSizeChanger: true,
          current: 1,
          size: "default",
          page: 1,
          pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
          showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },
        issearchdata: "",
        filterdata: [],

        treeprame: {
          //树接口参数
          departmentId: "",
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
          customerId: "",
        },
        removeparam: {//删除接口参数
          accountId: "",
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
          cipher: ''
        },
        istotal: {
          type: 1,
        },
      };
    },
    created() {
      this.getareatree();
    },
    methods: {
      //获取菜单树
      async getareatree() {
        this.showtree = false;
        let res = await this.$http.post(this.$api.departmenttree, this.treeprame);

        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
        this.setdata();
        this.showtree = true;
        this.getpersonpage();
      },
      //分页列表接口
      async getpersonpage() {
        this.tabletype = false;
        let prame = {
          customerId: this.isselectdata.id,
          keyword: this.pageparam.keyword,
          statusCode: this.pageparam.statusCode,
          pageIndex: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        let res = await this.$http.post(this.$api.accountinfopage, prame);
        if (res.data.resultCode == "10000") {
          this.tabledata = res.data.data.list;
         if(this.pagination.current==1)
            this.pagination.total = res.data.data.length;

          this.istotal.type++;
          this.tabletype = true;
        } else {
          this.tabletype = false;
          this.$message.success(res.data.resultMsg);
        }
      },
      //删除接口
      async getremove() {
        let res = await this.$http.post(
          this.$api.accountinforemove,
          this.removeparam
        );
        if (res.data.resultCode == "10000") {
          this.$message.success(res.data.resultMsg);
          this.getpersonpage();
          this.visible = false;
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

      /* 确认修改密码*/
      async confirmPass(cipher) {
        this.removeparam.cipher = cipher
        let res = await this.$http.post(this.$api.accountinforeset, this.removeparam)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
        this.visiblePass = false

      },
      /* 取消修改密码*/
      cancelPass() {
        this.visiblePass = false
      },
      /* 展示修改密码*/
      toedit(id) {
        this.removeparam.accountId = id.accountId
        this.visiblePass = true
      },
      /* 添加 编辑*/
      toadd(id) {
        if (this.isselectdata.id == "") {
          this.isselectdata.id = this.treedata[0].id;
          this.isselectdata.name = this.treedata[0].name;
        }
        this.$router.push({
          path: "/addaccount",
          query: {
            id: this.isselectdata.id,
            accountid: id.accountId,
            name: this.isselectdata.name,
          },
        });
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
        console.log(this.isselectdata, 98899);
        this.isselectdata.id = val.id;
        this.isselectdata.name = val.name;
        this.istotal.type = 1;
        this.getpersonpage();
      },
      //查询
      tosearch() {
        this.istotal.type = 1;
        this.pagination.page = 1;
        this.pagination.pageSize = 10;
        this.isselectdata.id = "";
        this.getpersonpage();
      },
      //清除
      clear() {
        this.pageparam.keyword = "";
        this.pageparam.statusCode = "";
      },
      //展示删除确认框
      showdialogsys(val) {
        this.removeparam.accountId = val.accountId;
        this.visible = true;
      },
      /* 取消删除*/
      cancel() {
        this.visible = false;
      },
      /* 确认删除*/
      confirm() {
        this.cancel()
        this.getremove();
      },

      //分页
      handleTableChange(pagination) {
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.getpersonpage();
      },
      handleChange(val) {
        this.pageparam.statusCode = val;
      },
    },
  };
</script>
<style scoped>
  .tree {
    text-align: left;
  }

  .right {
    width: 1372px;
    padding-left: 20px;
    padding-top: 20px;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .table_list {
    height: 42px;
  }

  .dialogsys {
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

  .dialogsys_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogsys_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
