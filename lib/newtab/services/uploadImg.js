"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadImgServer = exports.upBase64 = exports.Upload = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _index = _interopRequireDefault(require("./index.js"));

var _uploadToken = _interopRequireDefault(require("./apis/uploadToken.js"));

// import { fail } from "assert";
// import * as OSS from "ali-oss";
// var STS = OSS.STS;
var Upload = function Upload(f, notImageCb, successCb, failCb) {
  // notImageCb不是图片的回调函数 successCb上传成功的回调函数
  if (!f.type.match("image.*")) {
    // continue;
    console.log("所选内容不是图片");
    notImageCb();
  } else {
    var reader = new FileReader();

    reader.onload = function (theFile) {
      return function (e) {
        upBase64(e.target.result, successCb, failCb); // const newImg = dataURItoBlob(e.target.result);
        // const imgList = new UploadImgServer();
        // imgList.UploadImg(newImg, successCb, failCb);
      };
    }(f);

    reader.readAsDataURL(f);
  }
};

exports.Upload = Upload;

var upBase64 = function upBase64(file64, successCb, failCb) {
  var newImg, imgList;
  return _regenerator["default"].async(function upBase64$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newImg = dataURItoBlob(file64);
          imgList = new UploadImgServer();
          _context.next = 4;
          return _regenerator["default"].awrap(imgList.UploadImg(newImg, successCb, failCb));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.upBase64 = upBase64;

var dataURItoBlob = function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0) byteString = atob(base64Data.split(",")[1]);else byteString = unescape(base64Data.split(",")[1]);
  var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
  var ia = new Uint8Array(byteString.length);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}; // const UploadImageApi = _APIS.images.upload;


var UploadImgServer = function UploadImgServer() {
  (0, _classCallCheck2["default"])(this, UploadImgServer);
  (0, _defineProperty2["default"])(this, "UploadImg", function _callee(f, successCb, failCb) {
    var imgD, _ref, data, tokenData, upImgServerObj, headers, _ref2, _data;

    return _regenerator["default"].async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imgD = new FormData();
            _context2.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_uploadToken["default"].getToken));

          case 3:
            _ref = _context2.sent;
            data = _ref.data;
            console.log(data);
            console.log("所选图片", f);
            tokenData = data;

            if (!(data.code === "Success")) {
              _context2.next = 24;
              break;
            }

            //   imgD.append("file", f);
            imgD.append("OSSAccessKeyId", tokenData.data.OSSAccessKeyId); // imgD.append('host', data.data.host);

            imgD.append("key", tokenData.data.key);
            imgD.append("policy", tokenData.data.policy);
            imgD.append("signature", tokenData.data.signature);
            imgD.append("file", f);
            upImgServerObj = {
              p: tokenData.data.host,
              m: "POST"
            };
            headers = {
              // 'Host': `${tokenData.data.host}`,
              // 'Key': `${tokenData.data.key}`,
              "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary8ALqnqJh9LxrumzC" // 'Key':

            };
            _context2.next = 18;
            return _regenerator["default"].awrap((0, _index["default"])(upImgServerObj, {}, imgD, headers, false));

          case 18:
            _ref2 = _context2.sent;
            _data = _ref2.data;
            console.log(_data, "上传成功");
            successCb(tokenData.data.key);
            _context2.next = 25;
            break;

          case 24:
            failCb();

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}; // export default Upload;


exports.UploadImgServer = UploadImgServer;