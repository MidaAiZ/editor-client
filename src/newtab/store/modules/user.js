
// initial state
const state = {
  hasLogin: false,
  userName: '',
  loginEmail: '',
  loginPassword: '',
}

// getters
const getters = {
  
}

// actions
const actions = {
  
}

// mutations
const mutations = {
    setLogInfo (state, payload) {
        state[payload.type] = payload.value
      }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}