<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/"><img style="width:100%;height:100%" src="../assets/logotxt.png"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">Cloak管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i
            class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/profile"><span style="color: #555;font-size: 14px;">个人信息</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="'/user/changepwd'"><span style="color: #555;font-size: 14px;">修改密码</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu default-active="0" router :collapse="collapsed">
          <template v-for="(item,index) in privileges" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import qs from 'qs';
  import {requestDoLogout,reqCurrentPrivilege} from '../api/api';        
  import {bus} from '../bus.js'
  // import axios from 'axios'

  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      })
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        collapsed: false,

        //增加权限相关数据源
        privileges: [
          // {
          //   path: '/login',
          //   name: '登录'
          // },
          {
            path: '/',
            name: 'home',
            redirect: '/dashboard',
            leaf: true, // 只有一个节点
            menuShow: true,
            iconCls: 'iconfont icon-home', // 图标样式class
            children: [
              {path: '/dashboard', name: '首页', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '用户管理',
            menuShow: true,
            // leaf: true, // 只有一个节点
            iconCls: 'iconfont icon-users', // 图标样式class
            children: [
              {path: '/user/list', name: '用户列表', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '角色管理',
            menuShow: true,
            iconCls: 'iconfont icon-books',
            children: [
              {path: '/role/list', name: '角色列表', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '权限管理',
            menuShow: true,
            iconCls: 'iconfont icon-books',
            children: [
              {path: '/privilege/list', name: '权限列表', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '统计管理',
            menuShow: true,
            iconCls: 'iconfont icon-books',
            children: [
              {path: '/statistics/user', name: '用户统计', menuShow: true}
            ]
          },
          {
            path: '/',
            name: '设置',
            menuShow: true,
            iconCls: 'iconfont icon-setting1',
            children: [
              {path: '/user/profile', name: '个人信息', menuShow: true},
              {path: '/user/changepwd', name: '修改密码', menuShow: true}
            ]
          }
        ]
      }
    },
    methods: {
      handleOpen() {
        //console.log('handleopen');
      },
      handleClose() {
        //console.log('handleclose');
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      getCurrentPrivilege () {
          let privilegeParam = {};
          reqCurrentPrivilege(qs.stringify(privilegeParam)).then(res => {
            var current_privlieges = res.data_collect;
            
            this.privileges = [];
            var fristItem = {
                            path: '/',
                            name: 'home',
                            redirect: '/dashboard',
                            leaf: true, // 只有一个节点
                            menuShow: true,
                            iconCls: 'iconfont icon-home', // 图标样式class
                            children: [
                              {path: '/dashboard', name: '首页', menuShow: true}
                            ]
                          };
            this.privileges.push(fristItem);

            current_privlieges.forEach(row=>{
              var item =  {
                          iconCls: 'iconfont icon-books',
                          };
              item.path = '/';
              item.name = row.privilegeName;
              item.menuShow = true;

              var children = [];
              if (row.childs != null) {
                 row.childs.forEach(child=>{
                   var childItem = {};

                   childItem.path = '/'+row.privilegeAlias+'/'+child.privilegeAlias;
                   console.log(row.privilegeAlias+','+childItem.path+','+child.privilegeAlias+','+childItem.path);

                   childItem.name = child.privilegeName;
                   childItem.menuShow = true;

                   children.push(childItem);
                 });
              }
              item.children = children;

              this.privileges.push(item);
              console.log(row);  
              console.log(this.privileges);            
            });

            var endItem = {
                          path: '/',
                          name: '设置',
                          menuShow: true,
                          iconCls: 'iconfont icon-setting1',
                          children: [
                            {path: '/user/profile', name: '个人信息', menuShow: true},
                            {path: '/user/changepwd', name: '修改密码', menuShow: true}
                          ]
                        };
            this.privileges.push(endItem); 
          });
      },
      logout(){
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          let logoutParams = {};
          requestDoLogout(qs.stringify(logoutParams)).then(data => {
            sessionStorage.removeItem('access-user');
            // axios.defaults.headers.dagger_token = null;
            this.$router.push('/login');
          });
        }).catch(() => {

        });
      },
      setUser () {
        var user = sessionStorage.getItem('access-user');
        if (user) {
          user = JSON.parse(user);
          this.sysUserName = user.userName || '';
        }
      }
    },
    mounted() {
      this.getCurrentPrivilege ();
      this.setUser ();
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
      }
      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }
      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
