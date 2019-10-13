import sitesCategories from '../../services/apis/sitesCategories.js'
import req from '../../services/index.js'
import { localSave } from '../../utils/localSave.js'
import localeText from '../../../../static/locale/index.js'
import {
    SET_CATEGORIES
} from './mutations-type.js'
import defaultCategories from '../../utils/defaultOpt.js'
// import { Message } from 'element-ui';
// initial state
const state = {
    categories: localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : defaultCategories,
}

// getters
const getters = {
//   test: 1,
}

// actions
const actions = {
    async getCategories ({ commit }) { // 从服务器获取网站分类列表
        const { data } = await req(sitesCategories.default)
        console.log(data, '分类')
        localSave('categories', data.data)
        commit('SET_CATEGORIES', data.data)
    },
}

// mutations
const mutations = {
    
    SET_CATEGORIES (state, categories) { // 设置网站分类
        state.categories = categories
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}