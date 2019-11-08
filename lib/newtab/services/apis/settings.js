"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _host = _interopRequireDefault(require("./_host.js"));

var settings = (0, _defineProperty2["default"])({
  "default": {
    p: "".concat(_host["default"], "user_settings/default"),
    // 默认配置，不要求用户登录
    m: 'GET'
  },
  profile: {
    p: "".concat(_host["default"], "user_settings/profile"),
    // 用户的私有化配置，没有配置的情况下返回默认配置
    m: 'GET'
  }
}, "profile", {
  p: "".concat(_host["default"], "user_settings/profile"),
  // 更新用户的私有化配置，没有配置的情况下返回默认配置
  m: 'POST'
});
var _default = settings;
exports["default"] = _default;