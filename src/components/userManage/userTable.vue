<template>
  <el-table :data="userList" size="mini" :max-height="tableHeight" v-loading="tableLoading" border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="用户名" prop="userName"></el-table-column>
    <el-table-column label="姓名" prop="userNickname"></el-table-column>
    <el-table-column label="借用场地次数" prop="useSum"></el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="查看与编辑" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="primary" size="small" plain icon="el-icon-edit"
            @click="editUser(scope.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="danger" size="small" plain icon="el-icon-delete"
            @click="deleteUser($event, scope.row.id, scope.row.version)"></el-button>
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
  props: ['userList', 'queryinfo', 'tableLoading'],
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
    editUser (user) {
      this.$emit('editUser', {
        id: user.id,
        userName: user.userName,
        userNickname: user.userNickname,
        version: user.version
      })
    },
    deleteUser (event, id, version) {
      // 让按钮失焦
      let target = event.target
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode
      }
      this.$emit('deleteUser', target, id, version)
    }
  }
}

</script>

<style>

</style>
