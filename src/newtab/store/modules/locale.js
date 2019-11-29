import {
  CHANGE_LOCALE
} from "./mutations-type.js";
import { localSave } from '../../utils/localSave.js';
import { defaultSettings } from '../../utils/defaultOpt.js';
// initial state
let localSettings = JSON.parse(localStorage.getItem('settings') || "{}");
const state = {
  location: localSettings.defaultLocale ? localSettings.defaultLocale : 'en',
  locationList: [
    {
      code: 'en',
      name: 'English(UK)'
    },
    {
      code: 'en_US',
      name: 'English(United States)'
    },
    {
      code: 'ja',
      name: '日本語',
    },
    {
      code: 'de',
      name: 'Deutsch',
    },
    {
      code: 'zh_CN',
      name: '简体中文',
    },
    {
      code: 'zh_TW',
      name: '繁體中文',
    },
  ]
}

// getters
const getters = {

}

// actions
const actions = {
  async changeLocale({commit, dispatch, state}, locale) {
    commit('CHANGE_LOCALE', locale)
    let newSettings = Object.assign(defaultSettings, localSettings, {defaultLocale: locale, localeVersion: 'user'});
    dispatch('settings/uploadSettings', newSettings, {root:true});
    commit('settings/SET_ALL', newSettings, {root:true});
  }
}

// mutations
const mutations = {
    [CHANGE_LOCALE] (state, locale) {
      state.location = locale
      // let localSettings = localStorage.getItem('settings');
      // let newSettings = Object.assign(defaultSetting, JSON.parse(localSettings || "{}"), {defaultLocale: locale});
      // localSave('settings', newSettings);
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
