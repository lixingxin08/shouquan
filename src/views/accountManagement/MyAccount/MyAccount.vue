<template>
  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div class="flexrow" style="margin: 0 auto;">
      <div class=" flexcolumn">
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">人员姓名:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.realName' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">所属部门:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.position' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">人员性别:</div>
          <a-input :disabled='true' class='edit_a_input' v-model="personConfig.gender==1?'男':'女'" placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">手机号码:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='personConfig.mobilePhone' placeholder="请选择人员" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title"><a style="color: #FF0000;">*</a>账号名称:</div>
          <a-input :disabled='true' class='edit_a_input' v-model='config.userName' placeholder="5-11位，支持英文和数字，字母区分大小写" />
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">电子邮箱:</div>
          <a-input class='edit_a_input' v-model='personConfig.email' placeholder="请填写电子邮箱" />
        </div>

        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">岗位职务:</div>
          <a-input class='edit_a_input' v-model='personConfig.position' placeholder="请填写岗位职务" />
        </div>
      </div>
      <div class="flexcolumn">
        <div class="edit_item_title" style="width: auto;text-align: left;margin-left: 20px;margin-top: 20px;"><span
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
        isShow: false,
        accountid: '',
        config: {},
        personConfig: {},
        data: [],
        treedata: [],
        replaceFields: {
          title: "name",
          key: "id",
        },
      }
    },
    created() {
      this.accountid = this.$route.query.accountid //是否新增
      this.accountid = 'e75379b1d41a4356b998bd2f31719f71'
      if (this.accountid) {
        this.getAccountDetail()
      }
    },
    methods: {

      async submit() {


        this.personConfig.operatorId = '5172dadd6d7c404e8ac657f32f81d969'

        let res = await this.$http.post(this.$api.personform, this.personConfig)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      editPass() {
        this.isShow = true
      },
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
      cancelPass() {
        this.isShow = false
      },
      async getAccountDetail() {
        this.data=[]
        let param = {
          accountId: this.accountid
        }
        let res = await this.$http.post(this.$api.accountinfodetail, param)
        if (res.data.resultCode == 10000) {

          this.config = res.data.data
          let roleList = res.data.data.roleList
          let param2 = {
            personId: this.config.personId
          }
          let res2 = await this.$http.post(this.$api.persondetail, param2)
          if (res2.data.resultCode == 10000) {
            this.personConfig = res2.data.data
          }
          console.log(this.personConfig)
          roleList.forEach((item, index) => {
            this.getRolesTree(item.roleId)
          })
        }
      },

      async getRolesTree(id) {
        let param = {
          roleId: id
        }
        let res = await this.$http.post(this.$api.rolesystemroletreelist, param);
        if (res.data.resultCode == "10000") {
          this.data = this.data.concat(res.data.data);
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
  .edit_item_title {
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
