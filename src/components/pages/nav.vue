<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.name]" :selectedKeys="[$route.name]">
      <a-menu-item key="supervision">
        <!-- <a-icon type="calendar" /> -->
        <router-link to="/home/supervision">
          <span>运行监管</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu key="administrativedivision" title="基础配置">
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
      <a-sub-menu key="devicetypes" title="设备配置">
        <a-menu-item key="devicetypes">
          <!-- <a-icon type="upload" /> -->
          <router-link to="devicetypes">
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
    </a-menu>
  </a-layout-sider>
</template>
<script>
  export default {
    name: "isnav",
    props: {
      iscollapsed: Boolean,
    },
  };
</script>
