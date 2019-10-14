<template>
    <div class="suggestion-item" :style="width">
        <div class="item-img-container">
            <span class="item-img-del displayNone" :style="itemImageStyle"></span>
            <div :style="itemImageStyle" @mouseover="clickItem" @mouseleave="leaveItem" class="item-img" @click='toNewSite'>
                <img :src="itemInfo.img"/>
            </div>
        </div>
        <div class="item-name" @mouseover="clickItem" @mouseleave="leaveItem" :style="itemNameStyle">
            {{itemInfo.title}}
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'suggestions',
        props: ['itemInfo', 'dragging'],
        computed: {
            ...mapState('settings', ['fontColorValue', 'fontSizeValue', 'iconSizeValue', 'iconRadiusValue',
                'iconLayout','newSiteNewTabValue']),
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
                    'border-radius': this.iconRadiusValue + '%'
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
            }

        },
        data() {
            return {
                
            }
        },
        methods: {
            clickItem() {
                this.$emit('change');
                //                console.log('sdfsd')
            },
            leaveItem() {
                this.$emit('leave')
            },
            toNewSite(){
                window.open(this.itemInfo.url,!this.newSiteNewTabValue);
            }
        }
    }
</script>
<style scoped>
    @import '../component/style/suggestion.css';

    .suggestion-item {
        position: relative;
        display: inline-block;
        /*margin-bottom: 20px;*/
        /*transition: all .5s;*/
        /*height:50%;*/
    }

    /*.item-img{*/
    /*width:90px;*/
    /*height: 90px;*/
    /*border-radius: 50%;*/
    /*cursor: pointer;*/
    /*}*/
    /*.item-img-del{*/
    /*width:90px;*/
    /*height: 90px;*/
    /*border-radius: 50%;*/
    /*background: #c8ebfb;*/
    /*box-shadow: #ccc 0 0 2px;*/
    /*}*/
    /*.displayNone{*/
    /*display: none;*/
    /*}*/
    .item-name {
        text-align: center;
        /*font-size:15px;*/
        padding-top: 10px;
        width: 100%;
        text-overflow: ellipsis;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .item-img img{
        width: 60%;
        height: 60%;
    }
</style>