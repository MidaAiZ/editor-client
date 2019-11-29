import sitesCategories from '../../services/apis/sitesCategories.js'
import req from '../../services/index.js'

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
    disableLoad: true,
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
        commit('DIS_AUTO_LOAD', false)
        //payload: {categoryIds, keyword, pageNum, pageSize, countryCodes}
        const { data } = await req(sitesCategories.getSitesInCategory, payload)
        commit('SET_LOADING', false)
        // localSave('categories', data.data)
        commit('SET_SITES_CATEGORY', data.data)
        if(data.data.length < payload.pageSize) {
            commit('DIS_AUTO_LOAD', true)
        }
    },
    async loadMore ({ state, commit }, payload) { // 从服务器获取网站分类列表
        commit('DIS_AUTO_LOAD', true)
        if(payload.categoryIds === 'hottest') {
            const { data } = await req(sitesCategories.hottest, payload)
            commit('SET_LOADING', false)
            if (data.code === 'Success') {
                let arr = state.currentSiteList.concat(data.data)
                // localSave('categories', data.data)
                commit('SET_SITES_CATEGORY', arr)
                let pN = state.pageNum+1;
                commit('SET_SITES_PAGE', pN)
                if(data.data.length < payload.pageSize) {
                    commit('DIS_AUTO_LOAD', true)
                } else {
                    commit('DIS_AUTO_LOAD', false) 
                }
            }
        } else {
            const { data } = await req(sitesCategories.getSitesInCategory, payload)
            commit('SET_LOADING', false)
            if (data.code === 'Success') { 
                let arr = state.currentSiteList.concat(data.data)
                // localSave('categories', data.data)
                commit('SET_SITES_CATEGORY', arr)
                let pN = state.pageNum+1;
                commit('SET_SITES_PAGE', pN)
                if(data.data.length < payload.pageSize) {
                    commit('DIS_AUTO_LOAD', true)
                }
            }
        }
        //payload: {categoryIds, keyword, pageNum, pageSize, countryCodes}
    },
    async searchSite ({ state, commit }, payload) { // 从服务器搜索网站
        //payload: {keyword}
        const { data } = await req(sitesCategories.search, payload)
        // localSave('categories', data.data)
        commit('SET_SITES_CATEGORY', data.data)
    },
    async getHottest ({ commit }) {
        //payload: {pageNum, pageSize}
        commit('DIS_AUTO_LOAD', false)
        const { data } = await req(sitesCategories.hottest, {pageNum: 1, pageSize: 20})
        if(data.code === 'Success') {
            // localSave('categories', data.data)
            commit('SET_SITES_CATEGORY', data.data)
        }
    }
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