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
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>转警模式:</div>
        <a-select :value="conditionSelect?conditionSelect:'请选择转警模式'" class='select_item_warnings' @change="conditionSelectChange">
          <a-select-option v-for='(item,index) in conditionList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_warnings_toast">注：可直接选择转警模式</div>
      </div>
      <div class="flexrow  edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>转警条件:</div>
        <a-input v-if="conditionSelect==1000||!conditionSelect" :disabled='true' style="width: 667px;" :placeholder="conditionSelect?'自动转警,无需条件':'请选择转警条件'" />
        <div style="width: 667px;" v-if="conditionSelect==1020">
          <a-input :disabled='true' style="width: 140px;" placeholder="持续时长(分钟)" />
          <a-input-number style="width: 520px;font-size: 14px;" :max='1440' v-model='warning.duration'></a-input-number>
        </div>
        <div class="flexcolumn">
          <div class="flexrow flexac" v-for="(itemp,indexp) in warningConList" :key='indexp' style="width: 667px;margin-bottom: 5px;"
            v-if="conditionSelect==1010">
            <a-select style="width: 140px;" v-model='itemp.parameterId'>
              <a-select-option v-for='(item,index) in conditionTypeList' :key='index' :value='item.parameterId'>
                {{item.parameterName}}
              </a-select-option>
            </a-select>
            <a-select style="width: 140px;margin-left: 10px;margin-right: 10px;" v-model='itemp.operation'>
              <a-select-option v-for='(item,index) in conditionInList' :key='index' :value='item.comboBoxId'>
                {{item.comboBoxName}}
              </a-select-option>
            </a-select>
            <a-input-number v-model='itemp.threshold' type="number" :min="itemp.parameterId==='10002000200000'?0.03:(itemp.parameterId==='10002000100000'?86:0)"
              :max="itemp.parameterId==='10002000200000'?5.00:(itemp.parameterId==='10002000100000'?300:(itemp.parameterId==='10002000300000'?400:1))"
              :step="itemp.parameterId=='10002000200000'||itemp.parameterId=='10002000300000'?0.01:0" style="width: 320px;font-size: 14px;"
              @change='changNumber(indexp)'></a-input-number>
            <a-icon v-if='warningConList.length<=15' @click='add(itemp,indexp)' type="plus-circle" style="font-size: 22px; margin-left: 5px;margin-right: 5px;" />
            <a-icon @click='remove(indexp)' type="minus-circle" style="font-size: 22px;" />
          </div>
        </div>
      </div>
      <div class="flexrow  edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>转警事件:</div>

        <a-table style='width: 667px' :columns="dictionaryColumns" :data-source="eventList" :pagination='false'
          :bordered='true' size='small' :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
          <template slot="index" slot-scope="text, record,index">
            {{index+1}}
          </template>
        </a-table>
      </div>
      <div class="flexrow flexac edit_item_warnings">
        <div class="edit_item_warnings_title3">流程示意图:</div>
        <div class="isupload">
          <a-upload name="file" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :action="postimgurl"
            :before-upload="beforeUpload" @change="handleChange">
            <img v-if="warning.flowImage" :src="warning.flowImage" alt="file" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <div class="col_red">支持PNG、JPEG、JPG格式，1KB至2M</div>
        </div>
      </div>
      <div class="flexrow  edit_item_warnings">
        <div class="edit_item_warnings_title3"><a style="color: #FF0000;">*</a>警报描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_warnings' :rows="5" v-model='warning.remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{warning.remark.length}}/250</div>
        </div>
      </div>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 20px;" @click='reset'>重置</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import tableTitleData from "../table.json";
  import {
    postimgurl
  } from '../../../../js/url.js'

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {

    data() {

      return {
        postimgurl,
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
        conditionList: [{ //转警条件
            comboBoxId: 1000,
            comboBoxName: '自动转警'
          },
          {
            comboBoxId: 1010,
            comboBoxName: '条件转警'
          },
          {
            comboBoxId: 1020,
            comboBoxName: '持续转警'
          }
        ],
        conditionTypeList: [],
        conditionInList: [{ //转警条-1=小余、-10=小余等于，0=等于，1=大于，10=大于等于
            comboBoxId: -1,
            comboBoxName: '小于'
          },
          {
            comboBoxId: -10,
            comboBoxName: '小余等于'
          },
          {
            comboBoxId: 0,
            comboBoxName: '等于'
          },

          {
            comboBoxId: 1,
            comboBoxName: '大于'
          },

          {
            comboBoxId: 10,
            comboBoxName: '大于等于'
          }
        ],
        conditionSelect: '', //转警条件选择
        eventList: [], //转警事件
        warningTypeList: [], //转警事件列表
        warningSelect: '', //转警选择
        warning: {
          gradeno: 0,
          remark: ''
        }, //警告信息
        warningConList: [],
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
      this.getEventList()
      if (this.id) { //编辑
        this.getWarnInfo();
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
        if (!this.warning.remark) {
          this.$message.warning('请输入警报描述')
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
          changeModel: this.conditionSelect,
          duration: this.warning.duration,
          //operatorId: JSON.parse(localStorage.getItem('authorization')).accountId, //操作者id
          remark: this.warning.remark, //警报描述
          eventList: this.getEventSelectList(), //转警事件
          parameterValueList: []
        }
        if (this.conditionSelect == 1010)
          this.warningConList.forEach((item) => {
            // let item2 = item
            // item2.threshold = item2.threshold * 100
            param.parameterValueList.push({
              parameterId:item.parameterId,
              alarmId:item.alarmId,
              operation:item.operation,
              customerId:item.customerId,
              threshold:item.threshold*100,
              parameterValue:item.parameterValue,
              parameterCode:item.parameterCode,
              parameterName:item.parameterName
            })
          })

        let res = await this.$http.post(this.$api.alramform, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.$router.push('/devicewarning')
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      chooseEvent(eventId) {
        this.selectEvent = eventId
      },
      handleChange(info) {
        if (info.file.status === "uploading") {
          this.loading = true;
          return;
        }
        if (info.file.status === "done") {
          // Get this url from response in real world.
          this.warning.flowImage = info.file.response.data;
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
      /* 获取警报类别 条件列表 */
      async getCombobox() {
        let param = {
          classCode: 'device_alarm_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.warningTypeList = res.data.data
        }
        let res1 = await this.$http.post(this.$api.alramcombobox, {})
        if (res1.data.resultCode == 10000) {
          this.conditionTypeList = res1.data.data
        }
      },

      handleGradeSelectChange(value) {
        this.warning.gradeno = value
      },
      conditionSelectChange(value) {
        if (!this.warningConList)
          this.warningConList = []
        if (value == 1010 && this.warningConList.length <= 0) {
          this.warningConList.push({
            parameterId: this.conditionTypeList[0].parameterId,
            operation: this.conditionInList[0].comboBoxId
          })
        }
        this.conditionSelect = value

      },
      changNumber(index) {
        let type = this.warningConList[index].type
        if (type == 'current') {
          let num = this.warningConList[index].numberValue.toString().split('.')
          if (num.length > 1 && num[1].length > 2) {
            this.warningConList[index].numberValue = parseFloat(num[0] + '.' + num[1].substring(0, 2))
          }
        } else {}
      },
      /* 获取事件列表*/
      async getEventList() {
        let res = await this.$http.post(this.$api.deviceeventlist, {})
        if (res.data.resultCode == 10000) {
          this.eventList = res.data.data
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
          this.eventList = this.eventList.concat(this.warning.eventList)
          if (this.warning.eventList.length > 0) {
            this.selectedRowKeys = []
            let that = this
            for (let i = 0; i < this.warning.eventList.length; i++) {

              this.selectedRowKeys.push(i)
            }
          }
          this.warningSelect = this.warning.alarmType
          this.warningConList = this.warning.parameterValueList
          this.warningConList.forEach((item, index) => {
            this.warningConList[index].threshold = this.warningConList[index].threshold / 100
          })
          this.conditionSelect = this.warning.changeModel
        }
      },
      onSelectChange(selectedRowKeys) { //选择警报类型
        this.selectedRowKeys = selectedRowKeys;
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
      /* 重置*/
      reset() {
        if (this.id) {
          this.getWarnInfo()
        } else {
          this.selectedRowKeys = []
          this.warningSelect = ''
          this.warning = {
            gradeno: 0,
            remark: ''
          }
        }
      },
      add(item, index) {
        this.warningConList.splice(index + 1, 0, {
          parameterId: item.parameterId,
          operation: item.operation
        })
      },
      remove(index) {
        if (this.warningConList.length == 1)
          return
        this.warningConList.splice(index, 1)
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
