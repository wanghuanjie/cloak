<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="UserForm" :model="user" :rules="rules" label-width="120px">
        <el-form-item prop="newPwd" label="新密码">
          <el-input type="password" v-model="user.newPwd"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd" label="确认新密码">
          <el-input type="password" v-model="user.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="onSubmit" :loading="logining">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import {requestDoChangePwd} from '../../api/api';
  import qs from 'qs';

  export default {
    data() {
      return {
        logining: false,
        user: {
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          newPwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          confirmPwd: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
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

            var changeParams = { userId: userId, password: this.user.newPwd };
            requestDoChangePwd(qs.stringify(changeParams)).then(data => {
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
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
