<template>
    <div class="suggestion-item" :style="width" :class="{'my-shake': isEdit, 'is_delete': isDelete}">
        <div class="item-img-container" :class="{'is_delete': isDelete}">
            <span class="item-img-close" @mouseover="closeHover" @click.prevent.stop="deleteOneSite" v-show='isEdit'>
                <i class='el-icon-close'></i>
            </span>
            <span class="item-img-del displayNone" :style="itemImageStyle"></span>
            <div :style="itemImageStyle" @mouseover="clickItem" @mouseleave="leaveItem" class="item-img" id="item-img"
                @click.prevent.stop='toNewSite' @mouseup="itemEdit" 
                @contextmenu.stop.prevent="contextMenu"
            >
                <img :src="itemInfo.isWeather ? currentIcon : src" class='handle-img'/>
                <div class="item-img-mask" v-show="isHover&&isEdit" @click='editDrawerShow'>
                    <img :src='editImg'/>
                </div>
            </div>
        </div>
        <div class="item-name" @mouseover="clickItem1" @mouseleave="leaveItem1" :style="itemNameStyle">
            <span v-if="itemInfo.isWeather">{{currentTmp || 'weather'}}</span>
            <span v-else>{{itemInfo.title}}</span>
        </div>
    </div>
</template>
<script>
    import {
        mapState,mapMutations,mapActions
    } from 'vuex';
    import './style/shakeRotate.scss';
    import draggable from 'vuedraggable';
    import localeText from '../../../static/locale/index.js';
    import { openSite } from '../services/openSite.js';
    import { imgToBase64, NoIconFunc } from '../utils/localSave.js';
    // const editIcon = require('../../../static/img/edit.svg')
    export default {
        name: 'suggestions',
        components: {
            draggable,
        },
        props: ['itemInfo', 'pageIndex', 'itemIndex', 'dragging'],
        computed: {
            ...mapState('settings', ['fontColorValue', 'fontSizeValue', 'iconSizeValue', 'iconRadiusValue',
                'iconLayout','newSiteNewTabValue']),
            ...mapState('locale', ['location']),
            ...mapState('weather', ['currentTmp', 'currentIcon']),
            ...mapState('homeWebList',['isEdit','editDrawerVisible']),
            src: function(){
                    let itemInfo = this.itemInfo;
                    if(itemInfo.iconBase64) {
                        return itemInfo.iconBase64
                    } else {
                        return itemInfo.iconSrc
                    }
            },
            width: function () {
                let widthStyle = {
                    'width': 100.0 / this.iconLayout.col + '%',
                    'height': '',
                }
                if(this.iconLayout.row === 2){
                    if(this.iconLayout.col === 4){
                        widthStyle.height = (16+7) + 'vh'
                    }else{
                        widthStyle.height = (13+9) + 'vh'
                    }
                }else{
                    if(this.iconLayout.col===3|| this.iconLayout.col===4){
                        widthStyle.height = (16+5) + 'vh'
                    }else if(this.iconLayout.col === 5){
                        widthStyle.height = (14+5) + 'vh'
                    }else{
                        widthStyle.height = (13+5) + 'vh'
                    }
                }
                return widthStyle;

            },
            itemNameStyle: function () {
                return {
                    'color': this.fontColorValue,
                    'font-size': this.fontSizeValue + 'px'
                }
            },
            itemDelStyle: function () {
                return {
                    'width': 5.0 * this.iconSizeValue / 50 + 'vw',
                    'height': 5.0 * this.iconSizeValue / 50 + 'vw',
                    'border-radius': this.iconRadiusValue + '%'
                }
            },
            itemImageStyle: function () {
                let imgStyle = {
                    'width': '',
                    'height': '',
                    'border-radius': this.iconRadiusValue + '%',
                };
                let col = this.iconLayout.col;
                switch (this.iconLayout.row) {
                    case 2:
                        if (col === 4) {
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 50.0) + 0.9 + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 50.0) + 0.9 + 'vw';
                        }else if(col === 5){
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 25)+'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 25)+'vw';
                        } else {
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 25) * 5 / (this.iconLayout.row +
                                4) + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 25) * 5 / (this.iconLayout.row +
                                4) + 'vw';
                        }
                        break;
                    case 3:
                        if (col === 3 || col === 4) {
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 50.0) + 0.2 + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 50.0) + 0.2 + 'vw';
                        } else if (col === 5) {
                            imgStyle.width = (5.5 + (this.iconSizeValue - 50) / 25) + 'vw';
                            imgStyle.height = (5.5 + (this.iconSizeValue - 50) / 25) + 'vw';
                        } else {
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 25) * 7 / (this.iconLayout.row +
                                5) + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 25) * 7 / (this.iconLayout.row +
                                5) + 'vw';
                        }
                        break;
                    default:
                }
                return imgStyle
            },
            edit: function() {
                return localeText[this.location].edit
            },
        },
        data() {
            return {
                isHover: false,
                editImg: require('../../../static/img/edit.svg'),
                isDelete: false,
                isWeather: false,
                // isEdit: false
            }
        },
        methods: {
            ...mapMutations('homeWebList',[
                'CHANGE_IS_EDIT',
                'EDIT_DRAWER_VISIBLE',
                'CHANGE_CURRENT_ITEM',
            ]),
            ...mapMutations('drawersVis',[
                'SET_WEATHER_DRAWER',
                'SET_SETTINGVIS'
            ]),
            ...mapActions('homeWebList',[
                'deleteOne'
            ]),
            ...mapActions('weather', ['getCurrentWeather']),
            clickItem() {
                this.isHover = true;
                this.$emit('change');
            },
            leaveItem() {
                this.isHover = false;
                this.$emit('leave')
            },
            clickItem1() {
                this.$emit('change');
            },
            leaveItem1() {
                this.$emit('leave')
            },
            toNewSite(){
                // this.CHANGE_IS_EDIT(false)
                let itemInfo = this.itemInfo;
                let siteObj = {
                    siteId: itemInfo.siteId,
                    siteUrl: itemInfo.url,
                    siteTitle: itemInfo.title
                };
                let cbFunc;
                let that = this;
                if(this.itemInfo.url.indexOf('tabplus://weather') === 0) {
                    cbFunc = function() {
                        that.SET_WEATHER_DRAWER(true)
                    }
                }
                if(this.itemInfo.url.indexOf('tabplus://settings') === 0) {
                    cbFunc = function() {
                        that.SET_SETTINGVIS(true)
                    }
                }
                openSite(siteObj, this.newSiteNewTabValue ? 'newtab' : '', cbFunc);
                // window.open(this.itemInfo.url,!this.newSiteNewTabValue);
                
                
            },
            folderDragEnd() {
                // console.log('fuck')
            },
            itemEdit(e){
                // e.preventDefault();
                if (e.button === 2) {
                    this.CHANGE_IS_EDIT(true);
                    // this.isEdit = true;
                }
            },
            contextMenu(e){
                e.preventDefault();
            },
            closeHover:function(e){
                // e.preventDefault();
                e.stopPropagation();
                this.isHover = false;
            },
            editDrawerShow(e){
                e.stopPropagation();
                let payload = {
                    isNew: false,
                    itemInfo: this.itemInfo,
                    pageIndex: this.pageIndex,
                    itemIndex: this.itemIndex
                }
                // this.$emit("current",this.itemInfo);
                this.CHANGE_CURRENT_ITEM(payload);
                this.CHANGE_IS_EDIT(false);
                this.EDIT_DRAWER_VISIBLE(true)
            },
            // moveFolder() {
            //     console.log('fffuck')
            // },
            deleteOneSite() {
                let payload = {
                    pageIndex: this.pageIndex,
                    itemInfo: this.itemInfo,
                    index: this.itemIndex
                }
                clearTimeout(deleteTime);
                let that = this;
                this.isDelete = true;
                let deleteTime = setTimeout(() => {
                    that.isDelete = false;
                    that.deleteOne(payload);
                }, 10);
            }
        },
        created() {
            if(this.itemInfo.isWeather) {
                // this.isWeather = true;
                let lang = this.location
                let payload = {
                    location: 'auto_ip',
                    lang: this.location
                }
                this.getCurrentWeather(payload)
            }
        },
        mounted(){
            let self = this
            document.onclick=function(){
                self.CHANGE_IS_EDIT(false);
            }
        }
    }
