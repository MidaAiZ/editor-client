"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnsplashWallPaper = exports.setWallPaper = exports.storageWallPaper = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _localSave = require("./localSave.js");

var _index = _interopRequireDefault(require("../services/index.js"));

var _wallPaper = _interopRequireDefault(require("../services/apis/wallPaper.js"));

var storageWallPaper = function storageWallPaper(imgSrc, srcUrl, wallDomId, callBack) {
  //在本地存储中保存图片
  var storageWallPaper = JSON.parse(localStorage.getItem("storageWallPaper")) || {},
      storageFilesDate = storageWallPaper.date,
      date = new Date(),
      todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString(); // 检查数据，如果不存在或者数据过期，则创建一个本地存储

  if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
    setWallPaper(imgSrc, srcUrl, callBack);
  } else {
    // Use image from localStorage
    callBack(storageWallPaper.wallPaper);
  }
};

exports.storageWallPaper = storageWallPaper;

var setWallPaper = function setWallPaper(imgSrc, srcUrl, callBack) {
  (0, _localSave.saveImg)("storageWallPaper", srcUrl, callBack); // 将图片缓存在本地
};

exports.setWallPaper = setWallPaper;

var getUnsplashWallPaper = function getUnsplashWallPaper(callBack) {
  var _ref, data;

  return _regenerator["default"].async(function getUnsplashWallPaper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap((0, _index["default"])(_wallPaper["default"].random));

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          setWallPaper('Unsplash', data.data, callBack);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getUnsplashWallPaper = getUnsplashWallPaper;