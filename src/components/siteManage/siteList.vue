<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>场地管理</el-breadcrumb-item>
      <el-breadcrumb-item>场地列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 输入框与按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div @keyup.enter="getSiteList">
            <el-input placeholder="请输入内容" v-model="queryinfo.query" @clear="clear()" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getSiteList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addSite">添加场地</el-button>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <el-table :data="siteList" size="mini" :max-height="tableHeight" v-loading="loading" border>
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
            <el-tooltip class="item" effect="dark" content="查看与编辑" placement="top"
              :enterable="false">
              <el-button type="primary" size="small" plain icon="el-icon-edit"
                @click="editSite(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="small" plain icon="el-icon-delete"
                @click="deleteSite(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination layout="total, prev, pager, next, sizes, jumper" :total="total"
        :current-page="queryinfo.pageNum" :page-size="queryinfo.pageSize"
        @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <!-- 添加场地的弹窗对话框 -->
    <el-dialog title="添加场地" :visible.sync="showAddSite">
      <!-- 对话框主体 -->
      <el-form ref="siteFormRef" :model="siteForm" :rules="siteFormRules">
        <div class="addSiteDialogBody">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="siteName">
            <el-input v-model="siteForm.siteName"></el-input>
          </el-form-item>
          <el-form-item label="位置" :label-width="formLabelWidth" prop="location">
            <el-input type="textarea" rows="3" resize="none" v-model="siteForm.location"></el-input>
          </el-form-item>
          <el-form-item label="容纳人数" :label-width="formLabelWidth" prop="seat">
            <el-input v-model.number="siteForm.seat"></el-input>
          </el-form-item>
          <el-form-item label="是否需要钥匙" :label-width="formLabelWidth" prop="hasKeys">
            <el-switch v-model="siteForm.hasKeys">
            </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <!-- 对话框下方 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddSite = false">取 消</el-button>
        <el-button type="primary" @click="addSiteSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      // 总数
      total: 0,
      // 表格最高高度
      tableHeight: 0,
      // 表格是否显示加载
      loading: false,
      // 控制添加对话框的显示与隐藏
      showAddSite: false,
      // 控制添加对话框的头信息宽度
      formLabelWidth: '180px',
      // 场地信息的from
      siteForm: {
        id: '',
        siteName: '',
        location: '',
        seat: '',
        hasKeys: false
      },
      // 表单验证规则
      siteFormRules: {
        siteName: [
          { required: true, message: '请输入场地名称', trigger: 'blur' },
          { max: 18, message: '长度不多于18个字符', trigger: 'blur' }
        ],
        seat: [
          { required: true, message: '请输入场地能容纳的人数', trigger: 'blur' },
          { type: 'number', message: '人数必须为数字值', trigger: 'blur' }
        ],
        hasKeys: [
          { required: true }
        ]
      }
    }
  },
  // 对象创建完成，未渲染
  created () {
    this.getSiteList()
  },
  // 对象已经渲染
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
    // 获取用户数据
    getSiteList () {
      this.loading = true
      this.$axios.post('/siteManage/siteList', this.queryinfo)
        .then(res => {
          if (res.data.status === 200) {
            this.siteList = res.data.data.siteList
            this.total = res.data.data.total
          }
          this.loading = false
        })
    },
    // 监听输入框的清空按钮
    clear () {
      this.getSiteList()
    },
    // 改变index行数
    indexMethod (index) {
      return (this.queryinfo.pageNum - 1) * this.queryinfo.pageSize + index + 1
    },
    // 监听分页的改变
    handleCurrentChange (val) {
      this.queryinfo.pageNum = val
      this.getSiteList()
    },
    handleSizeChange (val) {
      this.queryinfo.pageSize = val
      this.getSiteList()
    },
    // 监听每一行的操作按钮
    editSite (id) {
      console.log(id)
    },
    deleteSite (id) {
      console.log(id)
    },
    // 添加场地，显示对话框
    addSite () {
      this.showAddSite = true
    },
    // 添加场地表单提交
    addSiteSubmit () {
      this.$refs.siteFormRef.validate(valid => {
        if (!valid) return
        const addSiteForm = this.siteForm
        delete addSiteForm.id
        this.$axios.post('/siteManage/addSite', addSiteForm)
          .then(res => {
            console.log(res)
          })
        this.showAddSite = false
        this.$refs.siteFormRef.resetFields()
      })
    }
  }
}

</script>

<style>
.item {
  margin: 4px;
}

.addSiteDialogBody {
  padding-right: 25%;
}

</style>
