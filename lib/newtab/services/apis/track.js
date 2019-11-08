"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./_host.js"));

var track = {
  get: {
    p: "".concat(_host["default"], "site_trackers/default"),
    m: "GET"
  }
};
var _default = track;
exports["default"] = _default;