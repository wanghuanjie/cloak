webpackJsonp([0],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(222)
__webpack_require__(223)

var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(219),
  /* template */
  __webpack_require__(224),
  /* scopeId */
  "data-v-4d865fc8",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
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

// import {requestLogin} from '../api/api';




//import NProgress from 'nprogress'
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      logining: false,
      account: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: true
    };
  },
  methods: {
    handleLogin() {
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {

          this.logining = true;
          //NProgress.start();

          var loginParams = { account: this.account.username, password: this.account.pwd };

          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_api__["a" /* requestDoLogin */])(__WEBPACK_IMPORTED_MODULE_2_qs___default.a.stringify(loginParams)).then(data => {
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
                account: data.data_collect.account,
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
              // axios.defaults.withCredentials=true;
              __WEBPACK_IMPORTED_MODULE_1_axios___default.a.defaults.headers.dagger_token = token; //需配合nginx代理

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
});

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(216)();
// imports


// module
exports.push([module.i, "body{background:#dfe9fb}", "", {"version":3,"sources":["/Users/mac/git-workspace/git_hub/cloak/src/components/Login.vue"],"names":[],"mappings":"AACA,KACE,kBAAoB,CACrB","file":"Login.vue","sourcesContent":["\nbody{\n  background: #DFE9FB;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(216)();
// imports


// module
exports.push([module.i, ".login-container[data-v-4d865fc8]{-webkit-border-radius:5px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin:160px auto;width:350px;padding:35px 35px 15px;background:#fff;border:1px solid #eaeaea;box-shadow:0 0 25px #cac6c6;background:-ms-linear-gradient(top,#fff,#6495ed);background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);background:-webkit-gradient(linear,0 0,0 100%,from(#b8c4cb),to(#f6f6f8));background:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#6495ed));background:-webkit-linear-gradient(top,#fff,#6495ed,#fff);background:-o-linear-gradient(top,#fff,#6495ed)}.login-container .title[data-v-4d865fc8]{margin:0 auto 40px;text-align:center;color:#505458}.login-container .remember[data-v-4d865fc8]{margin:0 0 35px}", "", {"version":3,"sources":["/Users/mac/git-workspace/git_hub/cloak/src/components/Login.vue"],"names":[],"mappings":"AAEA,kCACE,0BAA2B,AAC3B,kBAAmB,AACnB,uBAAwB,AACxB,4BAA6B,AAC7B,kBAAmB,AACnB,YAAa,AACb,uBAA6B,AAC7B,gBAAiB,AACjB,yBAA0B,AAC1B,4BAA6B,AAC7B,iDAAoD,AAEpD,qDAAwD,AAExD,yEAAiF,AAEjF,sEAA8E,AAE9E,0DAA8D,AAE9D,+CAAmD,CAEpD,AACD,yCACI,mBAA2B,AAC3B,kBAAmB,AACnB,aAAe,CAClB,AACD,4CACI,eAAyB,CAC5B","file":"Login.vue","sourcesContent":["\n@charset \"UTF-8\";\n.login-container[data-v-4d865fc8] {\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  -moz-border-radius: 5px;\n  background-clip: padding-box;\n  margin: 160px auto;\n  width: 350px;\n  padding: 35px 35px 15px 35px;\n  background: #fff;\n  border: 1px solid #eaeaea;\n  box-shadow: 0 0 25px #cac6c6;\n  background: -ms-linear-gradient(top, #fff, #6495ed);\n  /* IE 10 */\n  background: -moz-linear-gradient(top, #b8c4cb, #f6f6f8);\n  /*火狐*/\n  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#b8c4cb), to(#f6f6f8));\n  /*谷歌*/\n  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));\n  /* Safari 4-5, Chrome 1-9*/\n  background: -webkit-linear-gradient(top, #fff, #6495ed, #fff);\n  /*Safari5.1 Chrome 10+*/\n  background: -o-linear-gradient(top, #fff, #6495ed);\n  /*Opera 11.10+*/\n}\n.login-container .title[data-v-4d865fc8] {\n    margin: 0px auto 40px auto;\n    text-align: center;\n    color: #505458;\n}\n.login-container .remember[data-v-4d865fc8] {\n    margin: 0px 0px 35px 0px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(220);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(217)("6cdb7780", content, true);

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(221);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(217)("24ade180", content, true);

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "AccountFrom",
    staticClass: "demo-ruleForm login-container",
    attrs: {
      "model": _vm.account,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "0px"
    }
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v("系统登录")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text",
      "auto-complete": "off",
      "placeholder": "账号"
    },
    model: {
      value: (_vm.account.username),
      callback: function($$v) {
        _vm.$set(_vm.account, "username", $$v)
      },
      expression: "account.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "pwd"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "auto-complete": "off",
      "placeholder": "密码"
    },
    model: {
      value: (_vm.account.pwd),
      callback: function($$v) {
        _vm.$set(_vm.account, "pwd", $$v)
      },
      expression: "account.pwd"
    }
  })], 1), _vm._v(" "), _c('el-checkbox', {
    staticClass: "remember",
    attrs: {
      "checked": ""
    },
    model: {
      value: (_vm.checked),
      callback: function($$v) {
        _vm.checked = $$v
      },
      expression: "checked"
    }
  }, [_vm._v("记住密码")]), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "primary",
      "loading": _vm.logining
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleLogin($event)
      }
    }
  }, [_vm._v("登录")])], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=0.a5fdbea1485cc211941c.js.map