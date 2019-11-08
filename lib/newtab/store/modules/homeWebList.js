"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mutationsType = require("./mutations-type.js");

var _homeMenus = _interopRequireDefault(require("../../services/apis/homeMenus.js"));

var _index = _interopRequireDefault(require("../../services/index.js"));

var _localSave = require("../../utils/localSave.js");

var _index2 = _interopRequireDefault(require("../../../../static/locale/index.js"));

var _defaultOpt = require("../../utils/defaultOpt.js");

var _elementUi = require("element-ui");

var _mutations;

var state = {
  // homeWebList:defaultMenu,
  isEdit: false,
  editDrawerVisible: false,
  currentItem: {},
  homeWebList: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).menus : _defaultOpt.defaultMenu.menus
};

function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
}

function optimizeMenu(menus) {
  menus.forEach(function (page) {
    page.forEach(function (item) {
      var obj = {};
      Object.defineProperty(obj, 'iconBase64', {
        value: item.iconBase64,
        enumerable: false
      });
      delete item.iconBase64;
      Object.assign(item, obj);
    });
  });
} // getters


var getters = {
  totalSize: function totalSize(state) {
    var sum = 0;
    state.homeWebList.forEach(function (data) {
      sum = sum + data.length;
    });
    return sum;
  },
  //将数组按index属性排序
  sortArray: function sortArray(state, getters) {
    var arr = state.homeWebList;
    arr.forEach(function (item, index) {
      item.forEach(function (i, idx) {
        i.index = idx;
      });
    });
    return arr; // return state.homeWebList.sort(compare('index'))
  }
}; // actions

