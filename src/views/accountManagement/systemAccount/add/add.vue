<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>关联人员姓名:</div>
        <a-input :disabled='true' class='edit_a_input' v-model='config.realName' placeholder="请选择人员" />
        <a-button type='primary' @click='chooseAccount' style='margin-left: 20px;'>选择人员</a-button>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">所属部门:</div>
        <a-input :disabled='true' class='edit_a_input' v-model="config.departmentName" :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">人员性别:</div>
        <a-input v-if='!config.realName' :disabled='true' class='edit_a_input' placeholder="请选择人员" />
        <a-input v-else :disabled='true' class='edit_a_input' v-model="config.gender==1?'男':'女'" :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">手机号码:</div>

        <a-input :disabled='true' class='edit_a_input' v-model='config.mobilePhone' :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">电子邮箱:</div>
        <a-input :disabled='true' class='edit_a_input' v-model='config.email' :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">人员状态:</div>
        <a-input v-if='!config.realName' :disabled='true' class='edit_a_input' placeholder="请选择人员" />
        <a-input v-if='config.personStatus==0&&config.realName' :disabled='true' class='edit_a_input' placeholder="休假" />
        <a-input v-if='config.personStatus==1&&config.realName' :disabled='true' class='edit_a_input' placeholder="正常" />
        <a-input v-if='config.personStatus==2&&config.realName' :disabled='true' class='edit_a_input' placeholder="离岗" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">岗位职务:</div>
        <a-input :disabled='true' class='edit_a_input' v-model='config.position' :placeholder="!config.realName?'请选择人员':'无岗位职务'" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>账号名称:</div>
        <a-input class='edit_a_input' :maxLength='11' v-model='config.userName' placeholder="5-11位，支持英文和数字，字母区分大小写" />
      </div>
      <div class="flexrow flexac edit_item" v-if="!accountid">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>账号密码:</div>
        <a-input-password :maxLength='16' class='edit_a_input' style='margin-left: -7px;width: 455px;' v-model='config.cipher'
          placeholder="6-16位，须包含数字、字母和符号，区分大小写" />
      </div>
      <div class="flexrow flexac edit_item" v-if="!accountid">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>确认密码:</div>
        <a-input-password :maxLength='16' class='edit_a_input' style='margin-left: -7px;width: 455px;' v-model='config.cipher2'
          placeholder="6-16位，须包含数字、字母和符号，区分大小写" />
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>账号状态:</div>
        <a-radio-group v-model='config.statusCode' @change="onChange">
          <a-radio v-for="(item,index) in plainOptions" :key="index" :value="item.key">
            {{item.name}}
          </a-radio>
        </a-radio-group>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">账号描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='config.remark' :maxLength='500' placeholder="500字以内，格式不限制"
            @change="onChangeConfig" />
          <div class="edit_number">{{num}}/500</div>
        </div>
      </div>


      <div class="flexrow edit_item_title" style="width: 100%;margin-left: 60px; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 14px;"><a
          style="color: #FF0000;">*</a>分配角色</div>

      <a-table style='width: 447px;margin-left: 130px;' :columns="tableTitle" :data-source="tableList" :pagination='false'
        :bordered='true' size='small' :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="index" slot-scope="text, record,index">
          {{index+1}}
        </template>
      </a-table>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 20px;" @click='reset'>重置</a-button>
      </div>
    </div>

    <is-choose-account v-show='isShow' ref='ca' @confirm='confirm' @cancleDialog='cancle'></is-choose-account>
  </div>


</template>

<script>
  import isChooseAccount from '../chooseaccount/chooseaccount.vue'
  const plainOptions = [{
    name: '正常',
    key: 1
  }, {
    name: '锁定',
    key: 2
  }];
  export default {
    components: {
      isChooseAccount
    },
    data() {
      return {
        plainOptions,
        selectId: '',
        accountid: '',
        selectName: '',
        config: {
          statusCode: 1,
        },
        num: 0,
        isShow: false,
        tableList: [],
        tableTitle: [{
            "title": "序号",
            "width": "80px",
            "align": "center",
            "ellipsis": true,
            "scopedSlots": {
              "customRender": "index"
            }
          },
          {
            "title": "角色名称",
            "align": "center",
            "dataIndex": "roleName",
            "ellipsis": true
          },
          {
            "title": "角色描述",
            "align": "center",
            "dataIndex": "remark",
            "ellipsis": true
          }
        ],
        selectedRowKeys: [],
      }
    },
    created() {
      this.selectId = this.$route.query.id //菜单id
      this.accountid = this.$route.query.accountid //是否新增
      this.selectName = this.$route.query.name //父级菜单名称
      if (this.accountid) {
        this.getAccountDetail()
      } else {
        this.getRoles()
      }
    },
    methods: {
      confirm(config) {
        this.config = config
        this.config.personStatus = config.statusCode
        this.isShow = false
        console.log(config)
      },
      async submit() {
        if (!this.config.realName) {
          this.$message.error('请关联人员')
          return
        }
        if (!this.config.userName) {
          this.$message.error('请输入账号名称')
          return
        }
        if (this.config.userName.length < 5) {
          this.$message.error('账号长度要求5-11位')
          return
        }
        if (!this.accountid) {
          if (!this.config.cipher || !this.config.cipher2) {
            this.$message.error('请输入密码')
            return
          }
          if (this.config.cipher.length < 5 || this.config.cipher2.length < 5) {
            this.$message.error('密码格式不对')
            return
          }
          if (this.config.cipher != this.config.cipher2) {
            this.$message.error('两次密码不一致')
            return
          }
        }
        if (this.selectedRowKeys.length <= 0) {
          this.$message.error('请关联角色')
          return
        }
        this.config.operatorId = '5172dadd6d7c404e8ac657f32f81d969'
        this.config.roleList = this.getRolesId()
        let res = await this.$http.post(this.$api.accountinfoform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      reset() {},

      getRolesId() {
        let list = []
        this.selectedRowKeys.forEach((item) => {
          list.push(this.tableList[item].roleId)
        })
        return list
      },
      cancle() {
        this.isShow = false
      },
      chooseAccount() {
        this.isShow = true
        this.$refs.ca.setSelectId(this.selectId)
        this.$refs.ca.getpersonpage()
      },
      /* 修改字典描述*/
      onChangeConfig(e) {
        this.num = this.config.remark.length
      },
      /* 选择人员*/
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      onChange(e) {
        this.config.statusCode = e.target.value
      },
      async getAccountDetail() {
        let param = {
          accountId: this.accountid
        }
        let res = await this.$http.post(this.$api.accountinfodetail, param)
        if (res.data.resultCode == 10000) {
          let config = {}
          config = res.data.data
          this.tableList = res.data.data.roleList
          let param2 = {
            personId: config.personId
          }
          let res2 = await this.$http.post(this.$api.persondetail, param2)
          if (res2.data.resultCode == 10000) {
            config.personStatus = res2.data.data.statusCode //人员状态
            config.email = res2.data.data.email //邮箱
            config.gender = res2.data.data.gender //性别
            config.position = res2.data.data.position //职务
          }
          this.config = config
          console.log(this.config)
          this.tableList.forEach((item, index) => {
            if (item.select) {
              this.selectedRowKeys.push(index)
            }
          })
        }
      },

      async getRoles() {
        let param = {
          pageIndex: 1,
          pageSize: 100
        }
        let res = await this.$http.post(this.$api.rolesystemlist, param)
        if (res.data.resultCode == 10000) {
          this.tableList = res.data.data.list
        }
      }
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
