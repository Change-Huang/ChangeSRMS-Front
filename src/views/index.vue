<!-- 主页面 -->

<template>
  <el-container class="index-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="top-menu-left">
        <img src="../assets/logo.png" alt="avatat">
        <div>Change场地预约管理系统</div>
      </div>
      <div class="top-menu-right">
        <div>{{role}}</div>
        <el-menu mode="horizontal" @select="handleSelect" background-color="#373d41"
          text-color="#fff" active-text-color="#ffe59b">
          <el-submenu index="userCenter">
            <template slot="title">{{nickname}}</template>
            <el-menu-item index="updatePassword">修改密码</el-menu-item>
            <el-menu-item index="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="200px">
        <el-menu default-active="2" @open="handleOpen" @close="handleClose"
          background-color="#333744" text-color="#fff" active-text-color="#ffe59b" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>场地管理</span>
            </template>
            <el-menu-item index="/siteManage">场地列表</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主界面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getUserData()
  },
  data () {
    return {
      role: '',
      nickname: ''
    }
  },
  methods: {
    async getUserData () {
      this.$axios.post('/index/userData')
        .then(res => {
          if (res.data.status === 200) {
            this.role = res.data.data.role + ' :'
            this.nickname = res.data.data.nickname
          } else if (res.data.status === 302) {
            this.$msgbox({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              showClose: false
            })
            this.$router.push('/')
          }
        })
    },
    logout () {
      this.$axios.post('/login/logout')
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success(res.data.msg)
            this.$router.push('/')
          }
        })
    },
    handleSelect (key, keyPath) {
      if (key === 'logout') {
        this.logout()
      }
      console.log(key)
      console.log(keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}

</script>

<style lang="less">
.index-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;

  .top-menu-left {
    display: flex;

    >img {
      height: 50px;
      width: 50px;
      margin-top: 5px;
    }

    >div {
      margin-left: 15px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: large;
    }
  }

  .top-menu-right {
    display: flex;

    >div {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: initial;
  }
}

.el-main {
  background-color: #eaedf1;
}

</style>
