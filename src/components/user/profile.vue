<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="UserForm" :model="user" :rules="rules" label-width="80px">
        <el-form-item prop="account" label="账号">
          <el-input v-model="user.account" disabled></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="onSubmit" :loading="logining">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {requestDoUpdateUser} from '../../api/api';
  import qs from 'qs';

  export default {
    data() {
      return {
        logining: false,
        user: {
          account: '',
          nickname: '',
          email:''        
        },
        rules: {
          nickname: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          email: [
            {required: true, message: '请输入用户邮箱', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      onSubmit() {
        this.$refs.UserForm.validate((valid) => {
          if (valid) {
            this.logining = true;

            var currentUser = sessionStorage.getItem('access-user');
            var userId = -1;
            if (currentUser) {
               currentUser = JSON.parse(currentUser);
               userId = currentUser.userId;
            }

            var formParams = { 
                               userId: userId, 
                               nickName: this.user.nickname,
                               email: this.user.email 
                             };
            requestDoUpdateUser(qs.stringify(formParams)).then(data => {
              this.logining = false;

              if (data.success == false) {
                this.$message({
                  message: data.msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: data.msg,
                  type: 'info'
                });
                //TODO 更新面板的用户显示名
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
        var currentUser = sessionStorage.getItem('access-user');
        if (currentUser) {
          currentUser = JSON.parse(currentUser);
          this.user.account = currentUser.account;
          this.user.nickname = currentUser.userName || '';
          this.user.email = currentUser.email || '';
        }
      },
  }
</script>
