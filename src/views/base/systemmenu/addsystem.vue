<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu">上级名称:</div>
        <div class='edit_a_input_menu'>
          <a-input v-model='parentName' disabled placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        </div>

        <div class="edit_item_menu_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu"><a style="color: #FF0000;">*</a>菜单名称:</div>
        <div class='edit_a_input_menu'>
          <a-input v-model='menuName' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu">菜单等级:</div>
        <div class='edit_a_input_menu'>
          <a-input v-model='grade' disabled placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_menu" v-if="(grade-1)==3">
        <div class="edit_item_menu_title3_menu"><a style="color: #FF0000;">*</a>菜单类型:</div>
        <a-radio-group :options="menuTypeList" :default-value="menuValue" @change="onChange1" />
        <br />
      </div>
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu"><a style="color: #FF0000;">*</a>授权类型:</div>
        <a-select :default-value="empowerDefault" style="width: 100%;margin-right: 80px;" @change="handleSelectChange">
          <a-select-option v-for='(item,index) in empowerList' :key='index' :value="item.key">
            {{item.name}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu"><a style="color: #FF0000;">*</a>菜单图标:</div>
        <div class="isupload">
          <a-upload name="file" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="http://192.168.3.101:80/upload"
            :before-upload="beforeUpload" @change="handleChangeImage">
            <img v-if="imageUrl" :src="imageUrl" alt="file" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <div class="col_red">支持PNG、JPEG、JPG格式，1KB至2M</div>
        </div>
      </div>
      <div class="flexrow flexac edit_item_menu">
        <div class="edit_item_menu_title3_menu">菜单描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_menu' :rows="5" v-model='remark' :maxLength='250' placeholder="请输入描述" @change="onChangeConfig" />
          <div class="edit_number_menu">{{num}}/250</div>
        </div>
      </div>

      <div class="flexrow edit_item_menu_title3_menu" style="width: 100%; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a
          style="color: #FF0000;">*</a>鉴权接口</div>

      <a-table :columns="dictionaryColumns" :data-source="authList" :pagination='false' :bordered='true' size='small'>
        <!-- <template v-for="col in ['actionName', 'linkURL', 'defaultFlag']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index, col)" />
          </div>
        </template> -->
        <template slot="defaultFlag" slot-scope="text, record, index">
          <a-switch v-model='record.defaultFlag==1' @change="onChangeSwitch(index)"></a-switch>
        </template>
        <template slot="operation" slot-scope="text, record,index">
          <div class="flexrow flexac flexjc">
            <a href="#" style='font-size: 12px;' @click="editAction(record,index)">编辑</a>
            <div class="item-line"></div>
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(index)">
              <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
      <div class="flexrow edit_item_menu_title3_menu" style="margin-top: 10px;justify-item: flex-start;margin-bottom: 50px;font-size: 16px;">
        <a-button type='primary' @click='editAction({},-1)'>新增行</a-button>
      </div>
      <div class="flexrow flexjc " style="margin-top: 30px;margin-bottom: 80px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 50px;" @click='getMenuInfo'>重置</a-button>
      </div>
    </div>
    <is-add ref='add' v-show='showAddDialog' @close='closeDialog' @callback='addCallback'></is-add>
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
    inject: ['reload'],
    data() {
      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        menuValue: '页签', //菜单类型
        menuName: '', //菜单名称
        menuType: 1000, //菜单类型
        remark: '', //备注
        num: 0, //描述长度
        menuTypeList: ['页签', '按钮'], //'子系统', '子栏目', '子菜单',  测试提不需要加
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
      addCallback(item, index) { //添加鉴权回调
        if (index == -1) {
          this.authList.push(item)
        } else {
          this.authList.concat(item, index)
        }
        if (item.defaultFlag || this.authList.length == 1) {
          this.changeAutoListState(this.authList.length - 1)
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
this.authList=this.cacheData.authList
        if (this.isAdd == 'true') {
          this.menuName = ''
          this.remark = ''
          this.authList = []
        }
        this.num = this.remark.length
      },

      confirmDelete(index) {
        this.authList.splice(index, 1)
      },
      handleChangeImage(info) {
        if (info.file.status === "uploading") {
          this.loading = true;
          return;
        }
        if (info.file.status === "done") {
          // Get this url from response in real world.
                this.imageUrl = info.file.response.data;
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

      editAction(item, index) { //添加鉴权接口
        this.$refs.add.setItem(item, index)
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
        this.imageUrl = 'dd'
        if (!this.imageUrl) {
          this.$message.warning('菜单图标不能为空');
          return
        }
        if (this.authList.length <= 0) {
          this.$message.warning('鉴权接口不能为空');
          return
        }
        if (!this.menuType && (this.grade-1) == 3) {
          this.$message.warning('请选择菜单类型');
          return
        }
        let param = {
          menuId: this.isAdd == 'true' ? '' : this.menuId,
          parentId: this.isAdd == 'true' ? this.menuId : this.cacheData.parentId,
          menuName: this.menuName,
          menuType: this.menuType,
          authFlag: this.authFlag,
          menuIcon: this.imageUrl,
          grade: this.grade,
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
          hiddenURL: JSON.stringify(this.authList),
          remark: this.remark
        }

        let res = await this.$http.post(this.$api.menuform, param);
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      changeAutoListState(index) {
        for (let i = 0; i < this.authList.length; i++) {
          let item = this.authList[i]

          item.defaultFlag = (index == i) ? 1 : 0
          this.$set(this.authList, i, item)
        }
      }
    },
  }
</script>

<style>
  .edit_item_menu_title3_menu {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_menu {
    margin: 0 auto;
    margin-top: 24px;
  }

  .edit_item_menu_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 20px;
    margin-right: 20px;
  }

  .edit_a_input_menu {
    width: 667px;
    height: 32px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }

  .edit_number_menu {
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
