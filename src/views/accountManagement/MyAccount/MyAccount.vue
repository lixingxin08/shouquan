<template>
  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div class="flexrow" style="margin: 0 auto;">
      <div class=" flexcolumn">
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">人员姓名:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.realName' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">所属部门:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.position' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">人员性别:</div>
          <a-input :disabled='true' class='edit_a_input' v-model="personConfig.gender==1?'男':'女'" placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">手机号码:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.mobilePhone' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2"><a style="color: #FF0000;">*</a>账号名称:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='config.userName' placeholder="5-11位，支持英文和数字，字母区分大小写" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">电子邮箱:</div>
          <a-input class='edit_a_input' v-model='personConfig.email' placeholder="请填写电子邮箱" />
        </div>

        <div class="flexrow flexac edit_item">
          <div class="edit_item_title2">岗位职务:</div>
          <a-input class='edit_a_input' v-model='personConfig.position' placeholder="请填写岗位职务" />
        </div>
      </div>
      <div class="flexcolumn" style="margin-left: 60px;">
        <div class="edit_item_title2" style="width: auto;text-align: left;margin-left: 20px;margin-top: 20px;"><span
            style="color: #FF0000;">*</span>账号权限</div>
        <div class="treebox">
          <is-right :treedata="treedata" :replaceFields="replaceFields" :checkable='false'></is-right>
        </div>
      </div>
    </div>
    <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
      <a-button type="primary" @click='submit'>保存</a-button>
      <a-button style="margin-left: 20px;" @click='getAccountDetail'>重置</a-button>
      <a-button style="margin-left: 20px;" @click='editPass'>修改密码</a-button>
    </div>
    <is-edit-pass-word v-if="isShow" @confirmPass="confirmPass" @cancle='cancelPass'></is-edit-pass-word>
  </div>
</template>

<script>
  import isEditPassWord from './editp/editp.vue'
  import isRight from "../../../components/tree/seltree.vue";
  export default {
    components: {
      isEditPassWord,
      isRight
    },
    data() {
      return {
        isShow: false, //是否展示修改密码
        accountid: '', //账号id
        config: {}, //账号详情数据
        personConfig: {}, //人员详情数据
        data: [], //授权菜单原始数据
        treedata: [], //授权菜单转成后的数据
        replaceFields: { //授权列表数据参数
          title: "name",
          key: "id",
        },
      }
    },
    created() { //获取账号详情数据
      this.accountid = JSON.parse(localStorage.getItem('usermsg')).accountId
      if (this.accountid) {
        this.getAccountDetail()
      }
    },
    methods: {
      /* 确认提交 */
      async submit() {
        this.personConfig.operatorId = JSON.parse(localStorage.getItem('usermsg')).accountId
        let res = await this.$http.post(this.$api.personform, this.personConfig)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 展示修改密码*/
      editPass() {
        this.isShow = true
      },
      /* 确定修改密码*/
      async confirmPass(param) {
        param.accountId = this.accountid
        let res = await this.$http.post(this.$api.accountinforeset, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.isShow = false
        } else {
          this.$message.error(res.data.resultMsg)
        }

      },
      /* 取消修改密码*/
      cancelPass() {
        this.isShow = false
      },
      /* 获取账号详情*/
      async getAccountDetail() {
        this.data = []
        let param = {
          accountId: this.accountid //账号id
        }
        let res = await this.$http.post(this.$api.accountinfodetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data

          let param2 = {
            personId: this.config.personId
          }
          let res2 = await this.$http.post(this.$api.persondetail, param2) //获取人员详情
          if (res2.data.resultCode == 10000) {
            this.personConfig = res2.data.data
          }
         
        }
         this.getRolesTree()
      },
      /* 获取授权的列表 */
      async getRolesTree() {

        let res = await this.$http.post(this.$api.rolesystemroleselfmunutree, {});
        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        }
        this.treedata = this.toTree(this.data)
      },
      toTree(data2) {
        let data = []
        data2.forEach((item) => {
          if (item.checked)
            data.push(item)
        })
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
    }
  }
</script>

<style>
  .edit_item_title2 {
    width: 120px;
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
    width: 447px;
  }

  .edit_item_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .treebox {
    height: 400px;
    width: 400px;
    margin: 20px;
    background-color: #FFFFFF;
    border: #E5E5E5 solid 1px;
  }

  .edit_a_input {
    width: 447px;
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
</style>
