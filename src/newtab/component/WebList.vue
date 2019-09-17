<template>
    <div class="web-list-wrap">
        <el-menu
            default-active="2"
            class="web-list-menu">
            <el-menu-item v-for="(value, index) in menuListName" v-bind:key="value" :index="index">
                <span class="menu-title" slot="title">{{value}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import zh_CN from '../../../static/locale/zh_CN.js'
console.log(zh_CN.appTypeList)
export default {
    name: 'webList',
    data() {
        return {
            menuListName: zh_CN.appTypeList
        }
    },
}
</script>
<style scoped>
    .web-list-wrap {
        width: 100%;
        margin-top: 25px;
        overflow: auto;
    }
    .web-list-menu {
        width: 150px;
        height: calc(100vh - 150px);
        overflow: auto;
    }
    .menu-title {
        padding-left: 20px;
    }
</style>