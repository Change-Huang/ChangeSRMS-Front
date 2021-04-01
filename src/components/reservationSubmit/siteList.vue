<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户功能</el-breadcrumb-item>
      <el-breadcrumb-item>借用申请</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 输入框与按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div @keyup.enter="findSiteList">
            <el-input placeholder="请输入内容" v-model="queryinfo.query" @clear="clear" clearable>
              <el-button slot="append" icon="el-icon-search" @click="findSiteList"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <component :is="siteTable" :siteList="siteList" :queryinfo="queryinfo"
        :tableLoading="tableLoading" @reservation="reservation"></component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 场地的弹窗对话框 -->
    <component :is="reservationDialog" :showDialog="showDialog" @closeDialog="closeDialog"
      :siteId="siteId" :siteName="siteName">
    </component>
  </div>
</template>

<script>
// 导入对话框和表格
import reservationDialog from './reservationDialog'
import siteTable from './siteTable'
export default {
  data () {
    return {
      // 查询信息提交
      queryinfo: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      // 要借用的场地id
      siteId: '',
      siteName: '',
      // 列表
      siteList: [],
      // 总数
      total: 0,
      // 渲染组件
      reservationDialog: 'reservationDialog',
      siteTable: 'siteTable',
      // 控制添加对话框的显示与隐藏
      showDialog: false,
      // 控制表格加载的显示与隐藏
      tableLoading: false
    }
  },
  components: {
    reservationDialog,
    siteTable
  },
  // 对象创建完成，未渲染
  created () {
    this.getSiteList()
  },
  methods: {
    // 获取用户数据
    getSiteList () {
      this.tableLoading = true
      this.$axios.post('/reservationSubmit/siteList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.siteList = res.data.data.siteList
            this.total = res.data.data.total
          } else if (res.data.status === 400) {
            this.$message.error(res.data.msg)
          }
          this.tableLoading = false
        })
    },
    // 监听输入框的清空按钮
    clear () {
      this.getSiteList()
    },
    // 点击搜索查询按钮
    findSiteList () {
      this.queryinfo.pageNum = 1
      this.getSiteList()
    },
    // 监听分页的改变
    handleCurrentChange (val) {
      this.queryinfo.pageNum = val
      this.getSiteList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getSiteList()
    },
    // 点击预约，显示对话框
    reservation (id, name) {
      this.siteId = id
      this.siteName = name
      this.showDialog = true
    },
    // 对话框关闭，让子组件能够调用
    closeDialog () {
      this.showDialog = false
    }
  }
}

</script>

<style>
.item {
  margin: 4px;
}

</style>
