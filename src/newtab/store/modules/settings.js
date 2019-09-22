import { SET_SETTINGVIS, SET_BGSRC } from './mutations-type.js'
// initial state
const state = {
    settingVis: false,
    bgSrc: 'Bing',
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
      [SET_BGSRC] (state, src) {
          state.bgSrc = src
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }