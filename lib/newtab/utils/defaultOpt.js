"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMenu = exports.defaultSettings = exports.defaultCategories = void 0;

var chrome = require('../../../static/logos/chrome.svg');

var bookmark = require('../../../static/logos/bookmark.svg');

var history = require('../../../static/logos/clock.svg');

var amazon = require('../../../static/logos/amazon.svg');

var apple = require('../../../static/logos/apple.svg');

var tianmao = require('../../../static/logos/tianmao.svg');

var instagram = require('../../../static/logos/instagram.svg');

var twitter = require('../../../static/logos/twitter.svg');

var jingdong = require('../../../static/logos/jingdong.svg');

var youtube = require('../../../static/logos/youtube.svg');

var bilibili = require('../../../static/logos/bilibili.svg');

var steam = require('../../../static/logos/steam.svg');

var zhihu = require('../../../static/logos/zhihu.svg');

var weibo = require('../../../static/logos/sina-weibo.svg');

var facebook = require('../../../static/logos/facebook.svg');

var ebay = require('../../../static/logos/ebay.svg');

var gmail = require('../../../static/logos/gmail.svg');

var defaultCategories = [// 默认分类，如果服务器获取失败且本地没有存储，
{
  "cid": 0,
  "title": "默认",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:41:22",
  "updatedAt": "2019-09-29 02:41:26"
}, {
  "cid": 2,
  "title": "科技",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:30:36",
  "updatedAt": "2019-09-29 02:28:43"
}, {
  "cid": 3,
  "title": "军事",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:30:36",
  "updatedAt": "2019-09-29 02:28:43"
}, {
  "cid": 4,
  "title": "教育",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:30:36",
  "updatedAt": "2019-09-29 02:28:43"
}, {
  "cid": 5,
  "title": "文化",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:30:36",
  "updatedAt": "2019-09-29 02:28:43"
}, {
  "cid": 6,
  "title": "游戏",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:30:36",
  "updatedAt": "2019-09-29 02:28:43"
}, {
  "cid": 8,
  "title": "购物",
  "index": null,
  "sitesCount": null,
  "createdAt": "2019-09-29 02:45:59",
  "updatedAt": "2019-09-29 02:46:01"
}];
exports.defaultCategories = defaultCategories;
var defaultSettings = {
  // 默认主页配置，如果服务器获取失败，自动设置这一套配置
  bgSrc: 'default',
  maskOpacityValue: 30,
  bgBlurValue: 20,
  newSiteNewTabValue: false,
  cloudSave: false,
  searchResultNewTabValue: false,
  openMarkNewTabValue: false,
  historyNewTabValue: false,
  randomBgBtn: false,
  showOftenUsedBar: false,
  showEmailBtn: false,
  showBookMarkBar: false,
  iconLayout: {
    name: '2x5',
    row: 2,
    col: 5
  },
  hideAllIcons: false,
  iconRadiusValue: 50,
  iconSizeValue: 50,
  hideSearchBarValue: false,
  hideSearchTypeValue: false,
  searchBarRadiusValue: 50,
  searchBarSizeValue: 50,
  searchBarOpacityValue: 100,
  fontSizeValue: 15,
  fontColorValue: '#fff'
}; // Object.defineProperties(menu, {
//   title: {
//     value: '',
//   },
//   iconBase64: {},
//   iconBase64: {
//     value: '',
//     enumerable: false,
//   }
// })
// function optimizeMenu(menus) {
//   menus.forEach(page => {
//     page.forEach(item => {
//       const obj = {};
//       Object.defineProperty(obj, 'iconBase64', {
//         value: item.iconBase64,
//         enumerable: false,
//       });
//       delete item.iconBase64;
//       Object.assign(item, obj);
//     })
//   });
// }

exports.defaultSettings = defaultSettings;
var defaultMenu = {
  version: 'default',
  menus: [//   {
  //       id: 1,
  //       title: '天气',
  //       icon: '',
  //       url: '',
  //       index: '',
  //   },
  [{
    title: 'chrome商店',
    iconSrc: '',
    iconBase64: chrome,
    url: 'https://chrome.google.com/webstore/category/extensions',
    index: 0,
    isFolder: false,
    children: []
  }, {
    sid: 3,
    title: '书签',
    iconSrc: '',
    iconBase64: bookmark,
    url: '',
    index: 1,
    isFolder: false,
    children: []
  }, {
    sid: 4,
    title: '历史',
    iconSrc: '',
    iconBase64: history,
    url: '',
    index: 2,
    isFolder: false,
    children: []
  }, {
    sid: 5,
    title: '亚马逊',
    iconSrc: '',
    iconBase64: amazon,
    url: 'https://www.amazon.com/',
    index: 3,
    isFolder: false,
    children: []
  }, {
    sid: 6,
    title: '天猫',
    iconSrc: '',
    iconBase64: tianmao,
    url: 'https://www.tmall.com/',
    index: 4,
    isFolder: false,
    children: []
  }, {
    sid: 7,
    title: 'instagram',
    iconSrc: '',
    iconBase64: instagram,
    url: 'https://www.instagram.com/',
    index: 5,
    isFolder: false,
    children: []
  }, {
    sid: 8,
    title: 'twitter',
    iconSrc: '',
    iconBase64: twitter,
    url: 'https://twitter.com/',
    index: 6,
    children: []
  }, {
    sid: 9,
    title: '京东',
    iconSrc: '',
    iconBase64: jingdong,
    url: 'https://www.jd.com/',
    index: 7,
    isFolder: false,
    children: []
  }, {
    sid: 10,
    title: 'Youtube',
    iconSrc: '',
    iconBase64: youtube,
    url: 'https://www.youtube.com/',
    index: 8,
    isFolder: false,
    children: []
  }, {
    sid: 11,
    title: '哔哩哔哩',
    iconSrc: '',
    iconBase64: bilibili,
    url: 'https://www.bilibili.com/',
    index: 9,
    isFolder: false,
    children: []
  }], [{
    sid: 12,
    title: 'steam',
    iconSrc: '',
    iconBase64: steam,
    url: 'https://store.steampowered.com/',
    index: 10,
    isFolder: false,
    children: []
  }, {
    sid: 13,
    title: '知乎',
    iconSrc: '',
    iconBase64: zhihu,
    url: 'https://www.zhihu.com/',
    index: 11,
    isFolder: false,
    children: []
  }, {
    sid: 14,
    title: '微博',
    iconSrc: '',
    iconBase64: weibo,
    url: 'https://www.weibo.com/',
    index: 12,
    isFolder: false,
    children: []
  }, {
    sid: 15,
    title: 'Facebook',
    iconSrc: '',
    iconBase64: facebook,
    url: 'https://www.facebook.com/',
    index: 13,
    isFolder: false,
    children: []
  }, {
    sid: 16,
    title: 'eBay',
    iconSrc: '',
    iconBase64: ebay,
    url: 'https://www.ebay.com/',
    index: 14,
    isFolder: false,
    children: []
  }, {
    sid: 17,
    title: 'gmail',
    iconSrc: '',
    iconBase64: gmail,
    url: 'https://mail.google.com/mail/',
    index: 15,
    isFolder: false,
    children: []
  }]]
}; // export const defaultMenu = localMenu;
// console.log('忽略base64', JSON.stringify(defaultMenu))

exports.defaultMenu = defaultMenu;