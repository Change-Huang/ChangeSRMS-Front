<template>
  <el-dialog :title="dialogTitle" :visible.sync="showDialog" :before-close="close">
    <!-- 对话框主体 -->
    <div class="siteDialogBody" v-loading="dialogLoading">
      <el-form ref="siteFormRef" :model="siteForm" :rules="siteFormRules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="siteName">
          <el-input v-model="siteForm.siteName"></el-input>
        </el-form-item>
        <el-form-item label="位置" :label-width="formLabelWidth" prop="location">
          <el-input type="textarea" rows="3" resize="none" v-model="siteForm.location">
          </el-input>
        </el-form-item>
        <el-form-item label="容纳人数" :label-width="formLabelWidth" prop="seat">
          <el-input v-model.number="siteForm.seat"></el-input>
        </el-form-item>
        <el-form-item label="是否需要钥匙" :label-width="formLabelWidth" prop="hasKeys">
          <el-switch v-model="siteForm.hasKeys">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="siteSubmit">确 定</el-button>
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
      siteFormRules: {
        siteName: [
          { required: true, message: '请输入场地名称', trigger: 'blur' },
          { max: 18, message: '长度不多于18个字符', trigger: 'blur' }
        ],
        seat: [
          { required: true, message: '请输入场地能容纳的人数', trigger: 'blur' },
          { type: 'number', message: '人数必须为数字值', trigger: 'blur' }
        ],
        hasKeys: [
          { required: true }
        ]
      },
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px'
    }
  },
  props: ['showDialog', 'siteForm', 'dialogTitle', 'dialogType'],
  methods: {
    // 添加场地表单提交
    siteSubmit () {
      this.$refs.siteFormRef.validate(valid => {
        if (!valid) return
        this.dialogLoading = true
        if (this.dialogType === 'add') {
          // 如果是添加
          const addSiteForm = this.siteForm
          delete addSiteForm.id
          delete addSiteForm.version
          this.$axios.post('/siteManage/addSite', addSiteForm)
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('closeDialog')
                this.dialogLoading = false
                this.$emit('getSiteList')
              } else {
                this.dialogLoading = false
                this.$message.error(res.data.msg)
              }
            })
        } else if (this.dialogType === 'edit') {
          // 如果是编辑
          this.$axios.post('/siteManage/editSite', this.siteForm)
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('closeDialog')
                this.dialogLoading = false
                this.$emit('getSiteList')
              } else {
                this.$message.error(res.data.msg)
                this.dialogLoading = false
              }
            })
        }
      })
    },
    close () {
      this.$refs.siteFormRef.clearValidate()
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.siteDialogBody {
  padding-right: 25%;
}

</style>
