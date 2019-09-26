<template>
    <div>
        <div v-if="filter === 'login'" class="logreg-wrap">
            <input class="logreg-input" :placeholder="userAccountPlaceholder" :value="loginEmail" @input="inputLogin($event.target.value, 'loginEmail')" />
            <input class="logreg-input" :placeholder="pswPlaceholder" type="password" :value="loginPassword" @input="inputLogin($event.target.value, 'loginPassword')" />
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
            <input class="logreg-input" :placeholder="userAccountPlaceholder" />
            <input class="logreg-input" :placeholder="pswPlaceholder" />
            <div class="forget-psw-wrap">
                {{forgetPsw}}
            </div>
            <div class="log-or-reg">
                <el-button class="login-btn" type="primary">{{regBtn}}</el-button>
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
        ...mapState('user', ['loginEmail', 'loginPassword', 'loginLoading']),
        ...mapState('locale', [
            'location',
        ])
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
        ...mapMutations('user', [
        'setLoginInfo',
        'setLoginLoading',
        ]),
        ...mapActions('user', [
        'login',
        ]),
    }
}
</script>
<style scoped>
    .logreg-wrap {
        width: 100%;
        padding: 20px;
    }
    .logreg-input {
        width: 320px;
        height: 40px;
        border-radius: 6px;
        margin-top: 15px;
        border: 0;
        background-color: #efefef;
        outline: 0;
        text-indent: 20px;
    }
    .forget-psw-wrap {
        width: 320px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        padding-right: 20px;
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
        margin-left: 65px;
        height: 40px;
        border-radius: 40px;
    }
    .new-user-btn {
        width: 190px;
        margin-left: 65px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-weight: lighter;
        margin-top: 20px;
        cursor: pointer;
    }
</style>