
import Vue from 'vue'
import Vuex from 'vuex'
import addWebList from './modules/addWebList'
import homeWebList from './modules/homeWebList'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    addWebList,
    homeWebList,
    settings,
    user,
  },
})