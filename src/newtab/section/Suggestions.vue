<template>
    <div id="suggestions">
        <swiper :options="swiperOption" ref="mySwiper">
            <div class="swiper-pagination" slot="pagination"></div>
            <swiper-slide v-for="page in Math.ceil(totalSize/(rowNumber*itemNumber))">
                <draggable v-model="itemNumber">
                    <div v-for="row in (totalSize-(page-1)*rowNumber*itemNumber)/itemNumber <= 1?1:2">
                        <suggestion-item :item-number="itemNumber" v-for="item in (totalSize-(page-1)*rowNumber*itemNumber-(row-1)*itemNumber)
                    <itemNumber?(totalSize-(page-1)*rowNumber*itemNumber-(row-1)*itemNumber):itemNumber">
                        </suggestion-item>
                    </div>
                </draggable>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <el-button @click="changeItem(8)">8</el-button>
        <el-button @click="changeItem(7)">7</el-button>
        <el-button @click="changeItem(6)">6</el-button>
        <el-button @click="changeItem(5)">5</el-button>
        <el-button @click="changeItem(4)">4</el-button>
    </div>
</template>
<script>
import SuggestionItem from '../component/SuggestionItem.vue'
import Draggable from 'vuedraggable'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'suggestions',
    components: {
        SuggestionItem,
        swiper,
        swiperSlide,
        Draggable
    },
    data(){
        return{
            rowNumber: 2,
            itemNumber: 6,
            totalSize: 21,
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    methods:{
        changeItem:function (num) {
            console.log(this.itemNumber)
            this.itemNumber = num;
            console.log(this.itemNumber+'  hhh')
        }
    }

}
</script>
<style scoped>
    #suggestions{
        margin-top: 60px;
        height: 0;
        width: 1100px;
    }

</style>