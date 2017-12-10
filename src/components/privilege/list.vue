<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--搜索条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.privilegeName" placeholder="权限名" style="min-width: 240px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getPrivileges">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="privileges" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="privilege_id" prop="privilege_id" style="width:10%"></el-table-column>
        <el-table-column prop="privilege_name" label="名称" style="width:20%" sortable></el-table-column>
        <el-table-column prop="privilege_co" label="编号" style="width:20%" sortable></el-table-column>
        <el-table-column prop="privilege_dec" label="描述" style="width:30%" sortable></el-table-column>
        <el-table-column prop="status" label="状态" style="width:20%" :formatter="formatStatus" sortable></el-table-column>
      </el-table>

      <!--页码条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <!--新增界面-->
      <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="权限名" prop="privilege_name">
            <el-input v-model="addForm.privilege_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限类型" prop="privilege_type">
            <el-input v-model="addForm.privilege_type" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" prop="privilege_dec">
            <el-input type="textarea" v-model="addForm.privilege_dec" :rows="8"></el-input>
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
  import { requestDoQueryPrivileges,requestDoAddPrivileges } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          privilegeName : ''
        },
        total: 0,
        page: 1,
        loading: false,
        privileges: [],
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          privilege_name: [
            {required: true, message: '请输入权限名', trigger: 'blur'}
          ],
          privilege_type: [
            {required: true, message: '请输入权限类型', trigger: 'blur'}
          ],
          privilege_dec: [
            {required: true, message: '请输入权限描述', trigger: 'blur'}
          ]
        },
        addForm: {
          privilege_name: '',
          privilege_dec: '',
          privilege_type: ''
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getPrivileges();
      }, 
      //状态显示转换
      formatStatus: function (row, column) {
        return row.status == 'ENABLED' ? '启用' : '不启用';
      },
      //获取权限列表
      getPrivileges: function () {
        let para = {};
        this.loading = true;

        requestDoQueryPrivileges(para).then((res) => {
          this.total = res.data_count;
          this.privileges = res.data_collect;
          this.loading = false;
        });
      },
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          privilege_name: '',
          privilege_dec: '',
          privilege_type: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;

            let para = {
                privilegeName: this.addForm.privilege_name,
                privilegeDec: this.addForm.privilege_dec,
                privilegeType: this.addForm.privilege_type
            };
            requestDoAddPrivileges(qs.stringify(para)).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getPrivileges();
            });
          }
        });
      },
    },
    mounted() {
      this.getPrivileges();
    }
  }
</script>

<style scoped></style>
