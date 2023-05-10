"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Messages_Group_MessageComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "GroupMessageComponent",
  created: function created() {
    this.fetchUsers();
  },
  components: {},
  data: function data() {
    return {
      base_url: base_url,
      auth_user: auth_user,
      users: {},
      message: '',
      username: '',
      chat: {
        messages: [],
        users: [],
        colors: [],
        times: []
      },
      messages: [],
      channelName: 'chat',
      typing: '',
      numberOfUsers: 0
    };
  },
  mounted: function mounted() {
    var _this = this;
    Echo["private"]('chat').listen('ChatEvent', function (e) {
      //incoming message
      _this.sendMessage(e.username, e.message, 'danger', _this.getTime());
    }).listenForWhisper('typing', function (e) {
      if (e.message !== '' && e.message.length !== 0) {
        _this.typing = e.username + ' typing...';
      } else {
        _this.typing = '';
      }
    });
    Echo.join('chat').here(function (users) {
      _this.numberOfUsers = users.length;
    }).joining(function (user) {
      _this.numberOfUsers += 1;
    }).leaving(function (user) {
      _this.numberOfUsers -= 1;
    }).error(function (error) {
      console.error(error);
    });
  },
  methods: {
    fetchUsers: function fetchUsers() {
      var _this2 = this;
      axios.get(base_url + 'api/users').then(function (response) {
        _this2.users = response.data.users;
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    },
    sendMessage: function sendMessage(username, message, color, time) {
      this.chat.users.push(username);
      this.chat.messages.push(message);
      this.chat.colors.push(color);
      this.chat.times.push(time);
    },
    storeMethod: function storeMethod(message) {
      var _this3 = this;
      if (message === '' && message.length === 0) {
        return;
      }
      this.sendMessage('You', message, 'success', this.getTime());
      var formData = new FormData();
      formData.append('message', message);
      axios.post(base_url + 'api/messages/', formData).then(function (response) {
        _this3.typing = '';
        _this3.message = '';
      })["catch"](function (error) {
        console.log(error.response.data);
      });
    },
    getTime: function getTime() {
      var time = new Date();
      return time.getDate() + ':' + time.getHours() + ':' + time.getMinutes();
    }
  },
  computed: {},
  watch: {
    message: function message() {
      Echo["private"]('chat').whisper('typing', {
        username: this.auth_user.name,
        message: this.message
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "offset-4 col-4 offset-sm-1 col-sm-10"
  }, [_c("li", {
    staticClass: "list-group-item active"
  }, [_c("div", {
    staticClass: "row"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "col-3"
  }, [_c("p", [_vm._v("#Users:"), _c("span", {
    staticClass: "badge badge-pill badge-danger"
  }, [_vm._v(" " + _vm._s(_vm.numberOfUsers))])])])])]), _vm._v(" "), _c("div", {
    staticClass: "badge badge-pill badge-soft-danger"
  }, [_vm._v(_vm._s(_vm.typing))]), _vm._v(" "), _c("ul", {
    staticClass: "list-group"
  }, _vm._l(_vm.chat.messages, function (message, index) {
    return _c("message", {
      key: message.index,
      attrs: {
        message: message,
        color: _vm.chat.colors[index],
        user: _vm.chat.users[index],
        time: _vm.chat.times[index]
      }
    });
  }), 1), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.message,
      expression: "message"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Type your message here..."
    },
    domProps: {
      value: _vm.message
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.storeMethod(_vm.message);
      },
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.message = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("br")])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-9"
  }, [_c("p", [_vm._v("Chat Room")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Messages/Group/MessageComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Messages/Group/MessageComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true& */ "./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true&");
/* harmony import */ var _MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "423a7ee4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Messages/Group/MessageComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MessageComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageComponent_vue_vue_type_template_id_423a7ee4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Messages/Group/MessageComponent.vue?vue&type=template&id=423a7ee4&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);