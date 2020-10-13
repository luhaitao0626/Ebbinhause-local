<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5>默认颜色</h5> -->
      <el-menu
        default-active="1-1"
        @open="handleOpen"
        @close="handleClose"
        >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>进度一览</span>
          </template>
          <el-menu-item index="1-1">YearView</el-menu-item>
          <el-menu-item index="1-2">MonthView</el-menu-item>         
          <el-menu-item index="1-3">DayView</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导入导出</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">扩展功能</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    
  </el-row>

</template>

<script>
  export default {
    name: 'Aside',
    data() {
      return {

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .tac {
    height:100%;
  }
  .el-menu {
    border-right:0
  }
</style>
