<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">新增参数
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item-model" style="margin-top: 20px;">

        <div class="item-title-model"><span style="color: #FF0033;">*</span>参数名称：</div>
        <a-input v-model='param.parameterName' :maxLength="50" placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"></a-input>
      </div>
      <div class="flexrow flexac item-model">
        <div class="item-title-model"> <span style="color: #FF0033;">*</span>参数代码：</div>
        <a-input v-model='param.parameterCode' :maxLength="50" placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"></a-input>
      </div>

      <div class="flexrow flexac item-model">
        <div class="item-title-model"><span style="color: #FF0033;">*</span>参数类别：</div>
        <a-select :value="param.parameterType?param.parameterType:'请选择参数类别'" class='select_item_param' @change="handleChange">
          <a-select-option v-for='(item,index) in paramList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac item-model">
        <div class="item-title-model">参数数值：</div>
        <a-input v-model='param.parameterValue' :maxLength="50" placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"></a-input>
      </div>
      <div class="flexrow flexac item-model">
        <div class="item-title-model">参数描述：</div>

        <a-textarea v-model="param.description" :maxLength="255" placeholder="请输入参数描述,255字以内" :auto-size="{ minRows: 3, maxRows: 5 }" />
      </div>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type='primary' @click='submit'>确定</a-button>
        <a-button style="margin-left: 70px;" @click='reset'>重置</a-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        paramType: '',
        param: {
          parameterName: '',
          parameterCode: '',
          parameterType: ''
        },
        paramList: [{}]
      }
    },

    methods: {
      setParam(item) {
        localStorage.setItem('modelparam', JSON.stringify(item))
        let item2 = JSON.parse(localStorage.getItem('modelparam'))
        this.param = item2
      },
      submit() {
        if (!this.param.parameterName) {
          this.$message.warning('参数名称不能为空');
          return
        }
        if (!this.param.parameterCode) {
          this.$message.warning('参数代码不能为空');
          return
        }
        if (!this.param.parameterType) {
          this.$message.warning('请选择参数类别');
          return
        }

        this.$emit('callback', this.param)
      },
      reset() {
        this.param = JSON.parse(localStorage.getItem('modelparam'))
      },
      closedialog() {
        this.$emit('callback')
      },
      handleChange(e) {
        this.param.parameterType = e
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'runngin_parameter_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.paramList = res.data.data
        }
      },
    }
  }
</script>

<style>
  .dialog-title {
    background: #1890FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 24px;
    height: 72px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    color: #ffffff;
    line-height: 14px;
  }

  .item-model {

    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .select_item_param {
    width: 667px;
  }

  .item-title-model {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;
    width: 120px;
    line-height: 14px;
    flex-shrink: 0;
  }
</style>
