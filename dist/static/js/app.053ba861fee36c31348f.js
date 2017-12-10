webpackJsonp([2],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bus_js__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'home',
  created() {
    __WEBPACK_IMPORTED_MODULE_0__bus_js__["a" /* bus */].$on('setUserName', text => {
      this.sysUserName = text;
    });
  },
  data() {
    return {
      sysUserName: '',
      sysUserAvatar: '',
      collapsed: false
    };
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
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    logout() {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('access-user');
        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.defaults.headers.dagger_token = null;

        _this.$router.push('/login');
      }).catch(() => {});
    }
  },
  mounted() {
    var user = sessionStorage.getItem('access-user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.userName || '';
    }
  }
});

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_api__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      filters: {
        privilegeName: ''
      },
      total: 0,
      page: 1,
      loading: false,
      privileges: [],
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        privilege_name: [{ required: true, message: '请输入权限名', trigger: 'blur' }],
        privilege_type: [{ required: true, message: '请输入权限类型', trigger: 'blur' }],
        privilege_dec: [{ required: true, message: '请输入权限描述', trigger: 'blur' }]
      },
      addForm: {
        privilege_name: '',
        privilege_dec: '',
        privilege_type: ''
      }
    };
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

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_api__["d" /* requestDoQueryPrivileges */])(para).then(res => {
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
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;

          let para = {
            privilegeName: this.addForm.privilege_name,
            privilegeDec: this.addForm.privilege_dec,
            privilegeType: this.addForm.privilege_type
          };
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_api__["e" /* requestDoAddPrivileges */])(__WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify(para)).then(res => {
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
    }
  },
  mounted() {
    this.getPrivileges();
  }
});

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      filters: {
        roleName: ''
      },
      total: 0,
      page: 1,
      loading: false,
      roles: []
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getRoles();
    },
    //状态显示转换
    formatStatus: function (row, column) {
      return row.status == 'ENABLED' ? '启用' : '不启用';
    },
    //获取用户列表
    getRoles: function () {
      let para = {
        // roleName: this.filters.roleName
      };
      this.loading = true;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_api__["f" /* requestDoQueryRoles */])(para).then(res => {
        this.total = res.data_count;
        this.roles = res.data_collect;
        this.loading = false;
        //NProgress.done();
      });
    }
  },
  mounted() {
    this.getRoles();
  }
});

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import sockjs from 'sockjs';
// import stomp from 'stomp';


// export default {
//   data() {
//     return {

//     }
//   },
//   methods: {
//     initWebSocket(){
//       var socket = new SockJS("http://localhost:8100/daggerwebsocket");
//       var ws = Stomp.over(socket);

//       ws.connect({}, function(frame) {
//           ws.subscribe("/daggerbroker/test", function(event) {
//               console.log(event);
//           });
//       }, function(frame) {

