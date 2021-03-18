<template>
  <el-container class="index-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        Header
        <a type="primary" @click="logout">退出登录</a>
      </div>
      <div>
        普通用户：
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
          @select="handleSelect" background-color="#373d41" text-color="#fff"
          active-text-color="#ffe59b">
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 主界面 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    logout () {
      this.$axios.post('login/logout')
      // .then(res => {
      //   if (res.data.status === 200) {
      //     this.$router.push('/index')
      //   } else {
      //     this.$message.error(res.data.msg)
      //     this.loginForm.verifyCode = ''
      //     this.changeImg()
      //   }
      // })
    },
    handleSelect (key, keyPath) {
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
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

</style>