var actions = {
  getDefaultMenus: function getDefaultMenus(_ref) {
    var commit, _ref2, data, menu;

    return _regenerator["default"].async(function getDefaultMenus$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_homeMenus["default"]["default"], {
              code: 'CN'
            }));

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;

            if (data.code === 'Success') {
              menu = {
                version: false,
                menus: data.data
              };
            } else {
              menu = {
                version: true,
                menus: _defaultOpt.defaultMenu.menus
              };
            }

            menu.menus.forEach(function (item, index) {
              item.forEach(function (i, idx) {
                i.index = idx;
              });
            }); // let menuArr = menu.menus

            (0, _localSave.localSave)('homeMenus', menu);
            commit('SET_HOMEMENUS', menu.menus);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getUserMenus: function getUserMenus(_ref3) {
    var state, commit, _ref4, data, menu, listArr, promises;

    return _regenerator["default"].async(function getUserMenus$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state = _ref3.state, commit = _ref3.commit;
            _context3.next = 3;
            return _regenerator["default"].awrap((0, _index["default"])(_homeMenus["default"].user_menu));

          case 3:
            _ref4 = _context3.sent;
            data = _ref4.data;

            if (data.data && data.data.menu && data.data.menu.length !== 0) {
              menu = {
                version: data.data.version,
                menus: data.data.menu
              };
            } else {
              menu = {
                version: true,
                menus: state.homeWebList
              };
            }

            menu.menus.forEach(function (item, index) {
              item.forEach(function (i, idx) {
                i.index = idx;
              });
            });
            listArr = menu.menus;
            promises = [];
            listArr.forEach(function (page, index) {
              page.forEach(function (item, idx) {
                promises.push(new Promise(function _callee(resolve) {
                  var base64;
                  return _regenerator["default"].async(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (item.iconBase64) {
                            _context2.next = 6;
                            break;
                          }

                          _context2.next = 3;
                          return _regenerator["default"].awrap((0, _localSave.imgToBase64)(item.iconSrc));

                        case 3:
                          base64 = _context2.sent;
                          // listArr[index][idx] = item;
                          item.iconBase64 = base64;
                          listArr[index][idx] = item;

                        case 6:
                          resolve();

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  });
                }));
              });
            });
            Promise.all(promises).then(function (args) {
              menu.menus = listArr;
              (0, _localSave.localSave)('homeMenus', menu);
              commit('SET_HOMEMENUS', menu.menus);
            }); // let menuArr = menu.menus
            // localSave('homeMenus', menu)
            // commit('SET_HOMEMENUS', menu.menus)

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  afterChanged: function afterChanged(_ref5, newList) {
    var commit, rootState, menuClone, _ref6, data;

    return _regenerator["default"].async(function afterChanged$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref5.commit, rootState = _ref5.rootState;
            // let localList = JSON.stringify(newList);
            commit('AFTER_CHANGE', newList);
            menuClone = JSON.parse(JSON.stringify(newList));
            optimizeMenu(menuClone);
            _context4.next = 6;
            return _regenerator["default"].awrap((0, _index["default"])(_homeMenus["default"].changeAll, {}, menuClone));

          case 6:
            _ref6 = _context4.sent;
            data = _ref6.data;

            if (data.code === 'Success') {// commit('SET_HOMEMENUS', data.data)
            } else {
              _elementUi.Message.error({
                message: _index2["default"][rootState.locale.location].cloudSaveFail
              });
            }

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  addOne: function addOne() {
    var tempSrc, item, arr, newItem, menus;
    return _regenerator["default"].async(function addOne$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(!itemInfo.iconBase64 && itemInfo.iconSrc === "")) {
              _context5.next = 5;
              break;
            }

            tempSrc = NoIconFunc(itemInfo.title, 240, 240);
            return _context5.abrupt("return", tempSrc);

          case 5:
            item = payload.item;
            console.log(payload); // console.log('store', store)

            arr = state.homeWebList;
            newItem = {
              sid: item.sid,
              url: item.url,
              title: item.title,
              iconSrc: item.icon,
              index: arr[arr.length - 1].length
            };

            if (arr[arr.length - 1].length >= payload.size) {
              arr.push([]);
            }

            arr[arr.length - 1].push(newItem);
            menus = {
              version: false,
              menus: arr
            };
            (0, _localSave.localSave)('homeMenus', menus);
            state.homeWebList = arr;

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
}; // mutations

var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _mutationsType.DELETE_CHOOSE_ENGINE, function (state, index) {
  var result = state.searchEngineList.filter(function (engine) {
    return engine.id !== state.allEngineList[index].id;
  });
  state.searchEngineList = result;
  state.allEngineList[index].isChoose = false;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.ADD_CHOOSE_ENGINE, function (state, index) {
  state.allEngineList[index].isChoose = true;
  state.searchEngineList.push(state.allEngineList[index]);
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.SET_HOMEMENUS, function (state, homeMenus) {
  // 设置主页网站列表
  state.homeWebList = homeMenus;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CHANGE_IS_EDIT, function (state, isEdit) {
  state.isEdit = isEdit;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.EDIT_DRAWER_VISIBLE, function (state, isVisible) {
  // console.log(isVisible);
  state.editDrawerVisible = isVisible;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CHANGE_WEB_INFO, function (state, webInfo) {
  for (var i = 0; i < state.homeWebList.length; i++) {
    if (state.homeWebList[i].id === webInfo.id) {
      state.homeWebList[i].title = webInfo.title;
      state.homeWebList[i].url = webInfo.url;
      state.homeWebList[i].img = webInfo.img;
      break;
    }
  }
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.CHANGE_CURRENT_ITEM, function (state, item) {
  state.currentItem = window.Object.assign({}, item);
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.ADD_ONE_SITE, function (state, payload) {
  var item = payload.item;
  console.log(payload); // console.log('store', store)

  var arr = state.homeWebList;
  var newItem = {
    sid: item.sid,
    url: item.url,
    title: item.title,
    iconSrc: item.icon,
    index: arr[arr.length - 1].length
  };

  if (arr[arr.length - 1].length >= payload.size) {
    arr.push([]);
  }

  arr[arr.length - 1].push(newItem);
  var menus = {
    version: false,
    menus: arr
  };
  (0, _localSave.localSave)('homeMenus', menus);
  state.homeWebList = arr;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.DELETE_ONE_SITE, function (state, payload) {
  var itemInfo = payload.itemInfo;
  var pageIndex = payload.pageIndex;
  var index = payload.index;
  var arr = state.homeWebList;
  arr[pageIndex].splice(index, 1);

  if (arr[pageIndex].length === 0 && arr.length !== 1) {
    arr.splice(pageIndex, 1);
  }

  var menus = {
    version: false,
    menus: arr
  };
  (0, _localSave.localSave)('homeMenus', menus);
  state.homeWebList = arr;
}), (0, _defineProperty2["default"])(_mutations, _mutationsType.AFTER_CHANGE, function (state, menus) {
  console.log('after', JSON.stringify(menus));
  var newMenus = {
    version: false,
    menus: menus
  };
  (0, _localSave.localSave)('homeMenus', newMenus);
  state.homeWebList = menus;
}), _mutations);
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;