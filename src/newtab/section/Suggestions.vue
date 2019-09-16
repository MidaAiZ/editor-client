<template>
    <div id="suggestions">
        <swiper :options="swiperOption">
            <swiper-slide>777</swiper-slide>
            <swiper-slide>777777</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!--<swiper-slide v-for="page in Math.ceil(totalSize/(rowNumber*itemNumber))">-->
                <!--<el-row :gutter="40" v-for="line in rowNumber">-->
                    <!--<suggestion-item v-for="item in totalSize-rowNumber*itemNumber-(line-1)*itemNumber>itemNumber?-->
                    <!--itemNumber:(totalSize-rowNumber*itemNumber-(line-1)*itemNumber)%itemNumber">-->
                    <!--</suggestion-item>-->
                <!--</el-row>-->
            <!--</swiper-slide>-->
        </swiper>
    </div>
</template>
<script>
import SuggestionItem from '../component/SuggestionItem.vue'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
    name: 'suggestions',
    components: {
        SuggestionItem,
        swiper,
        swiperSlide
    },
    data(){
        return{
            rowNumber: 2,
            itemNumber: 5,
            totalSize: 15,
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    }
}
</script>
<style scoped>
    #suggestions{
        margin-top: 60px;
    }
</style>