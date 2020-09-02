<template>
  <div class="flexcolumn" style="background-color: #FFFFFF;">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级名称:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{parentName}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">上级代码:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{parentCode}}</div>
        <div class="edit_item_toast">注：不可选</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典名称:</div>
        <a-input class='edit_a_input' v-model='className' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <div class="edit_item_toast">注：区划名字不超过30个字</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>字典代码:</div>
        <a-input class='edit_a_input' v-model='classCode' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典等级:</div>
        <div class='edit_a_input' style="background-color:#f5f5f5 ;border: 1px solid #dcdcdc;">{{grade}}</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">字典描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :maxLength='256' :rows="5" placeholder="字典描述" @change="onChangeConfig"
            v-model="remark" />
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
              <a v-if='record.edit&&record.numCode&&record.numName' @click="() => save(index)">保存</a>
              <a-popconfirm v-if='record.id' title="确定删除数值吗?" @confirm="() => cancel(record)">
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
    <is-add v-if='showAddDialog' @close='closeDialog' @submitNum="addNum"></is-add>
  </div>
</template>

<script>
  import tableTitleData from "./dictionary.json";
  import isAdd from './adddialog.vue'
  export default {
    components: {
      isAdd: isAdd
    },
    data() {

      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns, //数值title
        classCode: '', //上级代码
        parentName: '', //上级名称
        grade: '', //字典等级
        className: '', //字典名称
        parentCode: '', //字典代码
        remark: '', //字典描述
        congigmidLenght: 0, //描述的文字长度
        cacheData: {}, //编辑缓存的原始数据
        szList: [], //数值列表
        dictid: '', //页面传的字典id
        isAdd: false, //是否是添加/编辑
        showAddDialog: false //是否展示添加dialog
      }
    },
    created() { //获取页面传过来的数据
      this.dictid = this.$route.query.dictid
      this.isAdd = this.$route.query.add
      if (this.dictid) { //编辑状态，请求字典详细信息
        this.getDictionaryInfo(this.dictid);
      }
    },
    methods: {
      closeDialog() { //关闭dialog
        this.showAddDialog = false
      },
      async getDictionaryInfo(dictionaryId) { //请求获取字典信息
        let param = {
          dictionaryId: dictionaryId //字典id
        }
        let res = await this.$http.post(this.$api.dictionarydetail, param);
        if (res.data.resultCode == "10000") { //请求成功
          this.cacheData = res.data.data
          this.setShowData();
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      setShowData() { //设置展示的数据
        if (this.cacheData.dictionaryList)
          this.szList = this.cacheData.dictionaryList;//数值列表

        this.classCode = this.cacheData.classCode; //字典代码
        this.className = this.cacheData.className; //字典名称
        this.parentName = this.cacheData.parentName; //上级名称
        this.grade = this.cacheData.grade; //字典等级
        this.parentCode = this.cacheData.parentCode; //上级代码
        this.remark = this.cacheData.remark; //字典描述
        if (this.isAdd == 'true') {
          this.classCode = "";
          this.className = "";
        }
      },
      submit() { //保存
        if (!this.className) {
          this.$message.warning('字典名称不能为空');
          return
        }
        if (!this.classCode) {
          this.$message.warning('字典代码不能为空');
          return
        }
        this.submitHttp(this.isAdd == 'true', this.className, this.classCode, this.remark, 1000)
      },

      onChangeConfig(e) { //修改字典描述
        this.congigmidLenght = this.remark.length
      },
      addLine() { //展示添加数值dialog
        this.showAddDialog = true
      },
      handleChange(value, key, column) { //修改某一项数值
        const newData = [...this.szList];
        const target = newData[key];
        if (target) {
          target[column] = value;
          target['edit'] = true
          this.szList = newData;
        }
      },

      save(index) { //保存数值请求
        let item = this.szList[index]
        this.submitHttp(true, item.numName, item.numCode, item.numRemark, 2000)
      },
      addNum(item){//添加数值
        this.submitHttp(true, item.autoName, item.autoCode, item.autoDescribe, 2000)
      },
      async submitHttp(add, className, classCode, remark, typeCode) {//保存请求

        let param = {
          dictionaryId: add ? '' : this.dictid,//新增不传id
          parentId: this.cacheData.parentId, //父级id
          parentCode: this.cacheData.parentCode, //父级代码
          className: className, //类型
          classCode: classCode, //字典代码
          remark: remark, //备注
          grade: this.grade, //等级
          operatorId: '5172dadd6d7c404e8ac657f32f81d969',
          typeCode: typeCode//添加数值 2000 添加字典 1000
        }
        let res = await this.$http.post(this.$api.dictionaryform, param);
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
        this.getDictionaryInfo(this.dictid);
        console.log(this.$api.dictionaryform)
        console.log(param)
        console.log(res)
      },

      async cancel(item) { //删除数值行
        let param = {
          dictionaryId: item.dictionaryId
        }
        let res = await this.$http.post(this.$api.dictionaryremove, param);
        this.getDictionaryInfo(this.dictid);
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