//           console.log(frame);
//           console.error(new Date() + 'websocket失去连接');
//       });
//     }
//   },
//   mounted() {
//     this.initWebSocket();
//   }
// }

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qs__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      logining: false,
      user: {
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        newPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      },
      checked: true
    };
  },
  methods: {
    onSubmit() {
      this.$refs.UserForm.validate(valid => {
        if (valid) {
          this.logining = true;

          var currentUser = sessionStorage.getItem('access-user');
          var userId = -1;
          if (currentUser) {
            currentUser = JSON.parse(currentUser);
            userId = currentUser.userId;
          }

          var changeParams = { userId: userId, password: this.user.newPwd };
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_api__["b" /* requestDoChangePwd */])(__WEBPACK_IMPORTED_MODULE_1_qs___default.a.stringify(changeParams)).then(data => {
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
});

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_util__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_api__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_qs__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      filters: {
        name: ''
      },
      total: 0,
      page: 1,
      loading: false,
      sels: [],
      users: [],
      roleloading: false,
      rolesels: [],
      roletotal: 0,
      rolepage: 1,
      roles: [],
      editLoading: false,
      editFormRules: {
        nick_name: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        description: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      editForm: {
        user_id: 0,
        nick_name: ''
      },
      editFormVisible: false,
      roleFormVisible: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUser();
    },
    handleRoleCurrentChange(val) {
      this.rolepage = val;
      this.getRole();
    },
    batchDeleteUsers: function () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        let para = { ids: ids };
        console.log(para);
        // reqBatchDeleteBook(para).then((res) => {
        //   this.loading = false;
        //   this.$message({
        //     message: '删除成功',
        //     type: 'success'
        //   });
        //   this.getUser();
        // });
      }).catch(() => {});
    },
    showEditDialog: function (index, row) {
      console.log("editForm");
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    editSubmit: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);

            reqEditBook(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getBooks();
            });
          });
        }
      });
    },
    showRoleDialog: function (index, row) {
      this.roleFormVisible = true;
      this.roleForm = Object.assign({}, row);
      this.getRoles(row);
    },
    selsRole: function (val) {
      console.log(val.role_id);
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //性别显示转换
    formatGender: function (row, column) {
      return row.gender == 'MALE' ? '男' : '女';
    },
    //获取用户列表
    getUser: function () {
      let para = {
        // name: this.filters.name
      };
      this.loading = true;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_api__["g" /* requestDoQueryUsers */])(para).then(res => {
        this.total = res.data_count;
        this.users = res.data_collect;
        this.loading = false;
      });
    },
    //获取角色列表
    getRoles: function (row) {
      let para = {
        // roleName: this.filters.roleName
      };
      this.roleloading = true;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_api__["f" /* requestDoQueryRoles */])(__WEBPACK_IMPORTED_MODULE_2_qs___default.a.stringify(para)).then(res => {
        this.roletotal = res.data_count;
        this.roles = res.data_collect;
        this.roleloading = false;

        let userPara = { userId: row.user_id };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_api__["h" /* requestDoQueryUserRoles */])(__WEBPACK_IMPORTED_MODULE_2_qs___default.a.stringify(userPara)).then(res => {
          console.log(userPara);
          var currentRow = res.data_collect;
          this.roles.forEach(row => {
            if (row.role_id == res.data_collect.role_id) {
              this.$refs.rolesTable.setCurrentRow(row);
            }
          });
        });
      });
    }
  },
  mounted() {
    this.getUser();
  }
});

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qs__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      logining: false,
      user: {
        account: '',
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }]
      },
      checked: true
    };
  },
  methods: {
    onSubmit() {
      this.$refs.UserForm.validate(valid => {
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
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_api__["c" /* requestDoUpdateUser */])(__WEBPACK_IMPORTED_MODULE_1_qs___default.a.stringify(formParams)).then(data => {
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
  }
});

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/**
 * Created by jerry on 2017/4/14.
 */


var bus = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]();

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by jerry on 2017/4/14.
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  let l = len - (s + '').length;
  for (var i = 0; i < l; i++) {
    s = '0' + s;
  }
  return s;
};

/* unused harmony default export */ var _unused_webpack_default_export = ({
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    var context = '';
    if (r != null) {
      context = r[2];
    }
    reg = null;
    r = null;
    return context === null || context === '' || context === 'undefined' ? '' : context;
  },
  formatDate: {

    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);break;
            case 'M':
              _date.setMonth(_int - 1);break;
            case 'd':
              _date.setDate(_int);break;
            case 'h':
              _date.setHours(_int);break;
            case 'm':
              _date.setMinutes(_int);break;
            case 's':
              _date.setSeconds(_int);break;
          }
        }
        return _date;
      }
      return null;
    }

  }

});

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_iconfont_css__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_styles_main_scss__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_styles_main_scss__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.








// import Mock from './mock'
// Mock.init()

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_element_ui___default.a);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/**
 * Created by jerry on 2017/4/13.
 */


let base = '';
let base_user_dir = '/dagger';
// let base_user_dir = 'http://localhost:8100'


// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

const reqSaveUserProfile = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base}/user/profile`, params).then(res => res.data);
};
/* unused harmony export reqSaveUserProfile */


// export const reqGetUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

const reqGetBookListPage = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base}/book/list`, { params: params });
};
/* unused harmony export reqGetBookListPage */


