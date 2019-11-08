"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var upload = {
  getToken: {
    p: "".concat(_host["default"], "upload_token"),
    m: "GET"
  }
};
var _default = upload;
exports["default"] = _default;