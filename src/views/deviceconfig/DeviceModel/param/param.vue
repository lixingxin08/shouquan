<template>
  <div class="content2">
    <div class="flexrow flexac" style="margin-bottom: 20px;">
      <div class='title_tx'>业务类别:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.serviceTypeName?modelDetail.serviceTypeName:'无'}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>设备类型:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.deviceTypeName?modelDetail.deviceTypeName:'无'}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>设备品牌:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.brandName?modelDetail.brandName:'无'}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>型号名称:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.modelName?modelDetail.modelName:'无'}}
        <a-icon type="down" />
      </div>
    </div>

    <a-button type="primary" class="flexrow flexjc flexac addbtn2-param" @click="editParam({})">
      <a-icon two-tone-color="#ffffff" type="plus" /> 新增运行参数
    </a-button>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="paramList" bordered size="small"
      :pagination="false">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editParam(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <is-add v-show="isVis" ref='addparam' @callback='addCallBack'></is-add>
  </div>
</template>
<script>
  import tableTitleData from "../table.json";
  import isAdd from './add/add.vue'
  export default {
    components: {
      isAdd
    },
    data() {
      return {
        isVis: false,
        dictionaryColumns: tableTitleData.data.param,
        paramList: [], //参数列表
        id: '',
        modelDetail: {}
      }

    },
    created() {
      this.id = this.$route.query.id
      this.getModelInfo()
      this.getParamData()
    },
    methods: {
      /* 获取设备型号信息*/
      async getModelInfo() {
        let param = {
          modelId: this.id
        }
        let res = await this.$http.post(this.$api.devicemodeldetail, param);
        if (res.data.resultCode == 10000) {
          this.modelDetail = res.data.data
        }
      },
      /* 获取参数数据*/
      async getParamData() {
        let param = {
          pageIndex: 1,
          pageSize: 200,
          modelId: this.id
        }
        let res = await this.$http.post(this.$api.parampage, param);
        if (res.data.resultCode == 10000) {
          if (res.data.data)
            this.paramList = res.data.data
        }
      },
      /* 删除确定*/
      async confirmDelete(item) {
        let param = {
          parameterId: item.parameterId
        }
        let res = await this.$http.post(this.$api.paramremove, param)
        if (res.data.resultCode == 10000) {
          this.getParamData()
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.warning(res.data.resultMsg)
        }
      },
      /* 新增编辑弹框*/
      editParam(item) {
        if (!item.parameterType) {
          item.parameterType = ''
        }
        this.$refs.addparam.getCombobox()
        this.$refs.addparam.setParam(item)
        this.isVis = true

      },
      /* 添加编辑回调*/
      async addCallBack(param) {
        console.log(param)
        if (param) {
          param.modelId = this.id
          param.typeCode = 'sms_template_device_running'
          param.operatorId = JSON.parse(localStorage.getItem('usermsg')).accountId
          let res = await this.$http.post(this.$api.paramform, param)
          if (res.data.resultCode == 10000) {
            this.getParamData()
            this.$message.success(res.data.resultMsg)
          } else {
            this.$message.warning(res.data.resultMsg)
          }
        }
        this.isVis = false
      }
    }
  }
</script>
<style>
  .title_tx {
    flex-shrink: 0;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    margin-right: 10px;
    margin-left: 10px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }

  .addbtn2-param {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    width: 128px;
    margin-bottom: 20px;
    height: 40px;
    background: #1890ff;
    border: 1px solid #1890ff;
    border-radius: 8px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 10px;
    margin-right: 10px;
  }

  .title_item {
    background: #f5f5f5;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    width: 200px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
  }
</style>
