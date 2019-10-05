import { SET_WALLPAPERLOADING, SET_WALLPAPER } from './mutations-type.js'
import { getUnsplashWallPaper } from '../../utils/wallPaperStorage.js'
// initial state
const state = {
    wallPaperUrl: '',
    wallPaperLoading: false,
    wallPaperSrc: JSON.parse(localStorage.getItem(`storageWallPaper`))
    ?
    JSON.parse(localStorage.getItem(`storageWallPaper`)).wallPaper
    :
    require('../../../../static/defaultWallPapers/moren.jpg'),
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    async getNewWallPaper ({commit}, state) {
      getUnsplashWallPaper((src) => {
        commit(SET_WALLPAPER, src);
        commit(SET_WALLPAPERLOADING, false)
      })
    }
  }
  
  // mutations
  const mutations = {
      [SET_WALLPAPERLOADING] (state, loading) {
        state.wallPaperLoading = loading
      },
      [SET_WALLPAPER] (state, src) {
        console.log('mutation')
        state.wallPaperSrc = src
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }