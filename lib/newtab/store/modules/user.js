"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _index = _interopRequireDefault(require("../../services/index.js"));

var _user = _interopRequireDefault(require("../../services/apis/user.js"));

var _settings = _interopRequireDefault(require("../../services/apis/settings.js"));

var _localSave = require("../../utils/localSave.js");

var _index2 = _interopRequireDefault(require("../../../../static/locale/index.js"));

var _elementUi = require("element-ui");

// initial state
var state = {
  logregModalVis: false,
  hasLogin: localStorage.getItem('userData') ? true : false,
  userNameValue: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).name : '',
  loginNameValue: '',
  loginEmail: '',
  loginPassword: '',
  loginLoading: false,
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerLoading: false
}; // getters

var getters = {} //   test: 1,
// actions
;
var actions = {
  register: function register(_ref) {
    var commit, state, dispatch, rootState, registerData, _ref2, data;

    return _regenerator["default"].async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, state = _ref.state, dispatch = _ref.dispatch, rootState = _ref.rootState;
            // const { commit, dispatch, state, rootState } = store
            registerData = new FormData();
            registerData.append('number', state.registerName);
            registerData.append('password', state.registerPassword);
            registerData.append('email', state.registerEmail);
            _context.next = 7;
            return _regenerator["default"].awrap((0, _index["default"])(_user["default"].register, {}, registerData));

          case 7:
            _ref2 = _context.sent;
            data = _ref2.data;

            if (data.code === 'Success') {
              commit('setLoginInfo', {
                type: 'loginEmail',
                value: state.registerEmail
              });
              commit('setLoginInfo', {
                type: 'loginPassword',
                value: state.registerPassword
              });
              dispatch('login');

              _elementUi.Message.success({
                message: _index2["default"][rootState.locale.location].registerMessage.success
              });
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  login: function login(_ref3) {
    var commit, rootState, loginData, _ref4, data, userData;

    return _regenerator["default"].async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref3.commit, rootState = _ref3.rootState;
            loginData = new FormData();
            loginData.append('email', state.loginEmail);
            loginData.append('password', state.loginPassword);
            _context2.next = 6;
            return _regenerator["default"].awrap((0, _index["default"])(_user["default"].login, {}, loginData));

          case 6:
            _ref4 = _context2.sent;
            data = _ref4.data;
            commit('setLoginLoading', false);

            if (data.code === 'Success') {
              userData = {
                name: data.data.user.number,
                email: data.data.user.email,
                uid: data.data.user.uid,
                avatar: data.data.user.avatar,
                token: data.data.token
              };
              (0, _localSave.localSave)('userData', userData);
              commit('setUserName', userData.name);
              commit('setLogRegModalVis', false);
              commit('loginSuccess', true);
            } else {
              _elementUi.Message.error({
                message: _index2["default"][rootState.locale.location].loginMessage.fail
              });
            }

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  judgeLogin: function judgeLogin(_ref5) {
    var commit, _ref6, data, userData;

    return _regenerator["default"].async(function judgeLogin$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref5.commit;
            _context3.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_user["default"].profile));

          case 3:
            _ref6 = _context3.sent;
            data = _ref6.data;

            if (!(data.code === 'Success')) {
              _context3.next = 13;
              break;
            }

            userData = {
              name: data.data.number,
              email: data.data.email,
              uid: data.data.uid,
              avatar: data.data.avatar
            };
            (0, _localSave.localSave)('userData', userData);
            commit('setUserName', userData.name);
            commit('loginSuccess', true);
            return _context3.abrupt("return", true);

          case 13:
            commit('setUserName', '');
            commit('loginSuccess', false);
            return _context3.abrupt("return", false);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  logoutFunc: function logoutFunc(_ref7) {
    var commit, rootState, _ref8, data;

    return _regenerator["default"].async(function logoutFunc$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref7.commit, rootState = _ref7.rootState;
            _context4.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_user["default"].logout));

          case 3:
            _ref8 = _context4.sent;
            data = _ref8.data;

            if (data.code === 'Success') {
              localStorage.removeItem('userData');
              commit('loginSuccess', false);
              commit('setUserName', '');

              _elementUi.Message.success({
                message: _index2["default"][rootState.locale.location].logoutMessage.success
              });
            }

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
}; // mutations

var mutations = {
  setLogRegModalVis: function setLogRegModalVis(state, vis) {
    state.logregModalVis = vis;
  },
  setLoginInfo: function setLoginInfo(state, payload) {
    // 填写登录信息
    state[payload.type] = payload.value;
  },
  setLoginLoading: function setLoginLoading(state, loading) {
    // 登录时等候的加载图标显示
    state.loginLoading = loading;
  },
  loginSuccess: function loginSuccess(state, success) {
    state.hasLogin = success;
  },
  setUserName: function setUserName(state, name) {
    state.userNameValue = name;
  },
  setRegisterInfo: function setRegisterInfo(state, payload) {
    // 填写注册信息
    state[payload.type] = payload.value;
  },
  setRegisterLoading: function setRegisterLoading(state, loading) {
    // 注册时等候的加载图标显示
    state.registerLoading = loading;
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;