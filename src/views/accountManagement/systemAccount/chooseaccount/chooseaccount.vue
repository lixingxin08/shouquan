<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;width: auto;">
      <div class="dialogchhoos2-title flexrow flexac flexsb">选择关联人员
        <a-icon type="close" @click='closedialogchhoos2' />
      </div>
      <div class="r_top flex_f" style="padding: 20px;">
        <div class="r_t_text">人员姓名/手机号码:</div>
        <div style="width: 200px;">
                  <a-input placeholder="请输入人员姓名/手机号码" class="r_t_inp" v-model="pageparam.keyword" @keydown.enter="tosearch()" />
        </div>

        <div class="r_t_text">人员状态:</div>
        <a-select show-search placeholder="全部" option-filter-prop="children" style="width: 200px;margin-right:20px;height:36px;border-radius: 8px;"
          v-model="pageparam.statusCode" @change="handleChange">
          <a-select-option value>全部</a-select-option>
          <a-select-option v-for="(item,index) in statusCode" :key="index" :value="item.id">{{item.val}}</a-select-option>
        </a-select>
        <div class="btn_blue btn" @click="tosearch()">查询</div>
        <div class="btn_gray" @click="clear()">清除</div>
      </div>
      <div v-if="tabledata.length>0" class="table">
        <a-table style='margin: 20px; width: 800px;'  :columns="tablecolumns" :data-source="tabledata" bordered
          :pagination="pagination" @change="handleTableChange" size='small'>
           <template slot="departmentId" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*pagination.pageSize)}}</template>
          <div slot="gender" class="flex_a" slot-scope="gender">
            <div v-if="gender==0">男</div>
            <div v-else>女</div>
          </div>
          <div slot="realName" class="flex_a" slot-scope="text, record" @click="chooseItem(record)">
            <a>{{record.realName}}</a>
          </div>
          <div slot="statusCode" class="flex_a" slot-scope="statusCode">
            <div v-if="statusCode==1">正常</div>
            <div v-if="statusCode==0">休假</div>
            <div v-if="statusCode==2">离岗</div>
          </div>
        </a-table>
      </div>
      <div v-else style="height: 100px;font-size: 22px;font-weight: 500;margin-top: 40px;">
        暂无人员可以关联
      </div>
    </div>
  </div>
</template>

<script>
  export default {


    data() {
      return {
        statusCode: [{//人员状态
            id: 1,
            val: "正常"
          },
          {
            id: 0,
            val: "休假"
          },
          {
            id: 2,
            val: "离岗"
          },
        ],
        pagination: {//分页数据
          total: 0,
          pageSize: 100, //每页中显示10条数据
          showSizeChanger: true,
          current: 1,
          page: 1,
          pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
          showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },
        tablecolumns: [{//表格table title
            align: "center",
            title: "序号",
            width: 5,
            dataIndex: "departmentId",
            ellipsis: true,
            scopedSlots: {
              customRender: "departmentId",
            },
          },
          {
            align: "center",
            title: "账号名称",
            width: 10,
            dataIndex: "realName",
            ellipsis: true,
            scopedSlots: {
              customRender: "realName",
            },
          },
          {
            align: "center",
            title: "姓名",
            width: 10,
            dataIndex: "gender",
            ellipsis: true,
            scopedSlots: {
              customRender: "gender",
            },
          },
          {
            align: "center",
            title: "手机号码",
            width: 10,
            dataIndex: "mobilePhone",
            ellipsis: true,
          },
          {
            width: 10,
            align: "center",
            title: "账号状态",
            dataIndex: "statusCode",
            ellipsis: true,
            scopedSlots: {
              customRender: "statusCode",
            },
          },
        ],
        tabledata: "",//表格数据
        pageparam: {//分页请求数据
          keyword: "",
          statusCode: "",
        },
        selectId: "",//菜单id
        istotal: {
          type: 1,
        },
      }
    },

    methods: {
      /* 设置选中的菜单id*/
      setSelectId(id) {
        this.selectId = id
      },
      /* 获取人员数据列表*/
      async getpersonpage() {
        this.tabletype = false;
        if(this.pagination.current==1)
          this.pagination.total =0
           this.tabledata = []
        let prame = {
          departmentId: this.selectId,
          keyword: this.pageparam.keyword,
          statusCode: this.pageparam.statusCode,
          pageIndex: this.pagination.page,
          pageSize: this.pagination.pageSize,
        };
        let res = await this.$http.post(this.$api.personpage, prame);
        if (res.data.resultCode == "10000") {
          res.data.data.list.forEach((item) => {
           // if (item.existsFlag == 0)
              this.tabledata.push(item)
          })
          if(this.pagination.current==1)
            this.pagination.total = res.data.data.length;

          this.istotal.type++;
          this.tabletype = true;
        } else {
          this.tabletype = false;
          this.$message.success(res.data.resultMsg);
        }
      },
      /* 关闭选人员*/
      closedialogchhoos2() {
        this.$emit('cancleDialog')
      },
      /* 分页切换数据*/
      handleTableChange(pagination) {
        this.pagination.page = pagination.current;
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
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
      /* 切换人员状态查询*/
      handleChange(val) {
        this.pageparam.statusCode = val;
      },
      /* 选中某一个人员*/
      chooseItem(item) {
        this.$emit('confirm', item)
      }
    }
  }
</script>

<style>

  .tree {
    text-align: left;
  }


  .r_t_text {
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
flex-shrink: 0;
    margin-right: 10px;
  }

  .dialogchhoos2-title {
    background: #1890FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 24px;
    height: 72px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    color: #ffffff;
    line-height: 14px;
  }

  .item {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .item-title {
    width: 80px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;

    line-height: 14px;
    flex-shrink: 0;
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
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .table_list {
    height: 42px;
  }

  .dialogchhoos2 {
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

  .dialogchhoos2_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogchhoos2_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
