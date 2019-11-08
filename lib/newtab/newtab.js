"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _vue = _interopRequireDefault(require("vue"));

var _root = _interopRequireDefault(require("./root.vue"));

require("./theme.scss");

var _elementUi = _interopRequireDefault(require("element-ui"));

var _vuex = _interopRequireDefault(require("vuex"));

var _store = _interopRequireDefault(require("./store"));

var _vueAwesomeSwiper = _interopRequireDefault(require("vue-awesome-swiper"));

require("swiper/dist/css/swiper.css");

var _vuedraggable = _interopRequireDefault(require("vuedraggable"));

var _vueCropper = _interopRequireDefault(require("vue-cropper"));

var _vueResource = _interopRequireDefault(require("vue-resource"));

_vue["default"].use(_vuex["default"]);

_vue["default"].use(_elementUi["default"]);

_vue["default"].use(_vueAwesomeSwiper["default"]);

_vue["default"].use(_vuedraggable["default"]);

_vue["default"].use(_vueCropper["default"]);

_vue["default"].use(_vueResource["default"]);

new _vue["default"]({
  el: '#newtab',
  store: _store["default"],
  render: function render(h) {
    return h(_root["default"]);
  }
});