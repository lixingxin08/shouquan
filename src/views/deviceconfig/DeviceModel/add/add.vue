<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>业务类别:</div>
        <a-select :value="severSelect?severSelect:'请选择业务类别'" class='select_item' @change="handleServerChange">
          <a-select-option v-for='(item,index) in severList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：可直接选择业务类型</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>设备类型:</div>
        <a-select :value="typeSelect?typeSelect:'请选择设备类型'" :disabled='!severSelect' class='select_item' @change="handleTypeChange">
          <a-select-option v-for='(item,index) in typeList' :key='index' :value="item.deviceTypeId">
            {{item.deviceTypeName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：可直接选择设备类型</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>设备品牌:</div>
        <a-select :value="brandSelect?brandSelect:'请选择设备品牌'"  :disabled='!typeSelect'class='select_item' @change="handleBrandChange">
          <a-select-option v-for='(item,index) in brandList' :key='index' :value="item.brandId">
            {{item.brandName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：可直接选择设备品牌</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>型号名称:</div>

        <a-input class='edit_a_input' v-model='modelName' placeholder="请输入您选择的型号名称" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>型号代码:</div>
        <a-input class='edit_a_input' v-model='modelCode' placeholder="请输入您选择的型号代码" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">通信方式:</div>
        <a-select :value="msgSelect?msgSelect:'请选择通信方式'" class='select_item' @change="handleMsgChange">
          <a-select-option v-for='(item,index) in msgList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：通信方式数据字典设置</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">备注信息:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='remark' :maxLength='500' placeholder="请输入描述" @change="onChangeConfig" />
          <div class="edit_number">{{num}}/500</div>
        </div>
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">设备图标:</div>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture">
          <a-button>
            <a-icon type="upload" /> upload </a-button>
        </a-upload>
      </div>


      <div class="flexrow edit_item_title" style="width: 100%; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a
          style="color: #FF0000;">*</a>关联警报</div>

      <a-table :columns="dictionaryColumns" :data-source="warningList" :pagination='false' :bordered='true' size='small'
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="index" slot-scope="text, record,index">
          {{index+1}}
        </template>
      </a-table>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 20px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import tableTitleData from "../table.json";


  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {

    data() {

      return {
        dictionaryColumns: tableTitleData.data.add,
        selectedRowKeys: [],
        brandList: [], //设备品牌
        brandSelect: '', //设备品牌选择
        typeList: [], //设备类型
        typeSelect: '', //设备类型选择
        severList: [], //业务类别
        severSelect: '', //业务类别选择
        msgList: [{ //通信方式列表
          comboBoxId: '',
          comboBoxName: '无'
        }],
        msgSelect: '', //通信方式选择
        warningList: [], //警报列表
        modelName: '', //型号名称
        modelCode: '', //型号代码
        remark: '', //备注
        num: 0, //描述长度
        szList: [],
        loading: false,
        imageUrl: '',
        Id: '',
      }
    },
    created() {

      this.getCombobox('device_service_type')
      this.getCombobox('device_communication_mode')

      this.Id = this.$route.query.id
      if (this.Id) { //编辑
        this.getModelInfo();
        this.getTypeList()
        this.getBrandList()
      } else {
        this.getWarninngData()
      }
    },
    methods: {

      /* 获取设备型号信息 */
      async getModelInfo() {
        let param = {
          modelId: this.Id
        }
        let res = await this.$http.post(this.$api.devicemodeldetail, param);

        if (res.data.resultCode == 10000) {
          this.msgSelect = res.data.data.communicationMode
          this.brandSelect = res.data.data.brandId
          this.typeSelect = res.data.data.deviceTypeId
          this.severSelect = res.data.data.serviceTypeName
          this.modelName = res.data.data.modelName
          this.modelCode = res.data.data.modelCode
          this.remark = res.data.data.remark
          this.warningList = res.data.data.deviceAlarmList
          if (this.warningList.length > 0) {
            this.selectedRowKeys = []
            let that = this
            for (let i = 0; i < this.warningList.length; i++) {
              if (this.warningList[i].select)
                this.selectedRowKeys.push(i)
            }
          }
        }
      },
      /* 提交保存业务类别*/
      async submit() {

        if (!this.severSelect) {

          this.$message.warning('请选择业务类别')
          return
        }
        if (!this.typeSelect) {
          this.$message.warning('请选择设备类型')
          return
        }
        if (!this.brandSelect) {
          this.$message.warning('请选择设备品牌')
          return
        }
        if (!this.modelName) {
          this.$message.warning('型号名称不能为空')
          return
        }
        if (!this.modelCode) {
          this.$message.warning('型号代码不能为空')
          return
        }
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请至少关联一个警报')
          return
        }
        let param = {
          modelId: this.Id, //设备型号序号
          modelName: this.modelName, //设备型号名称
          modelCode: this.modelCode, //设备型号代码
          serviceType: this.severSelect, //归属业务类型代码
          deviceTypeId: this.typeSelect, //设备类型序号
          brandId: this.brandSelect, //品牌序号
          communicationMode: this.msgSelect, //通讯方式
          imageJson: 'ceshi', //型号图例
          operatorId: '5172dadd6d7c404e8ac657f32f81d969', //操作者id
          remark: this.remark, //备注信息
          deviceAlarmList: this.getAlramList() //设备警报列表
        }
        console.log()
        let res = await this.$http.post(this.$api.devicemodelform, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 获取警报列表*/
      getAlramList() {
        let list = []
        for (let i = 0; i < this.selectedRowKeys.length; i++) {
          list.push(this.warningList[this.selectedRowKeys[i]].alarmId)
        }
        return list
      },
      handleImageChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },


      /* 获取品牌列表 */
      async getBrandList() {
        let param = {
          pageIndex: 1,
          pageSize: 200,
          keyword: ''
        }
        let res = await this.$http.post(this.$api.devicebrandspage, param)
        if (res.data.resultCode == 10000) {
          this.brandList = this.brandList.concat(res.data.data.list)
        }
      },
      /* 获取设备类型列表*/
      async getTypeList() {
        let param = {
          keyword: '',
          serviceType: this.severSelect,
          pageIndex: 1,
          pageSize: 200
        }
        let res = await this.$http.post(this.$api.devicetypepage, param)
        if (res.data.resultCode == 10000) {
          this.typeList = res.data.data.list
        }
      },
      /* 获取业务类别*/
      async getCombobox(type) {
        let param = {
          classCode: type
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          if (type == 'device_communication_mode')
            this.msgList = this.msgList.concat(res.data.data)
          else
            this.severList = res.data.data
        }
      },

      /* 选择品牌 */
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      /* 添加时获取警报列表*/
      async getWarninngData() {
        let param = {
          pageIndex: 1,
          pageSize: 200,
          keyword: ''
        }
        let res = await this.$http.post(this.$api.alramlist, param)
        if (res.data.resultCode == 10000) {
          this.warningList = res.data.data.list
        }
      },
      /* 授权类型下拉选择 */
      handleServerChange(e) {
        this.severSelect = e
        this.getTypeList()
        this.typeSelect=''
      },
      /* 设备类型下拉选择*/
      handleTypeChange(e) {
        this.typeSelect = e
      },
      /* 品牌下拉选择*/
      handleBrandChange(e) {
        this.brandSelect = e
      },
      /* 通信方式下拉选择*/
      handleMsgChange(e) {
        this.msgSelect = e
      },
      /* 重置*/
      reset() {
        if (this.Id) {
          this.getModelInfo()
        } else {
          this.msgSelect = ''
          this.brandSelect = ''
          this.typeSelect = ''
          this.severSelect = ''
          this.modelName = ''
          this.modelCode = ''
          this.remark = ''
          this.selectedRowKeys = []
        }
      },
      /* 修改字典描述*/
      onChangeConfig(e) {
        this.num = this.remark.length
      },
    },
  }
</script>

<style>
  .edit_item_title {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item {
    margin: 0 auto;
    margin-top: 24px;
  }

  .select_item {
    width: 667px;
  }

  .edit_item_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
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
