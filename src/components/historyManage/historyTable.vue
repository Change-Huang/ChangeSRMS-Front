<template>
  <el-table :data="historyList" size="mini" :max-height="tableHeight" v-loading="tableLoading"
    border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="场地名称" prop="siteName"></el-table-column>
    <el-table-column label="借用开始时间" prop="beginTime"></el-table-column>
    <el-table-column label="借用结束时间" prop="endTime"></el-table-column>
    <el-table-column label="借用原因" prop="reason"></el-table-column>
    <!-- 申请状态 -->
    <el-table-column label="申请状态" prop="loanState">
      <template slot-scope="scope">
        <el-tag :type="loanStateType(scope.row.loanState)">
          {{loanStateFormat(scope.row.loanState)}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 钥匙状态 -->
    <el-table-column label="钥匙" prop="keyState">
      <template slot-scope="scope">
        <el-tag :type="keyStateType(scope.row.keyState)">
          {{keyStateFormat(scope.row.keyState)}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" :content="deleteContent(scope.row.loanState)"
          placement="top" :enterable="false" :open-delay="openDelay">
          <div style="width:44px">
            <el-button type="danger" size="small" plain icon="el-icon-delete"
              :disabled="disabled(scope.row.loanState)"
              @click="deleteHistory($event, scope.row.id, scope.row.version)">
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
        if (loanState === 1) return 'warning'
        if (loanState === 2) return ''
        if (loanState === 3) return 'danger'
      },
      loanStateFormat (loanState) {
        if (loanState === 0) return '未审核'
        if (loanState === 1) return '审核中'
        if (loanState === 2) return '审核通过'
        if (loanState === 3) return '审核未通过'
      },
      keyStateType (keyState) {
        if (keyState === 0) return 'info'
        if (keyState === 1) return 'danger'
        if (keyState === 2) return ''
      },
      keyStateFormat (keyState) {
        if (keyState === 0) return '未借出'
        if (keyState === 1) return '未归还'
        if (keyState === 2) return '已归还'
      },
      deleteContent (loanState) {
        if (loanState === 0) return '删除申请'
        if (loanState === 1) return '删除申请'
        if (loanState === 2) return '不能删除审核完的申请'
        if (loanState === 3) return '不能删除审核完的申请'
      },
      disabled (loanState) {
        if (loanState === 0) return false
        if (loanState === 1) return false
        if (loanState === 2) return true
        if (loanState === 3) return true
      }
    }
  },
  props: ['historyList', 'tableLoading', 'queryinfo'],
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
    deleteHistory (event, id, version) {
      let target = event.target
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode
      }
      this.$emit('deleteHistory', target, id, version)
    }
  }
}

</script>

<style>
.item {
  margin: 0px;
}

</style>