const reqDeleteBook = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base}/book/delete`, { params: params });
};
/* unused harmony export reqDeleteBook */


const reqEditBook = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base}/book/edit`, { params: params });
};
/* unused harmony export reqEditBook */


const reqBatchDeleteBook = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base}/book/batchdelete`, { params: params });
};
/* unused harmony export reqBatchDeleteBook */


const reqAddBook = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base}/book/add`, { params: params });
};
/* unused harmony export reqAddBook */


const requestDoLogin = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base_user_dir}/login/doin`, params, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
      }).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = requestDoLogin;


const requestDoUpdateUser = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base_user_dir}/usermanage/doupdate`, params, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
      }).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = requestDoUpdateUser;


const requestDoChangePwd = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base_user_dir}/usermanage/dochangepwd`, params, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
      }).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = requestDoChangePwd;


const requestDoQueryUsers = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base_user_dir}/usermanage/doquery`, params).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = requestDoQueryUsers;


const requestDoQueryRoles = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base_user_dir}/rolemanage/doqueryroles`, params).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["f"] = requestDoQueryRoles;


const requestDoQueryUserRoles = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base_user_dir}/rolemanage/doqueryrolebyuser`, params, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
      }).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["h"] = requestDoQueryUserRoles;


const requestDoQueryPrivileges = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${base_user_dir}/privilegemanage/queryprivileges`, params).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = requestDoQueryPrivileges;


const requestDoAddPrivileges = params => {
      return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${base_user_dir}/privilegemanage/doaddprivilege`, params, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
      }).then(res => res.data);
};
/* harmony export (immutable) */ __webpack_exports__["e"] = requestDoAddPrivileges;


/***/ }),

