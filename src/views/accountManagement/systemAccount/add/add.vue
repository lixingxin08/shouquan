<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx"><a style="color: #FF0000;">*</a>关联人员姓名:</div>
        <a-input :disabled='true' class='edit_a_input_zzx' v-model='config.realName' placeholder="请选择人员" />
        <a-button type='primary' @click='chooseAccount' style='margin-left: 20px;'>选择人员</a-button>
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">所属部门:</div>
        <a-input :disabled='true' class='edit_a_input_zzx' v-model="config.departmentName" :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">人员性别:</div>
        <a-input v-if='!config.realName' :disabled='true' class='edit_a_input_zzx' placeholder="请选择人员" />
        <a-input v-else :disabled='true' class='edit_a_input_zzx'  v-model="config.gender==1?'男':'女'"  :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">手机号码:</div>

        <a-input :disabled='true' class='edit_a_input_zzx' v-model='config.mobilePhone' :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">电子邮箱:</div>
        <a-input :disabled='true' class='edit_a_input_zzx' v-model='config.email' :placeholder="!config.realName?'请选择人员':'无'" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">人员状态:</div>
        <a-input v-if='!config.realName' :disabled='true' class='edit_a_input_zzx' placeholder="请选择人员" />
        <a-input v-if='config.personStatus==0&&config.realName' :disabled='true' class='edit_a_input_zzx' placeholder="休假" />
        <a-input v-if='config.personStatus==1&&config.realName' :disabled='true' class='edit_a_input_zzx' placeholder="正常" />
        <a-input v-if='config.personStatus==2&&config.realName' :disabled='true' class='edit_a_input_zzx' placeholder="离岗" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">岗位职务:</div>
        <a-input :disabled='true' class='edit_a_input_zzx' v-model='config.position' :placeholder="!config.realName?'请选择人员':'无岗位职务'" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx"><a style="color: #FF0000;">*</a>账号名称:</div>
        <a-input class='edit_a_input_zzx' :maxLength='11' v-model='config.userName' placeholder="5-11位，支持英文和数字，字母区分大小写" />
      </div>
      <div class="flexrow flexac edit_item_zzx" v-if="!accountid">
        <div class="edit_item_zzx_title2_zzx"><a style="color: #FF0000;">*</a>账号密码:</div>
        <a-input-password :maxLength='16' class='edit_a_input_zzx' style='margin-left: -7px;width: 455px;' v-model='config.cipher'
          placeholder="6-16位，须包含数字、字母和符号，区分大小写" />
      </div>
      <div class="flexrow flexac edit_item_zzx" v-if="!accountid">
        <div class="edit_item_zzx_title2_zzx"><a style="color: #FF0000;">*</a>确认密码:</div>
        <a-input-password :maxLength='16' class='edit_a_input_zzx' style='margin-left: -7px;width: 455px;' v-model='config.cipher2'
          placeholder="6-16位，须包含数字、字母和符号，区分大小写" />
      </div>

      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx"><a style="color: #FF0000;">*</a>账号状态:</div>
        <a-radio-group v-model='config.statusCode' @change="onChange">
          <a-radio v-for="(item,index) in plainOptions" :key="index" :value="item.key">
            {{item.name}}
          </a-radio>
        </a-radio-group>
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title2_zzx">账号描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input_zzx' style='width: 667px;' :rows="5" v-model='config.remark' :maxLength='250' placeholder="250字以内，格式不限制"
            @change="onChangeConfig" />
          <div class="edit_number_zzx">{{num}}/250</div>
        </div>
      </div>


      <div class="flexrow edit_item_zzx_title2_zzx" style="width: 100%;margin-left: 60px; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 14px;"><a
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
        plainOptions, //人员状态选择列表
        selectId: '', //菜单id
        accountid: '', //账号id
        selectName: '', //菜单名称
        config: { //页面详情数据
          statusCode: 1,
        },
        num: 0, //描述字符长度
        isShow: false, //是否展示选择人员
        tableList: [], //分配角色列表数据
        tableTitle: [{ //分配角色table title
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
        selectedRowKeys: [], //选择角色的key
      }
    },
    created() {
      this.selectId = this.$route.query.id //菜单id
      this.accountid = this.$route.query.accountid //是否新增
      this.selectName = this.$route.query.name //父级菜单名称
      if (this.accountid) { //获取账号详情
        this.getAccountDetail()
      } else {
        this.getRoles() //获取角色列表
      }
    },
    methods: {
      /* 选择人员的回调人员详情*/
      confirm(config) {
        this.config = config
        this.config.personStatus = config.statusCode //因为人员状态的key 和账号状态的key 一样 从新赋值
        this.isShow = false
      },
      /* 保存，确认*/
      async submit() {
        if (!this.config.realName) {
          this.$message.warning('请关联人员')
          return
        }
        if (!this.config.userName) {
          this.$message.warning('请输入账号名称')
          return
        }
        if (this.config.userName.length < 5) {
          this.$message.warning('账号长度要求5-11位')
          return
        }
        if (!this.accountid) {
          if (!this.config.cipher || !this.config.cipher2) {
            this.$message.warning('请输入密码')
            return
          }
          if (this.config.cipher.length < 5 || this.config.cipher2.length < 5) {
            this.$message.warning('密码格式不对')
            return
          }
          if (this.config.cipher != this.config.cipher2) {
            this.$message.warning('两次密码不一致')
            return
          }
        }
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请关联角色')
          return
        }
        this.config.operatorId = JSON.parse(localStorage.getItem('usermsg')).accountId
        this.config.roleList = this.getRolesId() //获取分配的角色列表
        let res = await this.$http.post(this.$api.accountinfoform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          if (!this.accountid)
            this.$router.go(-1)
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 重置*/
      reset() {
        if (this.accountid) {
          this.getAccountDetail()
        } else {
          this.config = {}
          this.selectedRowKeys = {}
        }
      },
      /* 获取分配的角色id */
      getRolesId() {
        let list = []
        this.selectedRowKeys.forEach((item) => {
          list.push(this.tableList[item].roleId)
        })
        return list
      },
      /* 取消选中的人员*/
      cancle() {
        this.isShow = false
      },
      /* 选中人员后的回调*/
      chooseAccount() {
        this.isShow = true
        this.$refs.ca.setSelectId(this.selectId)
        this.$refs.ca.getpersonpage()
      },
      /* 修改字典描述*/
      onChangeConfig(e) {
        this.num = this.config.remark.length
      },
      /* 选择角色*/
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      /* 切换人员状态*/
      onChange(e) {
        this.config.statusCode = e.target.value
      },
      /* 获取账号详情*/
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
          let res2 = await this.$http.post(this.$api.persondetail, param2) //获取人员详情
          if (res2.data.resultCode == 10000) {
            config.personStatus = res2.data.data.statusCode //人员状态
            config.email = res2.data.data.email //邮箱
            config.gender = res2.data.data.gender //性别
            config.position = res2.data.data.position //职务
          }
          this.config = config
          this.tableList.forEach((item, index) => { //获取分配的角色id
            if (item.select) {
              this.selectedRowKeys.push(index)
            }
          })
        }
      },
      /* 获取角色列表 */
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
  .edit_item_zzx_title2_zzx {
    width: 120px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_zzx {
    margin: 0 auto;
    margin-top: 24px;
  }

  .select_item_zzx {
    width: 447px;
  }

  .edit_item_zzx_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_zzx {
    width: 447px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }

  .edit_number_zzx {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }
</style>
