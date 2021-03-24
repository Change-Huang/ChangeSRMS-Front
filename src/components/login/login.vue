<template>
  <!-- 登录表单区域 -->
  <div @keyup.enter="login">
    <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <i slot="prefix" class="el-input__icon iconfont icon-account-fill inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码">
          <i slot="prefix" class="el-input__icon iconfont icon-password inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verifyCode" class="verifyCode_input">
        <el-row>
          <el-col :span="18">
            <el-input v-model="loginForm.verifyCode" placeholder="验证码">
              <i slot="prefix" class="el-input__icon iconfont icon-password inputIcon"></i>
            </el-input>
          </el-col>
          <el-col :span="5" :push="1">
            <div @click="changeImg" class="verifyImgOuter">
              <el-image :src="verifyCodeUrl" class="verifyImg">
                <div slot="error" class="imgSlot">
                  <i class="el-icon-picture-outline"></i>
                </div>
                <div slot="placeholder" class="imgSlot">
                  <i class="el-icon-loading"></i>
                </div>
              </el-image>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 单选框 -->
      <el-form-item prop="role" class="role_radio">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="10">
            <el-radio v-model="loginForm.role" label="user">用户</el-radio>
            <el-radio v-model="loginForm.role" label="admin">管理员</el-radio>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button class="btn" type="primary" @click="login">登录</el-button>
        <el-button class="btn" type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
      <!-- 链接 -->
      <div class="linkRow">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="5">
            <div class="linkClo">
              <el-link type="primary" @click="forget">忘记密码</el-link>
            </div>
          </el-col>
          <el-col :span="5">
            <el-link type="primary" @click="regist">用户注册</el-link>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        role: 'user'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ],
        verifyCode: [
          // TODO 开发阶段不验证
          // { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        role: [
          { type: 'enum', enum: ['admin', 'user'] }
        ]
      },
      verifyCodeUrl: this.$axios.defaults.baseURL + '/login/verifyCode?c=' +
        new Date().getTime()
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$axios.post('/login/login', this.loginForm)
          .then(res => {
            if (res.data.status === 200) {
              window.sessionStorage.setItem('isLogin', true)
              this.$router.push('/index')
            } else {
              this.$message.error(res.data.msg)
              this.loginForm.verifyCode = ''
              this.changeImg()
            }
          })
      })
    },
    changeImg () {
      this.verifyCodeUrl = this.$axios.defaults.baseURL + '/login/verifyCode?c=' +
        new Date().getTime()
    },
    forget () {
      this.$router.push('/forget')
    },
    regist () {
      this.$router.push('/regist')
    }
  }
}

</script>

<style lang="less" scoped>
.login_form {
  position: absolute;
  top: 147px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .inputIcon {
    font-size: 20px;
    display: inline-block;
  }
}

.verifyCode_input {
  height: 40.8px;
  margin-bottom: 20px;

  .verifyImgOuter {
    overflow: visible;
    height: 40px;

    .imgSlot {
      background: #f5f7fa;
      color: #909399;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 40px;
    }
  }
}

.role_radio {
  margin-top: -10px;
  margin-left: 10px;
}

.btns {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  .btn {
    width: 150px;
  }
}

.linkRow {
  margin-top: -10px;
  margin-left: 4px;
  padding-bottom: 20px;

  .linkClo {
    text-align: center;
  }
}

</style>
