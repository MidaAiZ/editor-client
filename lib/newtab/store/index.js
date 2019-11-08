"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _addWebList = _interopRequireDefault(require("./modules/addWebList"));

var _homeWebList = _interopRequireDefault(require("./modules/homeWebList"));

var _settings = _interopRequireDefault(require("./modules/settings"));

var _user = _interopRequireDefault(require("./modules/user"));

var _locale = _interopRequireDefault(require("./modules/locale"));

var _wallPaper = _interopRequireDefault(require("./modules/wallPaper"));

var _drawersVis = _interopRequireDefault(require("./modules/drawersVis"));

var _engineList = _interopRequireDefault(require("./modules/engineList"));

var _categories = _interopRequireDefault(require("./modules/categories"));

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    addWebList: _addWebList["default"],
    homeWebList: _homeWebList["default"],
    settings: _settings["default"],
    user: _user["default"],
    locale: _locale["default"],
    wallPaper: _wallPaper["default"],
    drawersVis: _drawersVis["default"],
    engineList: _engineList["default"],
    categories: _categories["default"]
  }
});

exports["default"] = _default;