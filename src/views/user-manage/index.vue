<template>
  <div class="app-container">
    <div class="top-btns">
      <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="dialogFormVisible = true">新增</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex | sexStatus }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日">
        <template slot-scope="scope">
          {{ scope.row.birth }}
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          {{ scope.row.addr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.update_at }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom-btns">
      <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleBatchDelete">批量删除</el-button>
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100, 500]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增表单 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" class="dialogForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="dialogForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="0" />
            <el-option label="女" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="dialogForm.age" />
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker
            v-model="dialogForm.birth"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="dialogForm.addr" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialogForm">取 消</el-button>
        <el-button type="primary" @click="dialogFormHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserManageList',
  filters: {
    sexStatus (sex) {
      return sex === 0 ? '男' : '女'
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      dialogForm: {
        name: '',
        sex: 0,
        age: 0,
        birth: '',
        addr: ''
      },
      dialogFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择生日', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      multipleSelection: []
    }
  },
  mounted () {
    this.fetchData(1)
  },
  methods: {
    fetchData (pageIndex) {
      this.listLoading = true
      const options = { page: pageIndex || this.pageIndex, size: this.pageSize }
      this.$store.dispatch('user/list', options).then((response) => {
        const { list, total } = response.data
        this.list = list
        this.total = total
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    dialogFormHandler () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          const patch = this.dialogForm.id ? 'user/edit' : 'user/add'
          this.$store.dispatch(patch, this.dialogForm).then(() => {
            this.resetDialogForm()
            this.fetchData()
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    resetDialogForm () {
      this.dialogFormVisible = false
      this.dialogForm = { name: '', sex: 0, age: 0, birth: '', addr: '' }
    },
    makeMessage (type, message) {
      this.$message({ type, message, duration: 1000 })
    },
    makeConfirm (tips, title, successCb, errorCb) {
      this.$confirm(tips, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        successCb()
      }).catch(() => {
        errorCb()
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (row) {
      const { id, name, sex, age, birth, addr } = row
      this.dialogForm = { id, name, sex, age, birth, addr }
      this.dialogFormVisible = true
    },
    handleDelete (row) {
      this.makeConfirm('您确定删除该用户?', '删除提示',
        () => {
          const options = { ids: row.id }
          this.$store.dispatch('user/remove', options).then(() => {
            this.makeMessage('success', '删除成功!')
            this.fetchData()
          }).catch(() => {
            this.makeMessage('error', '删除失败!')
          })
        },
        () => {
          this.makeMessage('info', '已取消删除')
        }
      )
    },
    handleBatchDelete () {
      this.makeConfirm('您确定删除所选用户?', '删除提示',
        () => {
          const idArr = this.multipleSelection.map(item => item.id)
          const options = { ids: idArr.join(',') }
          this.$store.dispatch('user/batchremove', options).then(() => {
            this.makeMessage('success', '删除成功!')
            this.fetchData()
          }).catch(() => {
            this.makeMessage('error', '删除失败!')
          })
        },
        () => {
          this.makeMessage('info', '已取消删除')
        }
      )
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.top-btns,
.bottom-btns {
  padding: 10px 0;
  @at-root {
    & {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.dialogForm {
  .el-select,
  .el-input {
    width: 270px;
  }
}
</style>
