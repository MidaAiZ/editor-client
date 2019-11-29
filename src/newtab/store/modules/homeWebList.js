import {DELETE_CHOOSE_ENGINE, 
    ADD_CHOOSE_ENGINE, 
    CHANGE_IS_EDIT,
    EDIT_DRAWER_VISIBLE,
    CHANGE_WEB_INFO,
    CHANGE_CURRENT_ITEM,
    ADD_ONE_SITE,
    DELETE_ONE_SITE,
    AFTER_CHANGE,
    SET_GET_LOADING
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
    getting: false,
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
    }

}

// actions
const actions = {
    async getDefaultMenus ({ commit, rootState }) { // 从服务器获取默认主页添加网站
        console.log('rootState', rootState)
        const { data } = await req(homeMenus.default)
        let menu;
        if (data.code === 'Success') {
            let rowNumber = rootState.settings.iconLayout.row; //一页多少行
            let colNumber = rootState.settings.iconLayout.col; //一行多少个
            // let totalSize = 0;
            let sum = 0;
            data.data.forEach((p) => {
                sum = sum + p.length
            })
            let pages = Math.ceil(sum / (rowNumber * colNumber));
            let everyPageNumber = rowNumber * colNumber;
            let wholeArr = [];
            let newList = [];
            for(let j = 0; j < data.data.length; j++) {
                wholeArr = wholeArr.concat(data.data[j])
            }
            for (let i = 0; i < pages; i++) {
                let tempArray = (i === (pages - 1) 
                                        ? 
                                        wholeArr.slice(i * everyPageNumber) 
                                        : 
                                        wholeArr.slice(i * everyPageNumber, (i + 1) * everyPageNumber));
                newList.push(tempArray)
            }
            menu = {
                version: false,
                menus: newList
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
                if(i.url.indexOf('tabplus://weather') === 0) {
                    i.isWeather = true
                }
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
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menu.menus)
    },
    async getUserMenus ({ state, commit }) { // 从服务器获取默认主页添加网站
        commit('SET_GET_LOADING', true)
        const { data } = await req(homeMenus.user_menu)
        commit('SET_GET_LOADING', false)
        let menu;
        if (data.data && data.data.menu ) {
            menu = {
                version: data.data.version,
                menus: data.data.menu
            }
        } else {
            menu = {
                version: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).version : '',
                menus: state.homeWebList
            }
        }
        menu.menus.forEach((item, index) => {
            item.forEach((i, idx) => {
                i.index = idx
                if(i.url.indexOf('tabplus://weather') === 0) {
                    i.isWeather = true
                }
            })
        })

        if (!localStorage.getItem('homeMenus') || data.data.version !== JSON.parse(localStorage.getItem('homeMenus')).version) {
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
        }

        // let menuArr = menu.menus
        // localSave('homeMenus', menu)
        // commit('SET_HOMEMENUS', menu.menus)
    },
    async afterChanged ({ commit, rootState }, newList) {
        newList.forEach((arr, pageIndex) => { // 变更过后删除为空的子数组
            if(arr.length === 0 && newList.length !== 1) {
                newList.splice(pageIndex, 1)
            }
        })

        if(rootState.settings.cloudSave && rootState.user.hasLogin) {
            // console.log(rootState.user.hasLogin)
            const menuClone = JSON.parse(JSON.stringify(newList));
            optimizeMenu(menuClone);
            const { data } = await req(homeMenus.changeAll, {}, menuClone)
            if (data.code === 'Success') {
                let newMenus = {
                    version: data.data.version,
                    menus: newList,
                }
                localSave('homeMenus', newMenus);
                commit('AFTER_CHANGE', newList);
                // commit('SET_HOMEMENUS', data.data)
            } else {
                commit('AFTER_CHANGE', newList);
                Message.error({message: localeText[rootState.locale.location].cloudSaveFail})
            }
        } else {
            commit('AFTER_CHANGE', newList);
        }
    },
    async addOne ({dispatch, commit, rootState}, payload) {
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
            version: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).version : '',
            menus: arr
        };
        commit('AFTER_CHANGE', arr);
        if(rootState.settings.cloudSave) {
            await dispatch('afterChanged', arr);
        }

    },
    async deleteOne({dispatch, commit, rootState}, payload) {
        let itemInfo = payload.itemInfo;
        let pageIndex = payload.pageIndex;
        let index = payload.index;
        let arr = state.homeWebList;
        arr[pageIndex].splice(index, 1);
        let menus = {
            version: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).version : '',
            menus: arr
        };
        localSave('homeMenus', menus);
        commit('AFTER_CHANGE', arr);
        if(rootState.settings.cloudSave) {
            await dispatch('afterChanged', arr);
        }
    }
}

// mutations
const mutations = {
    [SET_GET_LOADING] (state, loading) {
        state.getting = loading;
    },
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
                state.homeWebList[i].iconBase64 = webInfo.iconBase64;
                state.homeWebList[i].iconSrc = webInfo.iconSrc;
                break;
            }
        }
    },
    [CHANGE_CURRENT_ITEM] (state,payload) {
        state.currentItem = payload;
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
            version: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).version : '',
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [AFTER_CHANGE] (state, menus) {
        let newMenus = {
            version: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')).version : '',
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