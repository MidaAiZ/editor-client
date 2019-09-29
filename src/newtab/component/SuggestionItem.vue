<template>
    <div class="suggestion-item" :style="width">
        <div class="item-img-container">
            <span class="item-img-del displayNone"></span>
            <img :src="itemInfo.img"
                 class="item-img" @mouseover="clickItem" @mouseleave="leaveItem"/>
        </div>
        <div class="item-name" @mouseover="clickItem" @mouseleave="leaveItem">
            {{itemInfo.title}}
        </div>
    </div>
</template>
<script>

    export default {
        name: 'suggestions',
        props: ['itemNumber','itemInfo','dragging'],
        computed:{
            width:function () {
                return{
                    'width': 100/this.itemNumber+'%'
                }
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
        margin-bottom: 20px;
        transition: all .5s;
        height:50%;
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
        font-size:15px;
        padding-top: 20px;
        width: 100%;
    }
    .item-img-container{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>