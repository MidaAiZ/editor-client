import { SET_WALLPAPERLOADING, SET_WALLPAPER } from './mutations-type.js'
import req from '../../services/index.js'
import { getUnsplashWallPaper, setWallPaper } from '../../utils/wallPaperStorage.js'
import { Message } from 'element-ui';
import wallPaper from '../../services/apis/wallPaper.js'
// initial state
const state = {
    wallPaperUrl: '',
    wallPaperLoading: false,
    wallPaperSrc: JSON.parse(localStorage.getItem(`storageWallPaper`))
    ?
    JSON.parse(localStorage.getItem(`storageWallPaper`)).img
    :
    require('../../../../static/defaultWallPapers/bg.jpg'),
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    async getNewWallPaper ({commit}) {
      const { data } = await req(wallPaper.random)
      if(data.code === 'Success') {
        commit(SET_WALLPAPERLOADING, true)
        setWallPaper('Unsplash', data.data, (src) => {commit(SET_WALLPAPER, src);commit(SET_WALLPAPERLOADING, false)})
      } else {
        Message.error({message: localeText[rootState.locale.location].wrongNetwork})
      }
      // getUnsplashWallPaper(
      //   (src) => {
      //     commit(SET_WALLPAPER, src);
      //     commit(SET_WALLPAPERLOADING, false)
      //   }
      // )
    }
  }
  
  // mutations
  const mutations = {
      [SET_WALLPAPERLOADING] (state, loading) {
        state.wallPaperLoading = loading
      },
      [SET_WALLPAPER] (state, src) {
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
