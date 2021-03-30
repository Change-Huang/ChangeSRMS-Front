<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 输入框与按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div @keyup.enter="findAdminList">
            <el-input placeholder="请输入内容" v-model="queryinfo.query" @clear="clear" clearable>
              <el-button slot="append" icon="el-icon-search" @click="findAdminList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addAdmin">添加管理员</el-button>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <component :is="adminTable" :adminList="adminList" :queryinfo="queryinfo"
        :tableLoading="tableLoading" @editAdmin="editAdmin" @deleteAdmin="deleteAdmin"></component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 管理员的弹窗对话框 -->
    <component :is="adminDialog" :showDialog="showDialog" :adminForm="adminForm"
      :dialogTitle="dialogTitle" :dialogType="dialogType" @closeDialog="closeDialog"
      @getAdminList="getAdminList">
    </component>
  </div>
</template>

<script>
// 导入对话框和表格
import adminDialog from './adminDialog'
import adminTable from './adminTable'
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
      adminList: [],
      // 管理员信息的from
      adminForm: {
        id: '',
        adminName: '',
        adminNickname: '',
        adminPassword: '',
        role: '',
        version: ''
      },
      // 总数
      total: 0,
      // 渲染组件
      adminDialog: 'adminDialog',
      adminTable: 'adminTable',
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
    adminDialog,
    adminTable
  },
  // 对象创建完成，未渲染
  created () {
    this.getAdminList()
  },
  methods: {
    // 获取用户数据
    getAdminList () {
      this.tableLoading = true
      this.$axios.post('/adminManage/adminList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.adminList = res.data.data.adminList
            this.total = res.data.data.total
          } else if (res.data.status === 400) {
            this.$message.error(res.data.msg)
          }
          this.tableLoading = false
        })
    },
    // 监听输入框的清空按钮
    clear () {
      this.getAdminList()
    },
    // 点击搜索查询按钮
    findAdminList () {
      this.queryinfo.pageNum = 1
      this.getAdminList()
    },
    // 监听分页的改变
    handleCurrentChange (val) {
      this.queryinfo.pageNum = val
      this.getAdminList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getAdminList()
    },
    // 点击添加管理员，显示对话框
    addAdmin () {
      this.showDialog = true
      this.dialogTitle = '添加管理员'
      this.dialogType = 'add'
      this.adminForm = {
        id: '',
        adminName: '',
        adminNickname: '',
        adminPassword: '',
        role: '',
        version: ''
      }
    },
    // 对话框关闭，让子组件能够调用
    closeDialog () {
      this.showDialog = false
    },
    // 点击表格中的编辑
    editAdmin (oneAdmin) {
      this.dialogTitle = '编辑管理员'
      this.dialogType = 'edit'
      this.adminForm = oneAdmin
      this.showDialog = true
    },
    // 点击表格中的删除
    deleteAdmin (target, id, version) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定
        this.tableLoading = true
        this.$axios.post('/adminManage/deleteAdmin', { id: id, version: version })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              if ((this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + 1 === this.total) {
                this.queryinfo.pageNum--
              }
              this.getAdminList()
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
