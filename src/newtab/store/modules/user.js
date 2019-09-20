
// initial state
const state = {
  logregModalVis: false,
  hasLogin: false,
  userName: '',
  loginEmail: '',
  loginPassword: '',
  loginLoading: false,
}

// getters
const getters = {
  
}

// actions
const actions = {
  
}

// mutations
const mutations = {
    setLogRegModalVis (state, vis) {
        console.log('modal visible: ',vis);
        state.logregModalVis = vis
    },
    setLoginInfo (state, payload) { // 填写登录信息
        state[payload.type] = payload.value
    },
    setLoginLoading (state, loading) { // 登录时等候的加载图标显示
        state.loginLoading = loading
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}