"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mutationsType = require("./mutations-type.js");

var _mutations;

var baidu = require('../../../../static/logos/baidu.svg');

var yahoo = require('../../../../static/logos/yahoo.svg');

var sougou = require('../../../../static/logos/sougou.svg');

var bing = require('../../../../static/logos/bing.svg');

var google = require('../../../../static/logos/google.svg');

var yandex = require('../../../../static/logos/yandex.svg');

var search360 = require('../../../../static/logos/360.svg');

var naver = require('../../../../static/logos/naver.svg');

var duckduckgo = require('../../../../static/logos/duckduckgo.svg');

var state = {
  searchPopoverVisible: false,
  currentSearchEngine: {
    url: 'http://www.baidu.com/s?wd=#content#',
    img: baidu,
    name: '百度'
  },
  searchEngineList: [{
    id: 5,
    url: 'http://www.baidu.com/s?wd=#content#',
    img: baidu,
    name: '百度',
    isChoose: true
  }, {
    id: 0,
    url: 'https://www.google.com/search?q=#content#',
    img: google,
    name: '谷歌',
    isChoose: true
  }, {
    id: 1,
    url: 'https://search.yahoo.com/search?p=#content#',
    img: yahoo,
    name: 'Yahoo!',
    isChoose: true
  }, {
    id: 4,
    url: 'http://www.so.com/s?q=#content#',
    img: search360,
    name: '360搜索',
    isChoose: true
  }, {
    id: 6,
    url: 'https://www.sogou.com/web?query=#content#',
    img: sougou,
    name: '搜狗',
    isChoose: true
  }],
  allEngineList: [{
    id: 0,
    url: 'https://www.google.com/search?q=#content#',
    img: google,
    name: '谷歌',
    isChoose: true
  }, {
    id: 1,
    url: 'https://search.yahoo.com/search?p=#content#',
    img: yahoo,
    name: 'Yahoo!',
    isChoose: true
  }, {
    id: 3,
    url: 'https://yandex.ru/search/?text=#content#',
    img: yandex,
    name: 'YandexRU',
    isChoose: false
  }, {
    id: 4,
    url: 'http://www.so.com/s?q=#content#',
    img: search360,
    name: '360搜索',
    isChoose: true
  }, {
    id: 5,
    url: 'http://www.baidu.com/s?wd=#content#',
    img: baidu,
    name: '百度',
    isChoose: true
  }, {
    id: 6,
    url: 'https://www.sogou.com/web?query=#content#',
    img: sougou,
    name: '搜狗',
    isChoose: true
  }, {
    id: 7,
    url: 'https://search.naver.com/search.naver?query=#content#',
    img: naver,
    name: 'NAVER',
    isChoose: false
  }, {
    id: 8,
    url: 'https://duckduckgo.com/?p=#content#',
    img: duckduckgo,
    name: 'Duckduckgo',
    isChoose: false
  }, {
    id: 9,
    url: 'https://cn.bing.com/search?q=#content#',
    img: bing,
    name: '必应',
    isChoose: false
  }],
  customEngineList: []
}; // getters

var getters = {
  maxID: function maxID(state) {
    var max1 = 0;
    var max2 = 0;

    for (var i = 0; i < state.allEngineList.length; i++) {
      if (state.allEngineList[i].id > max1) {
        max1 = state.allEngineList[i].id;
      }
    }

    for (var _i = 0; _i < state.customEngineList.length; _i++) {
      if (state.customEngineList[_i].id > max2) {
        max2 = state.customEngineList[_i].id;
      }
    }

    return max1 > max2 ? max1 : max2;
  }
}; // actions

var actions = {}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.DELETE_CHOOSE_ENGINE, function (state, index) {
  var result = state.searchEngineList.filter(function (engine) {
    return engine.id !== state.allEngineList[index].id;
  });
  state.searchEngineList = result;
  state.allEngineList[index].isChoose = false;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.ADD_CHOOSE_ENGINE, function (state, index) {
  state.allEngineList[index].isChoose = true;
  state.searchEngineList.push(state.allEngineList[index]);
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.OPEN_ENGINE_POPOVER, function (state) {
  state.searchPopoverVisible = true;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CLOSE_ENGINE_POPOVER, function (state) {
  state.searchPopoverVisible = false;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CHANGE_CURRENT_ENGINE, function (state, index) {
  console.log(index);
  state.currentSearchEngine = state.searchEngineList[index];
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.ADD_CUSTOM_ENGINE, function (state, customEngine) {
  state.customEngineList.push(customEngine);
  state.searchEngineList.push(customEngine);
  console.log(state.customEngineList);
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.DELETE_CUSTOME_ENGINE, function (state, customEngine) {
  var result = state.customEngineList.filter(function (engine) {
    return engine.id !== customEngine.id;
  });
  state.customEngineList = result;
  var result1 = state.searchEngineList.filter(function (engine) {
    return engine.id !== customEngine.id;
  });
  state.searchEngineList = result1;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.OPEN_CUSTOM_ENGINE, function (state, index) {
  state.customEngineList[index].isChoose = true;
  state.searchEngineList.push(state.customEngineList[index]);
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CLOSE_CUSTOM_ENGINE, function (state, index) {
  var result = state.searchEngineList.filter(function (engine) {
    return engine.id !== state.customEngineList[index].id;
  });
  state.searchEngineList = result;
  state.customEngineList[index].isChoose = false;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;