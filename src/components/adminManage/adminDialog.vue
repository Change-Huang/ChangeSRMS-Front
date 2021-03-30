<template>
  <el-dialog :title="dialogTitle" :visible.sync="showDialog" :before-close="close" @open="open">
    <!-- 对话框主体 -->
    <div class="adminDialogBody" v-loading="dialogLoading">
      <el-form ref="adminFormRef" :model="adminForm" :rules="adminFormRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="adminName">
          <el-input v-model="adminForm.adminName" :disabled="inputDisabled"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="adminNickname">
          <el-input v-model="adminForm.adminNickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="adminPassword">
          <el-input type="password" v-model="adminForm.adminPassword" :disabled="inputDisabled">
          </el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="adminForm.role" placeholder="请选择">
            <el-option value="general" label="普通管理员"></el-option>
            <el-option value="super" label="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="adminSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 对话框是否显示加载
      dialogLoading: false,
      // 输入框禁用
      inputDisabled: false,
      // 表单验证规则
      adminFormRules: {
        adminName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 18, message: '长度在4到18个字符', trigger: 'blur' }
        ],
        adminNickname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 12, message: '长度最多为12个字符', trigger: 'blur' }
        ],
        adminPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px'
    }
  },
  props: ['showDialog', 'adminForm', 'dialogTitle', 'dialogType'],
  methods: {
    // 打开对话框
    open () {
      if (this.dialogType === 'add') {
        this.inputDisabled = false
      } else if (this.dialogType === 'edit') {
        this.inputDisabled = true
      }
    },
    // 添加管理员表单提交
    adminSubmit () {
      this.$refs.adminFormRef.validate(valid => {
        if (!valid) return
        this.dialogLoading = true
        if (this.dialogType === 'add') {
          // 如果是添加
          const addAdminForm = this.adminForm
          delete addAdminForm.id
          delete addAdminForm.version
          this.$axios.post('/adminManage/addAdmin', addAdminForm)
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('closeDialog')
                this.dialogLoading = false
                this.$emit('getAdminList')
              } else {
                this.dialogLoading = false
                this.$message.error(res.data.msg)
              }
            })
        } else if (this.dialogType === 'edit') {
          // 如果是编辑
          const editAdminForm = this.adminForm
          delete editAdminForm.adminPassword
          delete editAdminForm.adminName
          this.$axios.post('/adminManage/editAdmin', editAdminForm)
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('closeDialog')
                this.dialogLoading = false
                this.$emit('getAdminList')
              } else {
                this.$message.error(res.data.msg)
                this.dialogLoading = false
              }
            })
        }
      })
    },
    // 如果关闭对话框
    close () {
      this.$refs.adminFormRef.clearValidate()
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.adminDialogBody {
  padding-right: 25%;
}

</style>