/***/ 184:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 195:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAMAAACPWYlDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTY0QkU5RjdCRDdCMTFFNzk3QzRFNkE5MUZBODE0MTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTY0QkU5RjhCRDdCMTFFNzk3QzRFNkE5MUZBODE0MTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NjRCRTlGNUJEN0IxMUU3OTdDNEU2QTkxRkE4MTQxMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NjRCRTlGNkJEN0IxMUU3OTdDNEU2QTkxRkE4MTQxMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PokMrpoAAADMUExURf+KAP/+/P+3Yv+QDv/+/f+3Y/+1Xf+5Zv+6aP+4ZP+0W/+TFP/kxP+1Xv+mPf/ZrP+0XP+LAv/pzv+5Z/+KAf/hvv+rSP/kxf+vUP+aI/+2X/+tTf+YH//Nkf/ar/+6af/Ce/+4Zf/05//Ih/+sS/+UFf/Mj//Yq/+SEf/Wpf/79v/z5P+VF/+TE//u2v+zWv+uT//Nk/+VGP+9cP+sSv+jN//Jiv/Zrf/16f/w3//9+//26//et/+ZIP/QmP+NBv+OCf+PCv/69f///zZGOK8AAABEdFJOU/////////////////////////////////////////////////////////////////////////////////////////8AcdKPEgAAAO1JREFUeNrM1UUWAjEQBNAKg7u7u7u73P9ODAzBpXsDZP/fG6mqYMc8+BKocEG/wwRLDHlgtkKa99IOQDflAC8AZ43zWYOqaIwYwOtXBYL2KvnHtaCdFBVklZMwU6ORAElcgN5JElfhm5Sl8BHTmvQTxE28cxLAROxD0fNR3BXItZaiXSiRGheynR+rTqtoMyJBXtA6PR5IERW0EdiGpXAI2mrMPVBiR2EUJGCDYtfrXohnwLUIqdF6Id4MmSbcgr58hmfi7VRqwiro22p5FB/GWBMGxnpnDqDLmXsTsAmw7odePPCLG+ivwF6AAQCmZbmHtqZxzQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAATCAMAAADruNB/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBDQzMxQUFCRDdCMTFFNzkzNTNCNjJDQ0I4NjMxRkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBDQzMxQUJCRDdCMTFFNzkzNTNCNjJDQ0I4NjMxRkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMENDMzFBOEJEN0IxMUU3OTM1M0I2MkNDQjg2MzFGQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMENDMzFBOUJEN0IxMUU3OTM1M0I2MkNDQjg2MzFGQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmy10/8AAAAGUExURf+KAP///7pLnCIAAAACdFJOU/8A5bcwSgAAAItJREFUeNrsk90OgCAIhfH9X7rFOnBAcG25usmtdAqfhx9l7Bqyj6Tjvu35n7ZxWhw2IP2WpMsIS3KBDCIEW+jQc7gbRcJkMoiEbXJhTX5zORUkc8E6pCAjPLCCZOKDpl7MaKOTKbrpjipPC+GsH53V1S71E9Uu5D/3vJfl0WsJrfLRu/tJL5MOAQYAvYUELzFXdpcAAAAASUVORK5CYII="

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(4)(
  /* script */
  null,
  /* template */
  __webpack_require__(213),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(189)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(124),
  /* template */
  __webpack_require__(212),
  /* scopeId */
  "data-v-b29abe60",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(187)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(125),
  /* template */
  __webpack_require__(208),
  /* scopeId */
  "data-v-6da8e166",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(185)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(206),
  /* scopeId */
  "data-v-4ef24ed4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(186)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(207),
  /* scopeId */
  "data-v-6a14edf6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(210),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(184)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(129),
  /* template */
  __webpack_require__(205),
  /* scopeId */
  "data-v-18505ce1",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(209),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 205:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("用户列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    staticStyle: {
      "min-width": "240px"
    },
    attrs: {
      "placeholder": "姓名"
    },
    model: {
      value: (_vm.filters.name),
      callback: function($$v) {
        _vm.$set(_vm.filters, "name", $$v)
      },
      expression: "filters.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.getUser
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.users,
      "highlight-current-row": ""
    },
    on: {
      "selection-change": _vm.selsChange
    }
  }, [_c('el-table-column', {
    staticStyle: {
      "width": "5%"
    },
    attrs: {
      "type": "selection"
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "10%"
    },
    attrs: {
      "type": "user_id",
      "prop": "user_id"
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "nick_name",
      "label": "姓名",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "10%"
    },
    attrs: {
      "prop": "gender",
      "label": "性别",
      "formatter": _vm.formatGender,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "30%"
    },
    attrs: {
      "prop": "email",
      "label": "邮件",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showEditDialog(scope.$user_id, scope.row)
            }
          }
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showRoleDialog(scope.$user_id, scope.row)
            }
          }
        }, [_vm._v("角色")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.delUser(scope.$user_id, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    attrs: {
      "span": 24
    }
  }, [_c('el-button', {
    attrs: {
      "type": "danger",
      "disabled": this.sels.length === 0
    },
    on: {
      "click": _vm.batchDeleteUsers
    }
  }, [_vm._v("批量删除")]), _vm._v(" "), _c('el-pagination', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "layout": "prev, pager, next",
      "page-size": 10,
      "total": _vm.total
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "编辑",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.editFormVisible),
      callback: function($$v) {
        _vm.editFormVisible = $$v
      },
      expression: "editFormVisible"
    }
  }, [_c('el-form', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.editLoading),
      expression: "editLoading"
    }],
    ref: "editForm",
    attrs: {
      "model": _vm.editForm,
      "label-width": "100px",
      "rules": _vm.editFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "id",
      "prop": "user_id"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off",
      "readonly": ""
    },
    model: {
      value: (_vm.editForm.user_id),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "user_id", $$v)
      },
      expression: "editForm.user_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "姓名",
      "prop": "nick_name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.editForm.nick_name),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "nick_name", $$v)
      },
      expression: "editForm.nick_name"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.editFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.editLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.editSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "角色管理",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.roleFormVisible),
      callback: function($$v) {
        _vm.roleFormVisible = $$v
      },
      expression: "roleFormVisible"
    }
  }, [_c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.roleloading),
      expression: "roleloading"
    }],
    ref: "rolesTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.roles,
      "highlight-current-row": ""
    },
    on: {
      "current-change": _vm.selsRole
    }
  }, [_c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "type": "role_id",
      "prop": "role_id"
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "40%"
    },
    attrs: {
      "prop": "role_name",
      "label": "角色名",
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "layout": "prev, pager, next",
      "page-size": 10,
      "total": _vm.roletotal
    },
    on: {
      "current-change": _vm.handleRoleCurrentChange
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.roleFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.editLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.roleSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("角色列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    staticStyle: {
      "min-width": "240px"
    },
    attrs: {
      "placeholder": "角色名"
    },
    model: {
      value: (_vm.filters.roleName),
      callback: function($$v) {
        _vm.$set(_vm.filters, "roleName", $$v)
      },
      expression: "filters.roleName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.getRoles
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.roles,
      "highlight-current-row": ""
    }
  }, [_c('el-table-column', {
    staticStyle: {
      "width": "10%"
    },
    attrs: {
      "type": "role_id",
      "prop": "role_id"
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "role_name",
      "label": "名称",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "role_co",
      "label": "编号",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "30%"
    },
    attrs: {
      "prop": "role_desc",
      "label": "描述",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "status",
      "label": "状态",
      "formatter": _vm.formatStatus,
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "layout": "prev, pager, next",
      "page-size": 10,
      "total": _vm.total
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 207:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("用户信息统计")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    staticStyle: {
      "min-width": "240px"
    },
    attrs: {
      "placeholder": "在线用户人数"
    },
    model: {
      value: (_vm.filters.onLineUser),
      callback: function($$v) {
        _vm.$set(_vm.filters, "onLineUser", $$v)
      },
      expression: "filters.onLineUser"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    staticStyle: {
      "min-width": "240px"
    },
    attrs: {
      "placeholder": "累计用户人数"
    },
    model: {
      value: (_vm.filters.totalUser),
      callback: function($$v) {
        _vm.$set(_vm.filters, "totalUser", $$v)
      },
      expression: "filters.totalUser"
    }
  })], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("权限列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    staticStyle: {
      "min-width": "240px"
    },
    attrs: {
      "placeholder": "权限名"
    },
    model: {
      value: (_vm.filters.privilegeName),
      callback: function($$v) {
        _vm.$set(_vm.filters, "privilegeName", $$v)
      },
      expression: "filters.privilegeName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.getPrivileges
    }
  }, [_vm._v("查询")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.showAddDialog
    }
  }, [_vm._v("新增")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.privileges,
      "highlight-current-row": ""
    }
  }, [_c('el-table-column', {
    staticStyle: {
      "width": "10%"
    },
    attrs: {
      "type": "privilege_id",
      "prop": "privilege_id"
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "privilege_name",
      "label": "名称",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "privilege_co",
      "label": "编号",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "30%"
    },
    attrs: {
      "prop": "privilege_dec",
      "label": "描述",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    staticStyle: {
      "width": "20%"
    },
    attrs: {
      "prop": "status",
      "label": "状态",
      "formatter": _vm.formatStatus,
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "layout": "prev, pager, next",
      "page-size": 10,
      "total": _vm.total
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.addFormVisible),
      callback: function($$v) {
        _vm.addFormVisible = $$v
      },
      expression: "addFormVisible"
    }
  }, [_c('el-form', {
    ref: "addForm",
    attrs: {
      "model": _vm.addForm,
      "label-width": "80px",
      "rules": _vm.addFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "权限名",
      "prop": "privilege_name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.addForm.privilege_name),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "privilege_name", $$v)
      },
      expression: "addForm.privilege_name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限类型",
      "prop": "privilege_type"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.addForm.privilege_type),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "privilege_type", $$v)
      },
      expression: "addForm.privilege_type"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限描述",
      "prop": "privilege_dec"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea",
      "rows": 8
    },
    model: {
      value: (_vm.addForm.privilege_dec),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "privilege_dec", $$v)
      },
      expression: "addForm.privilege_dec"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.addFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.addLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.addSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("设置")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("个人信息")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    ref: "UserForm",
    attrs: {
      "model": _vm.user,
      "rules": _vm.rules,
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "account",
      "label": "账号"
    }
  }, [_c('el-input', {
    attrs: {
      "disabled": ""
    },
    model: {
      value: (_vm.user.account),
      callback: function($$v) {
        _vm.$set(_vm.user, "account", $$v)
      },
      expression: "user.account"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "nickname",
      "label": "昵称"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.nickname),
      callback: function($$v) {
        _vm.$set(_vm.user, "nickname", $$v)
      },
      expression: "user.nickname"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "email",
      "label": "邮箱"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.email),
      callback: function($$v) {
        _vm.$set(_vm.user, "email", $$v)
      },
      expression: "user.email"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "default",
      "loading": _vm.logining
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("修改并保存")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("设置")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("修改密码")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    ref: "UserForm",
    attrs: {
      "model": _vm.user,
      "rules": _vm.rules,
      "label-width": "120px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "newPwd",
      "label": "新密码"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password"
    },
    model: {
      value: (_vm.user.newPwd),
      callback: function($$v) {
        _vm.$set(_vm.user, "newPwd", $$v)
      },
      expression: "user.newPwd"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "confirmPwd",
      "label": "确认新密码"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password"
    },
    model: {
      value: (_vm.user.confirmPwd),
      callback: function($$v) {
        _vm.$set(_vm.user, "confirmPwd", $$v)
      },
      expression: "user.confirmPwd"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "default",
      "loading": _vm.logining
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("提交")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "container"
  }, [_c('el-col', {
    staticClass: "topbar-wrap",
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "topbar-logo topbar-btn"
  }, [_c('a', {
    attrs: {
      "href": "/"
    }
  }, [_c('img', {
    staticStyle: {
      "padding-left": "8px"
    },
    attrs: {
      "src": __webpack_require__(195)
    }
  })])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.collapsed),
      expression: "!collapsed"
    }],
    staticClass: "topbar-logos"
  }, [_c('a', {
    attrs: {
      "href": "/"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "100%"
    },
    attrs: {
      "src": __webpack_require__(196)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "topbar-title"
  }, [_c('span', {
    staticStyle: {
      "font-size": "18px",
      "color": "#fff"
    }
  }, [_vm._v("Cloak管理系统")])]), _vm._v(" "), _c('div', {
    staticClass: "topbar-account topbar-btn"
  }, [_c('el-dropdown', {
    attrs: {
      "trigger": "click"
    }
  }, [_c('span', {
    staticClass: "el-dropdown-link userinfo-inner"
  }, [_c('i', {
    staticClass: "iconfont icon-user"
  }), _vm._v(" " + _vm._s(_vm.sysUserName) + "  "), _c('i', {
    staticClass: "iconfont icon-down"
  })]), _vm._v(" "), _c('el-dropdown-menu', {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c('el-dropdown-item', [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#555",
      "font-size": "14px"
    }
  }, [_vm._v("个人信息")])])], 1), _vm._v(" "), _c('el-dropdown-item', [_c('router-link', {
    attrs: {
      "to": '/user/changepwd'
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#555",
      "font-size": "14px"
    }
  }, [_vm._v("修改密码")])])], 1), _vm._v(" "), _c('el-dropdown-item', {
    attrs: {
      "divided": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.logout($event)
      }
    }
  }, [_vm._v("退出登录")])], 1)], 1)], 1)]), _vm._v(" "), _c('el-col', {
    staticClass: "main",
    attrs: {
      "span": 24
    }
  }, [_c('aside', {
    class: {
      showSidebar: !_vm.collapsed
    }
  }, [_c('div', {
    staticClass: "menu-toggle",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.collapse($event)
      }
    }
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.collapsed),
      expression: "!collapsed"
    }],
    staticClass: "iconfont icon-menufold"
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.collapsed),
      expression: "collapsed"
    }],
    staticClass: "iconfont icon-menuunfold"
  })]), _vm._v(" "), _c('el-menu', {
    attrs: {
      "default-active": "0",
      "router": "",
      "collapse": _vm.collapsed
    }
  }, [_vm._l((_vm.$router.options.routes), function(item, index) {
    return (item.menuShow) ? [(!item.leaf) ? _c('el-submenu', {
      attrs: {
        "index": index + ''
      }
    }, [_c('template', {
      slot: "title"
    }, [_c('i', {
      class: item.iconCls
    }), _c('span', {
      attrs: {
        "slot": "title"
      },
      slot: "title"
    }, [_vm._v(_vm._s(item.name))])]), _vm._v(" "), _vm._l((item.children), function(term) {
      return (term.menuShow) ? _c('el-menu-item', {
        key: term.path,
        class: _vm.$route.path == term.path ? 'is-active' : '',
        attrs: {
          "index": term.path
        }
      }, [_c('i', {
        class: term.iconCls
      }), _c('span', {
        attrs: {
          "slot": "title"
        },
        slot: "title"
      }, [_vm._v(_vm._s(term.name))])]) : _vm._e()
    })], 2) : (item.leaf && item.children && item.children.length) ? _c('el-menu-item', {
      class: _vm.$route.path == item.children[0].path ? 'is-active' : '',
      attrs: {
        "index": item.children[0].path
      }
    }, [_c('i', {
      class: item.iconCls
    }), _c('span', {
      attrs: {
        "slot": "title"
      },
      slot: "title"
    }, [_vm._v(_vm._s(item.children[0].name))])]) : _vm._e()] : _vm._e()
  })], 2)], 1), _vm._v(" "), _c('section', {
    staticClass: "content-container"
  }, [_c('div', {
    staticClass: "grid-content bg-purple-light"
  }, [_c('el-col', {
    staticClass: "content-wrapper",
    attrs: {
      "span": 24
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view')], 1)], 1)], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_c('b', [_vm._v("首页")])])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Dashboard__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Dashboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Dashboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_role_list__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_role_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_role_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_privilege_list__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_privilege_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_privilege_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_user_list__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_user_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_user_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_user_changepwd__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_user_changepwd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_user_changepwd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_user_profile__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_user_profile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_user_profile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_statistics_user__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_statistics_user___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_statistics_user__);














// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(218)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

let router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  // mode: 'history',
  routes: [{
    path: '/login',
    name: '登录',
    component: Login
  }, {
    path: '/',
    name: 'home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    redirect: '/dashboard',
    leaf: true, // 只有一个节点
    menuShow: true,
    iconCls: 'iconfont icon-home', // 图标样式class
    children: [{ path: '/dashboard', component: __WEBPACK_IMPORTED_MODULE_3__components_Dashboard___default.a, name: '首页', menuShow: true }]
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    name: '用户管理',
    menuShow: true,
    // leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-users', // 图标样式class
    children: [{ path: '/user/list', component: __WEBPACK_IMPORTED_MODULE_6__components_user_list___default.a, name: '用户列表', menuShow: true }]
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    name: '角色管理',
    menuShow: true,
    iconCls: 'iconfont icon-books',
    children: [{ path: '/role/list', component: __WEBPACK_IMPORTED_MODULE_4__components_role_list___default.a, name: '角色列表', menuShow: true }]
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    name: '权限管理',
    menuShow: true,
    iconCls: 'iconfont icon-books',
    children: [{ path: '/privilege/list', component: __WEBPACK_IMPORTED_MODULE_5__components_privilege_list___default.a, name: '权限列表', menuShow: true }]
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    name: '统计管理',
    menuShow: true,
    iconCls: 'iconfont icon-books',
    children: [{ path: 'statistics/user', component: __WEBPACK_IMPORTED_MODULE_9__components_statistics_user___default.a, name: '用户统计', menuShow: true }]
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a,
    name: '设置',
    menuShow: true,
    iconCls: 'iconfont icon-setting1',
    children: [{ path: '/user/profile', component: __WEBPACK_IMPORTED_MODULE_8__components_user_profile___default.a, name: '个人信息', menuShow: true }, { path: '/user/changepwd', component: __WEBPACK_IMPORTED_MODULE_7__components_user_changepwd___default.a, name: '修改密码', menuShow: true }]
  }]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user');
    next();
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'));
    if (!user) {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(188)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(123),
  /* template */
  __webpack_require__(211),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

},[133]);
//# sourceMappingURL=app.053ba861fee36c31348f.js.map