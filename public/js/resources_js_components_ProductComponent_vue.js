"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ProductComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Helpers/SwalHelper */ "./resources/js/Helpers/SwalHelper.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ProductComponent",
  created: function created() {
    this.fetch();
  },
  components: {},
  mounted: function mounted() {},
  data: function data() {
    return {
      products: [],
      base_url: base_url,
      addForm: {},
      editForm: {},
      form: {},
      searchTerm: '',
      addFormErrors: {},
      editFormErrors: {}
    };
  },
  methods: {
    fetch: function fetch() {
      var _this = this;
      axios.get(base_url + 'api/products').then(function (response) {
        _this.products = response.data.products;
      })["catch"](function (error) {
        _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no data loaded');
      });
    },
    storeMethod: function storeMethod(FormData) {
      var _this2 = this;
      axios.post(base_url + 'api/products/', FormData).then(function (response) {
        response.data.product ? _this2.products.push(response.data.product) : null;
        _this2.addFormErrors = response.data.errors;
      })["catch"](function (error) {
        _this2.addFormErrors = error.response.data.errors;
      });
    },
    editMethod: function editMethod(data) {
      this.editForm = data;
      this.editFormErrors = null;
    },
    updateMethod: function updateMethod(FormData) {
      var _this3 = this;
      axios.put(base_url + 'api/products/' + FormData.id, FormData).then(function (response) {
        if (response.data) {
          Object.assign(FormData, response.data.product);
        }
      })["catch"](function (error) {
        _this3.editFormErrors = error.response.data.errors;
        _this3.fetch();
      });
    },
    deleteMethod: function deleteMethod(id) {
      var _this4 = this;
      if (id) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this setting!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.isConfirmed) {
            axios["delete"](base_url + 'api/products/' + id).then(function (response) {
              _this4.products = _this4.products.filter(function (product) {
                return product.id !== id;
              });
              SwalHelper.successWithMessage(response.data.message);
            })["catch"](function (error) {
              SwalHelper.errorWithMessage(error.response.data.message);
            });
          }
        });
      }
    },
    importExcelProducts: function importExcelProducts() {
      var _this5 = this;
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this setting!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.isConfirmed) {
          var formData = new FormData();
          formData.append('file', _this5.$refs.select_products_file.files[0]);
          axios.post(base_url + 'api/products/import_excel', formData).then(function (response) {
            _this5.fetch();
            SwalHelper.successWithMessage('Import completed successfully');
          })["catch"](function (error) {
            SwalHelper.errorWithMessage(error.response.data.message);
          });
        }
      });
    },
    exportExcelProducts: function exportExcelProducts() {
      axios.get(base_url + 'api/products/export_excel').then(function (response) {
        // this.products = response.data.products;
      })["catch"](function (error) {
        _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no data loaded');
      });
    }
  },
  computed: {
    ProductsSearchFilter: function ProductsSearchFilter() {
      var _this6 = this;
      if (!this.searchTerm) {
        return this.products;
      } else {
        return this.products.filter(function (product) {
          return product.name.toLowerCase().includes(_this6.searchTerm.toLowerCase());
        });
      }
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h4", {
    staticClass: "card-title"
  }, [_vm._v("Products Table:")]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.searchTerm,
      expression: "searchTerm"
    }],
    staticClass: "input-group form-control",
    attrs: {
      type: "text",
      placeholder: "Search"
    },
    domProps: {
      value: _vm.searchTerm
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.searchTerm = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-2"
  }, [_c("div", {
    staticClass: "modal",
    attrs: {
      id: "addModel",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    attrs: {
      method: "post"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "name"
    }
  }, [_vm._v("\n                                                                        Name:\n                                                                    ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.name,
      expression: "addForm.name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Name:",
      maxlength: "100",
      required: ""
    },
    domProps: {
      value: _vm.addForm.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.addForm, "name", $event.target.value);
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "row pt-2"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "type"
    }
  }, [_vm._v("\n                                                                        Type:\n                                                                    ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.type,
      expression: "addForm.type"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Type:",
      maxlength: "50",
      required: ""
    },
    domProps: {
      value: _vm.addForm.type
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.addForm, "type", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "quantity"
    }
  }, [_vm._v("\n                                                                        Quantity:\n                                                                    ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.qty,
      expression: "addForm.qty"
    }],
    staticClass: "form-control",
    attrs: {
      type: "number"
    },
    domProps: {
      value: _vm.addForm.qty
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.addForm, "qty", $event.target.value);
      }
    }
  })])])])])])]), _vm._v(" "), _vm.addFormErrors ? _c("div", {
    staticClass: "col-12"
  }, _vm._l(_vm.addFormErrors, function (error) {
    return _c("p", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(error))]);
  }), 0) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "col-12 dropzone-previews"
  })]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.storeMethod(_vm.addForm);
      }
    }
  }, [_vm._v("Add")])])])])]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      "data-bs-toggle": "modal",
      "data-bs-target": "#addModel"
    }
  }, [_vm._v("Add product")])]), _vm._v(" "), _c("div", {
    staticClass: "col-2"
  }, [_c("div", {
    staticClass: "float-end d-none d-md-inline-block"
  }, [_c("div", {
    staticClass: "dropdown card-header-dropdown"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "dropdown-menu dropdown-menu-end"
  }, [_c("a", {
    staticClass: "dropdown-item",
    attrs: {
      download: "products.xlsx",
      href: "/api/products/export_excel"
    }
  }, [_c("button", {
    staticClass: "btn btn-warning btn-sm",
    on: {
      click: _vm.exportExcelProducts
    }
  }, [_vm._v("Export")])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item",
    attrs: {
      href: ""
    }
  }, [_vm._v("\n                                            Import\n                                            "), _c("input", {
    ref: "select_products_file",
    staticClass: "form-control btn btn-sm",
    attrs: {
      type: "file",
      name: "select_products_file",
      accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    }
  })]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item"
  }, [_c("input", {
    staticClass: "btn btn-info",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.importExcelProducts.apply(null, arguments);
      }
    }
  })]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item",
    attrs: {
      href: "#"
    }
  }, [_vm._v("Download Report")])])])])])]), _vm._v(" "), _c("p", {
    staticClass: "card-title-desc"
  }), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered dt-responsive nowrap",
    staticStyle: {
      "border-collapse": "collapse",
      "border-spacing": "0",
      width: "100%"
    },
    attrs: {
      id: "datatable"
    }
  }, [_vm._m(2), _vm._v(" "), _c("tbody", _vm._l(_vm.ProductsSearchFilter, function (product, index) {
    return _c("tr", {
      key: product.id
    }, [_c("td", [_vm._v(" " + _vm._s(index))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(product.name))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(product.type))]), _vm._v(" "), _c("td", [product.qty !== 0 ? _c("p", {
      staticClass: "text-success"
    }, [_vm._v(_vm._s(product.qty))]) : _c("p", {
      staticClass: "text-danger"
    }, [_vm._v("None")])]), _vm._v(" "), _c("td", [_c("button", {
      staticClass: "btn btn-primary",
      attrs: {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editModel"
      },
      on: {
        click: function click($event) {
          return _vm.editMethod(product);
        }
      }
    }, [_vm._v("Edit")]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-warning",
      on: {
        click: function click($event) {
          return _vm.deleteMethod(product.id);
        }
      }
    }, [_vm._v(" Delete ")])])]);
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "modal",
    attrs: {
      id: "editModel",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(3), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    attrs: {
      method: "post"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "name"
    }
  }, [_vm._v("\n                                                                Name:\n                                                            ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.name,
      expression: "editForm.name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Name:",
      maxlength: "100",
      required: ""
    },
    domProps: {
      value: _vm.editForm.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.editForm, "name", $event.target.value);
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "row pt-2"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "type"
    }
  }, [_vm._v("\n                                                                Type:\n                                                            ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.type,
      expression: "editForm.type"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Type:",
      maxlength: "50",
      required: ""
    },
    domProps: {
      value: _vm.editForm.type
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.editForm, "type", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "quantity"
    }
  }, [_vm._v("\n                                                                Quantity:\n                                                            ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.qty,
      expression: "editForm.qty"
    }],
    staticClass: "form-control",
    attrs: {
      type: "number"
    },
    domProps: {
      value: _vm.editForm.qty
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.editForm, "qty", $event.target.value);
      }
    }
  })])])])])])]), _vm._v(" "), _vm.editFormErrors ? _c("div", {
    staticClass: "col-12"
  }, _vm._l(_vm.editFormErrors, function (error) {
    return _c("p", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(error))]);
  }), 0) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.updateMethod(_vm.editForm);
      }
    }
  }, [_vm._v("Update")])])])])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Products :")]), _vm._v(" "), _c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("a", {
    staticClass: "text-reset dropdown-btn",
    attrs: {
      href: "#",
      "data-bs-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_c("span", {
    staticClass: "text-muted"
  }, [_vm._v("Report"), _c("i", {
    staticClass: "mdi mdi-chevron-down ms-1"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("ID")]), _vm._v(" "), _c("th", [_vm._v("Name")]), _vm._v(" "), _c("th", [_vm._v("Type")]), _vm._v(" "), _c("th", [_vm._v("Quantity")]), _vm._v(" "), _c("th", [_vm._v("Action")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Edit Products :")]), _vm._v(" "), _c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/Helpers/SwalHelper.js":
/*!********************************************!*\
  !*** ./resources/js/Helpers/SwalHelper.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SwalHelper = /*#__PURE__*/function () {
  function SwalHelper() {
    _classCallCheck(this, SwalHelper);
  }
  _createClass(SwalHelper, [{
    key: "success",
    value: function success() {
      Swal.fire({
        title: 'success!',
        text: 'Successfully Done!',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        willClose: true,
        showCloseButton: false,
        showCancelButton: false,
        toast: true
      });
    }
  }, {
    key: "alert",
    value: function alert() {
      Swal.fire({
        title: 'alert!',
        icon: 'alert',
        text: 'Are you sure?!',
        timer: 1000,
        timerProgressBar: true
      });
    }
  }, {
    key: "error",
    value: function error() {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 1000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warning",
    value: function warning() {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: 'Oops Wrong!',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "Image_validation",
    value: function Image_validation() {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Uploaded image big than 2MB!',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "exist",
    value: function exist() {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: 'This Item is exist',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "successWithMessage",
    value: function successWithMessage(message) {
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "errorWithMessage",
    value: function errorWithMessage(message) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warningWithMessage",
    value: function warningWithMessage(message) {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "successWithTitleAndMessage",
    value: function successWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "errorWithTitleAndMessage",
    value: function errorWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warningWithTitleAndMessage",
    value: function warningWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }]);
  return SwalHelper;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwalHelper = new SwalHelper());

/***/ }),

/***/ "./resources/js/components/ProductComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/ProductComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true& */ "./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true&");
/* harmony import */ var _ProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ProductComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "9e91ef8e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ProductComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ProductComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/ProductComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductComponent_vue_vue_type_template_id_9e91ef8e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ProductComponent.vue?vue&type=template&id=9e91ef8e&scoped=true&");


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