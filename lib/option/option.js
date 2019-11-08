"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

new _vue["default"]({
  el: '#option',
  render: function render(h) {
    return h(_App["default"]);
  }
});