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

      <a-menu-item key="runset">
        <!-- <a-icon type="upload" /> -->
        <router-link to="/runset">
          <span>运行设置</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="taskset">
        <!-- <a-icon type="upload" /> -->
        <router-link to="/taskset">
          <span>任务设置</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu key="warning" title="系统警告">
        <a-menu-item key="warning">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/warning">
            <span>警报列表</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="evlist">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/warning/evlist">
            <span>事件列表</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="police">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/warning/police">
            <span>警报关注</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="push">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/warning/push">
            <span>推送设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="transfer">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/warning/transfer">
            <span>转警设置</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="dataanaly" title="数据分析">
        <a-menu-item key="watthourmeter">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dataanaly/watthourmeter">
            <span>电表运行数据</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="terminaldata">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dataanaly/terminaldata">
            <span>终端运行数据</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="terminaldetails">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dataanaly/terminaldetails">
            <span>终端运行明细</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="equipmentdetails">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/dataanaly/equipmentdetails">
            <span>设备运行明细</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="logfile">
        <router-link to="/logfile">
          <span>操作日志</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="system">
        <router-link to="/system">
          <span>系统参数</span>
        </router-link>
      </a-menu-item>
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
