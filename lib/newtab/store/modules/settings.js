"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mutationsType = require("./mutations-type.js");

var _settings = _interopRequireDefault(require("../../services/apis/settings.js"));

var _index = _interopRequireDefault(require("../../services/index.js"));

var _localSave = require("../../utils/localSave.js");

var _mutations;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultSetting = {
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
}; // initial state

var state = localStorage.getItem('settings') ? _objectSpread({}, JSON.parse(localStorage.getItem('settings'))) : defaultSetting; // getters

var getters = {}; // actions

var actions = {
  getDefaultSettings: function getDefaultSettings(_ref) {
    var commit, _ref2, data;

    return _regenerator["default"].async(function getDefaultSettings$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_settings["default"]["default"], {}));

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            console.log(data);
            (0, _localSave.localSave)('settings', data.data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  judgeCloudSettings: function judgeCloudSettings(_ref3) {
    var commit;
    return _regenerator["default"].async(function judgeCloudSettings$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref3.commit;

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_BGSRC, function (state, src) {
  state.bgSrc = src;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_BGMASKOPACITY, function (state, value) {
  state.maskOpacityValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_BGBLUR, function (state, blur) {
  state.bgBlurValue = blur;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_CLOUDSAVE, function (state, cloudSave) {
  state.cloudSave = cloudSave;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_NEWTYPE, function (state, payload) {
  state[payload.type] = payload.value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_HOMEBTN, function (state, payload) {
  state[payload.type] = payload.value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_LAYOUT, function (state, payload) {
  state.iconLayout = payload;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.HIDE_ALLICONS, function (state, value) {
  state.hideAllIcons = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_ICONRADIUS, function (state, value) {
  state.iconRadiusValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_ICONSIZE, function (state, value) {
  state.iconSizeValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.HIDE_SEARCHBAR, function (state, value) {
  state.hideSearchBarValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.HIDE_SEARCHTYPE, function (state, value) {
  state.hideSearchTypeValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SEARCHBARRADIUS, function (state, value) {
  state.searchBarRadiusValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SEARCHBARSIZE, function (state, value) {
  state.searchBarSizeValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_SEARCHBAROPACITY, function (state, value) {
  state.searchBarOpacityValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_FONTSIZE, function (state, value) {
  state.fontSizeValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_FONTCOLOR, function (state, value) {
  state.fontColorValue = value;
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.RESET_ALL, function (state) {
  state.bgSrc = 'default';
  state.maskOpacityValue = 30;
  state.bgBlurValue = 20;
  state.newSiteNewTabValue = false;
  state.searchResultNewTabValue = false;
  state.openMarkNewTabValue = false;
  state.historyNewTabValue = false;
  state.randomBgBtn = false;
  state.showOftenUsedBar = false;
  state.showEmailBtn = false;
  state.showBookMarkBar = false;
  state.iconLayout = {
    name: '2x5',
    row: 2,
    col: 5
  };
  state.hideAllIcons = false;
  state.iconRadiusValue = 50;
  state.iconSizeValue = 55;
  state.hideSearchBarValue = false;
  state.hideSearchTypeValue = false;
  state.searchBarRadiusValue = 50;
  state.searchBarSizeValue = 50;
  state.searchBarOpacityValue = 100;
  state.fontSizeValue = 15;
  state.fontColorValue = '#fff';
  (0, _localSave.localSave)('settings', _objectSpread({}, state));
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;