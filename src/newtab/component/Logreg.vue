<template>
    <div class="logreg-wrap">
        <input class="logreg-input" :placeholder="userAccountPlaceholder" />
        <input class="logreg-input" :placeholder="pswPlaceholder" />
        <div class="forget-psw-wrap">
            {{forgetPsw}}
        </div>
        <div class="log-or-reg">
            <el-button class="login-btn" type="primary">{{loginBtn}}</el-button>
            <div class="new-user-btn">
                {{newUser}}
            </div>
        </div>
    </div>
</template>
<script>
import zh_CN from '../../../static/locale/zh_CN.js'

export default {
    name: 'logreg',
    data() {
        return {
            userAccountPlaceholder: zh_CN.userAccountPlaceholder,
            pswPlaceholder: zh_CN.pswPlaceholder,
            loginBtn: zh_CN.login,
            forgetPsw: zh_CN.forgetPsw,
            newUser: zh_CN.newUser
        }
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
    }
</style>