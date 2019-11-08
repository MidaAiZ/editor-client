"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var debounce = function debounce(fun, delay) {
  return function (agmts) {
    //获取函数的作用域和变量
    var that = this;
    var args = agmts;
    clearTimeout(fun.id); // 清除定时器

    fun.id = setTimeout(function () {
      fun.call(that, args);
    }, delay);
  };
};

var _default = debounce;
exports["default"] = _default;