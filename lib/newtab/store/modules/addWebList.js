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
  currentSiteList: [],
  pageNum: 1,
  pageSize: 20,
  disableLoad: false,
  searchSiteIptValue: '',
  // 搜索站点时输入框输入的内容
  loading: false // currentCid: null

}; // getters

var getters = {} //   test: 1,
// actions
;
var actions = {
  getSitesInCategory: function getSitesInCategory(_ref, payload) {
    var commit, _ref2, data;

    return _regenerator["default"].async(function getSitesInCategory$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_sitesCategories["default"].getSitesInCategory, payload));

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            commit('SET_LOADING', false); // localSave('categories', data.data)

            commit('SET_SITES_CATEGORY', data.data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  loadMore: function loadMore(_ref3, payload) {
    var state, commit, _ref4, data, arr, pN;

    return _regenerator["default"].async(function loadMore$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            state = _ref3.state, commit = _ref3.commit;
            _context2.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_sitesCategories["default"].getSitesInCategory, payload));

          case 3:
            _ref4 = _context2.sent;
            data = _ref4.data;
            commit('SET_LOADING', false);

            if (data.code === 'Success') {
              arr = state.currentSiteList.concat(data.data); // localSave('categories', data.data)

              commit('SET_SITES_CATEGORY', arr);
              pN = state.pageNum + 1;
              commit('SET_SITES_PAGE', pN);

              if (data.data.length === 0) {
                commit('DIS_AUTO_LOAD', true);
              }
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  searchSite: function searchSite(_ref5, payload) {
    var commit, _ref6, data;

    return _regenerator["default"].async(function searchSite$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref5.commit;
            _context3.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_sitesCategories["default"].search, payload));

          case 3:
            _ref6 = _context3.sent;
            data = _ref6.data;
            // localSave('categories', data.data)
            commit('SET_SITES_CATEGORY', data.data);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
}; // mutationss

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_LOADING, function (state, loading) {
  state.loading = loading;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.DIS_AUTO_LOAD, function (state, disableLoad) {
  state.disableLoad = disableLoad;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SITES_PAGE, function (state, pageNum) {
  state.pageNum = pageNum;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SITES_CATEGORY, function (state, currentSiteList) {
  // 设置网站分类
  state.currentSiteList = currentSiteList;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SEARCH_SITES_VALUE, function (state, value) {
  state.searchSiteIptValue = value;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;