<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">


      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>警报名称:</div>
        <div class='edit_a_input_warnings'>
          <a-input :maxLength='50' v-model='warning.alarmName' placeholder="请输入您选择的型号名称" />
        </div>

        <div class="edit_item_warnings_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>警报代码:</div>
        <div class='edit_a_input_warnings'>
          <a-input :maxLength='50' v-model='warning.alarmCode' placeholder="请输入您选择的型号代码" />
        </div>

        <div class="edit_item_warnings_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>警报类型:</div>
        <a-select :value="warningSelect?warningSelect:'请选择警报类型'" class='select_item_warnings' @change="handleSelectChange">
          <a-select-option v-for='(item,index) in warningTypeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_warnings_toast">注：可直接选择警报类型</div>
      </div>
      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>警报等级:</div>
        <a-select :value="warning.gradeno?warning.gradeno:'请选择警报类型'" class='select_item_warnings' @change="handleGradeSelectChange">
          <a-select-option v-for='(item,index) in gradeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_warnings_toast">注：可直接选择警报等级</div>
      </div>
      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3">警报描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_warnings' :rows="5" v-model='warning.remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{warning.remark.length}}/250</div>
        </div>
      </div>

      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3">流程示意图:</div>
      <div class="isupload">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
        :action="postimgurl"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="warning.flowImage" :src="warning.flowImage" alt="file" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <div class="col_red">支持PNG、JPEG、JPG格式，1KB至2M</div>
      </div>
      </div>


      <div class="flexrow edit_item_warnings_title3" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a style="color: #FF0000;">*</a>转警事件</div>

      <a-table style='width: 50vw;' :columns="dictionaryColumns" :data-source="eventList" :pagination='false' :bordered='true'
        size='small' :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
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
import {postimgurl} from '../../../../js/url'
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {

    data() {

      return {
       postimgurl:postimgurl+'?businessCode=ALARMFLOW',
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
          gradeno: 0,
          remark: ''
        }, //警告信息
        dictionaryColumns: tableTitleData.data.add,
        num: 0, //描述长度
        id: '', //修改的id
        loading: false,
        imageUrl: '',
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
          operatorId: JSON.parse(localStorage.getItem('authorization')).accountId, //操作者id
          remark: this.warning.remark, //警报描述
          eventIdList: this.getEventSelectList() //转警事件
        }
        let res = await this.$http.post(this.$api.alramform, param)
        if (res.data.resultCode == 10000) {
          //if (!this.id)
            this.$router.go(-1)
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },

    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
          this.warning.flowImage  = info.file.response.data;
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
              if (this.eventList[i].selectFlag==1)
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
          this.warningSelect=''
          this.warning = {
            gradeno: 0,
            remark: ''
          }
        }
      }
    },
  }
</script>

<style>
  .edit_item_warnings_title3 {
    width: 80px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_warnings {
    margin: 0 auto;
    margin-top: 24px;
  }

  .select_item_warnings {
    width: 667px;
  }

  .edit_item_warnings_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_warnings {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
