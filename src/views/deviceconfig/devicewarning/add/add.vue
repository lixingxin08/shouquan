<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">


      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>警报名称:</div>

        <a-input class='edit_a_input' :maxLength='50' v-model='warning.alarmName' placeholder="请输入您选择的型号名称" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>警报代码:</div>
        <a-input class='edit_a_input' :maxLength='50' v-model='warning.alarmCode' placeholder="请输入您选择的型号代码" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>警报类型:</div>
        <a-select :value="warningSelect?warningSelect:'请选择警报类型'" class='select_item' @change="handleSelectChange">
          <a-select-option v-for='(item,index) in warningTypeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：可直接选择警报类型</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>警报等级:</div>
        <a-select :value="warning.gradeno?warning.gradeno:'请选择警报类型'" class='select_item' @change="handleGradeSelectChange">
          <a-select-option v-for='(item,index) in gradeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：可直接选择警报等级</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">警报描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='warning.remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{num}}/250</div>
        </div>
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">设备图标:</div>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture">
          <a-button>
            <a-icon type="upload" /> upload </a-button>
        </a-upload>
      </div>


      <div class="flexrow edit_item_title" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">转警事件</div>

      <a-table :columns="dictionaryColumns" :data-source="eventList" :pagination='false' :bordered='true' size='small'
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

  export default {

    data() {

      return {
        selectedRowKeys: [], //选择转警事件
        gradeList: [{ //警报等级
            comboBoxId: 1,
            comboBoxName: '高危'
          },
          {
            comboBoxId: 2,
            comboBoxName: '普通'
          },
          {
            comboBoxId: 3,
            comboBoxName: '忽略'
          }
        ],
        eventList: [], //转警事件
        warningTypeList: [], //转警事件列表
        warningSelect: '', //转警选择
        warning: {
          gradeno: 0
        }, //警告信息
        dictionaryColumns: tableTitleData.data.add,
        num: 0, //描述长度
        id: '' //修改的id
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getCombobox()
      if (this.id) { //编辑
        this.getWarnInfo();
      } else {
        this.getEventList()
      }
    },
    methods: {
      /* 保存警报事件 */
      async submit() {
        if (!this.warning.alarmName) {
          this.$message.warning('警报名字不能为空')
          return
        }
        if (!this.warning.alarmCode) {
          this.$message.warning('警报代码不能为空')
          return
        }
        if (!this.warningSelect) {
          this.$message.warning('请选择警报类型')
          return
        }
        if (this.warning.gradeno <= 0) {
          this.$message.warning('请选择警报等级')
          return
        }
        if (!this.selectedRowKeys) {
          this.$message.warning('请至少勾选一个转警事件')
          return
        }
        let param = {
          alarmId: this.id, //警报id 为空添加
          alarmName: this.warning.alarmName, //警报名称
          alarmCode: this.warning.alarmCode, //警报代码
          alarmType: this.warningSelect, //警报类型
          flowImage: this.warning.flowImage, //流程示意图
          gradeno: this.warning.gradeno,
          operatorId: '5172dadd6d7c404e8ac657f32f81d969', //操作者id
          remark: this.warning.remark, //警报描述
          eventIdList: this.getEventSelectList() //转警事件
        }
        let res = await this.$http.post(this.$api.alramform, param)
        if (res.data.resultCode == 10000) {
          if (!this.id)
            this.$router.go(-1)
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

      /* 获取警报类别列表 */
      async getCombobox() {
        let param = {
          classCode: 'device_alarm_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.warningTypeList = res.data.data
        }
      },
      handleGradeSelectChange(value) {
        this.warning.gradeno = value
      },
      /* 获取事件列表*/
      async getEventList() {
        let param = {
          pageSize: 200,
          pageIndex: 1,
          keyword: '',
          eventType: ''
        }
        let res = await this.$http.post(this.$api.deviceeventpage, param)
        if (res.data.resultCode == 10000) {
          this.eventList = res.data.data.list
        }
      },
      /* 获取警告详情*/
      async getWarnInfo() {
        let param = {
          alarmId: this.id
        }
        let res = await this.$http.post(this.$api.alramdetail, param);
        if (res.data.resultCode == 10000) {
          this.warning = res.data.data
          this.eventList = this.warning.eventList
          this.warningSelect = this.warning.alarmType
          if (this.eventList.length > 0) {
            this.selectedRowKeys = []
            let that = this
            for (let i = 0; i < this.eventList.length; i++) {
              if (this.eventList[i].select)
                this.selectedRowKeys.push(i)
            }
          }
        }
      },

      /* 获取关联品牌 */
      getEventSelectList() {
        let list = []
        for (let i = 0; i < this.selectedRowKeys.length; i++) {
          list.push(this.eventList[this.selectedRowKeys[i]].eventId)
        }
        return list
      },
      /**
       * 修改描述
       * */
      onChangeConfig(e) {
        this.num = this.warning.remark.length
      },
      handleSelectChange(value) { //授权类型下拉选择
        this.warningSelect = value
      },
      onSelectChange(selectedRowKeys) { //选择警报类型
        this.selectedRowKeys = selectedRowKeys;
      },
      /* 重置*/
      reset() {
        if (this.id) {
          this.getWarnInfo()
        } else {
          this.selectedRowKeys = []
          this.warning = {}
        }
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

  .select_item {
    width: 667px;
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
