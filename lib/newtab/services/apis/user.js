"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var user = {
  profile: {
    p: "".concat(_host["default"], "users/profile"),
    m: 'GET'
  },
  register: {
    p: "".concat(_host["default"], "users/register"),
    m: 'POST'
  },
  login: {
    p: "".concat(_host["default"], "login"),
    m: 'POST'
  },
  logout: {
    p: "".concat(_host["default"], "logout"),
    m: 'POST'
  }
};
var _default = user;
exports["default"] = _default;