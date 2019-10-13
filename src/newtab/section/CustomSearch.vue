<template>
    <div id="custom-search" :style="searchStyle">
        <div id="search-tab-container">
            <span v-for="(item,index) in tabList" class="search-tab" :class="{searchClick:index === tabIndex}"
                @click="changeTab(index)" :key="index">{{item}}</span>
        </div>
        <div id="search-input-container">
            <el-popover placement="bottom-start" title="标题" trigger="manual" width="6vw" :style="popoverRadius"
                v-model="searchPopoverVisible" :visible-arrow="showArrow" popper-class="search-popover">
                <span class="input-icon-container" :style="inputIconStyle" slot="reference" @click="openPopover">
                    <img :src="currentSearchEngine.img" class="input-icon" />
                    <div class="select-triangle"></div>
                </span>
                <search-popover></search-popover>
            </el-popover>
            <el-popover placement="bottom-start" trigger="click" v-model="sugPopoverVisible" :visible-arrow="false"
                popper-class="search-popover">
                <input :placeholder="searchPlaceholder" v-model="inputValue" class="search-input"
                    :style="searchInputStyle" @focus="inputFocus" @blur="inputBlur" @keyup="inputChange"
                    slot="reference" />
                <div class='sug-container' :style='sugContainerBorder'>
                    <div class="sug-item" v-for="(item,index) in sugList" :key="index" @click="sugClick(index)">
                        {{item}}
                    </div>
                </div>
            </el-popover>

            <span class="input-clear-button" v-show="inputValue!==null&&inputValue!==''" @click="clearInput"><i
                    class="el-icon-close"></i></span>
        </div>
    </div>
</template>
<script>
    import zh_CN from '../../../static/locale/zh_CN.js'
    import searchPopover from '../component/SearchPopover.vue'
    import '../component/style/popover.css'
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import req from '../services/index.js'
    import {
        isObject
    } from 'util'
    export default {
        components: {
            searchPopover
        },
        props: ['isShow'],
        computed: {
            ...mapState('engineList', ['searchPopoverVisible', 'currentSearchEngine']),
            ...mapState('settings', ['searchBarSizeValue', 'searchBarRadiusValue', 'searchBarOpacityValue']),
            inputIconStyle: function () {
                return {
                    'border-radius': 4.0 * (this.searchBarRadiusValue * 2.0) / 100 + 'vh' + ' 0 0 ' + 4.0 * (this
                        .searchBarRadiusValue * 2.0) / 100 + 'vh'
                    //                'height': 5*(50.0+this.searchBarSizeValue)/100+'vh',
                }
            },
            searchInputStyle: function () {
                return {
                    'border-radius': 4.0 * (this.searchBarRadiusValue * 2.0) / 100 + 'vh'
                }
            },
            searchStyle: function () {
                return {
                    'transform': 'scale(' + (50.0 + this.searchBarSizeValue) / 100 + ')',
                    'opacity': this.searchBarOpacityValue / 100.0
                }
            },
            popoverRadius: function () {
                return {
                    'border-radius': 4.0 * (this.searchBarRadiusValue * 2.0) / 100 + 'vh' + ' !important'
                }
            },
            sugContainerBorder: function () {
                return {
                    'border-radius': 4.0 * (this.searchBarRadiusValue * 2.0) / 100 + 'vh'
                }
            },
        },
        data() {
            return {
                tabList: zh_CN.searchTab,
                searchPlaceholder: zh_CN.searchPlaceholder,
                tabIndex: 0,
                showArrow: false,
                popoverVis: false,
                inputValue: '',
                sugPopoverVisible: false,
                sugList: [],
                //            isShow: false
            }
        },
        methods: {
            ...mapMutations('engineList', ['OPEN_ENGINE_POPOVER']),
            changeTab(index) {
                this.tabIndex = index;
            },
            inputFocus() {
                document.getElementById('custom-search').style.opacity = 1;
                let self = this;
                document.onkeydown = function (event) {
                    let e = event || window.event || arguments.caller.arguments[0];
                    if (e && e.keyCode === 13 && this.inputValue !== '') {
                        self.search();
                    }
                }
            },
            inputBlur() {
                document.getElementById('custom-search').style.opacity = this.searchBarOpacityValue / 100.0;
                document.onkeydown = null;
            },
            showPopover() {
                this.$emit('show')
            },
            openPopover() {
                this.OPEN_ENGINE_POPOVER();
            },
            clearInput() {
                this.inputValue = '';
                this.sugList = [];
            },
            search() {
                let url = this.currentSearchEngine.url;
                url = url.replace('#content#', this.inputValue);
                window.open(url)
            },
            async inputChange() {
                console.log('change');
                let sugurl = {
                    p: 'http://suggestion.baidu.com/su',
                    m: 'GET'
                };
                let input = {
                    wd: this.inputValue,

                };
                const {
                    data
                } = await req(sugurl, input)
                console.log(data);
                let str = `${data}`;
                let regex = /\[(.*?)\]/g;
                let options = str.match(regex);
                this.sugList = eval('(' + options[options.length - 1] + ')');
                // if (str !== '') {
                //     str = str.replace(/\"/g, '');
                //     this.sugList = str.split(',');
                // }

                // console.log(str);
            },
            sugClick(index) {
                this.inputValue = this.sugList[index];
                this.search();
            },
            //取出中括号里的值
            getBracketStr(str) {
                let result = '';
                if (isObjectEmpty(str)) {
                    return result;
                }
                let regex = /\[(.+?)\]/g;
                let options = str.match(regex);
                if (!isObjectEmpty(options)) {
                    let option = options[0];
                    if (!isObjectEmpty(option)) {
                        result = option.substring(1, option.length - 1)
                    }
                }
                return
            }
        },
        mounted() {

        }
    }
