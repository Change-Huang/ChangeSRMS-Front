<template>
  <el-dialog title="修改密码" :visible.sync="showDialog" :before-close="close">
    <!-- 对话框主体 -->
    <div class="passwordDialogBody" v-loading="dialogLoading">
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordFormRules">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="old">
          <el-input v-model="passwordForm.old" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="new">
          <el-input v-model="passwordForm.new" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="renew">
          <el-input v-model="passwordForm.renew" type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="passwordSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    var rePasswordValidator = (rule, value, callback) => {
      if (value !== this.passwordForm.new) callback(new Error('两次输入的密码不同'))
      callback()
    }
    var passwordValidator = (rule, value, callback) => {
      if (value === this.passwordForm.old) callback(new Error('新旧密码不能相同'))
      callback()
    }
    return {
      passwordForm: {
        old: '',
        new: '',
        renew: ''
      },
      // 对话框是否显示加载
      dialogLoading: false,
      // 表单验证规则
      passwordFormRules: {
        old: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ],
        new: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
          { validator: passwordValidator, trigger: 'blur' }
        ],
        renew: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: rePasswordValidator, trigger: 'blur' }
        ]
      },
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px'
    }
  },
  props: ['showDialog'],
  methods: {
    // 添加场地表单提交
    passwordSubmit () {
      this.$refs.passwordFormRef.validate(valid => {
        if (!valid) return
        console.log('确定')
        this.dialogLoading = true
        this.$axios.post('/index/updatePassword', this.passwordForm)
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              this.$emit('closeDialog')
              this.$refs.passwordFormRef.resetFields()
              this.dialogLoading = false
            } else {
              this.$message.error(res.data.msg)
              this.dialogLoading = false
            }
          })
      })
    },
    close () {
      this.$refs.passwordFormRef.resetFields()
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.passwordDialogBody {
  padding-right: 25%;
}

</style>
