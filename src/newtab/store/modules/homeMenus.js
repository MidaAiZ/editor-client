import homeMenus from '../../services/apis/homeMenus.js'
import req from '../../services/index.js'
import { localSave } from '../../utils/localSave.js';
import localeText from '../../../../static/locale/index.js'
import { SET_HOMEMENUS } from './mutations-type.js'
import {defaultMenu} from '../../utils/defaultOpt.js'
// import { Message } from 'element-ui';
// initial state
const state = {
    homeMenus: localStorage.getItem('homeMenus') ? JSON.parse(localStorage.getItem('homeMenus')) : defaultMenu,
}

// getters
const getters = {
//   test: 1,
}

// actions
const actions = {
    async getDefaultMenus ({ commit }) { // 从服务器获取默认主页添加网站
        const { data } = await req(homeMenus.default, {code: 'CN'})
        console.log(data.data.menus instanceof Array, '主页')
        let menu = data.data.menus instanceof Array ? data.data.menus : defaultMenu
        console.log(menu, 'menu')
        console.log(defaultMenu, 'defaultMenu')
        localSave('homeMenus', menu)
        commit('SET_HOMEMENUS', menu)
    },
    afterChanged ({commit}, newList) {

    },
    addOne () {
        
    }
}

// mutations
const mutations = { 
    [SET_HOMEMENUS] (state, homeMenus) { // 设置主页网站列表
        state.homeMenus = homeMenus
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}