<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级名称:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{cacheData.parentName}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>菜单名称:</div>
        <a-input class='edit_a_input' v-model='menuName' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />

      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级等级:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{cacheData.parentGrade}}</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">菜单类型:</div>
        <a-radio-group :options="plainOptions" :default-value="value1" @change="onChange1" />
        <br />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">授权类型:</div>
        <a-select default-value="lucy" style="width: 100%;margin-right: 80px;" @change="handleSelectChange">
          <a-select-option value="jack">
            Jack
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">菜单图标:</div>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture">
          <a-button>
            <a-icon type="upload" /> upload </a-button>
        </a-upload>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">菜单描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='remark' :maxLength='500' placeholder="请输入描述" @change="onChangeConfig" />
          <div class="edit_number">{{num}}/500</div>
        </div>
      </div>

      <div class="flexrow edit_item_title" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">鉴权接口</div>

      <a-table :columns="dictionaryColumns" :data-source="szList" :pagination='false' :bordered='true' size='small'>
        <template v-for="col in ['name', 'code', 'info']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index, col)" />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <a-switch></a-switch>
        </template>
      </a-table>
      <div class="flexrow edit_item_title" style="margin-top: 10px;justify-item: flex-start;margin-bottom: 50px;font-size: 16px;">
        <a-button type='primary' @click='addLine'>新增行</a-button>
      </div>
      <div class="flexrow " style="margin-top: 30px;justify-item: flex-start;margin-bottom: 80px;">
        <a-button>保存</a-button>
        <a-button type="primary" style="margin-left: 20px;">重置</a-button>
      </div>
    </div>
    <is-add v-if='showAddDialog' @close='closeDialog'></is-add>
  </div>
</template>

<script>
  import tableTitleData from "./table.json";
  import isAdd from './adddialog.vue'
  const plainOptions = ['页签', '按钮'];

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {
    components: {
      isAdd:isAdd
    },
    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        editingKey: '',
        value1: '页签',
        menuName: '', //菜单名称
        remark: '', //备注
        num: 0, //描述长度
        plainOptions,
        authList: [{
          name: "1",
          code: "1111",
          info: "1111111"
        }],
        szList: [{}, {}, {}, {}, {}],
        loading: false,
        imageUrl: '',
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
