<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  // import {requestLogin} from '../api/api';
  import {requestDoLogin} from '../api/api';        
  import axios from 'axios'
  import qs from 'qs';

  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {

            this.logining = true;
            //NProgress.start();

            var loginParams = { account: this.account.username, password: this.account.pwd };

            requestDoLogin(qs.stringify(loginParams)).then(data => {
              console.log(data);
              this.logining = false;
              //NProgress.done();
              if (data.success == false) {
                this.$message({
                  message: data.msg,
                  type: 'error'
                });
              } else {
                // sessionStorage.setItem('access-user', JSON.stringify(data.data_collect));
                sessionStorage.setItem('access-user', JSON.stringify({
                                                                      userId: data.data_collect.userId,
                                                                      account:data.data_collect.account,
                                                                      userName: data.data_collect.userName,
                                                                      email: data.data_collect.email,
                                                                      token: data.data_collect.token,
                                                                      sessionId: data.data_collect.sessionId
                                                                    }));

                var currentUser = sessionStorage.getItem('access-user');
                var token = '';
                var sessionId = '';
                if (currentUser) {
                  currentUser = JSON.parse(currentUser);
                  token = currentUser.token;
                  sessionId = currentUser.sessionId;
                }
                axios.defaults.withCredentials=true;
                axios.defaults.headers.dagger_token = token;
                // axios.defaults.headers.Cookie = 'JSESSIONID='+sessionId;

                this.$router.push({ path: '/' });
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>
<style>
  body{
    background: #DFE9FB;
  }
</style>
<style lang="scss" scoped>
    .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
