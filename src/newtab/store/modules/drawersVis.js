import { SET_SETTINGVIS, SET_SYSBARVIS, SET_BMHIS } from './mutations-type.js'
// initial state
const state = {
    systemBarVis: false,
    settingVis: false,
    bookmarksAndHistory: false,
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    
  }
  
  // mutations
  const mutations = {
    [SET_SETTINGVIS] (state, vis) {
        state.settingVis = vis
    },
    [SET_SYSBARVIS] (state, vis) {
        state.systemBarVis = vis
    },
    [SET_BMHIS] (state, vis) {
      state.bookmarksAndHistory = vis
  },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }