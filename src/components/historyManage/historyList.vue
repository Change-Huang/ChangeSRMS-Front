<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户功能</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 列表表格 -->
      <component :is="historyTable" :historyList="historyList" :tableLoading="tableLoading"
        :queryinfo="queryinfo" @deleteHistory="deleteHistory">
      </component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入对话框和表格
import historyTable from './historyTable'
export default {
  data () {
    return {
      // 查询信息提交
      queryinfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 列表
      historyList: [],
      // 总数
      total: 0,
      // 渲染组件
      historyTable: 'historyTable',
      // 控制表格加载的显示与隐藏
      tableLoading: false
    }
  },
  components: {
    historyTable
  },
  // 对象创建完成，未渲染
  created () {
    this.getHistoryList()
  },
  methods: {
    // 获取用户数据
    getHistoryList () {
      this.tableLoading = true
      this.$axios.post('/historyManage/historyList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.historyList = res.data.data.historyList
            this.total = res.data.data.total
          } else if (res.data.status === 400) {
            this.$message.error(res.data.msg)
          }
          this.tableLoading = false
        })
    },
    // 监听分页的改变
    handleCurrentChange (val) {
      this.queryinfo.pageNum = val
      this.getHistoryList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getHistoryList()
    },
    // 删除一行
    deleteHistory (target, id, version) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定
        this.tableLoading = true
        this.$axios.post('/historyManage/deleteHistory', { id: id, version: version })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              if ((this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + 1 === this.total) {
                this.queryinfo.pageNum--
              }
              this.getHistoryList()
            } else {
              this.tableLoading = false
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

</script>

<style>

</style>
