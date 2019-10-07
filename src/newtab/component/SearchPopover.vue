<template>
    <div id="search-popover" :style="borderRadius">
        <span class="search-engine-container" v-for="(item,index) in engineList">
            <div class="search-engine">
                <span v-if="index === engineList.length-1" class="add-icon">
                    <span class="icon-container"><i class="el-icon-circle-plus-outline"></i></span>
                </span>
                <img v-else :src="item.img" class="engine-img"/>
                <div class="engine-name">{{item.name}}</div>
            </div>
        </span>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        computed:{
            ...mapState('homeWebList',['searchEngineList']),
            ...mapState('settings',['searchBarRadiusValue']),
            borderRadius:function () {
                return{
                    'border-radius': 4.0*(this.searchBarRadiusValue*2.0)/100+'vh'
                }
            },
            engineList:function () {
                let result = this.searchEngineList;
                result.push({
                    'name': '添加'
                });
                return result
            }
        },
        data(){
            return{
//                isShow:false
            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    #search-popover{
        width: 40vw;
        padding: 0;
        overflow: hidden;
        background-color:white;
    }
    .search-engine-container{
        display:inline-block;
        width: 20%;
        height: 6vw;
        cursor: pointer;
        background-color: white;
        margin: 0;
        padding: 0;
        transition: background ease .2s;
        /*align-items:center;*/
        /*justify-content:center;*/
    }
    .search-engine-container:hover{
        background-color: #dddddd;
    }
    .search-engine{
        /*min-height: 85px;*/
        width: 100%;
        height: 100%;
        display: flex;
        margin:0;
        padding:0;
        /*flex-direction: column;*/
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .engine-img{
        width: 2vw;
        height: 2vw;
        margin-bottom: 10px;
    }
    .engine-name{
        font-size:12px;
        line-height: 1.2;
        max-width: 100%;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .engine-add-container{
        display:inline-block;
        width: 20%;
        height: 6vw;
        cursor: pointer;
        background-color: white;
        margin: 0;
        padding: 0;
        transition: background ease .2s;
    }
    .engine-add-container:hover{
        background-color: #dddddd;
    }
    .engine-add{
        width: 100%;
        height: 100%;
        display: flex;
        margin:0;
        padding:0;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .engine-add-icon{

        /*display: flex;*/
        border: 1px #ccc dashed;
        /*font-size: 2vw;*/
        /*font-weight: bold;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*font-size: 2vw;*/

    }
    .add-icon{
        /*padding: 0;*/
        width: 2vw;
        height: 2vw;
        margin-bottom: 10px;
        /*border: 1px #ccc dashed;*/
        position:relative;
        /*font-size: 1.5vw;*/
        /*line-height: 2vw;*/
        /*text-align:center;*/
    }
    .icon-container{
        position: absolute;
        left: 50%;
        top:50%;
        font-size: 2vw;
        transform: translate(-50%,-50%);
    }
</style>