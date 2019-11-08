"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _sitesCategories = _interopRequireDefault(require("../../services/apis/sitesCategories.js"));

var _index = _interopRequireDefault(require("../../services/index.js"));

var _localSave = require("../../utils/localSave.js");

var _index2 = _interopRequireDefault(require("../../../../static/locale/index.js"));

var _mutationsType = require("./mutations-type.js");

var _defaultOpt = require("../../utils/defaultOpt.js");

var _mutations;

var state = {
  categories: localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : _defaultOpt.defaultCategories // currentCid: null

}; // getters

var getters = {} //   test: 1,
// actions
;
var actions = {
  getCategories: function getCategories(_ref) {
    var commit, _ref2, data;

    return _regenerator["default"].async(function getCategories$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_sitesCategories["default"]["default"]));

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            // console.log(data, '分类')
            (0, _localSave.localSave)('categories', data.data);
            commit('SET_CATEGORIES', data.data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_CATEGORIES, function (state, categories) {
  // 设置网站分类
  state.categories = categories;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.ADD_SEARCH_CATE, function (state) {
  state.categories = [{
    cid: 'search',
    index: 'search',
    title: "搜索"
  }];
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.DELETE_SEARCH_CATE, function (state) {
  var arr = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : _defaultOpt.defaultCategories;
  state.categories = arr;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;