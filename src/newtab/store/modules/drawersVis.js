import { 
    SET_SETTINGVIS, 
    SET_SYSBARVIS, 
    SET_BMHIS,
    SET_CAVIS,
    SET_WEATHER_DRAWER,
} from './mutations-type.js'
// initial state
const state = {
    systemBarVis: false,
    settingVis: false,
    bookmarksAndHistory: false,
    customAddVis: false,
    weather: false,
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    
  }
  
  // mutations
  const mutations = {
    [SET_WEATHER_DRAWER] (state, vis) {
        state.weather = vis;
    },
    [SET_SETTINGVIS] (state, vis) {
        state.settingVis = vis;
    },
    [SET_SYSBARVIS] (state, vis) {
        state.systemBarVis = vis;
    },
    [SET_BMHIS] (state, vis) {
        state.bookmarksAndHistory = vis;
    },
    [SET_CAVIS] (state, vis) {
        state.customAddVis = vis;
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }