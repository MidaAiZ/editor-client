import { SET_SETTINGVIS, SET_SYSBARVIS } from './mutations-type.js'
// initial state
const state = {
    systemBarVis: false,
    settingVis: false,
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
        // localSave('settings', {...state})
    },
    [SET_SYSBARVIS] (state, vis) {
        state.systemBarVis = vis
        // localSave('settings', {...state})
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }