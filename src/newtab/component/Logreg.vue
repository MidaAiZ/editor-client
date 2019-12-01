<template>
    <div>
        <div v-if="filter === 'login'" class="logreg-wrap">
            <input 
                class="logreg-input"
                :placeholder="userAccountPlaceholder" 
                :value="loginEmail" 
                @input="inputLogin($event.target.value, 'loginEmail')" 
            />
            <input
                class="logreg-input"
                :placeholder="pswPlaceholder"
                type="password"
                :value="loginPassword" 
                @input="inputLogin($event.target.value, 'loginPassword')"
                v-on:keyup.enter="handleLogin"
            />
            <div class="log-or-reg">
                <el-button class="login-btn" :loading="loginLoading" @click="handleLogin" type="primary">{{loginBtn}}</el-button>
                <div class="new-user-btn" @click="filter = 'register'">
                    {{newUser}}
                </div>
            </div>
        </div>
        <div v-if="filter === 'register'" class="logreg-wrap">
            <input
                class="logreg-input"
                :placeholder="userAccountPlaceholder"
                @input="inputRegisterInfo($event.target.value, 'registerEmail')"
            />
            <p v-if="registerEmailTipVis" class="register-tip">{{registerEmailTip}}</p>
            <input
                class="logreg-input"
                :placeholder="userName" 
                @input="inputRegisterInfo($event.target.value, 'registerName')" 
            />
            <p v-if="userNameTipVis" class="register-tip">{{userNameTip}}</p>
            <input 
                class="logreg-input" 
                :placeholder="pswPlaceholder" 
                type="password" 
                @input="inputRegisterInfo($event.target.value, 'registerPassword')" 
                v-on:keyup.enter="handleRegister"
            />
            <p v-if="registerPswTipVis" class="register-tip">{{registerPswTip}}</p>
            <div class="log-or-reg">
                <el-button class="login-btn" type="primary" @click="handleRegister">
                    {{ regBtn }}
                </el-button>
                <div class="new-user-btn" @click="filter = 'login'">
                    {{backToLog}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../static/locale/index.js'

export default {
    name: 'logreg',
    data() {
        return {
            filter: "login",
            registerEmailTipVis: false,
            registerPswTipVis: false,
            userNameTipVis: false
        }
    },
    computed: {
        ...mapState('user', ['loginNameValue', 'loginEmail', 'loginPassword', 'loginLoading']),
        ...mapState('locale', [
            'location',
        ]),
        userName: function() {
            return localeText[this.location].userName
        },
        userAccountPlaceholder: function() {
            return localeText[this.location].userAccountPlaceholder
        },
        pswPlaceholder: function() {
            return localeText[this.location].pswPlaceholder
        },
        loginBtn: function() {
            return localeText[this.location].login
        },
        regBtn: function() {
            return localeText[this.location].register
        },
        forgetPsw: function() {
            return localeText[this.location].forgetPsw
        },
        newUser: function() {
            return localeText[this.location].newUser
        },
        backToLog: function() {
            return localeText[this.location].backToLog
        },
        userNameTip: function() {
            return localeText[this.location].userNameTip
        },
        registerEmailTip: function() {
            return localeText[this.location].registerEmailTip
        },
        registerPswTip: function() {
            return localeText[this.location].registerPswTip
        }
    },
    created: function() {
    },
    methods: {
        inputLogin (value, type) {
            this.setLoginInfo({
                type,
                value,
            })
        },
        handleLogin() {
            this.setLoginLoading(true)
            this.login()
        },
        inputRegisterInfo (value, type) {
            const regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,}))$/;
            const regPsw = /^[a-zA-Z0-9.,!@#$%&'*+\/\]\[=?^_`{|}~-]{6,20}$/;
            const regNumber = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/;
            if (type === 'registerEmail') {
                // console.log(regEmail.test(value))
                if (regEmail.test(value)) {
                    this.setRegisterInfo({
                        type,
                        value,
                    })
                    this.registerEmailTipVis = false
                } else {
                    this.registerEmailTipVis = true
                }
            } else if (type === 'registerName') {
                // console.log(regNumber.test(value))
                if (regNumber.test(value)) {
                    this.setRegisterInfo({
                        type,
                        value,
                    })
                    this.userNameTipVis = false
                } else {
                    this.userNameTipVis = true
                }
            } else if (type === 'registerPassword') {
                if (regPsw.test(value)) {
                    this.setRegisterInfo({
                        type,
                        value,
                    })
                    this.registerPswTipVis = false
                } else {
                    this.registerPswTipVis = true
                }
            }
            this.setRegisterInfo({
                type,
                value,
            })
        },
        handleRegister() {
            this.setRegisterLoading(true)
            this.register()
        },
        ...mapMutations('user', [
        'setLoginInfo',
        'setLoginLoading',
        'setRegisterName',
        'setRegisterInfo',
        'setRegisterLoading'
        ]),
        ...mapActions('user', [
        'login',
        'register',
        ]),
    }
}
</script>
<style scoped>
    .logreg-wrap {
        width: 360px;
        padding: 20px;
    }
    .logreg-input {
        width: 320px;
        height: 40px;
        border-radius: 6px;
        margin-top: 15px;
        margin-left: 20px;
        border: 0;
        background-color: #efefef;
        outline: 0;
        text-indent: 20px;
    }
    .forget-psw-wrap {
        width: 320px;
        height: 30px;
        margin-left: 20px;
        line-height: 30px;
        text-align: right;
        cursor: pointer;
        font-weight: lighter;
        margin-top: 10px;
    }
    .log-or-reg {
        width: 100%;
        margin-top: 20px;
    }
    .login-btn {
        width: 190px;
        margin-left: 85px;
        height: 40px;
        border-radius: 40px;
    }
    .new-user-btn {
        width: 190px;
        margin-left: 85px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-weight: lighter;
        margin-top: 20px;
        cursor: pointer;
    }
    .register-tip {
        width: 340px;
        height: 13px;
        text-align: right;
        line-height: 13px;
        font-size: 13px;
        color: #fa8072;
    }
</style>