</script>
<style scoped>
    @import '../component/style/suggestion.css';

    .suggestion-item {
        position: relative;
        display: inline-block;
        padding-top: 8px;
        /* transition: left .5s ease */
        /*margin-bottom: 20px;*/
        /*transition: all .5s;*/
        /*height:50%;*/
    }

    .item-name {
        text-align: center;
        /*font-size:15px;*/
        padding-top: 10px;
        width: 80%;
        margin-left: 10%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        /*color: #ffffff;*/
        opacity: 0.9;
        font-size: 12px;
    }

    .item-img-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .item-img{
        position:relative;
        background-color:rgba(255, 255, 255,0.9);
        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; */
        overflow: hidden;
    }
    .item-img img{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .item-img-mask{
        position: absolute;
        top:0;
        left: 0;
        bottom:0;
        right: 0;
        border-radius: 50%;
        background-color:rgba(255, 255, 255,0.6);
        cursor: pointer;
        transition: all ease .3s;
        transform: translate3d(0,0,0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .item-img-mask img{
        width: 40%;
        height: 40%
    }
    .item-img-close{
        position:absolute;
        right: 20%;
        top: 8%;
        background-color: rgba(255, 255, 255,0.7);
        font-size: 130%;
        font-weight: 400;
        width: 20px;
        height: 20px;
        border-radius: 20px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 11;
        /* opacity: 0.8; */
        box-shadow: #ccc 0 0 2px;
        cursor: pointer;
    }
    .item-img-close:hover{
        background-color: rgba(255, 255, 255,1);
        /* transform: scale(1.1) */
    }
    .edit-drawer-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .edit-drawer-title {
        font-size: 20px;
        font-weight: bold;
    }

    .edit-drawer-close {
        font-size: 20px;
        cursor: pointer;
    }
    .folder {
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        /* bottom:0;
        right: 0; */
        border-radius: 50%;
        background-color:rgba(255, 255, 255,0.6);
        z-index: -1;
    }
</style>