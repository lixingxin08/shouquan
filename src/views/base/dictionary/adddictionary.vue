<template>
  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级名称:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{dictionnaryName}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级代码:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{dictionaryClassCode}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典名称:</div>
        <a-input class='edit_a_input' v-model='configName' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <div class="edit_item_toast">注：区划名字不超过30个字</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典代码:</div>
        <a-input class='edit_a_input' v-model='configCode' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典等级:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{dictionnaryGrade}}</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :maxLength='256' :rows="5" placeholder="字典描述" @change="onChangeConfig"
            v-model="configmid" />
          <div class="edit_number">{{congigmidLenght}}/256</div>
        </div>
      </div>
      <div class="flexrow " style="margin-top: 30px;justify-item: flex-start;margin-left: 80px;">
        <a-button @click='submit'>保存</a-button>
        <a-button type="primary" style="margin-left: 20px;" @click='setShowData'>重置</a-button>
      </div>
      <div class="flexrow edit_item_title" style="margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;">数值列表</div>

      <a-table :columns="dictionaryColumns" :data-source="szList" :pagination='false' :bordered='true' size='small'>
        <template v-for="col in ['numName', 'numCode', 'numRemark']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input style="margin: -5px 0;border: 0px;" :value="text" @change="e => handleChange(e.target.value, index, col)" />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a v-if='record.edit&&record.numCode&&record.numName&&record' @click="() => save(index)">保存</a>
              <a-popconfirm v-if='record.numCode' title="确定删除数值吗?" @confirm="() => cancel(record)">
                <a style="color: ff0000;">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
      <div class="flexrow edit_item_title" style="margin-top: 10px;justify-item: flex-start;margin-bottom: 50px;font-size: 16px;">
        <a-button type='primary' @click='addLine' v-if='szList.length < 999'>新增行</a-button>
      </div>

    </div>

  </div>
</template>

<script>
  import tableTitleData from "./dictionary.json";

  export default {
    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        editingKey: '',
        dictionaryClassCode: '', //上级代码
        dictionnaryName: '', //上级名称
        dictionnaryGrade: '', //字典等级
        configName: '', //字典名称
        configCode: '', //字典代码
        configmid: '', //字典描述
        congigmidLenght: 0,
        cacheData: {},
        szList: [],
        dictid: ''
      }
    },
    created() {
      this.dictid = this.$route.query.dictid
      if (this.dictid) { //编辑
        this.getDictionaryInfo(this.dictid);
      } else { //新增

      }

    },
    methods: {

      async getDictionaryInfo(dictionaryId) {
        let param = {
          dictionaryId: dictionaryId
        }
        let res = await this.$http.post(this.$api.dictionarydetail, param);
        console.log(res)
        if (res.data.resultCode == "10000") {
          this.cacheData = res.data.data
          this.setShowData();
        }
      },
      setShowData() { //设置展示的数据
        if (this.cacheData.dictionaryList)
          this.szList = this.cacheData.dictionaryList;
        if (this.szList.length <= 0)
          for (let i = 0; i < 5; i++) {
            this.addLine()
          }
        this.dictionaryClassCode = this.cacheData.parentCode;
        this.dictionnaryName = this.cacheData.parentName;
        this.dictionnaryGrade = this.cacheData.grade;
        this.configName = this.cacheData.dictionaryName;
        this.configCode = this.cacheData.classCode;
        this.configmid = this.cacheData.remark;
      },
      async submit() {
        let param = {
          dictionaryId: this.dictid,
          parentId: this.dictionaryClassCode,
          className: this.configName,
          classCode: this.configCode,
          remark: this.configmid,
          grade: this.dictionnaryGrade
        }
          let res = await this.$http.post(this.$api.dictionaryform, param);
          console.log(res)
      },
      addLine() {
        this.szList.push({
          "numName": "",
          "numCode": "",
          "numRemark": "",
        })
      },
      onChangeConfig(e) { //修改字典描述
        this.congigmidLenght = this.configmid.length
      },

      handleChange(value, key, column) {
        const newData = [...this.szList];
        const target = newData[key];
        if (target) {
          target[column] = value;
          target['edit'] = true
          this.szList = newData;
        }
      },

      save(index) {
        let item = this.szList[index]
        console.log(this.szList[index])
      },
      cancel(record) {

      },
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
    text-align: left;
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    justify-content: center;
    height: 32px;
  }

  .edit_number {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }
</style>
