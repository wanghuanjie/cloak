<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户信息统计</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--搜索条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.onLineUser" placeholder="在线用户人数" style="min-width: 240px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.totalUser" placeholder="累计用户人数" style="min-width: 240px;"></el-input>
          </el-form-item>          
        </el-form>
      </el-col>

    </el-col>
  </el-row>
</template>

<script>
  import sockjs from 'sockjs';
  import stomp from 'stomp';


  export default {
    data() {
      return {
        
      }
    },
    methods: {
      initWebSocket(){
        var socket = new SockJS("http://localhost:8100/daggerwebsocket");
        var ws = Stomp.over(socket);

        ws.connect({}, function(frame) {
            ws.subscribe("/daggerbroker/test", function(event) {
                console.log(event);
            });
        }, function(frame) {

            console.log(frame);
            console.error(new Date() + 'websocket失去连接');
        });
      }
    },
    mounted() {
      this.initWebSocket();
    }
  }
</script>

<style scoped>

</style>
