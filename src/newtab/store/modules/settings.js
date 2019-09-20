import { SET_SETTINGVIS } from './mutations-type.js'
// initial state
const state = {
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
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }