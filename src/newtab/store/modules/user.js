import req from '../../services/index.js'
import user from '../../services/apis/user.js'
import settings from '../../services/apis/settings.js'
import { localSave } from '../../utils/localSave.js'
import localeText from '../../../../static/locale/index.js'
import { Message } from 'element-ui';
// initial state
const state = {
  logregModalVis: false,
  hasLogin: localStorage.getItem('userData') ? true : false,
  userNameValue: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).name : '',
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
//   test: 1,
}

// actions
const actions = {
    async register ({ commit, state, dispatch, rootState }) {
        // const { commit, dispatch, state, rootState } = store
        let registerData = new FormData();
        registerData.append('number', state.registerName)
        registerData.append('password', state.registerPassword)
        registerData.append('email', state.registerEmail)
        const { data } = await req(user.register, {}, registerData)
        if(data.code === 'Success') {
            commit('setLoginInfo', {
                type: 'loginEmail',
                value: state.registerEmail
            })
            commit('setLoginInfo', {
                type: 'loginPassword',
                value: state.registerPassword
            })
            dispatch('login')
            Message.success({message: localeText[rootState.locale.location].registerMessage.success})
        }
    },
    async login ({ commit, rootState }) {
        let loginData = new FormData();
        loginData.append('email', state.loginEmail)
        loginData.append('password', state.loginPassword)
        const { data } = await req(user.login, {}, loginData)
        commit('setLoginLoading', false)
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
        } else {
            Message.error({message: localeText[rootState.locale.location].loginMessage.fail})
        }
    },
    async judgeLogin ({ commit }) { // 判断是否登录
        const { data } = await req(user.profile)
        if (data.code === 'Success') {
            let userData = {
                name: data.data.number,
                email: data.data.email,
                uid: data.data.uid,
                avatar: data.data.avatar,
            }
            localSave('userData', userData)
            commit('setUserName', userData.name)
            commit('loginSuccess', true)
            return 'hasLogined'
        } else {
            commit('setUserName', '')
            commit('loginSuccess', false)
            return 'notLogined'
        }
    },
    async logoutFunc ({ commit, rootState }) {
        const { data } = await req(user.logout)
        if (data.code === 'Success') {
            localStorage.removeItem('userData')
            commit('loginSuccess', false)
            commit('setUserName', '')
            Message.success({message: localeText[rootState.locale.location].logoutMessage.success})
        }
    },
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