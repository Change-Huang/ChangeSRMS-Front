<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用管理</el-breadcrumb-item>
      <el-breadcrumb-item>钥匙借还</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 列表表格 -->
      <component :is="keyManageTable" :keyManageList="keyManageList" :tableLoading="tableLoading"
        :queryinfo="queryinfo" @openTableLoading="openTableLoading"
        @closeTableLoading="closeTableLoading" @getKeyManageList="getKeyManageList">
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
import keyManageTable from './keyManageTable'
export default {
  data () {
    return {
      // 查询信息提交
      queryinfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 列表
      keyManageList: [],
      // 总数
      total: 0,
      // 渲染组件
      keyManageTable: 'keyManageTable',
      // 控制表格加载的显示与隐藏
      tableLoading: false
    }
  },
  components: {
    keyManageTable
  },
  // 对象创建完成，未渲染
  created () {
    this.getKeyManageList()
  },
  methods: {
    // 获取用户数据
    getKeyManageList () {
      this.tableLoading = true
      this.$axios.post('/keyManage/keyManageList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.keyManageList = res.data.data.keyManageList
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
      this.getKeyManageList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getKeyManageList()
    },
    openTableLoading () {
      this.tableLoading = true
    },
    closeTableLoading () {
      this.tableLoading = false
    }
  }
}

</script>

<style>

</style>
