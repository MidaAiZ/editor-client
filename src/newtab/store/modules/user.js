
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
  login ({ commit }) {
    setTimeout(() => { // 模拟登录过程
        commit('setLoginLoading', false)
        commit('setLogRegModalVis', false)
        commit('loginSuccess', true)
        commit('setUserName', 'SeanFu')
      }, 2000)
  }
}

// mutations
const mutations = {
    setLogRegModalVis (state, vis) {
        state.logregModalVis = vis
    },
    setLoginInfo (state, payload) { // 填写登录信息
        state[payload.type] = payload.value
    },
    setLoginLoading (state, loading) { // 登录时等候的加载图标显示
        state.loginLoading = loading
    },
    loginSuccess (state, success) {
        state.hasLogin = success
    },
    setUserName (state, name) {
        state.userName = name
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}