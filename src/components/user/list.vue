<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
        <!--工具条-->
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
        <el-table-column type="user_id" width="60">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="100" :formatter="formatGender" sortable>
        </el-table-column>
        <el-table-column prop="mail" label="邮件" min-width="180" sortable>
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>

<script>
  // import { reqGetUserList } from '../../api/api';
  import { requestDoQueryUsers } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        loading: false,
        users: [
        ]
      }
    },
    methods: {
      //性别显示转换
      formatGender: function (row, column) {
        return row.gender == 'MALE'? '男' : '女';
      },
      //获取用户列表
      getUser: function () {
        let para = {
          name: this.filters.name
        };
        this.loading = true;
        //NProgress.start();
        requestDoQueryUsers(para).then((res) => {
          this.users = res.data_collect;
          this.loading = false;
          //NProgress.done();
        });
        // reqGetUserList(para).then((res) => {
        //   this.users = res.data.users;
        //   this.loading = false;
        //   //NProgress.done();
        // });
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>

<style scoped>

</style>
