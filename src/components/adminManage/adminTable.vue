<template>
  <el-table :data="adminList" size="mini" :max-height="tableHeight" v-loading="tableLoading" border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="用户名" prop="adminName"></el-table-column>
    <el-table-column label="姓名" prop="adminNickname"></el-table-column>
    <!-- 角色列 -->
    <el-table-column label="角色" prop="role">
      <template slot-scope="scope">
        <el-tag :type="scope.row.role==='super'?'':'info'">
          {{scope.row.role==='super'?'超级管理员':'管理员'}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="查看与编辑" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="primary" size="small" plain icon="el-icon-edit"
            @click="editAdmin(scope.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="danger" size="small" plain icon="el-icon-delete"
            @click="deleteAdmin($event, scope.row.id, scope.row.version)"></el-button>
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
      openDelay: 500
    }
  },
  props: ['adminList', 'queryinfo', 'tableLoading'],
  // 对象已经渲染，时刻改变高度，适应窗口大小
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 275
    })
    const that = this
    window.onresize = () => {
      that.$nextTick(() => {
        that.tableHeight = window.innerHeight - 275
      })
    }
  },
  methods: {
    // 改变index行数
    indexMethod (index) {
      return (this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + index + 1
    },
    // 监听每一行的操作按钮
    editAdmin (admin) {
      this.$emit('editAdmin', {
        id: admin.id,
        adminName: admin.adminName,
        adminNickname: admin.adminNickname,
        adminPassword: '12345678',
        role: admin.role,
        version: admin.version
      })
    },
    deleteAdmin (event, id, version) {
      // 让按钮失焦
      let target = event.target
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode
      }
      this.$emit('deleteAdmin', target, id, version)
    }
  }
}

</script>

<style>

</style>
