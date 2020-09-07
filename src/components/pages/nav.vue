<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="inline"
      :defaultOpenKeys="openkey"
      :defaultSelectedKeys="[$route.name]"
      :selectedKeys="[$route.name]"
    >
      <a-sub-menu key="base" title="基础配置">
        <a-menu-item key="administrativedivision">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/administrativedivision">
            <span>行政区划</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="dictionary">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dictionary">
            <span>数字字典</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="RunParameters">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/RunParameters">
            <span>运行参数</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="systemmenu">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/systemmenu">
            <span>系统菜单</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="device" title="设备配置">
        <a-menu-item key="devicetypes">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/devicetypes">
            <span>设备类型</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="brand">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/brand">
            <span>设备品牌</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="DeviceModel">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/DeviceModel">
            <span>设备型号</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="deviceevent">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/deviceevent">
            <span>设备事件</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="devicewarning">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/devicewarning">
            <span>设备警报</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="customerpro" title="客户管理">
        <a-menu-item key="customerprofile">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/customerprofile">
            <span>客户档案</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="essentialinformation">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/essentialinformation">
            <span>基本信息</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="dpartmentManagement">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dpartmentManagement">
            <span>部门管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="personnelManagement">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/personnelManagement">
            <span>人员管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="project">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/project">
            <span>项目管理</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="message" title="消息账号">
        <a-menu-item key="wechat">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/wechat">
            <span>微信账号</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="email">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/email">
            <span>邮箱账号</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="sms">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/sms">
            <span>短信帐号</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="business" title="业务授权">
        <a-menu-item key="template">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/template">
            <span>菜单模板</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="menuauthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/menuauthorization">
            <span>菜单授权</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="zoningauthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/zoningauthorization">
            <span>区划授权</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="modelauthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/modelauthorization">
            <span>型号授权</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="alertauthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/alertauthorization">
            <span>警报授权</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="messageauthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/messageauthorization">
            <span>消息授权</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="MaintenanceAuthorization" title="维管授权">
        <a-menu-item key="CustomerAuthorization">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/CustomerAuthorization">
            <span>客户授权</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="Myclients">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/Myclients">
            <span>我的客户</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="accountManagement" title="账号管理">
        <a-menu-item key="SystemRole">
          <router-link to="/SystemRole">
            <span>系统角色</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="systemAccount">
          <router-link to="/systemAccount">
            <span>系统帐号</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="CustomerRole">
          <router-link to="/CustomerRole">
            <span>客户角色</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="CustomerUser">
          <router-link to="/CustomerUser">
            <span>客户帐号</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="MyAccount">
          <router-link to="/MyAccount">
            <span>我的帐号</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="LogManagement">
        <!-- <a-icon type="upload" /> -->
        <router-link to="/LogManagement">
          <span style="margin-right:20px">日志管理</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: "isnav",
  data() {
    return {};
  },
  computed: {
    openkey() {
      if (
        this.$route.name == "administrativedivision" ||
        this.$route.name == "dictionary" ||
        this.$route.name == "RunParameters" ||
        this.$route.name == "systemmenu"
      ) {
        return ["base"];
      }
      if (
        this.$route.name == "devicetypes" ||
        this.$route.name == "brand" ||
        this.$route.name == "DeviceModel" ||
        this.$route.name == "deviceevent" ||
        this.$route.name == "devicewarning"
      ) {
        return ["device"];
      }
      if (
        this.$route.name == "customerprofile" ||
        this.$route.name == "essentialinformation" ||
        this.$route.name == "dpartmentManagement" ||
        this.$route.name == "personnelManagement" ||
        this.$route.name == "project"
      ) {
        return ["customerpro"];
      }
      if (
        this.$route.name == "wechat" ||
        this.$route.name == "email" ||
        this.$route.name == "sms"
      ) {
        return ["message"];
      }
      if (
        this.$route.name == "template" ||
        this.$route.name == "menuauthorization" ||
        this.$route.name == "zoningauthorization" ||
        this.$route.name == "modelauthorization" ||
        this.$route.name == "alertauthorization" ||
        this.$route.name == "messageauthorization"
      ) {
        return ["business"];
      }
      if (
        this.$route.name == "CustomerAuthorization" ||
        this.$route.name == "Myclients"
      ) {
        return ["MaintenanceAuthorization"];
      }
      if (
        this.$route.name == "SystemRole" ||
        this.$route.name == "systemAccount" ||
        this.$route.name == "CustomerRole" ||
        this.$route.name == "CustomerUser" ||
        this.$route.name == "MyAccount" ||
        this.$route.name == "project"
      ) {
        return ["accountManagement"];
      }
    },
  },
  props: {
    iscollapsed: Boolean,
  },
};
</script>
<style  scoped>
</style>
