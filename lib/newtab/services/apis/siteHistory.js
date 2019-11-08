"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var siteHistory = {
  record: {
    p: "".concat(_host["default"], "view_histories"),
    // 打开一个网站时发送一个数据请求用来记录访问网站
    m: 'POST'
  }
};
var _default = siteHistory;
exports["default"] = _default;