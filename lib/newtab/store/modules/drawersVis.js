"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mutationsType = require("./mutations-type.js");

var _mutations;

var state = {
  systemBarVis: false,
  settingVis: false,
  bookmarksAndHistory: false
}; // getters

var getters = {}; // actions

var actions = {}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SETTINGVIS, function (state, vis) {
  state.settingVis = vis;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SYSBARVIS, function (state, vis) {
  state.systemBarVis = vis;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_BMHIS, function (state, vis) {
  state.bookmarksAndHistory = vis;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;