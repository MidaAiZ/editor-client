import wallPaperService from '../../services/apis/wallPaper.js';
import req from '../../services/index'
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
      
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }