<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--搜索栏-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="姓名" style="min-width: 240px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUser">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="users" highlight-current-row v-loading="loading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" style="width:5%"></el-table-column>
        <el-table-column type="user_id" prop="user_id" style="width:10%"></el-table-column>
        <el-table-column prop="nick_name" label="姓名" style="width:20%" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" style="width:10%" :formatter="formatGender" sortable></el-table-column>
        <el-table-column prop="email" label="邮件" style="width:30%" sortable></el-table-column>
        <el-table-column label="操作" style="width:20%">
          <template scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$user_id,scope.row)">编辑</el-button>
            <el-button size="small" @click="showRoleDialog(scope.$user_id,scope.row)">角色</el-button>
            <el-button size="small" @click="delUser(scope.$user_id,scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--页码条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchDeleteUsers" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" v-loading="editLoading" ref="editForm">
          <el-form-item label="id" prop="user_id">
            <el-input v-model="editForm.user_id" auto-complete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="nick_name">
            <el-input v-model="editForm.nick_name" auto-complete="off"></el-input>
          </el-form-item>
          <!--
          <el-form-item label="作者" prop="author">
            <el-input v-model="editForm.author" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="editForm.description" :rows="8"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="角色管理" v-model="roleFormVisible" :close-on-click-modal="false">
        <!--列表-->
        <el-table ref="rolesTable" :data="roles" highlight-current-row v-loading="roleloading" @current-change="selsRole" style="width: 100%;">
          <el-table-column type="role_id" prop="role_id" style="width:20%"></el-table-column>
          <el-table-column prop="role_name" label="角色名" style="width:40%" sortable></el-table-column>
        </el-table>

        <!--页码条-->
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleRoleCurrentChange" :page-size="10" :total="roletotal" style="float:right;"></el-pagination>
        </el-col>

        <div slot="footer" class="dialog-footer">
          <el-button @click.native="roleFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="roleSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script>
  import util from '../../common/util'
  import { requestDoQueryUsers,requestDoQueryRoles,requestDoQueryUserRoles } from '../../api/api';
  import qs from 'qs';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        total: 0,
        page: 1,
        loading: false,
        sels: [], 
        users: [],
        roleloading :false,
        rolesels: [], 
        roletotal: 0,
        rolepage: 1,
        roles: [],
        editLoading: false,
        editFormRules: {
          nick_name: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ]
        },
        editForm: {
          user_id: 0,
          nick_name: ''
        },
        editFormVisible: false,
        roleFormVisible: false,
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getUser();
      }, 
      handleRoleCurrentChange(val) {
        this.rolepage = val;
        this.getRole();
      }, 
      batchDeleteUsers: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.loading = true;
          let para = {ids: ids};
          console.log(para);
          // reqBatchDeleteBook(para).then((res) => {
          //   this.loading = false;
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   });
          //   this.getUser();
          // });
        }).catch(() => {

        });
      },
      showEditDialog: function (index, row) {
        console.log("editForm");
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, this.editForm);
              
              reqEditBook(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getBooks();
              });
            });
          }
        });
      },
      showRoleDialog: function (index, row) {
        this.roleFormVisible = true;
        this.roleForm = Object.assign({}, row);
        this.getRoles(row);
      },
      selsRole: function (val){
        console.log(val.role_id);
      },
      selsChange: function (sels) {
        this.sels = sels;
      },     
      //性别显示转换
      formatGender: function (row, column) {
        return row.gender == 'MALE'? '男' : '女';
      },
      //获取用户列表
      getUser: function () {
        let para = {
          // name: this.filters.name
        };
        this.loading = true;
        requestDoQueryUsers(para).then((res) => {
          this.total = res.data_count;
          this.users = res.data_collect;
          this.loading = false;
        });
      },
      //获取角色列表
      getRoles: function (row) {
        let para = {
          // roleName: this.filters.roleName
        };
        this.roleloading = true;
        requestDoQueryRoles(qs.stringify(para)).then((res) => {
          this.roletotal = res.data_count;
          this.roles = res.data_collect;
          this.roleloading = false;

          let userPara = {userId: row.user_id};
          requestDoQueryUserRoles(qs.stringify(userPara)).then((res) => {
            console.log(userPara);
            var currentRow = res.data_collect;
            this.roles.forEach(row => {
              if (row.role_id == res.data_collect.role_id) {
                 this.$refs.rolesTable.setCurrentRow(row);
              }
            });
            
          });
        });
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>

<style scoped>

</style>
