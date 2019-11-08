"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoIconFunc = exports.saveImg = exports.imgToBase64 = exports.localSave = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _index = _interopRequireDefault(require("../services/index.js"));

var _uploadImg = require("../services/uploadImg.js");

var _imgHost = _interopRequireDefault(require("../services/apis/imgHost.js"));

var localSave = function localSave(settingKey, settingValue) {
  var oldSetting = localStorage.getItem(settingKey) || "{}";
  var setting = Object.assign({}, JSON.parse(oldSetting), settingValue);
  localStorage.setItem(settingKey, JSON.stringify(setting)); // req
};

exports.localSave = localSave;

var imgToBase64 = function imgToBase64(srcUrl, callBack) {
  var imgDom = new Image();
  return new Promise(function (resolve) {
    imgDom.onload = function () {
      var imgCanvas = document.createElement("canvas"),
          imgContext = imgCanvas.getContext("2d"); // 确保canvas尺寸和图片一致

      imgCanvas.width = imgDom.width;
      imgCanvas.height = imgDom.height; // 在canvas中绘制图片

      imgContext.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height); // 将图片保存为Data URI

      var base64Src = imgCanvas.toDataURL("image/png"); // console.log(base64Src)

      resolve(base64Src);
    };

    imgDom.onerror = function () {
      resolve('');
    };

    imgDom.src = srcUrl;
  });
};

exports.imgToBase64 = imgToBase64;

var saveImg = function saveImg(key, srcUrl, callBack) {
  var imgDom = new Image(),
      date = new Date(),
      todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
  imgDom.src = srcUrl;

  imgDom.onload = function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d"); // 确保canvas尺寸和图片一致

    imgCanvas.width = imgDom.width;
    imgCanvas.height = imgDom.height; // 在canvas中绘制图片

    imgContext.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height); // 将图片保存为Data URI

    var storageImg = {};
    storageImg.img = imgCanvas.toDataURL("image/png");
    storageImg.date = todaysDate; // 将JSON保存到本地存储中

    try {
      localStorage.setItem("".concat(key), JSON.stringify(storageImg));
    } catch (e) {
      console.log("Storage failed: " + e);
    }

    callBack(storageImg.img);
  };
};

exports.saveImg = saveImg;

var NoIconFunc = function NoIconFunc(title, width, height) {
  var imgCanvas, imgContext, imgText, base64Src, src, imgObj;
  return _regenerator["default"].async(function NoIconFunc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // let imgDom = new Image();
          imgCanvas = document.createElement("canvas");
          imgContext = imgCanvas.getContext("2d"); // 确保canvas尺寸和图片一致

          imgCanvas.width = width;
          imgCanvas.height = height;
          imgContext.fillStyle = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)';
          ;
          imgContext.fillRect(0, 0, width, height);
          imgText = title.slice(0, 1);
          imgContext.fillStyle = "#fff";
          imgContext.font = "90px YaHei";
          imgContext.textAlign = 'center';
          imgContext.textBaseline = "middle";
          imgContext.fillText(imgText, width / 2, height / 2);
          base64Src = imgCanvas.toDataURL("image/png");
          _context.next = 16;
          return _regenerator["default"].awrap((0, _uploadImg.upBase64)(base64Src, function (key) {
            src = _imgHost["default"] + key;
          }, function () {
            console.log('上传失败');
          }));

        case 16:
          imgObj = {
            iconBase64: base64Src,
            iconSrc: src
          };
          return _context.abrupt("return", imgObj);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.NoIconFunc = NoIconFunc;