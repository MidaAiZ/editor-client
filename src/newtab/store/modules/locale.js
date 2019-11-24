import {
  CHANGE_LOCALE
} from "./mutations-type.js";
// initial state
const state = {
  location: 'zh_CN',
  locationList: [
    {
      code: 'zh_CN',
      name: '简体中文',
    },
    {
      code: 'zh_TW',
      name: '繁體中文',
    },
    {
      code: 'JP',
      name: '日本語',
    },
    {
      code: 'DE',
      name: 'Deutsch',
    },
    {
      code: 'GB',
      name: 'English(UK)'
    },
    {
      code: 'US',
      name: 'English(United States)'
    }
  ]
}

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
    [CHANGE_LOCALE] (state, locale) {
      state.location = locale
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
