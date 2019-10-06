<template>
    <div id="custom-search" :style="searchStyle">
        <div id="search-tab-container">
            <span v-for="(item,index) in tabList" class="search-tab" :class="{searchClick:index === tabIndex}" @click="changeTab(index)">{{item}}</span>
        </div>
        <div id="search-input-container">
            <span class="input-icon-container" :style="inputIconStyle">
                <img src="https://picsum.photos/50/50" class="input-icon"/>
                <div class="select-triangle"></div>
            </span>
            <input :placeholder="searchPlaceholder" class="search-input" :style="searchInputStyle" @focus="inputFocus" @blur="inputBlur"/>
        </div>
    </div>
</template>
<script>
import zh_CN from '../../../static/locale/zh_CN.js'
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState('settings',['searchBarSizeValue','searchBarRadiusValue','searchBarOpacityValue']),
        inputIconStyle:function () {
            return{
                'border-radius': 4.0*(this.searchBarRadiusValue*2.0)/100+'vh'+' 0 0 '+4.0*(this.searchBarRadiusValue*2.0)/100+'vh'
//                'height': 5*(50.0+this.searchBarSizeValue)/100+'vh',
            }
        },
        searchInputStyle:function () {
            return{
                'border-radius': 4.0*(this.searchBarRadiusValue*2.0)/100+'vh'
            }
        },
        searchStyle:function () {
            return{
                'transform':'scale('+(50.0+this.searchBarSizeValue)/100+')',
                'opacity': this.searchBarOpacityValue/100.0
            }
        }
    },
    data(){
        return{
            tabList:zh_CN.searchTab,
            searchPlaceholder: zh_CN.searchPlaceholder,
            tabIndex:0
        }
    },
    methods:{
        changeTab(index){
            this.tabIndex = index;
        },
        inputFocus(){
            document.getElementById('custom-search').style.opacity = 1;
        },
        inputBlur(){
            document.getElementById('custom-search').style.opacity = this.searchBarOpacityValue/100.0;
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
        color: white;
        opacity: 0.65;
        border-bottom: 2px solid transparent
    }
    .search-tab:hover{
        opacity: 0.9;
        border-bottom: 2px solid #ffc81f
    }
    .searchClick{
        border-bottom: 2px solid #ffc81f
    }
    #search-input-container{
        display: flex;
        align-items: center;
        position: relative;
    }
    .search-input{
        border-radius:4vh;
        /*height: 35px;*/
        outline-style:none;
        border-width:0;
        padding-left:75px;
        padding-right: 20px;
        width:30vw;
        height: 6vh;
        font-size: 16px;
        background: white;
    }
    .input-icon{
        height: 30px;
        width:30px;
    }
    .input-icon-container{
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        width:65px;
        cursor:pointer;
        transition: background ease 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .input-icon-container:hover{
        background-color: #eeeeee;
    }
    .select-triangle{
        position: absolute;
        top:50%;
        right: 5px;
        width: 0;
        height: 0;
        border-top: 8px solid #999;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
    }
</style>