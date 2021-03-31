<template>
  <el-dialog title="借用申请" :visible.sync="showDialog" :before-close="close">
    <!-- 对话框主体 -->
    <div class="reservationDialogBody" v-loading="dialogLoading">
      <el-form ref="reservationFormRef" :model="reservationForm" :rules="reservationFormRules">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="siteName" disabled></el-input>
        </el-form-item>
        <el-form-item label="使用开始时间" :label-width="formLabelWidth" required>
          <el-row justify="space-between">
            <el-col :span="12">
              <el-form-item prop="beginDate">
                <el-date-picker v-model="reservationForm.beginDate" type="date" placeholder="选择日期"
                  class="datePicker" :value-format="format" @change="change">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="beginTime">
                <el-time-select v-model="reservationForm.beginTime" :picker-options="pickerOptions"
                  placeholder="选择时间" @change="change">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="使用结束时间" :label-width="formLabelWidth" required>
          <el-row justify="space-between">
            <el-col :span="12">
              <el-form-item prop="endDate">
                <el-date-picker v-model="reservationForm.endDate" type="date" placeholder="选择日期"
                  class="datePicker" :value-format="format" @change="change">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="endTime">
                <el-time-select v-model="reservationForm.endTime" :picker-options="pickerOptions"
                  placeholder="选择时间" @change="change">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="借用原因" :label-width="formLabelWidth" prop="reason">
          <el-input type="textarea" rows="4" resize="none" v-model="reservationForm.reason">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="reservationSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    // 四个日期、时间输入框的检验
    var beginDate = (rule, value, callback) => {
      if (!value) callback(new Error('日期不能为空'))
      if (new Date(this.reservationForm.endDate).getTime() <
        new Date(this.reservationForm.beginDate).getTime() &&
        this.reservationForm.endDate) {
        callback(new Error('日期错误'))
      }
      callback()
    }
    var beginTime = (rule, value, callback) => {
      if (!value) callback(new Error('时间不能为空'))
      if (new Date(this.reservationForm.endDate).getTime() ===
        new Date(this.reservationForm.beginDate).getTime() &&
        this.reservationForm.endTime) {
        if (
          new Date(0, 0, 0, this.reservationForm.endTime.substr(0, 2),
            this.reservationForm.endTime.substr(3, 2)).getTime() <=
          new Date(0, 0, 0, this.reservationForm.beginTime.substr(0, 2),
            this.reservationForm.beginTime.substr(3, 2)).getTime()
        ) {
          callback(new Error('时间错误'))
        }
      }
      callback()
    }
    var endDate = (rule, value, callback) => {
      if (!value) callback(new Error('日期不能为空'))
      if (new Date(this.reservationForm.endDate).getTime() <
        new Date(this.reservationForm.beginDate).getTime() &&
        this.reservationForm.beginDate) {
        callback(new Error('日期错误'))
      }
      callback()
    }
    var endTime = (rule, value, callback) => {
      if (!value) callback(new Error('时间不能为空'))
      if (new Date(this.reservationForm.endDate).getTime() ===
        new Date(this.reservationForm.beginDate).getTime() &&
        this.reservationForm.beginTime) {
        if (
          new Date(0, 0, 0, this.reservationForm.endTime.substr(0, 2),
            this.reservationForm.endTime.substr(3, 2)).getTime() <=
          new Date(0, 0, 0, this.reservationForm.beginTime.substr(0, 2),
            this.reservationForm.beginTime.substr(3, 2)).getTime()
        ) {
          callback(new Error('时间错误'))
        }
      }
      callback()
    }
    return {
      // 对话框是否显示加载
      dialogLoading: false,
      reservationForm: {
        beginDate: '',
        beginTime: '',
        endDate: '',
        endTime: '',
        reason: ''
      },
      // 表单验证规则
      reservationFormRules: {
        beginDate: [
          { validator: beginDate, trigger: 'blur' }
        ],
        beginTime: [
          { validator: beginTime, trigger: 'blur' }
        ],
        endDate: [
          { validator: endDate, trigger: 'blur' }
        ],
        endTime: [
          { validator: endTime, trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '借用原因不能为空', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        start: '07:00',
        step: '00:30',
        end: '22:00'
      },
      format: 'yyyy-MM-dd',
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px'
    }
  },
  props: ['showDialog', 'siteId', 'siteName'],
  methods: {
    // 监听日期选择的改变
    change () {
      if (this.reservationForm.beginDate &&
        this.reservationForm.beginTime &&
        this.reservationForm.endDate &&
        this.reservationForm.endTime) {
        this.$refs.reservationFormRef.validateField([
          'beginDate', 'beginTime', 'endDate', 'endTime'
        ])
      }
    },
    // 添加场地表单提交
    reservationSubmit () {
      this.$refs.reservationFormRef.validate(valid => {
        if (!valid) return
        this.dialogLoading = true
        this.$axios.post('/reservationSubmit/submit', {
          begin: this.reservationForm.beginDate + ' ' + this.reservationForm.beginTime,
          end: this.reservationForm.endDate + ' ' + this.reservationForm.endTime,
          reason: this.reservationForm.reason,
          siteId: this.siteId
        }).then(res => {
          if (res.data.status === 200) {
            this.$message.success(res.data.msg)
            this.$emit('closeDialog')
            this.dialogLoading = false
            this.$emit('getSiteList')
            this.$refs.reservationFormRef.resetFields()
          } else {
            this.dialogLoading = false
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    close () {
      this.$refs.reservationFormRef.clearValidate()
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.reservationDialogBody {
  padding-right: 25%;
}

</style>
