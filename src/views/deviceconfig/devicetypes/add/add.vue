<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">

    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>类型名称:</div>
     <a-input class='edit_a_input' v-model='typeName' placeholder="平台" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>菜单名称:</div>
        <a-input class='edit_a_input' v-model='typeCode' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>业务类别:</div>
        <a-select default-value="lucy" style="width: 667px;" @change="handleSelectChange">
          <a-select-option value="jack">
            Jack
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：数字字典</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">类型描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='remark' :maxLength='500' placeholder="请输入描述" @change="onChangeConfig" />
          <div class="edit_number">{{num}}/500</div>
        </div>
      </div>

      <div class="flexrow edit_item_title" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">设备品牌</div>

      <a-table :columns="dictionaryColumns" :data-source="szList" :pagination='false' :bordered='true' size='small'>

      </a-table>

      <div class="flexrow flexjc" style="margin-top: 30px;margin-bottom: 100px;">
        <a-button type="primary">保存</a-button>
        <a-button  style="margin-left: 60px;">重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import tableTitleData from "../table.json";
  const plainOptions = ['页签', '按钮'];


  export default {

    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        typeName:'',
        typeCode:'',
        value1: '页签',
        remark: '', //备注
        num: 0, //描述长度
        plainOptions,
        authList: [{
          name: "1",
          code: "1111",
          info: "1111111"
        }],
        szList: [],
        isAdd: false,
        menuId: '',
        cacheData: {},
        showAddDialog:false
      }
    },
    created() {
      this.menuId = this.$route.query.id
      this.isAdd = this.$route.query.add

      if (this.menuId) { //编辑

        this.getMenuInfo();
      }
    },
    methods: {
      closeDialog(){
         this.showAddDialog=false
      },
      onChangeConfig(e) { //修改字典描述
        this.num = this.remark.length
      },
      async getMenuInfo() {
        let param = {
          menuId: this.menuId
        }
        let res = await this.$http.post(this.$api.menudetail, param);
        console.log(res)
        if (res.data.resultCode == "10000") {
          this.cacheData = res.data.data
          this.setShowData();
        }
      },
      setShowData() {
        this.menuName = this.cacheData.menuName
         this.remark=this.cacheData.remark
        if (this.isAdd == 'true') {
          this.menuName = ''
          this.remark=''
        }
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

      addLine() { //添加鉴权接口
        this.showAddDialog=true
      },
      onChange1(e) { //菜单类型选择
        console.log('radio1 checked', e.target.value);
      },
      handleSelectChange() { //授权类型下拉选择
        console.log(`selected ${value}`);
      },
      handleChange(value, key, column) {
        const newData = [...this.szList];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.szList = newData;
        }
      },
      edit(key) {
        const newData = [...this.szList];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.szList = newData;
        }
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
