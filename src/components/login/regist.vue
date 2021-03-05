<template>
  <!-- 登录表单区域 -->
  <div @keyup.enter="regist">
    <el-form class="regist_form" ref="registFormRef" :model="registForm" :rules="registFormRules">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="registForm.username" placeholder="注册邮箱">
          <i slot="prefix" class="el-input__icon iconfont icon-account-fill inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 邮箱验证码 -->
      <el-form-item prop="verifyEmailCode" class="verifyCode_input">
        <el-row>
          <el-col :span="16">
            <el-input v-model="registForm.verifyEmailCode" placeholder="邮箱验证码">
              <i slot="prefix" class="el-input__icon iconfont icon-account-fill inputIcon"></i>
            </el-input>
          </el-col>
          <el-col :span="7" :push="1">
            <el-button class="btn" type="primary" @click="sendEmailCode">发送验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="registForm.password" type="password" placeholder="密码">
          <i slot="prefix" class="el-input__icon iconfont icon-password inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="rePassword">
        <el-input v-model="registForm.rePassword" type="password" placeholder="确认密码">
          <i slot="prefix" class="el-input__icon iconfont icon-password inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button class="btn" type="primary" @click="regist">注册</el-button>
        <el-button class="btn" type="info" @click="resetRegistForm">重置</el-button>
      </el-form-item>
      <!-- 链接 -->
      <div class="linkRow">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="5">
            <div class="linkClo">
              <el-link type="primary" @click="login">用户登录</el-link>
            </div>
          </el-col>
          <el-col :span="5">
            <el-link type="primary" @click="forget">忘记密码</el-link>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var rePasswordValidator = (rule, value, callback) => {
      if (value !== this.registForm.password) callback(new Error('两次输入的密码不同'))
      callback()
    }
    return {
      registForm: {
        username: '',
        verifyEmailCode: '',
        password: '',
        rePassword: ''
      },
      registFormRules: {
        username: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入电子邮箱', trigger: 'blur' }
        ],
        verifyEmailCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请确认登录密码', trigger: 'blur' },
          { validator: rePasswordValidator, trigger: 'blur' }
        ]
      },
      verifyCodeUrl: this.$axios.defaults.baseURL + '/login/verifyCode'
    }
  },
  methods: {
    resetRegistForm () {
      this.$refs.registFormRef.resetFields()
    },
    sendEmailCode () {
      // asd
    },
    regist () {
      this.$refs.registFormRef.validate(valid => {
        if (!valid) return
        this.$axios.post('login', this.registForm)
          .then(res => {
            if (res.data.meta.status !== 200) {
              return this.$message.error('登录失败')
            }
            this.$message.success('登录成功')
          })
      })
    },
    login () {
      this.$router.push('/')
    },
    forget () {
      this.$router.push('/forget')
    }
  }
}

</script>

<style lang="less" scoped>
.regist_form {
  position: absolute;
  bottom: 0;
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

  .btn {
    width: 119.58px;
  }
}

.btns {
  display: flex;
  justify-content: center;

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
