<template>
  <el-table :data="secondCheckList" size="mini" :max-height="tableHeight" v-loading="tableLoading"
    border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="借用者" prop="userNickname"></el-table-column>
    <el-table-column label="借用场地" prop="siteName"></el-table-column>
    <el-table-column label="借用开始时间" prop="beginTime"></el-table-column>
    <el-table-column label="借用结束时间" prop="endTime"></el-table-column>
    <!-- 申请状态 -->
    <el-table-column label="申请状态" prop="loanState">
      <template slot-scope="scope">
        <el-tag :type="loanStateType(scope.row.loanState)">
          {{loanStateFormat(scope.row.loanState)}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="审核人员" prop="adminNickname"></el-table-column>
    <el-table-column label="二审人员" prop="superAdminNickname"></el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" :content="checkContent(scope.row.loanState)"
          placement="top" :enterable="false" :open-delay="openDelay">
          <div style="width:44px">
            <el-button :type="buttonType(scope.row.loanState)" size="small" plain
              :icon="icon(scope.row.loanState)" @click="openDialog(scope.row)">
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
      loanStateType (loanState) {
        if (loanState === 0) return 'info'
        if (loanState === 1) return ''
        if (loanState === 2) return ''
        if (loanState === 3) return 'danger'
      },
      loanStateFormat (loanState) {
        if (loanState === 0) return '未审核'
        if (loanState === 1) return '初次审核通过'
        if (loanState === 2) return '审核通过'
        if (loanState === 3) return '审核未通过'
      },
      checkContent (loanState) {
        if (loanState === 0) return '审核'
        if (loanState === 1) return '审核'
        if (loanState === 2) return '修改审核'
        if (loanState === 3) return '修改审核'
      },
      buttonType (loanState) {
        if (loanState === 0) return 'info'
        if (loanState === 1) return 'info'
        if (loanState === 2) return 'warning'
        if (loanState === 3) return 'warning'
      },
      icon (loanState) {
        if (loanState === 0) return 'iconfont icon-shenhe'
        if (loanState === 1) return 'iconfont icon-shenhe'
        if (loanState === 2) return 'iconfont icon-xiugaishenhe'
        if (loanState === 3) return 'iconfont icon-xiugaishenhe'
      }
    }
  },
  props: ['secondCheckList', 'tableLoading', 'queryinfo'],
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
    openDialog (history) {
      this.$emit('openDialog', history)
    }
  }
}

</script>

<style>
.item {
  margin: 0px;
}

</style>
