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
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

    </el-col>
  </el-row>
</template>

<script>
  import { requestDoQueryPrivileges } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          roleName: ''
        },
        total: 0,
        page: 1,
        loading: false,
        privileges: [
        ]
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
        let para = {
          // roleName: this.filters.roleName
        };
        this.loading = true;

        requestDoQueryPrivileges(para).then((res) => {
          this.total = res.data_count;
          this.privileges = res.data_collect;
          this.loading = false;
          //NProgress.done();
        });
      }
    },
    mounted() {
      this.getPrivileges();
    }
  }
</script>

<style scoped>

</style>