</script>
<style scoped>
    /*.el-input{*/
    /*border-radius: 20px;*/
    /*height: 40px;*/
    /*}*/
    #custom-search {
        display: inline-block;
    }

    #search-tab-container {
        padding-left: 35px;
        margin-bottom: 15px;
    }

    .search-tab {
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

    .search-tab:hover {
        opacity: 0.9;
        border-bottom: 2px solid #ffc81f
    }

    .searchClick {
        border-bottom: 2px solid #ffc81f
    }

    #search-input-container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .search-input {
        border-radius: 4vh;
        /*height: 35px;*/
        outline-style: none;
        border-width: 0;
        padding-left: 75px;
        padding-right: 40px;
        width: 35vw;
        height: 7vh;
        font-size: 16px;
        background: white;
        box-sizing: border-box;
    }

    .input-icon {
        height: 30px;
        width: 30px;
    }

    .input-icon-container {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 65px;
        cursor: pointer;
        transition: background ease 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .input-icon-container:hover {
        background-color: #eeeeee;
    }

    .select-triangle {
        position: absolute;
        top: 50%;
        right: 5px;
        width: 0;
        height: 0;
        border-top: 8px solid #999;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
    }

    .displayNone {
        display: none;
    }

    .popover-show {
        position: absolute;
        left: 0;
        top: calc(100% + 10px);
        background-color: white;
        padding: 30px;
        z-index: 10001;
        width: 30vw;
    }

    .popover-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        transform: scale(2);
        background-color: black;
        z-index: 10000;
        -moz-opacity: 0.3;
        opacity: .30;
        filter: alpha(opacity=30);
    }

    .input-clear-button {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(-50%, -50%);
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
    }

    .sug-container {
        width: 35vw;
        overflow: hidden;
        box-sizing: border-box;
        background-color: white;
    }

    .sug-item {
        padding-left: 30px;
        padding-right: 30px;
        font-size: 16px;
        display: flex;
        align-items: center;
        padding-top: 3px;
        padding-bottom: 3px;
        cursor: pointer;
    }

    .sug-item:hover {
        background-color: #eee;
    }
</style>