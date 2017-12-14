<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--搜索条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.roleName" placeholder="角色名" style="min-width: 240px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getRoles">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="roles" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="role_id" prop="role_id" style="width:10%"></el-table-column>
        <el-table-column prop="role_name" label="名称" style="width:20%" sortable></el-table-column>
        <el-table-column prop="role_desc" label="描述" style="width:20%" sortable></el-table-column>
        <el-table-column prop="status" label="状态" style="width:20%" :formatter="formatStatus" sortable></el-table-column>
        <el-table-column label="操作" style="width:20%">
          <template scope="scope">
            <el-button size="small" @click="showPrivilegeDialog(scope.$role_id,scope.row)">权限</el-button>
            <!-- <el-button size="small" @click="delRole(scope.$role_id,scope.row)" type="danger">删除</el-button> -->
          </template>
        </el-table-column>        
      </el-table>

      <!--页码条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <!-- 权限管理 -->
      <el-dialog title="权限管理" v-model="privilegeFormVisible" :close-on-click-modal="false">
        <!--列表-->
        <el-table ref="privilegesTable" :data="privileges" highlight-current-row v-loading="privilegeloading" @selection-change="selsPrivilege" style="width: 100%;">
          <el-table-column type="selection" style="width: 5%;"></el-table-column>
          <el-table-column type="privilege_id" prop="privilege_id" style="width: 30%;"></el-table-column>
          <el-table-column prop="privilege_name" label="权限名" style="width: 40%;" sortable></el-table-column>
        </el-table>

        <!--页码条-->
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handlePrivilegeCurrentChange" :page-size="10" :total="privilegetotal" style="float:right;"></el-pagination>
        </el-col>

        <div slot="footer" class="dialog-footer">
          <el-button @click.native="privilegeFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="privilegeSubmit" :loading="privilegeloading">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="角色名" prop="role_name">
            <el-input v-model="addForm.role_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="role_dec">
            <el-input type="textarea" v-model="addForm.role_dec" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script>
  import qs from 'qs';
  import { requestDoQueryRoles,requestDoAddRoles,requestDoQueryPrivileges,requestDoQueryRolePrivileges,requestDoBindRolePrivileges } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          roleName: ''
        },
        total: 0,
        page: 1,
        loading: false,
        roles: [],
        currentRoleId: -1,

        privilegeFormVisible: false,
        privilegeloading :false,
        privilegesels: [], 
        privilegetotal: 0,
        privilegepage: 1,
        privileges: [],
        selsPrivilegeIds: [],

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          role_name: [
            {required: true, message: '请输入角色名', trigger: 'blur'}
          ],
          role_dec: [
            {required: true, message: '请输入角色描述', trigger: 'blur'}
          ]
        },
        addForm: {
          role_name: '',
          role_dec: ''
        }
      }
    },
    methods: {
      handleCurrentChange: function(val) {
        this.page = val;
        this.getRoles();
      }, 
      //状态显示转换
      formatStatus: function (row, column) {
        return row.status == 'ENABLED' ? '启用' : '不启用';
      },
      //获取用户列表
      getRoles: function () {
        let para = {
          // roleName: this.filters.roleName
        };
        this.loading = true;

        requestDoQueryRoles(para).then((res) => {
          this.total = res.data_count;
          this.roles = res.data_collect;
          this.loading = false;
        });
      },
      handlePrivilegeCurrentChange: function(val) {
        this.privilegepage = val;
        this.getRoles();
      },
      showPrivilegeDialog: function (index, row) {
        this.privilegeFormVisible = true;
        this.privilegeForm = Object.assign({}, row);
        this.getPrivileges(row);
      },
      selsPrivilege: function (privilegesels) {
        if (privilegesels.length > 0) {
           this.privilegesels = privilegesels;
           this.selsPrivilegeIds = [];
           privilegesels.forEach(row=>{
              this.selsPrivilegeIds.push(row.privilege_id);
              console.log(this.selsPrivilegeIds);
           });
        }
      },
      getPrivileges: function (row) {
        let para = {
          privilege_type: 3
        };
        this.roleloading = true;
        requestDoQueryPrivileges(qs.stringify(para)).then((res) => {
          this.privilegetotal = res.data_count;
          this.privileges = res.data_collect;
          this.privilegeloading = false;
          console.log(row);
          this.currentRoleId = row.role_id;

          let rolePara = {roleId: this.currentRoleId};
          requestDoQueryRolePrivileges(qs.stringify(rolePara)).then((res) => {
            var currentRows = res.data_collect;
            
            if (null != currentRows && undefined != currentRows && '' != currentRows) {
                this.privileges.forEach(row => {
                  currentRows.forEach(prow =>{
                    if (row.privilege_id == prow.privilege_id) {
                      // this.$refs.rolesTable.setCurrentRow(row);
                      this.$refs.privilegesTable.toggleRowSelection(row);
                    }
                  });
                });
            }
          });
        });
      },
      privilegeSubmit: function () {
        let para = {
            privilegeIds: JSON.stringify(this.selsPrivilegeIds),
            roleId: this.currentRoleId
        };
        requestDoBindRolePrivileges(qs.stringify(para)).then((res) => {
          this.privilegeloading = false;
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.privilegeFormVisible = false;
          this.getRoles();
        });
      },
      //显示新增窗口
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          role_name: '',
          role_dec: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;

            let para = {
                roleName: this.addForm.role_name,
                roleDec: this.addForm.role_dec
            };
            requestDoAddRoles(qs.stringify(para)).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.privilegeFormVisible = false;
              this.getRoles();
            });
          }
        });
      }
    },
    mounted() {
      this.getRoles();
    }
  }
</script>

<style scoped>

</style>
