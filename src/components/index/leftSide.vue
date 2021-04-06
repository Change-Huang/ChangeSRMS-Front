<template>
  <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffe59b" router
    unique-opened>
    <el-submenu index="1" v-if="role === 'user'">
      <template slot="title">
        <i class="submenu iconfont icon-gongneng"></i>
        <span>用户功能</span>
      </template>
      <el-menu-item index="/reservationSubmit">借用申请</el-menu-item>
      <el-menu-item index="/historyManage">申请列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2" v-if="role === 'general' || role ==='super'">
      <template slot="title">
        <i class="submenu iconfont icon-zhilixitongguanli"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/userManage">用户管理</el-menu-item>
      <el-menu-item index="/siteManage">场地管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3" v-if="role === 'general' || role ==='super'">
      <template slot="title">
        <i class="submenu iconfont icon-wuzijieyong"></i>
        <span>借用管理</span>
      </template>
      <el-menu-item index="/firstCheck">初次审核</el-menu-item>
      <el-menu-item index="/secondCheck">二次审核</el-menu-item>
      <el-menu-item index="/keyManage" v-if="role ==='super'">钥匙借还</el-menu-item>
    </el-submenu>
    <el-submenu index="4" v-if="role ==='super'">
      <template slot="title">
        <i class="submenu iconfont icon-guanli"></i>
        <span>后台管理</span>
      </template>
      <el-menu-item index="/adminManage">人员管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: ['role'],
  created () {
    this.role = window.sessionStorage.getItem('role')
  }
}

</script>

<style>
.submenu {
  vertical-align: middle;
  margin-right: 7px;
  margin-left: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}

</style>
