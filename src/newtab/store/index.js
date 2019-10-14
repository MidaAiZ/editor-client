
import Vue from 'vue'
import Vuex from 'vuex'
import addWebList from './modules/addWebList'
import homeWebList from './modules/homeWebList'
import settings from './modules/settings'
import user from './modules/user'
import locale from './modules/locale'
import wallPaper from './modules/wallPaper'
import drawersVis from './modules/drawersVis'
import engineList from './modules/engineList'
import categories from './modules/categories'
import homeMenus from './modules/homeMenus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    addWebList,
    homeWebList,
    settings,
    user,
    locale,
    wallPaper,
    drawersVis,
    engineList,
    categories,
    homeMenus
  },
})