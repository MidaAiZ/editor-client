<template>
    <div id="suggestions" :style="suggestionsWidth">
        <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':isDrag}">
            <swiper-slide v-for="page in pagingArray">
                <!--<div v-for="(row,index) in page">-->
                    <draggable v-model="page[index]" v-bind="dragOptions" :list="item" @start="onStart" @end="onEnd">
                        <transition-group type="transition" name="list-complete" tag="div">
                            <suggestion-item :item-number="itemNumber" :dragging="dragging" v-for="item in page" v-on:click.stop.prevent
                                             :item-info="item" :key="item.id" v-on:change="changeDrag" v-on:leave="leaveDrag" class="list-complete-item">
                            </suggestion-item>
                        </transition-group>
                    </draggable>
                <!--</div>-->
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <el-button @click="changeItem(8)">8</el-button>
        <el-button @click="changeItem(7)">7</el-button>
        <el-button @click="changeItem(6)">6</el-button>
        <el-button @click="changeItem(5)">5</el-button>
        <el-button @click="changeItem(4)">4</el-button>
        <draggable v-model="myArray">
            <transition-group type="transition" name="flip-list">
                <div v-for="element in myArray" :key="element.id">
                    {{element.name}}
                </div>
            </transition-group>
        </draggable>
        <draggable v-model="pagingArray">
            <suggestion-item :item-number="itemNumber" v-for="item in homeWebList" v-on:click.stop.prevent
                             :item-info="item" :key="item.id">
            </suggestion-item>
        </draggable>
    </div>
</template>
<script>
import SuggestionItem from '../component/SuggestionItem.vue'
import draggable from 'vuedraggable'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapState, mapGetters } from 'vuex'
import homeWebList from "src/newtab/store/modules/homeWebList";
import '../component/style/suggestion.css'
export default {
    name: 'suggestions',
    components: {
        SuggestionItem,
        swiper,
        swiperSlide,
        draggable
    },
    computed:{
        dragOptions(){
            return{
                animation: 200,
//                handle: ".drag-handle",
                group: "description",
                disable:false,
                ghostClass: "ghost",

//                chosenClass: "sortable",
//                forceFallback: true
            }
        },
        width:function () {
            return{
                'width': 10*this.itemNumber+'vw'
            }
        },
        ...mapState('homeWebList',['homeWebList']),
        ...mapGetters('homeWebList',['totalSize','pagingArray']),
    },
    data(){
        return{
            itemNumber:6,
            isDrag:false,
            dragging: false,
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            myArray:[
                {
                    id:1,
                    name: 1
                },
                {
                    id:2,
                    name: 2
                },
                {
                    id:3,
                    name: 3
                },
                {
                    id:4,
                    name: 4
                }
            ]
        }
    },
    created(){
      console.log(this.pagingArray)
    },
    methods:{
        changeItem:function (num) {
//            console.log(this.itemNumber);
//            this.itemNumber = num;
//            console.log(this.itemNumber+'  hhh')
        },
        changeDrag(){
//            console.log(this.isDrag);
            this.isDrag = true;
//            console.log(this.isDrag);
        },
        leaveDrag(){
            this.isDrag = false;
        },
        onStart(){
            this.dragging = true;
        },
        onEnd(){
            this.dragging = false;
        }

    }

}
</script>
<style scoped>
    /*@import '../component/style/suggestion.css';*/
    #suggestions{
        margin-top: 60px;
        height: 0;
        width: 1100px;
    }
    .list-complete-item {
        transition: all 1s;
    }

    .flip-list-move {
        transition: transform 1s;
    }
    .no-move {
        transition: transform 0s;
    }
</style>