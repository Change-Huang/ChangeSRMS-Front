<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用管理</el-breadcrumb-item>
      <el-breadcrumb-item>二次审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 列表表格 -->
      <component :is="secondCheckTable" :secondCheckList="secondCheckList"
        :tableLoading="tableLoading" :queryinfo="queryinfo" @openDialog="openDialog">
      </component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <component :is="secondCheckDialog" :showDialog="showDialog" :history="history"
      @closeDialog="closeDialog" @getSecondCheckList="getSecondCheckList"></component>
  </div>
</template>

<script>
// 导入对话框和表格
import secondCheckTable from './secondCheckTable'
import secondCheckDialog from './secondCheckDialog'
export default {
  data () {
    return {
      // 查询信息提交
      queryinfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 列表
      secondCheckList: [],
      // 总数
      total: 0,
      // 渲染组件
      secondCheckTable: 'secondCheckTable',
      secondCheckDialog: 'secondCheckDialog',
      // 控制表格加载的显示与隐藏
      tableLoading: false,
      // 控制添加对话框的显示与隐藏
      showDialog: false,
      history: {}
    }
  },
  components: {
    secondCheckTable,
    secondCheckDialog
  },
  // 对象创建完成，未渲染
  created () {
    this.getSecondCheckList()
  },
  methods: {
    // 获取用户数据
    getSecondCheckList () {
      this.tableLoading = true
      this.$axios.post('/secondCheck/secondCheckList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.secondCheckList = res.data.data.secondCheckList
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
      this.getSecondCheckList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getSecondCheckList()
    },
    openDialog (history) {
      this.history = history
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    }
  }
}

</script>

<style>

</style>
