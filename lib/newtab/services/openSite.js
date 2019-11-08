"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openSite = void 0;

var _index = _interopRequireDefault(require("./index.js"));

var _siteHistory = _interopRequireDefault(require("./apis/siteHistory.js"));

/**
 *
 * @param  {object} siteObj       打开的新网站的对象，包含{siteUrl, siteTitle, siteId}
 * @param  {string} openWay       打开新网站的方式，实在本页面直接打开还是在新标签页打开
 */
var openSite = function openSite(siteObj, openWay) {
  (0, _index["default"])(_siteHistory["default"].record, {}, siteObj);
  var trackData;
  var trackUrl = new URL(siteObj.siteUrl);
  var trackSearch = trackUrl.search;
  var params = new URLSearchParams(trackSearch);

  if (localStorage.getItem('track')) {
    trackData = JSON.parse(localStorage.getItem('track')).data;
    trackData.forEach(function (item) {
      params.set(item.key, item.value);
    });
    trackUrl.search = params.toString();
  }

  if (openWay === 'newtab') {
    window.open(trackUrl.href);
  } else {
    window.location = trackUrl.href;
  }
};

exports.openSite = openSite;