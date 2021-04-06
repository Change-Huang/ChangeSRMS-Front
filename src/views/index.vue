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
        <div>{{showRole}}</div>
        <el-menu mode="horizontal" ref="headMenu" @select="handleSelect" background-color="#373d41"
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
        <component :is="leftSide" :role="role"></component>
      </el-aside>
      <!-- 主界面 -->
      <el-main>
        <transition name="mainTransition">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
    <!-- 修改密码弹窗 -->
    <component :is="updatePasswordDialog" :showDialog="showDialog" @closeDialog="closeDialog">
    </component>
  </el-container>
</template>

<script>
// 导入各种组件
import updatePasswordDialog from '../components/index/updatePasswordDialog'
import leftSide from '../components/index/leftSide'
export default {
  data () {
    return {
      role: '',
      showRole: '',
      nickname: '',
      // 控制修改密码对话框的显示与隐藏
      showDialog: false,
      // 渲染组件
      updatePasswordDialog: 'updatePasswordDialog',
      leftSide: 'leftSide',
      // 激活的菜单
      activeIndex: ''
    }
  },
  // 组件
  components: {
    updatePasswordDialog,
    leftSide
  },
  // 创建成功就获取用户列表
  created () {
    this.getUserData()
  },
  methods: {
    // 获取用户信息
    getUserData () {
      this.$axios.post('/index/userData')
        .then(res => {
          if (res.data.status === 200) {
            this.role = res.data.data.role
            switch (res.data.data.role) {
              case 'user':
                this.showRole = '普通用户 :'
                break
              case 'general':
                this.showRole = '管理员 :'
                break
              case 'super':
                this.showRole = '超级管理员 :'
                break
            }
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
    // 登出
    logout () {
      this.$axios.post('/login/logout')
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success(res.data.msg)
            this.$router.push('/')
            window.sessionStorage.removeItem('isLogin')
            window.sessionStorage.removeItem('role')
          }
        })
    },
    // 修改密码
    updatePassword () {
      this.showDialog = true
    },
    // 控制修改密码的对话框关闭
    closeDialog () {
      this.$refs.headMenu.activeIndex = ''
      this.showDialog = false
    },
    // 监听右上角菜单的点击
    handleSelect (key, keyPath) {
      if (key === 'updatePassword') {
        this.updatePassword()
      }
      if (key === 'logout') {
        this.logout()
      }
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

.mainTransition-enter-active {
  animation-name: fadeIn;
  animation-duration: 0.5s;
}

.mainTransition-leave-active {
  animation-name: fadeOut;
  animation-duration: 0.5s;
}

</style>
