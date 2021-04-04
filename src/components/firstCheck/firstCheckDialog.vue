<template>
  <el-dialog title="审核" :visible.sync="showDialog" :before-close="close">
    <!-- 对话框主体 -->
    <div v-loading="dialogLoading">
      <el-row :gutter="20" class="row">
        <el-col :span="9">
          <div class="title">借用者：</div>
        </el-col>
        <el-col :span="12">
          <div class="detail">{{history.userNickname}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :span="9">
          <div class="title">借用的场地：</div>
        </el-col>
        <el-col :span="12">
          <div class="detail">{{history.siteName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :span="9">
          <div class="title">借用时间：</div>
        </el-col>
        <el-col :span="12">
          <div class="detail">{{history.beginTime}} 至 {{history.endTime}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :span="9">
          <div class="title">借用原因：</div>
        </el-col>
        <el-col :span="12">
          <div class="textArea">
            {{history.reason}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :span="9">
          <div class="title">审核状态：</div>
        </el-col>
        <el-col :span="12">
          <div class="detail" v-text="loanStateFormat(history.loanState)">
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row" v-if="showAdminName(history.loanState)">
        <el-col :span="9">
          <div class="title">审核人：</div>
        </el-col>
        <el-col :span="12">
          <div class="detail" v-text="history.adminNickname">
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 对话框下方 -->
    <div slot="footer" class="dialog-footer" v-loading="dialogLoading"
      element-loading-spinner="iconfont icon-touming">
      <el-button @click="notPass" class="button">不 通 过</el-button>
      <el-button type="primary" @click="pass" class="button">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 对话框是否显示加载
      dialogLoading: false,
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px',
      loanStateFormat (loanState) {
        if (loanState === 0) return '未审核'
        if (loanState === 1) return '初次审核通过'
        if (loanState === 2) return '审核通过'
        if (loanState === 3) return '审核未通过'
      },
      showAdminName (loanState) {
        if (loanState === 0) return false
        if (loanState === 1) return true
        if (loanState === 2) return true
        if (loanState === 3) return true
      }
    }
  },
  props: ['showDialog', 'history'],
  methods: {
    firstCheckSubmit (id, isPass, version) {
      this.dialogLoading = true
      this.$axios.post('/firstCheck/firstCheckSubmit',
        {
          id: id,
          isPass: isPass,
          version: version
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success(res.data.msg)
            this.$emit('closeDialog')
            this.dialogLoading = false
            this.$emit('getFirstCheckList')
          } else {
            this.dialogLoading = false
            this.$message.error(res.data.msg)
          }
        })
    },
    // 添加场地表单提交
    pass () {
      this.firstCheckSubmit(this.history.id, true, this.history.version)
    },
    notPass () {
      this.firstCheckSubmit(this.history.id, false, this.history.version)
    },
    close () {
      this.$emit('closeDialog')
    }
  }
}

</script>

<style>
.row {
  margin-bottom: 14px;
}

.title {
  text-align: right;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}

.detail {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}

.textArea {
  font-size: 16px;
  line-height: 28px;
  margin-top: 6.5px;
}

.dialog-footer {
  text-align: center;
}

.button {
  width: 92px;
}

</style>
