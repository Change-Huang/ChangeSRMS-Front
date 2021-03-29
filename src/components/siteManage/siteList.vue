<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>场地管理</el-breadcrumb-item>
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
        <el-col :span="4">
          <el-button type="primary" @click="addSite">添加场地</el-button>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <component :is="siteTable" :siteList="siteList" :queryinfo="queryinfo"
        :tableLoading="tableLoading" @editSite="editSite" @deleteSite="deleteSite"></component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 场地的弹窗对话框 -->
    <component :is="siteDialog" :showDialog="showDialog" :siteForm="siteForm"
      :dialogTitle="dialogTitle" :dialogType="dialogType" @closeDialog="closeDialog"
      @getSiteList="getSiteList">
    </component>
  </div>
</template>

<script>
// 导入对话框和表格
import siteDialog from './siteDialog'
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
      // 列表
      siteList: [],
      // 场地信息的from
      siteForm: {
        id: '',
        siteName: '',
        location: '',
        seat: '',
        hasKeys: false,
        version: ''
      },
      // 总数
      total: 0,
      // 渲染组件
      siteDialog: 'siteDialog',
      siteTable: 'siteTable',
      // 控制添加对话框的显示与隐藏
      showDialog: false,
      // 对话框的标题
      dialogTitle: '',
      // 对话框类型，是编辑还是添加
      dialogType: '',
      // 控制表格加载的显示与隐藏
      tableLoading: false
    }
  },
  components: {
    siteDialog,
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
      this.$axios.post('/siteManage/siteList', this.queryinfo)
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
      this.getUserList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getSiteList()
    },
    // 点击添加场地，显示对话框
    addSite () {
      this.showDialog = true
      this.dialogTitle = '添加场地'
      this.dialogType = 'add'
      this.siteForm = {
        id: '',
        siteName: '',
        location: '',
        seat: '',
        hasKeys: false
      }
    },
    // 对话框关闭，让子组件能够调用
    closeDialog () {
      this.showDialog = false
    },
    // 点击表格中的编辑
    editSite (oneSite) {
      this.dialogTitle = '编辑场地'
      this.dialogType = 'edit'
      this.siteForm = oneSite
      this.showDialog = true
    },
    // 点击表格中的删除
    deleteSite (target, id, version) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定
        this.tableLoading = true
        this.$axios.post('/siteManage/deleteSite', { id: id, version: version })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              if ((this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + 1 === this.total) {
                this.queryinfo.pageNum--
              }
              this.getSiteList()
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
.item {
  margin: 4px;
}

</style>
