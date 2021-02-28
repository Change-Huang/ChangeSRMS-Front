<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="avatat">
      </div>
      <!-- 登录表单区域 -->
      <div @keyup.enter="login">
        <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username">
              <i slot="prefix" class="el-input__icon iconfont icon-account-fill loginIcon"></i>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password">
              <i slot="prefix" class="el-input__icon iconfont icon-password loginIcon"></i>
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在5到12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$axios.post('login', this.loginForm)
          .then(res => {
            if (res.data.meta.status !== 200) {
              return this.$message.error('登录失败')
            }
            this.$message.success('登录成功')
          })
      })
    }
  }
}

</script>

<style lang="less" scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.loginIcon {
  font-size: 20px;
  display: inline-block;
}

</style>
