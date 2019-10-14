<template>
    <div style="z-index:1">
        <div id="suggestions" :style="[suggestionsWidth,suggestionsHeight]">
            <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':isDrag}" style='height:100%'>
                <swiper-slide v-for="(page,index) in pagedArray" :key="index" class='suggestion-swiper'>
                    <draggable v-model="pagedArray[index]" v-bind="dragOptions" :move="onMove" @start="onStart"
                        @end="onEnd" @choose="onChoose" @change="onChange" @sort='onSort' @update='onUpdate'
                        @remove='onRemove' @add='onAdd'>
                        <transition-group type="transition" name="list-complete" tag="div" style='height: 100%'>
                            <suggestion-item :dragging="dragging" v-for="item in page" draggable="true"
                                :item-info="item" :key="item.id" v-on:change="changeDrag" @mousedown="mouse_down"
                                v-on:leave="leaveDrag" class="list-complete-item">
                            </suggestion-item>
                        </transition-group>
                    </draggable>
                </swiper-slide>
            </swiper>
        </div>
        <div class="bullet">
            <span v-for="(item, index) in pagedArray" :class="{ 'active':index===currentIndex }"
                @click="changeIndex(index)" :key="index">
            </span>
        </div>
    </div>

</template>
<script>
    import '../component/style/suggestion-swiper.css'
    import SuggestionItem from '../component/SuggestionItem.vue'
    import draggable from 'vuedraggable'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import {
        mapState,
        mapGetters
    } from 'vuex'
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
        computed: {
            pagedArray:function(){
                let result = []
                let rowNumber = this.iconLayout.row; //一页多少行
                let colNumber = this.iconLayout.col; //一行多少个
                let pages = Math.ceil(this.totalSize / (rowNumber * colNumber));
                let everyPageNumber = rowNumber * colNumber;
                for (let i = 0; i < pages; i++) {
                    let tempArray = (i === (pages - 1) ? this.sortArray.slice(i * everyPageNumber) : this.sortArray
                        .slice(i *
                            everyPageNumber, (i + 1) * everyPageNumber));
                    result.push(tempArray)
                }
                return result;
            },
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disable: false,
                    ghostClass: "ghost",
                    chosenClass: "sortable-chosen",
                    dragClass: 'sortable-drag',
                    forceFallback: true,
                    fallbackOnBody: true
                }
            },
            suggestionsWidth: function () {
                if (this.iconLayout.col === 4 || this.iconLayout.col === 5) {
                    return {
                        'width': 12 * 5 + (this.iconSizeValue - 50.0) / 10.0 + 'vw',
                        'margin-top': 15 / this.iconLayout.row + 'vh',
                        'margin-bottom': 8 / this.iconLayout.row + 'vh'
                    }
                } else if (this.iconLayout.col === 3) {
                    return {
                        'width': 7 * 5 + (this.iconSizeValue - 50.0) / 10.0 + 'vw',
                        'margin-top': 15 / this.iconLayout.row + 'vh',
                        'margin-bottom': 8 / this.iconLayout.row + 'vh'
                    }
                } else {
                    return {
                        'width': 11 * this.iconLayout.col + (this.iconSizeValue - 50.0) / 10.0 + 'vw',
                        'margin-top': 15 / this.iconLayout.row + 'vh',
                        'margin-bottom': 8 / this.iconLayout.row + 'vh'
                    }
                }
            },
            suggestionsHeight: function () {
                let heightStyle = {
                    'height': ''
                }
                if(this.iconLayout.row === 2){
                    if(this.iconLayout.col === 4){
                        heightStyle.height = (16+7) * this.iconLayout.row + 'vh'
                    }else{
                        heightStyle.height = (13+9) * this.iconLayout.row + 'vh'
                    }
                }else{
                    if(this.iconLayout.col===3|| this.iconLayout.col===4){
                        heightStyle.height = (16+5) * this.iconLayout.row + 'vh'
                    }else if(this.iconLayout.col === 5){
                        heightStyle.height = (14+5) * this.iconLayout.row + 'vh'
                    }else{
                        heightStyle.height = (13+5) * this.iconLayout.row + 'vh'
                    }
                }
                return heightStyle;
            },
            slideWidth: function () {
                return {
                    'width': (this.pagingArray.length * 15 * this.itemNumber) + 'vw',
                    'left': -(2.5 * this.itemNumber + 15 * this.currentIndex * this.itemNumber) + 'vw'
                }
            },
            itemWidth: function () {
                return {
                    'width': 10 * this.itemNumber + 'vw',
                    //                'margin-left': 2.5*this.itemNumber+'vw',
                    //                'margin-right': 2.5*this.itemNumber+'vw',
                }
            },
            ...mapState('homeWebList', ['homeWebList']),
            ...mapState('settings', ['iconLayout', 'iconSizeValue']),
            ...mapGetters('homeWebList', ['totalSize', 'pagingArray', 'sortArray']),
        },
        data() {
            const self = this;
            return {
                currentIndex: 0,
                itemNumber: 6,
                isDrag: false,
                dragging: false,
                // pagedArray: [],
                startIndex: 0,
                swiperOption: {
                    on: {
                        slideChangeTransitionEnd: function () {
                            self.currentIndex = this.activeIndex;
                            // console.log(this.activeIndex)
                        }
                    }
                },
                myArray: [{
                        id: 1,
                        name: 1
                    },
                    {
                        id: 2,
                        name: 2
                    },
                    {
                        id: 3,
                        name: 3
                    },
                    {
                        id: 4,
                        name: 4
                    }
                ],
                movePage: false
            }
        },
        watch: {
            //        movePage:function (newPage,oldPage) {
            //            if (newPage){
            //                this.clickMove();
            //            }
            //        }
        },
        created() {
            console.log(this.pagingArray)
        },
        mounted() {
            let screenWidth = document.body.clientWidth;
            let swiper = this.$refs.mySwiper.swiper;
            console.log(this.currentIndex);
            let self = this;
            let judge = false;
            // this.paging();
            document.onmousemove = function (e) {
                let pages = self.pagedArray.length;
                if (self.dragging) {
                    if (e.clientX < 200 && !judge) {
                        judge = true;
                        if (self.currentIndex !== 0) {
                            self.currentIndex--;
                            swiper.slideTo(self.currentIndex)
                        }
                    } else if (e.clientX > screenWidth - 200 && !judge) {
                        judge = true;
                        if (self.currentIndex !== pages - 1) {
                            self.currentIndex++;
                            swiper.slideTo(self.currentIndex)
                        }
                    } else if (e.clientX > 200 && e.clientX < screenWidth - 200) {
                        judge = false
                    }
                }
                //                console.log(self.currentIndex);
            };
            //            document.onmouseup = function () {
            //                document.onmousemove = null;
            //                document.onmouseup = null;
            //            }
        },
        methods: {
            paging: function () {
                let rowNumber = this.iconLayout.row; //一页多少行
                let colNumber = this.iconLayout.col; //一行多少个
                let pages = Math.ceil(this.totalSize / (rowNumber * colNumber));
                let everyPageNumber = rowNumber * colNumber;
                for (let i = 0; i < pages; i++) {
                    let tempArray = (i === (pages - 1) ? this.sortArray.slice(i * everyPageNumber) : this.sortArray
                        .slice(i *
                            everyPageNumber, (i + 1) * everyPageNumber));
                    this.pagedArray.push(tempArray)
                }
            },
            changeItem: function (num) {
                //            console.log(this.itemNumber);
                //            this.itemNumber = num;
                //            console.log(this.itemNumber+'  hhh')
            },
            changeDrag() {
                //            console.log(this.isDrag);
                this.isDrag = true;
                //            console.log(this.isDrag);
            },
            leaveDrag() {
                this.isDrag = false;
            },
            dragStart(e) {
                console.log('start')
            },
            onDrag() {
                console.log('dragging')
            },
            onChoose() {

            },
            onChange() {
                // console.log('change');
            },
            onSort() {
                // console.log('sort');
            },
            onUpdate() {
                // console.log('update');
            },
            onRemove() {
                // console.log('remove');
            },
            onAdd() {
                // console.log('add');
            },
            onMove(evt) {
                console.log('onMove');
                console.log(evt);
                console.log(this.pagedArray);
                console.log(this.startIndex + '  start');
                console.log(this.currentIndex + '  current');
                let everyPages = this.iconLayout.row * this.iconLayout.col; //一页有多少个item
                if (this.startIndex === this.currentIndex) {
                    console.log('gg');
                    // this.pagedArray[this.currentIndex][evt.]
                } else {
                    console.log('begin');
                    console.log(this.pagedArray[this.currentIndex].length);
                    console.log(this.iconLayout.row * this.iconLayout.col);
                    if (this.pagedArray[this.currentIndex].length === this.iconLayout.row * this.iconLayout.col) {
                        console.log('come')
                        let currentArray = this.pagedArray[this.currentIndex];
                        let lastItem = this.pagedArray[this.currentIndex].pop();
                        if (this.currentIndex === this.pagedArray.length - 1) {
                            var arr = [];
                            arr.push(lastItem);
                            this.pagedArray.push(arr);
                            console.log('this.pagedArray');
                            console.log(this.pagedArray);
                        } else {
                            let length = this.pagedArray.length;
                            for (let i = this.currentIndex + 1; i < length; i++) {
                                console.log(i+ '   i')
                                if (this.pagedArray[i].length === everyPages) {
                                    let currentArr = this.pagedArray[i];
                                    let temp = currentArr[currentArr.length - 1]
                                    console.log(currentArr.toString());
                                    console.log(temp)
                                    for (let j = currentArr.length - 2; j >= 0; j--) {
                                        let obj = currentArr[j];
                                        console.log('obj');
                                        console.log(obj);
                                        this.pagedArray[i][j + 1] = this.pagedArray[i][j];
                                    }
                                    this.pagedArray[i][0] = lastItem;
                                    lastItem = temp;
                                    if (i === this.pagedArray.length - 1) {
                                        console.log('go')
                                        var arr = [];
                                        console.log(lastItem)
                                        arr.push(lastItem);
                                        this.pagedArray.push(arr);
                                        console.log(this.pagedArray);
                                    }
                                } else {
                                    let currentArr = this.pagedArray[i];
                                    let temp = currentArr[currentArr.length - 1];
                                    for (let j = currentArr.length - 2; j >= 0; j--) {
                                        this.pagedArray[i][j + 1] = this.pagedArray[i][j];
                                    }
                                    this.pagedArray[i][0] = lastItem;
                                    this.pagedArray[i].push(temp);
                                    break;
                                }
                            }
                        }

                    }
                }
                console.log('gaga')
                console.log(this.pagedArray);
            },
            onStart(evt) {
                this.dragging = true;
                this.startIndex = this.currentIndex;
            },
            onEnd() {
                this.dragging = false;
                if(this.pagedArray[this.startIndex].length === 0){
                    this.pagedArray = this.pagedArray.filter(function (item) {
                        return item.length > 0;
                    })
                    if(this.startIndex < this.currentIndex){
                        this.currentIndex --;
                        let swiper = this.$refs.mySwiper.swiper;
                        swiper.slideTo(this.currentIndex);
                    }
                }
                
                //            this.movePage = false;
            },
            autoPlay() {
                //            setTimeout(() => {
                //                this.currentIndex++;
                //                if (this.currentIndex > this.pagingArray.length - 1) {
                //                    this.currentIndex = 0;
                //                }
                //            }, 2000);
            },
            changeIndex(index) {
                this.currentIndex = index;
                let swiper = this.$refs.mySwiper.swiper;
                swiper.slideTo(this.currentIndex)
            },
            mouse_down(e) {
                console.log('dsfdsfsdfsd');
                //            this.movePage = true
                let odiv = e.target; //获取目标元素
                //            //算出鼠标相对元素的位置
                //            let self = this;
                //            let beforeX = e.clientX;
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                //            let left = 0;
                //            let top = 0;
                document.onmousemove = (e) => { //鼠标按下并移动的事件
                    //                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    //                console.log(this.currentIndex);
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }

    }
</script>
<style scoped>
    /*@import '../component/style/suggestion.css';*/
    #suggestions {
        /* margin-top: 4vh; */
        /*height: 340px;*/
        /*width: 1100px;*/
        position: relative;
        /*overflow: hidden;*/
    }

    #suggestions .swiper-container {
        height: 100%;
    }

    /*.list-complete-item {*/
    /*transition: all 1s;*/
    /*}*/

    /*.flip-list-move {*/
    /*transition: transform 1s;*/
    /*}*/

    /*.no-move {*/
    /*transition: transform 0s;*/
    /*}*/

    /*.slide {*/
    /*!*width: 100%;*!*/
    /*position: absolute;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*transition: left 0.5s;*/
    /*!*position: relative;*!*/
    /*}*/

    /*ul {*/
    /*list-style: none;*/
    /*}*/

    /*.slide-item {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*text-align: left;*/
    /*list-style: none;*/
    /*height: 90%;*/
    /*!*transition: left 0.5s;*!*/
    /*display: inline-block;*/
    /*}*/

    /*.list-enter-to {*/
    /*transition: all .5s ease;*/
    /*transform: translateX(0);*/
    /*}*/

    /*.list-leave-active {*/
    /*transition: all .5s ease;*/
    /*transform: translateX(-100%)*/
    /*}*/

    /*.list-enter {*/
    /*transform: translateX(100%)*/
    /*}*/

    /*.list-leave {*/
    /*transform: translateX(0)*/
    /*}*/

    .bullet {
        /*position: absolute;*/
        /*width: 100%;*/
        /*bottom: -6vh;*/
        /*margin: 0 auto;*/
        /* margin-top: 3vh; */
        z-index: 10;
        text-align: center;
    }

    .bullet span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: white;
        display: inline-block;
        margin-right: 15px;
        opacity: 0.5;
        cursor: pointer;
    }

    .bullet span:last-child {
        margin-right: 0;
    }

    .active {
        background: #ffc81f !important;
    }

    .sortable-fallback {
        cursor: pointer;
        /*background-color: red;*/
    }

    .sortable-chosen {
        /*position: absolute;*/
        /*top:0;*/
    }

    /*.sortable-drag{*/
    /*position:absolute;*/
    /*}*/
</style>