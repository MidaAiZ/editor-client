import { SET_SETTINGVIS, SET_BGSRC, SET_BGBLUR, SET_BGMASKOPACITY, SET_NEWTYPE } from './mutations-type.js'
// initial state
const state = {
    settingVis: false,
    bgSrc: 'Bing',
    maskOpacityValue: 30,
    bgBlurValue: 20,
    newSiteNewTabValue: false,
    searchResultNewTabValue: false,
    openMarkNewTabValue: false,
    historyNewTabValue: false,
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
      },
      [SET_BGMASKOPACITY] (state, value) {
          state.maskOpacityValue = value
      },
      [SET_BGBLUR] (state, blur) {
          state.bgBlurValue = blur
      },
      [SET_NEWTYPE] (state, payload) {
          state[payload.type] = payload.value
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }