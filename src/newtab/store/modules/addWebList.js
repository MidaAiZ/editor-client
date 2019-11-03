import sitesCategories from '../../services/apis/sitesCategories.js'
import req from '../../services/index.js'
import { localSave } from '../../utils/localSave.js'
import localeText from '../../../../static/locale/index.js'
import {
    SET_SITES_CATEGORY,
    SET_SITES_PAGE,
    DIS_AUTO_LOAD,
    SET_SEARCH_SITES_VALUE,
    SET_LOADING
} from './mutations-type.js'
import {defaultCategories} from '../../utils/defaultOpt.js'
// import { Message } from 'element-ui';
// initial state
const state = {
    currentSiteList: [],
    pageNum: 1,
    pageSize: 20,
    disableLoad: false,
    searchSiteIptValue: '', // 搜索站点时输入框输入的内容
    loading: false
    // currentCid: null
}

// getters
const getters = {
//   test: 1,
}

// actions
const actions = {
    async getSitesInCategory ({ commit }, payload) { // 从服务器获取网站分类列表

        //payload: {categoryIds, keyword, pageNum, pageSize, countryCodes}
        const { data } = await req(sitesCategories.getSitesInCategory, payload)
        commit('SET_LOADING', false)
        // localSave('categories', data.data)
        commit('SET_SITES_CATEGORY', data.data)
    },
    async loadMore ({ state, commit }, payload) { // 从服务器获取网站分类列表

        //payload: {categoryIds, keyword, pageNum, pageSize, countryCodes}
        const { data } = await req(sitesCategories.getSitesInCategory, payload)
        commit('SET_LOADING', false)
        if (data.code === 'Success') { 
            let arr = state.currentSiteList.concat(data.data)
            // localSave('categories', data.data)
            commit('SET_SITES_CATEGORY', arr)
            let pN = state.pageNum+1;
            commit('SET_SITES_PAGE', pN)
            if(data.data.length === 0) {
                commit('DIS_AUTO_LOAD', true)
            }
        }
    },
    async searchSite ({ commit }, payload) { // 从服务器搜索网站
        //payload: {keyword}
        const { data } = await req(sitesCategories.search, payload)
        // localSave('categories', data.data)
        commit('SET_SITES_CATEGORY', data.data)
    },
}

// mutationss
const mutations = {
    [SET_LOADING] (state, loading) {
        state.loading = loading
    },
    [DIS_AUTO_LOAD] (state, disableLoad) {
        state.disableLoad = disableLoad
    },
    [SET_SITES_PAGE] (state, pageNum) {
        state.pageNum = pageNum
    },
    [SET_SITES_CATEGORY] (state, currentSiteList) { // 设置网站分类
        state.currentSiteList = currentSiteList
    },
    [SET_SEARCH_SITES_VALUE] (state, value) {
        state.searchSiteIptValue = value
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}