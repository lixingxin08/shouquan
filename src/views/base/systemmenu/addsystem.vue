<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级名称:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{cacheData.parentName?cacheData.parentName:parentName}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>菜单名称:</div>
        <a-input class='edit_a_input' v-model='menuName' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />

      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">菜单等级:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{grade}}</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>菜单类型:</div>
        <a-radio-group :options="menuTypeList" :default-value="menuValue" @change="onChange1" />
        <br />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>授权类型:</div>
        <a-select :default-value="empowerDefault" style="width: 100%;margin-right: 80px;" @change="handleSelectChange">
          <a-select-option v-for='(item,index) in empowerList' :key='index' :value="item.key">
            {{item.name}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>菜单图标:</div>
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

      <div class="flexrow edit_item_title" style="width: 100%; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a style="color: #FF0000;">*</a>鉴权接口</div>

      <a-table :columns="dictionaryColumns" :data-source="authList" :pagination='false' :bordered='true' size='small'>
        <template v-for="col in ['actionName', 'linkURL', 'defaultFlag']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index, col)" />
          </div>
        </template>
        <template slot="defaultFlag" slot-scope="text, record, index">
          <a-switch :checked='record.defaultFlag==1' @change="onChangeSwitch(index)"></a-switch>
        </template>
      </a-table>
      <div class="flexrow edit_item_title" style="margin-top: 10px;justify-item: flex-start;margin-bottom: 50px;font-size: 16px;">
        <a-button type='primary' @click='addLine'>新增行</a-button>
      </div>
      <div class="flexrow flexjc " style="margin-top: 30px;margin-bottom: 80px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 50px;" @click='getMenuInfo'>重置</a-button>
      </div>
    </div>
    <is-add v-if='showAddDialog' @close='closeDialog' @callback='addCallback'></is-add>
  </div>
</template>

<script>
  import tableTitleData from "./table.json";
  import isAdd from './adddialog.vue'

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {
    components: {
      isAdd: isAdd
    },
    data() {
      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        menuValue: '子系统', //菜单类型
        menuName: '', //菜单名称
        menuType: 1000, //菜单类型
        remark: '', //备注
        num: 0, //描述长度
        menuTypeList: ['子系统', '子栏目', '子菜单', '页签', '按钮'],
        empowerDefault: '默认拥有类',
        empowerList: [{
            key: 0,
            name: '默认拥有类'
          },
          {
            key: 1,
            name: '系统配置类'
          },
          {
            key: 2,
            name: '客户授权类'
          },
          {
            key: 3,
            name: '均可操作类'
          }
        ],
        authFlag: 0, //授权类型
        authList: [], //鉴权类别接口
        loading: false, //是否在上传图片
        imageUrl: '', //图片地址
        isAdd: false, //是否添加
        menuId: '', //菜单id
        cacheData: {}, //缓存的事件
        parentName: "", //父级等级的名称
        showAddDialog: false, //添加授权接口页面
        grade: -1,
      }
    },
    created() {
      this.menuId = this.$route.query.id //菜单id
      this.isAdd = this.$route.query.add //是否新增
      this.parentName = this.$route.query.name //父级菜单名称
      this.grade = this.$route.query.grade
      if (this.isAdd == 'false') { //编辑
        this.getMenuInfo();
      }
    },
    methods: {
      closeDialog() { //关闭添加接口
        this.showAddDialog = false
      },
      addCallback(item) { //添加鉴权回调

        this.authList.push(item)
        if(item.defaultFlag||this.authList.length==1){
          this.changeAutoListState(this.authList.length-1)
        }
        this.closeDialog()
      },
      onChangeConfig(e) { //修改字典描述
        this.num = this.remark.length
      },
      async getMenuInfo() { //获取菜单信息
        let param = {
          menuId: this.menuId
        }
        let res = await this.$http.post(this.$api.menudetail, param);
        if (res.data.resultCode == "10000") {
          this.cacheData = res.data.data
          this.setShowData();
        }
      },
      setShowData() { //设置数据
        this.menuName = this.cacheData.menuName
        this.remark = this.cacheData.remark
        if (this.isAdd == 'true') {
          this.menuName = ''
          this.remark = ''
        }
      },
      handleImageChange(info) { //上传图片
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
      beforeUpload(file) { //图片上传
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
        this.showAddDialog = true
      },
      onChange1(e) { //菜单类型选择
        this.menuName = e.target.value
        if (this.menuName == '子系统') {
          this.menuType = 1000
        } else if (this.menuName == '子栏目') {
          this.menuType = 2000
        } else if (this.menuName == '子菜单') {
          this.menuType = 3000
        } else if (this.menuName == '页签') {
          this.menuType = 4000
        } else if (this.menuName == '按钮') {
          this.menuType = 5000
        }
      },
      handleSelectChange(key) { //授权类型下拉选择
        this.authFlag = key
      },
      handleChange(value, key, column) { //修改鉴权item
        const newData = [...this.authList];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.authList = newData;
        }
      },
      onChangeSwitch(index) { //switch 接口

        this.changeAutoListState(index)
      },
      async submit() { //提交保存
        if (!this.menuName) {
          this.$message.warning('菜单名称不能为空');
          return
        }
        // if (!this.imageUrl) {
        //   this.$message.warning('菜单图标不能为空');
        //   return
        // }
        if (this.authList.length <= 0) {
          this.$message.warning('鉴权接口不能为空');
          return
        }

        let param = {
          menuId: this.isAdd == 'true' ? '' : this.menuId,
          parentId: this.isAdd == 'true' ? this.menuId : this.cacheData.parentId,
          menuName: this.menuName,
          menuType: this.menuType,
          authFlag: this.authFlag,
          menuIcon: '未填',
          grade:this.grade,
          operatorId: '5172dadd6d7c404e8ac657f32f81d969',
          authList: this.authList,
          remark: this.remark
        }

        let res = await this.$http.post(this.$api.menuform, param);
        console.log(param)
        console.log(res)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
        if (this.isAdd == 'false') { //编辑
          this.getMenuInfo();
        }

      },
      changeAutoListState(index) {
        for (let i = 0; i < this.authList.length; i++) {
          let item = this.authList[i]
          item.defaultFlag = (index == i?1:0)
          this.$set(this.authList, this.authList[i], item)
        }
        console.log(this.authList)
      }
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
    text-align: left;
    display: flex;
    justify-content: flex-start;
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
