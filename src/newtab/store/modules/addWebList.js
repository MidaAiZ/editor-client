import sitesCategories from '../../services/apis/sitesCategories.js'
import req from '../../services/index.js'
import { localSave } from '../../utils/localSave.js'
import localeText from '../../../../static/locale/index.js'
import {
    SET_SITES_CATEGORY
} from './mutations-type.js'
import {defaultCategories} from '../../utils/defaultOpt.js'
// import { Message } from 'element-ui';
// initial state
const state = {
    currentSiteList: [],
    // currentCid: null
}

// getters
const getters = {
//   test: 1,
}

// actions
const actions = {
    async getSitesInCategory ({ commit }, id, countryCodes = 'ALL', pageNum = 1, pageSize = 20) { // 从服务器获取网站分类列表
        let siteObj = {
            categoryIds: id,
            countryCodes,
            pageNum,
            pageSize,
        }
        const { data } = await req(sitesCategories.getSitesInCategory, siteObj)
        // console.log(data, '分类')
        localSave('categories', data.data)
        commit('SET_SITES_CATEGORY', data.data)
    },
}

// mutations
const mutations = {
    
    [SET_SITES_CATEGORY] (state, currentSiteList) { // 设置网站分类
        state.currentSiteList = currentSiteList
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}