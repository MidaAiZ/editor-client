import { SET_SETTINGVIS, SET_BGSRC, SET_BGBLUR, SET_BGMASKOPACITY } from './mutations-type.js'
// initial state
const state = {
    settingVis: false,
    bgSrc: 'Bing',
    maskOpacityValue: 30,
    bgBlurValue: 20
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
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }