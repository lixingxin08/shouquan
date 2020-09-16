<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">

    <div style="margin: 0 auto;">
      <div class="flexrow flexac select_item_types_email">
        <div class="select_item_types_email_title3"><a style="color: #FF0000;">*</a>类型名称:</div>
        <div class='edit_a_input_types'>
           <a-input  v-model='typeName' :maxLength='50' placeholder="请输入类型名称" />
        </div>

        <div class="select_item_types_email_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac select_item_types_email">
        <div class="select_item_types_email_title3"><a style="color: #FF0000;">*</a>类型代码:</div>
          <div class='edit_a_input_types'>
               <a-input  v-model='typeCode':maxLength='50' placeholder="请输入类型代码" />
          </div>

        <div class="select_item_types_email_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>

      <div class="flexrow flexac select_item_types_email">
        <div class="select_item_types_email_title3"><a style="color: #FF0000;">*</a>业务类别:</div>
        <a-select :value='selectDefault' style="width: 667px;" @change="handleSelectChange">
          <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxName">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac select_item_types_email">
        <div class="select_item_types_email_title3">类型描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_types' :rows="5" v-model='remark' :maxLength='250' placeholder="请输入描述" @change="onChangeConfig" />
          <div class="edit_number">{{num}}/250</div>
        </div>
      </div>

      <div class="flexrow select_item_types_email_title3" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">设备品牌</div>

      <a-table style='width: 50vw;' :columns="dictionaryColumns" :data-source="brandList" :pagination='false' :bordered='true' size='small'
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="index" slot-scope="text, record,index">
          {{index+1}}
        </template>
      </a-table>

      <div class="flexrow flexjc" style="margin-top: 30px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 60px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import tableTitleData from "../table.json";


  export default {

    data() {

      return {
        selectDefault: '请选择业务类别', //请选择业务类别
        selectList: [], //业务列表的
        brandList: [], //品牌列表
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        typeName: '', //类型名称
        typeCode: '', //类型代码
        remark: '', //类型秒速
        num: 0, //描述文字长度
        selectedRowKeys: [],
        deviceId: '',
      }
    },
    created() {
      this.deviceId = this.$route.query.id
      this.getCombobox()

      if (this.deviceId) { //编辑
        this.getDeviceInfo()
      } else {
        this.getBrandData()
      }
    },
    methods: {
      /* 修改字典描述 */
      onChangeConfig(e) {
        this.num = this.remark.length
      },
      /* 获取设备详细信息*/
      async getDeviceInfo() {
        let param = {
          deviceTypeId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicetypedetail, param)
        if (res.data.resultCode == 10000) {

          this.typeName = res.data.data.deviceTypeName //设备类型
          this.typeCode = res.data.data.deviceTypeCode //设备代码
          this.selectDefault = res.data.data.serviceTypeName //业务类型
          this.remark = res.data.data.remark //描述
          this.num=this.remark.length
          this.brandList = res.data.data.deviceBrandList //品牌列表
          if (this.brandList.length > 0) {
            this.selectedRowKeys = []
            let that = this
            for (let i = 0; i < this.brandList.length; i++) {
              if (this.brandList[i].select)
                this.selectedRowKeys.push(i)
            }
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 获取品牌列表*/
      async getBrandData() {
        let param = {
          pageIndex: 1,
          pageSize: 200,
          keyword: ''
        }
        let res = await this.$http.post(this.$api.devicebrandspage, param)

        if (res.data.resultCode == 10000) {
          this.brandList = res.data.data.list
        }
      },
      /* 获取业务类型下拉列表*/
      async getCombobox() {
        let param = {
          classCode: 'device_service_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        for (let i = 0; i < res.data.data.length; i++) {
          this.selectList = res.data.data
        }
        console.log(res)
      },
      /* 选择品牌 */
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      /* 提交 */
      async submit() {
        if (!this.typeName) {
          this.$message.warning('类型名称不能为空')
          return
        }
        if (!this.typeCode) {
          this.$message.warning('类型代码不能为空')
          return
        }
        if (this.selectDefault == '请选择业务类别') {
          this.$message.warning('请选择业务类别')
          return
        }

        let param = {
          deviceTypeId: this.deviceId, //设备id
          deviceTypeName: this.typeName, //设备类型名称
          deviceTypeCode: this.typeCode, //设备类型代码
          serviceType: this.getServiceType(), //业务类型
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
          remark: this.remark, //描述
          deviceBrandList: this.getdeviceBrand() //设备品牌列表
        }
        let res = await this.$http.post(this.$api.devicetypeform, param)
        if (res.data.resultCode == 10000) {
          if (!this.deviceId)
            this.$router.go(-1)
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 获取关联品牌*/
      getdeviceBrand() {
        let brandlist1 = []
        for (let i = 0; i < this.selectedRowKeys.length; i++) {
          brandlist1.push(this.brandList[this.selectedRowKeys[i]].brandId)
        }
        return brandlist1
      },
      /* 授权类型下拉选择*/
      handleSelectChange(e) {
        this.serviceType = e
        this.selectDefault = e
      },
      /* 获取设备类型 */
      getServiceType() {
        let type
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].comboBoxName == this.selectDefault) {
            type = this.selectList[i].comboBoxId
            break
          }
        }
        return type
      },
      reset(){
        this.typeName= '' //类型名称
        this.typeCode= '' //类型代码
        this.remark= ''//类型秒速
        this.num= 0 //描述文字长度
        this.selectDefault='请选择业务类别'
        this.selectedRowKeys= []
        if (this.deviceId) { //编辑
          this.getDeviceInfo()
        } else {
          this.getBrandData()
        }
      }
    },
  }
</script>

<style>
  .select_item_types_email_title3 {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .select_item_types_email {
    margin: 0 auto;
    margin-top: 24px;
  }

  .select_item_types_email_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_types {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .edit_number {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }

  .upload-list-inline>>>.ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }

  .upload-list-inline>>>.ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }

  .upload-list-inline>>>.ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>
