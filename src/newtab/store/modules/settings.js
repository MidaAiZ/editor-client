import {
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
import localSave from '../../utils/localSave.js'
  const defaultSetting = {
    bgSrc: 'default',
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
    iconSizeValue: 50,
    hideSearchBarValue: false,
    hideSearchTypeValue: false,
    searchBarRadiusValue: 50,
    searchBarSizeValue: 50,
    searchBarOpacityValue: 100,
    fontSizeValue: 15,
    fontColorValue: '#fff',
  }
// initial state
const state = localStorage.getItem('settings') ? {
    ...JSON.parse(localStorage.getItem('settings'))
  } : defaultSetting
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {

  }
  
  // mutations
  const mutations = {
    [SET_BGSRC] (state, src) {
        state.bgSrc = src
        localSave('settings', {...state})
    },
    [SET_BGMASKOPACITY] (state, value) {
        state.maskOpacityValue = value
        localSave('settings', {...state})
    },
    [SET_BGBLUR] (state, blur) {
        state.bgBlurValue = blur
        localSave('settings', {...state})
    },
    [SET_NEWTYPE] (state, payload) {
        state[payload.type] = payload.value
        localSave('settings', {...state})
    },
    [SET_HOMEBTN] (state, payload) {
        state[payload.type] = payload.value
        localSave('settings', {...state})
    },
    [SET_LAYOUT] (state, payload) {
        state.iconLayout = payload
        localSave('settings', {...state})
    },
    [HIDE_ALLICONS] (state, value) {
        state.hideAllIcons = value
        localSave('settings', {...state})
    },
    [SET_ICONRADIUS] (state, value) {
        state.iconRadiusValue = value
        localSave('settings', {...state})
    },
    [SET_ICONSIZE] (state, value) {
    state.iconSizeValue = value
    localSave('settings', {...state})
    },
    [HIDE_SEARCHBAR] (state, value) {
        state.hideSearchBarValue = value
        localSave('settings', {...state})
    },
    [HIDE_SEARCHTYPE] (state, value) {
        state.hideSearchTypeValue = value
        localSave('settings', {...state})
    },
    [SET_SEARCHBARRADIUS] (state, value) {
        state.searchBarRadiusValue = value
        localSave('settings', {...state})
    },
    [SET_SEARCHBARSIZE] (state, value) {
        state.searchBarSizeValue = value
        localSave('settings', {...state})
    },
    [SET_SEARCHBAROPACITY] (state, value) {
        state.searchBarOpacityValue = value
        localSave('settings', {...state})
    },
    [SET_FONTSIZE] (state, value) {
        state.fontSizeValue = value
        localSave('settings', {...state})
    },
    [SET_FONTCOLOR] (state, value) {
        state.fontColorValue = value
        localSave('settings', {...state})
    },
    [RESET_ALL] (state) {
        state.bgSrc = 'default'
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
        localSave('settings', {...state})
        }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }