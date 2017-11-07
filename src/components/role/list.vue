<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.roleName" placeholder="角色名" style="min-width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getRoles">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      <!--列表-->
      <el-table :data="roles" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="role_id" width="60">
        </el-table-column>
        <el-table-column prop="role_name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="role_co" label="编号" width="100" sortable>
        </el-table-column>
        <el-table-column prop="role_dec" label="描述" width="100" sortable>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" :formatter="formatStatus" sortable>
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>

<script>
  import { requestDoQueryRoles } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          roleName: ''
        },
        loading: false,
        roles: [
        ]
      }
    },
    methods: {
      //性别显示转换
      formatStatus: function (row, column) {
        return row.status == 'ENABLED' ? '启用' : '不启用';
      },
      //获取用户列表
      getRoles: function () {
        let para = {
          roleName: this.filters.roleName
        };
        this.loading = true;
        //NProgress.start();
        // reqGetRoleList(para).then((res) => {
        //   this.roles = res.data_collect;
        //   this.loading = false;
        //   //NProgress.done();
        // });
        requestDoQueryRoles(para).then((res) => {
          // this.roles = res.data_collect;
          this.loading = false;
          //NProgress.done();
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
