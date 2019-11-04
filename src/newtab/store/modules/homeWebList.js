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
import { localSave, imgToBase64 } from '../../utils/localSave.js'
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
                isDefault: false,
                menus: data.data
            }
        } else {
            menu = {
                isDefault: true,
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
                isDefault: false,
                menus: data.data.menu
            }
        } else {
            menu = {
                isDefault: true,
                menus: state.homeWebList
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
    async afterChanged ({ commit, rootState }, newList) {
        // let localList = JSON.stringify(newList);
        // let listArr = newList
        // for (page of listArr) {
        //         for(item of page) {
        //             let itm = item
        //             await iconPromise(itm).then((data) => {
        //                 item = data;
        //             })
        //         }
        // }
        commit('AFTER_CHANGE', newList);
        const { data } = await req(homeMenus.changeAll, {}, newList)
        if (data.code === 'Success') {
            // commit('SET_HOMEMENUS', data.data)
        } else {
            Message.error({message: localeText[rootState.locale.location].cloudSaveFail})
        }
    },
    addOne () {
        
    }
}

async function iconPromise(item) {
    return new Promise((resolve, reject) => {
        imgToBase64(item.iconSrc, (src) => {item.iconBase64 = src; resolve(item)})
    })
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
            isDefault: false,
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
            isDefault: false,
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [AFTER_CHANGE] (state, menus) {
        console.log('after', menus)
        let newMenus = {
            isDefault: false,
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