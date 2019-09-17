<template>
    <div class="sys-bar-title">
        <div class="logo">
            LOGO&NAME
        </div>
        <div class="logreg">
            <i class="el-icon-user-solid"></i>
            {{logreg}}
        </div>
    </div>
</template>
<script>
import zh_CN from '../../../static/locale/zh_CN.js'

export default {
    name: 'barTab',
    props: ['nameId'],
    data() {
        return {
            logreg: zh_CN.logreg,
        }
    }
}
</script>
<style scoped>
    .sys-bar-title {
        width: 100%;
        height: 40px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .logo {
        width: 150px;
        text-align: left;
        font-size: 20px;
        font-weight: 400;
        line-height: 40px;
        float: left;
    }
    .logreg {
        width: 150px;
        text-align: right;
        font-size: 20px;
        line-height: 40px;
        float: right;
        cursor: pointer;
    }
</style>