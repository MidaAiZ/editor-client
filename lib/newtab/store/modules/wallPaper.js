"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mutationsType = require("./mutations-type.js");

var _wallPaperStorage = require("../../utils/wallPaperStorage.js");

var _mutations;

var state = {
  wallPaperUrl: '',
  wallPaperLoading: false,
  wallPaperSrc: JSON.parse(localStorage.getItem("storageWallPaper")) ? JSON.parse(localStorage.getItem("storageWallPaper")).img : require('../../../../static/defaultWallPapers/bg.jpg')
}; // getters

var getters = {}; // actions

var actions = {
  getNewWallPaper: function getNewWallPaper(_ref) {
    var commit;
    return _regenerator["default"].async(function getNewWallPaper$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            (0, _wallPaperStorage.getUnsplashWallPaper)(function (src) {
              commit(_mutationsType.SET_WALLPAPER, src);
              commit(_mutationsType.SET_WALLPAPERLOADING, false);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_WALLPAPERLOADING, function (state, loading) {
  state.wallPaperLoading = loading;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_WALLPAPER, function (state, src) {
  state.wallPaperSrc = src;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;
