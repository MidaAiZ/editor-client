<template>
    <div class="suggestion-item" :style="width">
        <div class="item-img-container">
            <span class="item-img-del displayNone" :style="itemImageStyle"></span>
            <img :src="itemInfo.img" :style="itemImageStyle"
                 class="item-img" @mouseover="clickItem" @mouseleave="leaveItem"/>
        </div>
        <div class="item-name" @mouseover="clickItem" @mouseleave="leaveItem" :style="itemNameStyle">
            {{itemInfo.title}}
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'suggestions',
        props: ['itemInfo','dragging'],
        computed:{
            ...mapState('settings',['fontColorValue','fontSizeValue','iconSizeValue','iconRadiusValue','iconLayout']),
            width:function () {
                return{
                    'width': 100.0/this.iconLayout.col+'%',
//                    'height': 16+'vh',
                    'margin-bottom': 20+'px'
                }
            },
            itemNameStyle:function () {
                return{
                    'color': this.fontColorValue,
                    'font-size': this.fontSizeValue+'px'
                }
            },
            itemDelStyle:function () {
                return{
                    'width': 5.0*this.iconSizeValue/50 + 'vw',
                    'height': 5.0*this.iconSizeValue/50 + 'vw',
                    'border-radius': this.iconRadiusValue + '%'
                }
            },
            itemImageStyle:function () {
                let imgStyle = {
                    'width': '',
                    'height': '',
                    'border-radius': this.iconRadiusValue + '%'
                };
                let col = this.iconLayout.col;
                switch (this.iconLayout.row){
                    case 2:
                        if(col === 4){
                            imgStyle.width = (6.0+(this.iconSizeValue-50)/50.0)+1+'vw';
                            imgStyle.height = (6.0+(this.iconSizeValue-50)/50.0)+1+'vw';
                        }else {
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 25) * 3 / (this.iconLayout.row + 1) + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 25) * 3 / (this.iconLayout.row + 1) + 'vw';
                        }
                        break;
                    case 3:
                        if (col === 3 || col === 4 || col === 5){
                            imgStyle.width = (6.0+(this.iconSizeValue-50)/50.0)+1+'vw';
                            imgStyle.height = (6.0+(this.iconSizeValue-50)/50.0)+1+'vw';
                        }else{
                            imgStyle.width = (6.0 + (this.iconSizeValue - 50) / 25) * 3 / (this.iconLayout.row + 1) + 'vw';
                            imgStyle.height = (6.0 + (this.iconSizeValue - 50) / 25) * 3 / (this.iconLayout.row + 1) + 'vw';
                        }
                        break;
                    default:
                }
                return imgStyle
            }

        },
        data(){
            return{

            }
        },
        methods:{
            clickItem(){
                this.$emit('change');
//                console.log('sdfsd')
            },
            leaveItem(){
                this.$emit('leave')
            }
        }
    }
</script>
<style scoped>
    @import '../component/style/suggestion.css';
    .suggestion-item{
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
    .item-name{
        text-align: center;
        /*font-size:15px;*/
        padding-top: 15px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        /*color: #ffffff;*/
        opacity:0.9;
    }
    .item-img-container{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>