<template>
  <div class="content2">
    <div class="flexrow flexac" style="margin-bottom: 20px;">
      <div class='title_tx'>业务类别:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.serviceTypeName}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>设备类型:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.deviceTypeName}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>设备品牌:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.brandName}}
        <a-icon type="down" />
      </div>
      <div class='title_tx'>型号名称:</div>
      <div class="flexrow flexac flexsb title_item">
        {{modelDetail.modelName}}
        <a-icon type="down" />
      </div>
    </div>
    <div class="flexcolumn" v-for="(item ,index) in groups" :key='index' style="padding: 10px;">
      <div class="flexrow flexac">
        属性分组:
        <a class="title_item" style="margin-left: 20px;width: 667px;">{{item.propertyName}}</a>
      </div>

      <a-table v-if='item.childrenList&&item.childrenList.length>0' style='margin-top: 20px;margin-bottom: 20px;'
        :columns="dictionaryColumns" :data-source="item.childrenList" :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>
        <template v-for="col in ['propertyName', 'propertyCode', 'propertyDesc']" :slot="col" slot-scope="text, record, index2">
          <div>{{text}}</div>
        </template>
        <template slot="propertyValue" slot-scope="text, record, index2">
          <a-input style="margin: -5px 0;border: 0px;"  v-model='text' @change="e => handleChange(e.target.value, index2,index)"></a-input>
        </template>
      </a-table>
    </div>
    <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
      <a-button type="primary" @click='submit'>保存</a-button>
      <a-button style="margin-left: 20px;" @click='reset'>重置</a-button>
    </div>

  </div>
</template>
<script>
  import tableTitleData from "../table.json";
  export default {

    data() {
      return {
        dictionaryColumns: tableTitleData.data.attList,
        modelDetail: {},
        groups: [], //参数列表
      }

    },
    created() {
      this.id = this.$route.query.id
      this.getModelInfo()
    },
    methods: {
      /* 提交属性*/
      async submit() {
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].childrenList) {
            for (let j = 0; j < this.groups[i].childrenList.length; j++) {
              let item = this.groups[i].childrenList[j]
              let param = {
                propertyId: item.propertyId,
                propertyValue: item.propertyValue, //父级属性id
                operatorId: '5172dadd6d7c404e8ac657f32f81d969'
              }
              console.log(param)
              //let res = await this.$http.post(this.$api.propertyvalueform, param)
            }
          }
        }
        this.reset()
      },
      /* 重置*/
      reset() {
        this.getProperty(this.modelDetail.deviceTypeId)
      },
      async getModelInfo() { //获取设备型号信息
        let param = {
          modelId: this.id
        }
        let res = await this.$http.post(this.$api.devicemodeldetail, param);
        if (res.data.resultCode == 10000) {
          this.modelDetail = res.data.data
          this.getProperty(this.modelDetail.deviceTypeId)
        }
      },
      /* 获取分组信息*/
      async getProperty(id) {
        let param = {
          deviceTypeId: id
        }
        let res = await this.$http.post(this.$api.propertylist, param)

        if (res.data.resultCode == 10000) {
          let data = res.data.data
          for (let i = 0; i < data.length; i++) {
            if (!data[i].childrenList) {
              data[i].childrenList = []
            }
          }
          this.groups = data

        }
      },
      /* 修改数值*/
      handleChange(value, chilidIndex, groupIndex) {
        const newData = [...this.groups];
        const target = newData[groupIndex].childrenList[chilidIndex];
        if (target) {
          target['propertyValue'] = value;
          this.groups = newData;
        }
      },
    }
  }
</script>
<style>
  .title_tx {
    flex-shrink: 0;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    margin-right: 10px;
    margin-left: 10px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }

  .addbtn {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    width: 120px;
    margin-bottom: 20px;
    height: 40px;
    background: #1890ff;
    border: 1px solid #1890ff;
    border-radius: 8px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 10px;
    margin-right: 10px;
  }

  .title_item {
    background: #f5f5f5;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    width: 200px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
  }
</style>
