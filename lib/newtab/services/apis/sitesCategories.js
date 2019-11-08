"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var sitesCategories = {
  "default": {
    p: "".concat(_host["default"], "site_categories"),
    // 默认网站分类
    m: 'GET'
  },
  getSitesInCategory: {
    p: "".concat(_host["default"], "sites"),
    // 获取某一分类内的网站
    m: 'GET'
  },
  search: {
    p: "".concat(_host["default"], "sites"),
    // 搜索某一网站 接收参数{keyword}
    m: 'GET'
  }
};
var _default = sitesCategories;
exports["default"] = _default;