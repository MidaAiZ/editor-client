import {
    SET_SETTINGVIS,
    SET_BGSRC, 
    SET_BGBLUR, 
    SET_BGMASKOPACITY, 
    SET_NEWTYPE, 
    SET_HOMEBTN,
    SET_LAYOUT,
} from './mutations-type.js'
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
    randomBgBtn: false,
    showOftenUsedBar: false,
    showEmailBtn: false,
    showBookMarkBar: false,
    iconLayout: {
        name: '2x5',
        row: 2,
        col: 5,
    },
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
      },
      [SET_HOMEBTN] (state, payload) {
        state[payload.type] = payload.value
      },
      [SET_LAYOUT] (state, payload) {
          state.iconLayout = payload
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }