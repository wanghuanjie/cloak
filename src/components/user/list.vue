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
      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="user_id" prop="user_id" style="width:10%"></el-table-column>
        <el-table-column prop="nick_name" label="姓名" style="width:30%" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" style="width:10%" :formatter="formatGender" sortable></el-table-column>
        <el-table-column prop="email" label="邮件" style="width:30%" sortable></el-table-column>
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
  import { requestDoQueryUsers } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        total: 0,
        page: 1,
        loading: false,
        users: [
        ]
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getUser();
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
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>

<style scoped>

</style>
