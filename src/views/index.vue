<template>
  <div>
    <h1>登录成功</h1>
    <a type="primary" @click="logout">退出登录</a>
  </div>
</template>

<script>
export default {
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
    }
  }
}

</script>

<style>

</style>
