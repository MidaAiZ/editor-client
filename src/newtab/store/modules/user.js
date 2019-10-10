import req from '../../services/index.js'
import user from '../../services/apis/user.js'
import { localSave } from '../../utils/localSave.js'
// initial state
const state = {
  logregModalVis: false,
  hasLogin: localStorage.getItem('userData') ? true : false,
  userNameValue: JSON.parse(localStorage.getItem('userData')).name || '',
  loginNameValue: '',
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
    async register ({ commit, state, dispatch }) {
        let registerData = new FormData();
        registerData.append('number', state.registerName)
        registerData.append('password', state.registerPassword)
        registerData.append('email', state.registerEmail)
        console.log(user.register, 'register', registerData)
        const { data } = await req(user.register, {}, registerData)
        console.log('data', data)
    },
    async login ({ commit }) {
        let loginData = new FormData();
        loginData.append('number', state.loginNameValue)
        loginData.append('password', state.loginPassword)
        // loginData.append('email', state.registerEmail)
        console.log(user.login, 'login', loginData)
        const { data } = await req(user.login, {}, loginData)
        commit('setLoginLoading', false)
        console.log('data', data)
        if (data.code === 'Success') {
            let userData = {
                name: data.data.user.number,
                email: data.data.user.email,
                uid: data.data.user.uid,
                avatar: data.data.user.avatar,
                token: data.data.token,
            }
            localSave('userData', userData)
            commit('setUserName', userData.name)
            commit('setLogRegModalVis', false)
            commit('loginSuccess', true)
        }
    },
    async judgeLogin ({ commit }) { // 判断是否登录
        const { data } = await req(user.profile)
        // commit('setLoginLoading', false)
        // console.log('data', data)
        if (data.code === 'Success') {
            console.log('已登录')
            let userData = {
                name: data.data.number,
                email: data.data.email,
                uid: data.data.uid,
                avatar: data.data.avatar,
            }
            localSave('userData', userData)
            commit('setUserName', userData.name)
            commit('loginSuccess', true)
        }
    }
}

// mutations
const mutations = {
    setLogRegModalVis (state, vis) {
        console.log('guan')
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
        console.log('nameee', name)
        state.userNameValue = name
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