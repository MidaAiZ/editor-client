"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = req;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _axios = _interopRequireDefault(require("./axios.js"));

var _wallPaper = _interopRequireDefault(require("./apis/wallPaper.js"));

var _elementUi = require("element-ui");

// const baseURL = '//'
function checkCode() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Success';
} //   if (code === 'Success') {
//     return code;
//   }
//   if (code === 'NotLoggedIn') {
//     message.info('请先登录');
//   }
//   if (code === 'WrongMsgCode') {
//     message.warning('错误的短信验证码');
//   }
//   if (code === 'Fail') {
//     message.warning('操作失败');
//   }
//   if (code === 'ResourceNotExist') {
//     message.info('原文件不存在');
//   }
//   if (code === 'Nopermisson') {
//     message.warning('没有该操作权限');
//   }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] `params` 是即将与请求一起发送的 URL 参数,必须是一个无格式对象(plain object)或 URLSearchParams 对象
 * @return {object}           An object containing either "data" or "err"
 */


function req(service, params, data, headers, withCredentials) {
  var option, response, ret;
  return _regenerator["default"].async(function req$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          option = withCredentials === false ? {
            method: service.m || "GET",
            url: service.p,
            params: params,
            data: data,
            headers: headers
          } : {
            method: service.m || "GET",
            url: service.p,
            params: params,
            data: data,
            withCredentials: true
          };
          _context.next = 3;
          return _regenerator["default"].awrap((0, _axios["default"])(option));

        case 3:
          response = _context.sent;
          //   const resData = await response.json();
          //   checkCode(data.code);
          ret = {
            data: response,
            headers: {}
          };
          return _context.abrupt("return", ret);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}