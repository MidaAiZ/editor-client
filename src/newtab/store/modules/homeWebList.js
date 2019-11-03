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
import { localSave } from '../../utils/localSave.js'
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
        if (state.homeWebList[0].index) {
            return state.homeWebList.sort(compare('index'))
        } else {
            let arr = state.homeWebList;
            arr.forEach((item, index) => {
                item.index = index
            })
            return arr
        }
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
        // let menuArr = menu.menus
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menu.menus)
    },
    async getUserMenus ({ state, commit }) { // 从服务器获取默认主页添加网站
        const { data } = await req(homeMenus.user_menu)
        let menu;
        if (data.data && data.data.length && data.data.length !== 0) {
            menu = {
                isDefault: false,
                menus: data.data
            }
        } else {
            menu = {
                isDefault: true,
                menus: state.homeWebList
            }
        }
        // let menuArr = menu.menus
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menu.menus)
    },
    async afterChanged ({ commit, rootState }, newList) {
        localSave('homeMenus', newList)
        const { data } = await req(homeMenus.changeAll, {}, newList)
        if (data.code === 'Success') {
            commit('SET_HOMEMENUS', data.data)
            console.log('同步网站列表成功')
        } else {
            Message.error({message: localeText[rootState.locale.location].cloudSaveFail})
        }
    },
    addOne () {
        
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
    [ADD_ONE_SITE] (state, item) {
        let newItem = {
            sid: item.sid,
            url: item.url,
            title: item.title,
            icon: item.icon,
            index: state.homeWebList.length
        };
        let arr = state.homeWebList;
        arr.push(newItem);
        let menus = {
            isDefault: false,
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [DELETE_ONE_SITE] (state, itemInfo) {

        let arr = state.homeWebList;
        arr = arr.filter(item => item.index !== itemInfo.index);
        let menus = {
            isDefault: false,
            menus: arr
        };
        localSave('homeMenus', menus);
        state.homeWebList = arr;
    },
    [AFTER_CHANGE] (state, newList) {
        let newMenus = {
            isDefault: false,
            menus: newList
        }
        localSave('homeMenus', newMenus);
        state.homeWebList = newList;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}