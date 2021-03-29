<template>
  <div class="indexMain">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 输入框与按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div @keyup.enter="findUserList">
            <el-input placeholder="请输入内容" v-model="queryinfo.query" @clear="clear" clearable>
              <el-button slot="append" icon="el-icon-search" @click="findUserList"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <component :is="userTable" :userList="userList" :queryinfo="queryinfo"
        :tableLoading="tableLoading" @editUser="editUser" @deleteUser="deleteUser"></component>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 场地的弹窗对话框 -->
    <component :is="userDialog" :showDialog="showDialog" :userForm="userForm"
      @closeDialog="closeDialog" @getUserList="getUserList">
    </component>
  </div>
</template>

<script>
import userTable from './userTable'
import userDialog from './userDialog'
export default {
  data () {
    return {
      // 查询信息提交
      queryinfo: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      userForm: {
        id: '',
        userName: '',
        userNickname: '',
        version: ''
      },
      // 列表
      userList: [],
      // 组件引入
      userTable: 'userTable',
      userDialog: 'userDialog',
      // 表格正在加载
      tableLoading: false,
      // 控制添加对话框的显示与隐藏
      showDialog: false,
      // 总数
      total: 0
    }
  },
  components: {
    userTable,
    userDialog
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户
    getUserList () {
      this.tableLoading = true
      this.$axios.post('/userManage/userList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.userList = res.data.data.userList
            this.total = res.data.data.total
          } else if (res.data.status === 400) {
            this.$message.error(res.data.msg)
          }
          this.tableLoading = false
        })
    },
    // 在查询框输入
    findUserList () {
      this.queryinfo.pageNum = 1
      this.getUserList()
    },
    // 点击查询框的清除
    clear () {
      this.getUserList()
    },
    // 对话框关闭，让子组件能够调用
    closeDialog () {
      this.showDialog = false
    },
    editUser (user) {
      this.userForm = user
      this.showDialog = true
    },
    deleteUser (target, id, version) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定
        this.tableLoading = true
        this.$axios.post('/userManage/deleteUser', { id: id, version: version })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              if ((this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + 1 === this.total) {
                this.queryinfo.pageNum--
              }
              this.getUserList()
            } else {
              this.$message.error(res.data.msg)
              this.tableLoading = false
            }
          })
        target.blur()
      }).catch(() => {
        target.blur()
      })
    },
    // 监听分页的改变
    handleCurrentChange (val) {
      this.queryinfo.pageNum = val
      this.getUserList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.queryinfo.pageNum = 1
      this.getUserList()
    }
  }
}

</script>

<style>

</style>
