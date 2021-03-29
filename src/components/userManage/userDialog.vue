<template>
  <el-dialog title="编辑用户" :visible.sync="showDialog" :before-close="close">
    <!-- 对话框主体 -->
    <div class="userDialogBody" v-loading="dialogLoading">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="userForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userNickname">
          <el-input v-model="userForm.userNickname"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="userEditSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 对话框是否显示加载
      dialogLoading: false,
      // 表单验证规则
      userFormRules: {
        nickname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 12, message: '长度最多为12个字符', trigger: 'blur' }
        ]
      },
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px'
    }
  },
  props: ['showDialog', 'userForm'],
  methods: {
    // 添加场地表单提交
    userEditSubmit () {
      this.$refs.userFormRef.validate(valid => {
        if (!valid) return
        this.dialogLoading = true
        // 如果是添加
        this.$axios.post('/userManage/editUser', this.userForm)
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              this.$emit('closeDialog')
              this.dialogLoading = false
              this.$emit('getUserList')
            } else {
              this.dialogLoading = false
              this.$message.error(res.data.msg)
            }
          })
      })
    },
    close () {
      this.$refs.userFormRef.clearValidate()
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.userDialogBody {
  padding-right: 25%;
}

</style>
