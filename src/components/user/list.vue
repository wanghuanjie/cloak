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
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
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
            <!-- <el-button size="small" @click="showEditDialog(scope.$user_id,scope.row)">编辑</el-button> -->
            <el-button size="small" @click="showRoleDialog(scope.$user_id,scope.row)">角色</el-button>
            <!-- <el-button size="small" @click="delUser(scope.$user_id,scope.row)" type="danger">删除</el-button> -->
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

      <!-- 角色管理 -->
      <el-dialog title="角色管理" v-model="roleFormVisible" :close-on-click-modal="false">
        <!--列表-->
        <el-table ref="rolesTable" :data="roles" highlight-current-row v-loading="roleloading" @current-change="selsRoleChange" style="width: 100%;">
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

      <!--用户新增-->
      <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="addForm.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
             <el-radio-group v-model="radio_gender" @change="genderChange">
               <el-radio-button label="男"></el-radio-button>
               <el-radio-button label="女"></el-radio-button>
             </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <!-- 用户编辑 -->
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

    </el-col>
  </el-row>
</template>

<script>
  import util from '../../common/util'
  import { requestDoQueryUsers,requestDoQueryRoles,requestDoQueryUserRoles,requestDoRegisterUser,requestDoBindUserRoles } from '../../api/api';
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
        currentUserId: -1,

        roleFormVisible: false,
        roleloading :false,
        rolesels: [], 
        roletotal: 0,
        rolepage: 1,
        selsRoleId: -1,
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

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ]
        },
        addForm: {
          account: '',
          password: '',
          email: ''
        },
        radio_gender: '男',
        gender: 'MALE'
      }
    },
    methods: {
      handleCurrentChange: function (val) {
        this.page = val;
        this.getUser();
      }, 
      handleRoleCurrentChange: function (val) {
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
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          account: '',
          password: '',
          email: ''
        };
        this.radio_gender= '男';
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;

            let para = {
                account: this.addForm.account,
                password: this.addForm.password,
                email: this.addForm.email,
                gender: this.gender
            };
            requestDoRegisterUser(qs.stringify(para)).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUser();
            });
          }
        });
      },
      genderChange: function() {
        if ("男" == this.radio_gender) {
          this.gender = 'MALE';
        } else {
          this.gender = 'FEMALE';
        }
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
        let para = {};
        this.loading = true;
        requestDoQueryUsers(para).then((res) => {
          this.total = res.data_count;
          this.users = res.data_collect;
          this.loading = false;
        });
      },
      showRoleDialog: function (index, row) {
        this.roleFormVisible = true;
        this.roleForm = Object.assign({}, row);
        this.getRoles(row);
      },
      selsRoleChange: function (csels){
        if (csels != null && csels != undefined && csels != '') {
          this.selsRoleId = csels.role_id;
        }
      },
      //获取角色列表
      getRoles: function (row) {
        let para = {};
        this.roleloading = true;
        requestDoQueryRoles(qs.stringify(para)).then((res) => {
          this.roletotal = res.data_count;
          this.roles = res.data_collect;
          this.roleloading = false;
          this.currentUserId = row.user_id;

          let userPara = {userId: this.currentUserId};
          requestDoQueryUserRoles(qs.stringify(userPara)).then((res) => {
            var currentRows = res.data_collect;
            if (null != currentRows && undefined != currentRows && '' != currentRows) {
                this.roles.forEach(row => {
                  if (row.role_id == currentRows.role_id) {
                    this.$refs.rolesTable.setCurrentRow(row);
                  }
                });
            }
          });
        });
      },
      roleSubmit: function () {
            let para = {
                userId: this.currentUserId,
                roleId: this.selsRoleId
            };
            requestDoBindUserRoles(qs.stringify(para)).then((res) => {
              this.roleloading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.roleFormVisible = false;
              this.getUser();
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
