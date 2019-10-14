import {DELETE_CHOOSE_ENGINE, ADD_CHOOSE_ENGINE} from "./mutations-type.js";
import homeMenus from '../../services/apis/homeMenus.js'
import req from '../../services/index.js'
import { localSave } from '../../utils/localSave.js';
import localeText from '../../../../static/locale/index.js'
import { SET_HOMEMENUS } from './mutations-type.js'
import {defaultMenu} from '../../utils/defaultOpt.js'

const state = {
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
        return state.homeWebList.length
    },
    //将数组按index属性排序
    sortArray: (state,getters) => {
        return state.homeWebList.sort(compare('index'))
    },
    pagingArray:(state,getters,store) => {
        let rowNumber = store.settings.iconLayout.row;    //一页多少行
        let colNumber = store.settings.iconLayout.col;    //一行多少个
        let sortedWebList = getters.sortArray;
        let pages = Math.ceil(getters.totalSize/(rowNumber*colNumber));
        let everyPageNumber = rowNumber*colNumber;
        let pageArray = [];
        for(let i=0; i<pages; i++){
            let tempArray = (i===(pages-1)?sortedWebList.slice(i*everyPageNumber):sortedWebList.slice(i*everyPageNumber,(i+1)*everyPageNumber));
            pageArray.push(tempArray)
        }
        return pageArray
    }

}

// actions
const actions = {
    async getDefaultMenus ({ commit }) { // 从服务器获取默认主页添加网站
        const { data } = await req(homeMenus.default, {code: 'CN'})
        console.log(data.data.menus instanceof Array, '主页')
        let menu = {
            isDefault: data.data.isDefault,
            menus: data.data.menus instanceof Array ? data.data.menus : defaultMenu.menus
        }
        let menuArr = menu.menus
        console.log(menu, 'menu')
        console.log(defaultMenu, 'defaultMenu')
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menuArr)
    },
    afterChanged ({commit}, newList) {

    },
    addOne () {
        
    }
}

// mutations
const mutations = {
    [DELETE_CHOOSE_ENGINE] (state,index){
        let result = state.searchEngineList.filter(engine => {
            return engine.id !== state.allEngineList[index].id
        });
        state.searchEngineList = result;
        state.allEngineList[index].isChoose = false;
    },
    [ADD_CHOOSE_ENGINE] (state,index){
        state.allEngineList[index].isChoose = true;
        state.searchEngineList.push(state.allEngineList[index]);
    },
    [SET_HOMEMENUS] (state, homeMenus) { // 设置主页网站列表
        state.homeWebList = homeMenus
    },
    // setLogRegModalVis (state, vis) {
    //     console.log('modal visible: ',vis);
    //     state.logregModalVis = vis
    // },
    // setLoginInfo (state, payload) { // 填写登录信息
    //     state[payload.type] = payload.value
    // },
    // setLoginLoading (state, loading) { // 登录时等候的加载图标显示
    //     state.loginLoading = loading
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}