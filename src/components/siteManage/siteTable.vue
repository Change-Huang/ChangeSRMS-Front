<template>
  <el-table :data="siteList" size="mini" :max-height="tableHeight" v-loading="tableLoading" border>
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <el-table-column label="名称" prop="siteName"></el-table-column>
    <el-table-column label="位置" prop="location"></el-table-column>
    <el-table-column label="容纳人数" prop="seat"></el-table-column>
    <!-- 钥匙列 -->
    <el-table-column label="是否需要钥匙" prop="hasKeys">
      <template slot-scope="scope">
        <el-tag :type="scope.row.hasKeys?'':'info'">{{scope.row.hasKeys?'需要钥匙':'不需要钥匙'}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 正在使用列 -->
    <el-table-column label="是否正在使用" prop="isLent">
      <template slot-scope="scope">
        <el-tag :type="scope.row.isLent?'warning':''">{{scope.row.isLent?'正在使用':'未被使用'}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 相关操作列 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="查看与编辑" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="primary" size="small" plain icon="el-icon-edit"
            @click="editSite(scope.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false"
          :open-delay="openDelay">
          <el-button type="danger" size="small" plain icon="el-icon-delete"
            @click="deleteSite($event, scope.row.id, scope.row.version)"></el-button>
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
  props: ['siteList', 'queryinfo', 'tableLoading'],
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
    editSite (site) {
      this.$emit('editSite', {
        id: site.id,
        siteName: site.siteName,
        location: site.location,
        seat: site.seat,
        hasKeys: site.hasKeys,
        version: site.version
      })
    },
    deleteSite (event, id, version) {
      // 让按钮失焦
      let target = event.target
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode
      }
      this.$emit('deleteSite', target, id, version)
    }
  }
}

</script>

<style>

</style>
