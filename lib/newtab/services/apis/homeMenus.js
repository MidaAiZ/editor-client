"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var homeMenus = {
  "default": {
    p: "".concat(_host["default"], "default_menus/default"),
    // 默认首页添加网站
    m: 'GET'
  },
  addOne: {
    p: "".concat(_host["default"], "default_menus/default"),
    // 添加一个首页网站
    m: 'POST'
  },
  changeAll: {
    p: "".concat(_host["default"], "user_menus"),
    // 替换首页网站
    m: 'POST'
  },
  user_menu: {
    p: "".concat(_host["default"], "user_menus"),
    // 获取云端用户菜单
    m: 'GET'
  }
};
var _default = homeMenus;
exports["default"] = _default;