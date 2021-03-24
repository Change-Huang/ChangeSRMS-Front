<template>
  <!-- 登录表单区域 -->
  <div @keyup.enter="forget">
    <el-form class="forget_form" ref="forgetFormRef" :model="forgetForm" :rules="forgetFormRules">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="forgetForm.username" placeholder="用户名">
          <i slot="prefix" class="el-input__icon iconfont icon-account-fill inputIcon"></i>
        </el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verifyCode" class="verifyCode_input">
        <el-row>
          <el-col :span="18">
            <el-input v-model="forgetForm.verifyCode" placeholder="验证码">
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
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button class="btn" type="primary" @click="forget">找回</el-button>
        <el-button class="btn" type="info" @click="resetForgetForm">重置</el-button>
      </el-form-item>
      <!-- 链接 -->
      <div class="linkRow">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="5">
            <div class="linkClo">
              <el-link type="primary" @click="login">用户登录</el-link>
            </div>
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
      forgetForm: {
        username: '',
        verifyCode: ''
      },
      forgetFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入电子邮箱', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      verifyCodeUrl: this.$axios.defaults.baseURL + '/login/verifyCode?c=' +
        new Date().getTime()
    }
  },
  methods: {
    resetForgetForm () {
      this.$refs.forgetFormRef.resetFields()
    },
    forget () {
      this.$refs.forgetFormRef.validate(valid => {
        if (!valid) return
        this.$axios.post('/login/forget', this.forgetForm)
          .then(res => {
            if (res.data.status === 200) {
              this.$msgbox({
                title: '提示',
                message: res.data.msg,
                type: 'warning',
                showClose: false
              })
              this.$router.push('/')
            } else {
              this.$message.error(res.data.msg)
              this.forgetForm.verifyCode = ''
              this.changeImg()
            }
          })
      })
    },
    changeImg () {
      this.verifyCodeUrl = this.$axios.defaults.baseURL + '/login/verifyCode?c=' +
        new Date().getTime()
    },
    login () {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="less" scoped>
.forget_form {
  position: absolute;
  top: 202px;
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
  margin-bottom: 80px;

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
