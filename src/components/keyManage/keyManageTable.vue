<template>
  <el-table :data="keyManageList" size="mini" :max-height="tableHeight" v-loading="tableLoading"
    border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="借用者" prop="userNickname"></el-table-column>
    <el-table-column label="借用场地" prop="siteName"></el-table-column>
    <el-table-column label="借用开始时间" prop="beginTime"></el-table-column>
    <el-table-column label="借用结束时间" prop="endTime"></el-table-column>
    <!-- 申请状态 -->
    <el-table-column label="钥匙状态" prop="keyState">
      <template slot-scope="scope">
        <el-tag :type="keyStateType(scope.row.keyState)">
          {{keyStateFormat(scope.row.keyState)}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="借出人员" prop="loanKeyAdmin"></el-table-column>
    <el-table-column label="归还人员" prop="returnKeyAdmin"></el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" :content="keyContent(scope.row.keyState)"
          placement="top" :enterable="false" :open-delay="openDelay">
          <div style="width:44px">
            <el-button :type="buttonType(scope.row.keyState)" size="small" plain
              :disabled="disabled(scope.row.keyState)" :icon="icon(scope.row.keyState)"
              @click="keyDoing($event, scope.row)">
            </el-button>
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      // 表格最高高度
      tableHeight: 0,
      openDelay: 500,
      keyStateType (keyState) {
        if (keyState === 0) return 'info'
        if (keyState === 1) return 'warning'
        if (keyState === 2) return ''
        if (keyState === 3) return 'info'
      },
      keyStateFormat (keyState) {
        if (keyState === 0) return '未借出'
        if (keyState === 1) return '未归还'
        if (keyState === 2) return '已归还'
        if (keyState === 3) return '无钥匙'
      },
      keyContent (keyState) {
        if (keyState === 0) return '借出'
        if (keyState === 1) return '归还'
        if (keyState === 2) return '已归还'
        if (keyState === 3) return '无钥匙'
      },
      buttonType (keyState) {
        if (keyState === 0) return 'warning'
        if (keyState === 1) return 'success'
        if (keyState === 2) return 'primary'
        if (keyState === 3) return 'info'
      },
      disabled (keyState) {
        if (keyState === 0) return false
        if (keyState === 1) return false
        if (keyState === 2) return true
        if (keyState === 3) return true
      },
      icon (keyState) {
        if (keyState === 0) return 'iconfont icon-jiechu'
        if (keyState === 1) return 'iconfont icon-guihuan'
        if (keyState === 2) return 'iconfont icon-wanchengchenggong'
        if (keyState === 3) return 'iconfont icon-wucaozuoxiang'
      }
    }
  },
  props: ['keyManageList', 'tableLoading', 'queryinfo'],
  // 对象已经渲染，时刻改变高度，适应窗口大小
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 238.6
    })
    const that = this
    window.onresize = () => {
      that.$nextTick(() => {
        that.tableHeight = window.innerHeight - 238.6
      })
    }
  },
  methods: {
    // 改变index行数
    indexMethod (index) {
      return (this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + index + 1
    },
    keyDoing (event, history) {
      // 让按钮失焦的一些操作
      let target = event.target
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode
      }
      if (history.keyState === 0) {
        // 如果是借出
        this.$confirm('确定将钥匙借出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定
          this.$emit('openTableLoading')
          this.$axios.post('/keyManage/loanKey', { id: history.id, version: history.version })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('getKeyManageList')
              } else {
                this.$emit('closeTableLoading')
                this.$message.error(res.data.msg)
              }
            })
          target.blur()
        }).catch(() => {
          target.blur()
        })
      } else if (history.keyState === 1) {
        // 如果是归还
        this.$confirm('确定将钥匙归还?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定
          this.$emit('openTableLoading')
          this.$axios.post('/keyManage/returnKey', { id: history.id, version: history.version })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(res.data.msg)
                this.$emit('getKeyManageList')
              } else {
                this.$emit('closeTableLoading')
                this.$message.error(res.data.msg)
              }
            })
          target.blur()
        }).catch(() => {
          target.blur()
        })
      }
    }
  }
}

</script>

<style>
.item {
  margin: 0px;
}

</style>
