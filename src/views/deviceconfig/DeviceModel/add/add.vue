<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3"><a style="color: #FF0000;">*</a>业务类别:</div>
        <a-select :value="severSelect?severSelect:'请选择业务类别'" class='select_item_model' @change="handleServerChange">
          <a-select-option v-for='(item,index) in severList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_model_toast">注：可直接选择业务类型</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3"><a style="color: #FF0000;">*</a>设备类型:</div>
        <a-select :value="typeSelect?typeSelect:'请选择设备类型'" :disabled='!severSelect' class='select_item_model' @change="handleTypeChange">
          <a-select-option v-for='(item,index) in typeList' :key='index' :value="item.deviceTypeId">
            {{item.deviceTypeName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_model_toast">注：可直接选择设备类型</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3"><a style="color: #FF0000;">*</a>设备品牌:</div>
        <a-select :value="brandSelect?brandSelect:'请选择设备品牌'" :disabled='!typeSelect' class='select_item_model' @change="handleBrandChange">
          <a-select-option v-for='(item,index) in brandList' :key='index' :value="item.brandId">
            {{item.brandName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_model_toast">注：可直接选择设备品牌</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3"><a style="color: #FF0000;">*</a>型号名称:</div>
        <div class='edit_a_input_model'>
          <a-input v-model='modelName' :maxLength='50' placeholder="请输入型号名称" />
        </div>

        <div class="edit_item_model_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3"><a style="color: #FF0000;">*</a>型号代码:</div>
        <div class='edit_a_input_model'>
          <a-input :maxLength='50' v-model='modelCode' placeholder="请输入型号代码" />
        </div>

        <div class="edit_item_model_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3">通信方式:</div>
        <a-select :value="msgSelect?msgSelect:'请选择通信方式'" class='select_item_model' @change="handleMsgChange">
          <a-select-option v-for='(item,index) in msgList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_model_toast">注：通信方式数据字典设置</div>
      </div>
      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_model' :rows="5" v-model='remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{remark.length}}/250</div>
        </div>
      </div>

      <div class="flexrow flexac edit_item_model">
        <div class="edit_item_model_title3">设备图标:</div>
        <div class="isupload">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
           :action="postimgurl"
           :headers='loadhead'
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="file" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <div class="col_red">支持PNG、JPEG、JPG格式，1KB至2M</div>
        </div>
      </div>


      <div class="flexrow edit_item_model_title3" style="width: 100%; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a
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
import {postimgurl} from '../../../../js/url'

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {

    data() {

      return {
         loadhead:{token:JSON.parse(localStorage.getItem('auth')).token},
       postimgurl:postimgurl,
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
          this.severSelect = res.data.data.serviceType
          this.getTypeList()
          this.getBrandList()

          this.modelName = res.data.data.modelName
          this.modelCode = res.data.data.modelCode
          this.imageUrl = res.data.data.imageJson
          this.remark = res.data.data.remark ? res.data.data.remark : ''
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
          imageJson: this.imageUrl, //型号图例
          remark: this.remark, //备注信息
          deviceAlarmList: this.getAlramList() //设备警报列表
        }
        let res = await this.$http.post(this.$api.devicemodelform, param)
        if (res.data.resultCode == 10000) {
         // if (!this.Id)
            this.$router.go(-1)
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
        this.brandList = []
        let param = {
          deviceTypeId: this.typeSelect,
        }
        let res = await this.$http.post(this.$api.devicetypebrandlistbyid, param)
        if (res.data.resultCode == 10000) {
          this.brandList = res.data.data
        }
      },
      /* 获取设备类型列表*/
      async getTypeList() {
        this.typeList = []
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
        this.typeSelect = ''
      },
      /* 设备类型下拉选择*/
      handleTypeChange(e) {
        this.typeSelect = e
        this.getBrandList()
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
	  /* 上传图片*/
	  handleChange(info) {
	    if (info.file.status === "uploading") {
	      this.loading = true;
	      return;
	    }
	    if (info.file.status === "done") {
        // Get this url from response in real world.
          let aa = JSON.parse(localStorage.getItem('auth'))
              aa.token = info.file.response.headers.token
              localStorage.setItem('auth', JSON.stringify(aa))
              this.imageUrl = info.file.response.data;
          this.form.customerLogo = info.file.response.data;
          this.loading = false;
	    }
	    console.log(this.imageUrl, 88999, info);
	  },
	  beforeUpload(file) {
	    const isJpgOrPng =
	      file.type === "image/jpeg" ||
	      file.type === "image/png" ||
	      file.type === "image/jpg";
	    if (!isJpgOrPng) {
	      this.$message.error("只能上传jpeg,jpg,png格式的图片");
	    }
	    const isLt2M = file.size / 1024 / 1024 < 2;
	    if (!isLt2M) {
	      this.$message.error("图片大小不能超过2MB!");
	    }
	    return isJpgOrPng && isLt2M;
	  },
    },
  }
</script>

<style>
  .edit_item_model_title3 {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_model {
    margin: 0 auto;
    margin-top: 24px;
  }

  .select_item_model {
    width: 667px;
  }

  .edit_item_model_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_model {
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
