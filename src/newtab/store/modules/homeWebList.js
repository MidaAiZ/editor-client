import {DELETE_CHOOSE_ENGINE, 
    ADD_CHOOSE_ENGINE, 
    CHANGE_IS_EDIT,
    EDIT_DRAWER_VISIBLE,
    CHANGE_WEB_INFO,
    CHANGE_CURRENT_ITEM,
    ADD_ONE_SITE,
    DELETE_ONE_SITE,
    AFTER_CHANGE,
} from "./mutations-type.js";
import homeMenus from '../../services/apis/homeMenus.js'
import req from '../../services/index.js'
import { localSave, imgToBase64, NoIconFunc } from '../../utils/localSave.js'
import localeText from '../../../../static/locale/index.js'
import { SET_HOMEMENUS } from './mutations-type.js'
import {defaultMenu} from '../../utils/defaultOpt.js'
import { Message } from 'element-ui'

const state = {
    // homeWebList:defaultMenu,
    isEdit:false,
    editDrawerVisible:false,
    currentItem: {},
    homeWebList: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).menus : defaultMenu.menus,
};

function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

function optimizeMenu(menus) {
    menus.forEach(page => {
      page.forEach(item => {
        const obj = {};
        Object.defineProperty(obj, 'iconBase64', {
          value: item.iconBase64,
          enumerable: false,
        });
        delete item.iconBase64;
        Object.assign(item, obj);
      })
    });
  }

// getters
const getters = {
    totalSize: state => {
        let sum = 0;
        state.homeWebList.forEach((data) => {
            sum = sum + data.length
        })
        return sum
    },
    //将数组按index属性排序
    sortArray: (state,getters) => {

            let arr = state.homeWebList;
            arr.forEach((item, index) => {
                item.forEach((i, idx) => {
                    i.index = idx
                })
            })
            return arr
        // return state.homeWebList.sort(compare('index'))
    },

}

// actions
const actions = {
    async getDefaultMenus ({ commit }) { // 从服务器获取默认主页添加网站
        const { data } = await req(homeMenus.default, {code: 'CN'})
        let menu;
        if (data.code === 'Success') {
            menu = {
                version: false,
                menus: data.data
            }
        } else {
            menu = {
                version: true,
                menus: defaultMenu.menus
            }
        }
        menu.menus.forEach((item, index) => {
            item.forEach((i, idx) => {
                i.index = idx
            })
        })
        // let menuArr = menu.menus
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menu.menus)
    },
    async getUserMenus ({ state, commit }) { // 从服务器获取默认主页添加网站
        const { data } = await req(homeMenus.user_menu)
        let menu;
        if (data.data && data.data.menu && data.data.menu.length !== 0) {
            menu = {
                version: data.data.version,
                menus: data.data.menu
            }
        } else {
            menu = {
                version: true,
                menus: state.homeWebList
            }
        }
        menu.menus.forEach((item, index) => {
            item.forEach((i, idx) => {
                i.index = idx
            })
        })

        let listArr = menu.menus;

        const promises = [];
            listArr.forEach(function(page, index){
                page.forEach(function(item, idx){
                    promises.push(new Promise(async (resolve) => {
                        // let itm = item
                        if(!item.iconBase64) {
                            const base64 = await imgToBase64(item.iconSrc)
                        // listArr[index][idx] = item;
                            item.iconBase64 = base64;
                            listArr[index][idx] = item;
                        }
                        resolve();
                }));
            });
        })
        Promise.all(promises).then((args) => {
            menu.menus = listArr;
            localSave('homeMenus', menu)
            commit('SET_HOMEMENUS', menu.menus)
        })
        // let menuArr = menu.menus
        // localSave('homeMenus', menu)
        // commit('SET_HOMEMENUS', menu.menus)
    },
    async afterChanged ({ commit, rootState }, newList) {
        // let localList = JSON.stringify(newList);
        console.log('a')
        commit('AFTER_CHANGE', newList);
        const menuClone = JSON.parse(JSON.stringify(newList));
        optimizeMenu(menuClone);
        const { data } = await req(homeMenus.changeAll, {}, menuClone)
        if (data.code === 'Success') {
            // commit('SET_HOMEMENUS', data.data)
        } else {
            Message.error({message: localeText[rootState.locale.location].cloudSaveFail})
        }
    },
    async addOne ({dispatch, commit}, payload) {
        let item = payload.item;
        let iconSrc;
        let iconBase64;
        if (!item.icon) {
            let itemIcon = await NoIconFunc(item.title, 240, 240);
            iconSrc = itemIcon.iconSrc;
            iconBase64 = itemIcon.iconBase64;
        } else {
            iconSrc = item.icon
        }
        // console.log('store', store)
        let arr = state.homeWebList;
        let newItem = {
            sid: item.sid,
            url: item.url,
            title: item.title,
            iconSrc: iconSrc,
            iconBase64: iconBase64,
            index: arr[arr.length-1].length
        };
        if(arr[arr.length-1].length >= payload.size) {
            arr.push([])
        }
        arr[arr.length-1].push(newItem);
        let menus = {
            version: false,
            menus: arr
        };
        commit('AFTER_CHANGE', arr);
        await dispatch('afterChanged', arr);
    }
}

// mutations
const mutations = {
    [DELETE_CHOOSE_ENGINE] (state,index) {
        let result = state.searchEngineList.filter(engine => {
            return engine.id !== state.allEngineList[index].id
        });
        state.searchEngineList = result;
        state.allEngineList[index].isChoose = false;
    },
    [ADD_CHOOSE_ENGINE] (state,index) {
        state.allEngineList[index].isChoose = true;
        state.searchEngineList.push(state.allEngineList[index]);
    },
    [SET_HOMEMENUS] (state, homeMenus) { // 设置主页网站列表
        state.homeWebList = homeMenus
    },
    [CHANGE_IS_EDIT] (state, isEdit) {
        state.isEdit = isEdit;
    },
    [EDIT_DRAWER_VISIBLE] (state,isVisible) {
        // console.log(isVisible);
        state.editDrawerVisible = isVisible;
    },
    [CHANGE_WEB_INFO] (state,webInfo) {
        for(let i=0; i<state.homeWebList.length; i++){
            if(state.homeWebList[i].id === webInfo.id){
                state.homeWebList[i].title = webInfo.title;
                state.homeWebList[i].url = webInfo.url;
                state.homeWebList[i].img = webInfo.img;
                break;
            }
        }
    },
    [CHANGE_CURRENT_ITEM] (state,item) {
        state.currentItem = window.Object.assign({},item);
    },
    [ADD_ONE_SITE] (state, payload) {
        let item = payload.item
        console.log(payload)
        // console.log('store', store)
        let arr = state.homeWebList;
        let newItem = {
            sid: item.sid,
            url: item.url,
            title: item.title,
            iconSrc: item.icon,
            index: arr[arr.length-1].length
        };
        if(arr[arr.length-1].length >= payload.size) {
            arr.push([])
        }
        arr[arr.length-1].push(newItem);
        let menus = {
            version: false,
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [DELETE_ONE_SITE] (state, payload) {
        let itemInfo = payload.itemInfo;
        let pageIndex = payload.pageIndex;
        let index = payload.index;
        let arr = state.homeWebList;
        arr[pageIndex].splice(index, 1);
        if(arr[pageIndex].length === 0 && arr.length !== 1) {
            arr.splice(pageIndex, 1)
        }
        let menus = {
            version: false,
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [AFTER_CHANGE] (state, menus) {
        let newMenus = {
            version: false,
            menus,
        }
        localSave('homeMenus', newMenus);
        state.homeWebList = menus;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}