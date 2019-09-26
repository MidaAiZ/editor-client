import {
    SET_SETTINGVIS,
    SET_BGSRC, 
    SET_BGBLUR, 
    SET_BGMASKOPACITY, 
    SET_NEWTYPE, 
    SET_HOMEBTN,
    SET_LAYOUT,
    HIDE_ALLICONS,
    SET_ICONRADIUS,
    SET_ICONSIZE,
    HIDE_SEARCHBAR,
    HIDE_SEARCHTYPE,
    SET_SEARCHBARRADIUS,
    SET_SEARCHBARSIZE,
    SET_SEARCHBAROPACITY,
    SET_FONTSIZE,
    SET_FONTCOLOR,
    RESET_ALL,
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
    hideAllIcons: false,
    iconRadiusValue: 50,
    iconSizeValue: 55,
    hideSearchBarValue: false,
    hideSearchTypeValue: false,
    searchBarRadiusValue: 50,
    searchBarSizeValue: 50,
    searchBarOpacityValue: 100,
    fontSizeValue: 15,
    fontColorValue: '#fff',
  }

//   const defaultSetting = {
//     bgSrc: 'Bing',
//     maskOpacityValue: 30,
//     bgBlurValue: 20,
//     newSiteNewTabValue: false,
//     searchResultNewTabValue: false,
//     openMarkNewTabValue: false,
//     historyNewTabValue: false,
//     randomBgBtn: false,
//     showOftenUsedBar: false,
//     showEmailBtn: false,
//     showBookMarkBar: false,
//     iconLayout: {
//         name: '2x5',
//         row: 2,
//         col: 5,
//     },
//     hideAllIcons: false,
//     iconRadiusValue: 50,
//     iconSizeValue: 55,
//     hideSearchBarValue: false,
//     hideSearchTypeValue: false,
//     searchBarRadiusValue: 50,
//     searchBarSizeValue: 50,
//     searchBarOpacityValue: 100,
//     fontSizeValue: 15,
//     fontColorValue: '#fff',
//   }
  
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
    },
    [HIDE_ALLICONS] (state, value) {
        state.hideAllIcons = value
    },
    [SET_ICONRADIUS] (state, value) {
        state.iconRadiusValue = value
    },
    [SET_ICONSIZE] (state, value) {
    state.iconSizeValue = value
    },
    [HIDE_SEARCHBAR] (state, value) {
        state.hideSearchBarValue = value
    },
    [HIDE_SEARCHTYPE] (state, value) {
        state.hideSearchTypeValue = value
    },
    [SET_SEARCHBARRADIUS] (state, value) {
        state.searchBarRadiusValue = value
    },
    [SET_SEARCHBARSIZE] (state, value) {
        state.searchBarSizeValue = value
    },
    [SET_SEARCHBAROPACITY] (state, value) {
        state.searchBarOpacityValue = value
    },
    [SET_FONTSIZE] (state, value) {
        state.fontSizeValue = value
    },
    [SET_FONTCOLOR] (state, value) {
        state.fontColorValue = value
    },
    [RESET_ALL] (state) {
        state.bgSrc = 'Bing'
        state.maskOpacityValue = 30
        state.bgBlurValue = 20
        state.newSiteNewTabValue = false
        state.searchResultNewTabValue = false
        state.openMarkNewTabValue = false
        state.historyNewTabValue = false
        state.randomBgBtn = false
        state.showOftenUsedBar = false
        state.showEmailBtn = false
        state.showBookMarkBar = false
        state.iconLayout = {
            name: '2x5',
            row: 2,
            col: 5,
        }
        state.hideAllIcons = false
        state.iconRadiusValue = 50
        state.iconSizeValue = 55
        state.hideSearchBarValue = false
        state.hideSearchTypeValue = false
        state.searchBarRadiusValue = 50
        state.searchBarSizeValue = 50
        state.searchBarOpacityValue = 100
        state.fontSizeValue = 15
        state.fontColorValue = '#fff'
        }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }