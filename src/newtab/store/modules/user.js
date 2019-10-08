import req from '../../services/index.js'
import user from '../../services/apis/user.js'
import { redBright } from 'ansi-colors';
// initial state
const state = {
  logregModalVis: false,
  hasLogin: false,
  userName: '',
  loginEmail: '',
  loginPassword: '',
  loginLoading: false,
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerLoading: false,
}

// getters
const getters = {
  
}

// actions
const actions = {
    async register ({ commit, state }) {
        let registerData = new FormData();
        registerData.append('number', state.registerName)
        registerData.append('password', state.registerPassword)
        registerData.append('email', state.registerEmail)
        // let registerData = {
        //     number: state.registerName,
        //     password: state.registerPassword,
        //     email: state.registerEmail,
        // }
        console.log(user.register, 'register', registerData)
        const { data } = await req(user.register, {}, registerData)
        console.log('data', data)
    },
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
    },
    setRegisterInfo (state, payload) { // 填写注册信息
        state[payload.type] = payload.value
    },
    setRegisterLoading (state, loading) { // 注册时等候的加载图标显示
        state.registerLoading = loading
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}