<template>
    <div>
        <div v-if="filter === 'login'" class="logreg-wrap">
            <input class="logreg-input" :placeholder="userAccountPlaceholder" :value="loginEmail" @input="inputLogin($event.target.value, 'loginEmail')" />
            <input class="logreg-input" :placeholder="pswPlaceholder" type="password" :value="loginPassword" @input="inputLogin($event.target.value, 'loginPassword')" />
            <div class="forget-psw-wrap">
                {{forgetPsw}}
            </div>
            <div class="log-or-reg">
                <el-button class="login-btn" @click="login" type="primary">{{loginBtn}}</el-button>
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../static/locale/zh_CN.js'

export default {
    name: 'logreg',
    data() {
        return {
            userAccountPlaceholder: zh_CN.userAccountPlaceholder,
            pswPlaceholder: zh_CN.pswPlaceholder,
            loginBtn: zh_CN.login,
            regBtn: zh_CN.register,
            forgetPsw: zh_CN.forgetPsw,
            newUser: zh_CN.newUser,
            backToLog: zh_CN.backToLog,
            filter: "login",
        }
    },
    computed: {
    ...mapState('user', ['loginEmail', 'loginPassword']),
  },
  methods: {
    inputLogin (value, type) {
        this.setLogInfo({
            type,
            value,
        })
    },
    login() {
        console.log(this.loginEmail, this.loginPassword)
    },
    ...mapMutations('user', [
      'setLogInfo',
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