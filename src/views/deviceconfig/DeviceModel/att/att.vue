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

      <a-table style='margin-top: 20px;margin-bottom: 20px;' :columns="dictionaryColumns" :data-source="item.childrenList"
        :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>

        <template slot="propertyValue" slot-scope="text, record, index2">
          <a-input style="margin: -5px 0;border: 0px;" v-model='text' @change="e => handleChange(e.target.value, index2,index)"></a-input>
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



  const attList = [{
      title: "序号",
      width: "3%",
      align: "center",
      scopedSlots: {
        "customRender": "index"
      },
    },
    {
      title: "属性名称",
      dataIndex: "propertyName",
      align: "center",
      width: "15%",
    },
    {
      title: "属性代码",
      dataIndex: "propertyCode",
      align: "center",
      width: "15%",

      scopedSlots: {
        "customRender": "propertyCode"
      }
    },

    {
      title: "属性描述",
      dataIndex: "propertyDesc",
      align: "center",
      width: "40%",
      scopedSlots: {
        "customRender": "propertyDesc"
      }
    },

    {
      title: "属性值",
      dataIndex: "propertyValue",
      align: "center",
      width: "25%",
      scopedSlots: {
        "customRender": "propertyValue"
      }
    }
  ]
  export default {

    data() {
      return {
        dictionaryColumns: attList, //table title
        modelDetail: {}, //型号详细信息
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
        let param = []
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].childrenList) {
            for (let j = 0; j < this.groups[i].childrenList.length; j++) {
              let item = this.groups[i].childrenList[j]
              //if (item.edit) {
              let param1 = {
                propertyId: item.propertyId,
                modelId: this.id,
                deviceTypeId: item.deviceTypeId,
                propertyValue: item.propertyValue ? item.propertyValue : "",
                operatorId: '5172dadd6d7c404e8ac657f32f81d969'
              }
              param.push(param1)
              // }
            }
          }
        }
        let res = await this.$http.post(this.$api.propertyvalueform, param)
        if (res.data.resultCode == 1000) {
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
        this.reset()
      },
      /* 重置*/
      reset() {
        this.getProperty(this.modelDetail.deviceTypeId)
      },
      /* 获取设备型号信息*/
      async getModelInfo() {
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
        let res = await this.$http.post(this.$api.propertyvaluedetail, param)

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
          ///target['edit'] = true;
          this.groups = newData;
        }
      },
    }
  }
</script>
<style>
  .red-style {
    background: #000000;
  }

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
