"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var wallPaper = {
  random: {
    p: "".concat(_host["default"], "bg_pictures/random-one"),
    // 默认配置，不要求用户登录
    m: 'GET'
  }
};
var _default = wallPaper;
exports["default"] = _default;