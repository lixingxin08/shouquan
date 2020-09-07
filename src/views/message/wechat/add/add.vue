<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">


    <div style="margin: 0 auto;">
      <a-steps :current="current" type="navigation" @change="onChange">
        <a-step v-for="item in steps" :key="item.status" :title="item.title" />
      </a-steps>
      <div v-if="current==0">
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title"><a style="color: #FF0000;">*</a>微信账号别名:</div>
          <a-input class='edit_a_input' v-model='wechat.wechatConfigName' placeholder="50字以内，支持中英文" />
          <!-- <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title"><a style="color: #FF0000;">*</a>帐号应用标识:</div>
          <a-input class='edit_a_input' v-model='wechat.wechatAppId' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title"><a style="color: #FF0000;">*</a>帐号应用密钥:</div>
          <a-input class='edit_a_input' v-model='wechat.wechatKey' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item" v-if="id">
          <div class="edit_item_title"><a style="color: #FF0000;"></a>接口通行令牌:</div>
          <a-input class='edit_a_input' v-model='wechat.tokenCode' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item" v-if="id">
          <div class="edit_item_title"><a style="color: #FF0000;"></a>令牌失效时间:</div>
          <a-input class='edit_a_input' v-model='wechat.expirationTime' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title"><a style="color: #FF0000;">*</a>微信账号类型:</div>
          <a-select :value="wechat.typeCode?wechat.typeCode:'请选择微信账号类型'" style="width: 667px;" @change="handleSelectChange">
            <a-select-option v-for='(item,index) in wetchatTypeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <!--  <div class="edit_item_toast">注：数字字典</div> -->
        </div>
        <div class="flexrow flexac edit_item">
          <div class="edit_item_title">备注信息:</div>
          <div style="position: relative;">
            <a-textarea class='edit_a_input' :rows="5" :maxLength='500' v-model='wechat.remark' placeholder="请输入描述"
              @change="onChangeConfig" />
            <div class="edit_number">{{num}}/500</div>
          </div>
        </div>

      </div>
      <a-table v-else style='margin-top: 20px;margin-bottom: 20px; ' :scroll="{ x: 820 }" :columns="addcolumns"
        :data-source="msgList" :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>

        <template slot="serviceId" slot-scope="text, record, index">
          <a-input style="margin: -5px 0;border: 0px;" v-model='text' @change="e => handleChange(e.target.value,index)"></a-input>
        </template>
      </a-table>
      <div class="flexrow flexjc" style="margin-top: 60px;margin-bottom: 100px;">
        <a-button type="primary" v-if='current==1' @click='submit'>保存</a-button>
        <a-button type="primary" v-if='current==0' @click='onChange(1)'>下一步</a-button>
        <a-button style="margin-left: 60px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import table from '../table.json'
  export default {
    data() {
      return {
        current: 0,
        stepStyle: {
          marginBottom: '60px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
        },
        steps: [{
            title: '微信账号',
            status: '0'
          },
          {
            title: '消息模板',
            status: '1'
          },
        ],
        wetchatTypeList: [],
        addcolumns: table.data.adddColumns,
        wechatSelect: '', //事件选择
        msgList: [],
        wechat: {}, //事件详情
        id: null,
        num: 0 //描述长度
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getWeChatInfo();
      } else {
        this.getWeChatMsgList()
      }
      this.getCombobox()

    },
    methods: {
      onChange(current) {
        if (current == 1) {
          if (!this.wechat.wechatConfigName) {
            this.$message.warning('请先填写微信账号别名')
            return
          }
          if (!this.wechat.wechatAppId) {
            this.$message.warning('请先填写微信应用标识')
            return
          }
          if (!this.wechat.wechatKey) {
            this.$message.warning('请先填写微信应用密钥')
            return
          }
          if (!this.wechat.typeCode) {
            this.$message.warning('请先选则微信账号类型')
            return
          }
        }
        this.current = current;
      },
      /* 提交事件*/
      async submit() {
        if(this.checkMsgList()){
           this.$message.warning('消息服务序号不能有重复值')
          return
        }
        let param = {
          wechatConfigId: this.id,
          wechatConfigName: this.wechat.wechatConfigName,
          wechatAppId: this.wechat.wechatAppId,
          wechatKey: this.wechat.wechatKey,
          tokenCode:this.wechat.tokenCode,
          expirationTime: this.wechat.expirationTime,
          typeCode: this.wechat.typeCode,
          operatorId: '5172dadd6d7c404e8ac657f32f81d969', //操作者id
          remark: this.wechat.remark,
          modelList:this.msgList
        }
        let res = await this.$http.post(this.$api.wechatform, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },



      /* 获取微信账号详情*/
      async getWeChatInfo() {
        let param = {
          wechatConfigId: this.id,
        }
        let res = await this.$http.post(this.$api.wechatdetail, param)
        if(res.data.resultCode==10000){
         this.wechat=res.data.data
         this.msgList=res.data.data.modelList
        }else{}
      },
      async getWeChatMsgList() {
        let param = {
          classCode: 'wechat_push_template',
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if(res.data.resultCode==10000){
          res.data.data.forEach((item)=>{
              this.msgList.push({
              serviceId:'',
              modelCode:item.comboBoxId,
              remark:item.comboBoxName
            })
          })
        }
      },

      checkMsgList(){
        let list=[]
        let has=false
        this.msgList.forEach((item)=>{
          if(list.indexOf(item.serviceId)>=0){
            has=true
          }else{
            list.push(item.serviceId)
          }
        })
        return has
      },
      /* 修改数值*/
      handleChange(value, index) {
        const newData = [...this.msgList];
        const target = newData[index];
        if (target) {
          target['serviceId'] = value;
          this.msgList = newData;
        }
      },
      /* 授权类型下拉选择 */
      handleSelectChange(e) {
        console.log(e)
        this.wechat.typeCode = e
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'message_type_wechat'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.wetchatTypeList = res.data.data
        }
      },
      /* 重置*/
      reset() {
        this.current=0
        if (this.id) {
          this.getWeChatInfo()
        } else {
          this.wechat = {}
        }
      },
      /* 描述字符长度*/
      onChangeConfig() {
        this.num = this.wechat.remark.length
      }
    },
  }
</script>

<style>
  .edit_item_title {
    width: 120px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    margin-right: 10px;
    text-align: right;
    color: #000000;
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
