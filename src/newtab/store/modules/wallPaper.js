import { SET_WALLPAPERLOADING } from './mutations-type.js'
// initial state
const state = {
    wallPaperUrl: '',
    wallPaperLoading: false,
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    // async getBingWallPaper () {
    //     const { data } = await req(wallPaperService.Bing.random)
    //     console.log(data, 'wall')
    // }
  }
  
  // mutations
  const mutations = {
      [SET_WALLPAPERLOADING] (state, loading) {
        state.wallPaperLoading = loading
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }