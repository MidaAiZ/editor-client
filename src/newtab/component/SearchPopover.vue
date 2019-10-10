<template>
    <div id="search-popover" :style="borderRadius">
        <span class="search-engine-container" v-for="(item,index) in engineList" @click="changeEngine(index)" :key="index">
            <div class="search-engine">
                <span v-if="index === engineList.length-1" class="add-icon">
                    <span class="icon-container"><i class="el-icon-circle-plus-outline"></i></span>
                </span>
                <img v-else :src="item.img" class="engine-img"/>
                <div class="engine-name">{{item.name}}</div>
            </div>
        </span>
        <el-drawer :visible="drawer" size="500px" @close="drawerClose()" :show-close="false">
            <div slot="title" class="engine-drawer-top">
                <span class="engine-drawer-title">{{nameText.search}}</span>
                <span class="engine-drawer-close" @click="drawerClose()">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <div>
                <div style="display:flex">
                    <span class="engine-drawer-tab" :class="{'backgroundColor':isDefault}" @click="isDefault=true">{{nameText.default}}</span>
                    <span class="engine-drawer-tab" :class="{'backgroundColor':!isDefault}" @click="isDefault=false">{{nameText.custom}}</span>
                </div>
                <div v-if="isDefault">
                    <div class="engine-list-container">
                        <div class="engine-list-item" v-for="(item,index) in allEngineList" :key="item.id">
                            <span style="display: flex;align-items: center">
                                <img :src="item.img"/>
                                <span class="engine-item-name">{{item.name}}</span>
                            </span>
                            <el-switch v-model="item.isChoose" @change="changeChoose(index)"></el-switch>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="custom-engine">
                        <div>
                            <div class="not-add-engine-text">{{nameText.notAddCustomEngine}}</div>
                            <button class="add-custom-engine-button">{{nameText.addNewSearchEngine}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapState('engineList',['searchEngineList','allEngineList']),
            ...mapState('settings',['searchBarRadiusValue']),
            borderRadius:function () {
                return{
                    'border-radius': 4.0*(this.searchBarRadiusValue*2.0)/100+'vh'
                }
            },
            engineList:function () {
                let result = this.searchEngineList.slice();
                result.push({
                    'name': '添加'
                });
                console.log(this.searchEngineList);
                return result
            },
            nameText:function () {
                return{
                    search: '搜索',
                    default: '默认',
                    custom: '自定义',
                    notAddCustomEngine: '没有添加任何自定义搜索引擎',
                    addNewSearchEngine: '添加新的搜索引擎'
                }
            }
        },
        data(){
            return{
                drawer: false,
                isDefault: true,
//                isShow:false
            }
        },
        methods:{
            ...mapMutations('engineList',['DELETE_CHOOSE_ENGINE','ADD_CHOOSE_ENGINE','CHANGE_CURRENT_ENGINE']),
            changeEngine:function (index) {
                if(index === this.engineList.length-1){
                    this.drawer = true;
                }else{
                    this.CHANGE_CURRENT_ENGINE(index);
                }
            },
            drawerClose(){
                this.drawer = false;
            },
            changeChoose(index){
                if (this.allEngineList[index].isChoose){
                    this.ADD_CHOOSE_ENGINE(index);
                }else{
                    this.DELETE_CHOOSE_ENGINE(index);
                }
            }
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
    .engine-drawer-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .engine-drawer-title{
        font-size: 20px;
        font-weight: bold;
    }
    .engine-drawer-close{
        font-size: 20px;
        cursor:pointer;
    }
    .engine-drawer-tab{
        text-align: center;
        padding-top: 11px;
        padding-bottom: 11px;
        font-size: 13px;
        color: #656565;
        transition:background ease 0.2s;
        flex-grow: 1;
        background-color: #eee;
        cursor: pointer;
    }
    .backgroundColor{
        background-color: transparent;
    }
    .engine-list-container{
        padding: 20px 30px
    }
    .engine-list-item{
        display:flex;
        align-items: center;
        justify-content: space-between;
        font-size:14px;
        line-height:1.3;
        color: #656565;
        margin-bottom:20px;
    }
    .engine-list-item img{
        width:20px;
        height: 20px;
        margin-right: 12px;
    }
    .engine-item-name{
        max-width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
    }
    .custom-engine{
        padding: 20px 30px;
    }
    .not-add-engine-text{
        color: #ffc81f;
        font-size: 13px;
        line-height: 20px;
        margin-bottom: 20px;
    }
    .add-custom-engine-button{
        width: 100%;
        background-color: #ffc81f;
        color: white;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        border:none;
        outline: none;
        cursor: pointer;
    }
</style>