<template>
    <div id="custom-search">
        <div id="search-tab-container">
            <span v-for="(item,index) in tabList" class="search-tab">{{item}}</span>
        </div>
        <div id="search-input-container">
            <span class="input-icon-container">
                <img src="https://picsum.photos/50/50" class="input-icon"/>
            </span>
            <input :placeholder="searchPlaceholder" class="search-input"/>
        </div>
    </div>
</template>
<script>
import zh_CN from '../../../static/locale/zh_CN.js'
export default {
    data(){
        return{
            tabList:zh_CN.searchTab,
            searchPlaceholder: zh_CN.searchPlaceholder
        }
    }
}
</script>
<style scoped>
    /*.el-input{*/
        /*border-radius: 20px;*/
        /*height: 40px;*/
    /*}*/
    #custom-search{
        display: inline-block;
    }
    #search-tab-container{
        padding-left: 35px;
        margin-bottom: 15px;
    }
    .search-tab{
        font-size: 16px;
        margin-right: 45px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all ease .2s;
        padding-bottom: 3px;
        color: #777777;
        border-bottom: 2px solid transparent
    }
    .search-tab:hover{
        color: #999999;
    }
    #search-input-container{
        display: flex;
        align-items: center;
    }
    .search-input{
        border-radius:35px;
        height: 35px;
        outline-style:none;
        border:1px solid #ccc;
        padding: 7px 20px 7px 50px;
        width:600px;
        font-size: 18px;
        background: transparent;
    }
    .input-icon{
        height: 36px;
        width:36px;
    }
    .input-icon-container{
        margin-right: -50px;
    }
</style>