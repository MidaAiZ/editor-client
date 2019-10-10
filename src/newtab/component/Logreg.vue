<template>
    <div>
        <div v-if="filter === 'login'" class="logreg-wrap">
            <!-- <input 
                class="logreg-input"
                :placeholder="userAccountPlaceholder" 
                :value="loginEmail" 
                @input="inputLogin($event.target.value, 'loginEmail')" 
            /> -->
            <input 
                class="logreg-input"
                :placeholder="userName" 
                :value="loginNameValue" 
                @input="inputLogin($event.target.value, 'loginNameValue')" 
            />
            <input
                class="logreg-input"
                :placeholder="pswPlaceholder"
                type="password"
                :value="loginPassword" 
                @input="inputLogin($event.target.value, 'loginPassword')"
            />
            <div class="forget-psw-wrap">
                {{forgetPsw}}
            </div>
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
            <input
                class="logreg-input"
                :placeholder="userName" 
                @input="inputRegisterInfo($event.target.value, 'registerName')" 
            />
            <input 
                class="logreg-input" 
                :placeholder="pswPlaceholder" 
                type="password" 
                @input="inputRegisterInfo($event.target.value, 'registerPassword')" 
            />
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
            userAccountPlaceholder: '',
            pswPlaceholder: '',
            loginBtn: '',
            regBtn: '',
            forgetPsw: '',
            newUser: '',
            backToLog: '',
            filter: "login",
        }
    },
    computed: {
        ...mapState('user', ['loginNameValue', 'loginEmail', 'loginPassword', 'loginLoading']),
        ...mapState('locale', [
            'location',
        ]),
        userName: function() {
            return localeText[this.location].userName
        }
    },
    created: function() {
        this.userAccountPlaceholder = localeText[this.location].userAccountPlaceholder
        this.pswPlaceholder = localeText[this.location].pswPlaceholder
        this.loginBtn = localeText[this.location].login
        this.regBtn = localeText[this.location].register
        this.forgetPsw = localeText[this.location].forgetPsw
        this.newUser = localeText[this.location].newUser
        this.backToLog = localeText[this.location].backToLog
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
</style>