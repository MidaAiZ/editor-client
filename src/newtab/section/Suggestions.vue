<template>
    <div style="z-index:1">
        <div id="suggestions" :style="suggestionsWidth">
            <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':isDrag}">
                <swiper-slide v-for="(page,index) in pagingArray" :key="index">
                    <draggable v-model="pagingArray[index]" v-bind="dragOptions" :move="onMove" @start="onStart"
                               @end="onEnd" @choose="onChoose" @change="onChange">
                        <transition-group type="transition" name="list-complete" tag="div">
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
            <span v-for="(item, index) in pagingArray" :class="{ 'active':index===currentIndex }"
                  @click="changeIndex(index)" :key="index">
            </span>
        </div>
    </div>

</template>
<script>
    import SuggestionItem from '../component/SuggestionItem.vue'
    import draggable from 'vuedraggable'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import {mapState, mapGetters} from 'vuex'
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
            dragOptions() {
                return {
                    animation: 200,
//                handle: ".drag-handle",
                    group: "description",
                    disable: false,
                    ghostClass: "ghost",
                    chosenClass: "sortable-chosen",
                    dragClass: 'sortable-drag',
                    forceFallback: true,
//                    fallbackClass: 'sortable-fallback',
                    fallbackOnBody: true
//                    scroll: true
                }
            },
            suggestionsWidth: function () {
                if (this.iconLayout.col===3||this.iconLayout.col===4||this.iconLayout.col===5){
                    return {
                        'width': 10 * 5+ (this.iconSizeValue-50.0)/10.0 + 'vw',
                    }
                }else{
                    return {
                        'width': 10 * this.iconLayout.col+ (this.iconSizeValue-50.0)/10.0 + 'vw',
                    }
                }
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
            ...mapState('settings',['iconLayout','iconSizeValue']),
            ...mapGetters('homeWebList', ['totalSize', 'pagingArray']),
        },
        data() {
            const self = this;
            return {
                currentIndex: 0,
                itemNumber: 6,
                isDrag: false,
                dragging: false,
                swiperOption: {
//                pagination: {
//                    el: '.swiper-pagination',
//                    clickable: true
//                },
                    on: {
                        slideChangeTransitionEnd: function () {
                            self.currentIndex = this.activeIndex;
                            console.log(this.activeIndex)
                        }
                    }
                },
                myArray: [
                    {
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
            let pages = this.pagingArray.length;
            let screenWidth = document.body.clientWidth;
            let swiper = this.$refs.mySwiper.swiper;
            console.log(this.currentIndex);
//            console.log(pages);
//            console.log(element);
            let self = this;
            let judge = false;
            document.onmousemove = function (e) {
//                console.log(e.clientX);
//                console.log(this.dragging);
                if (self.dragging){
                    console.log(e.clientX);
                    if (e.clientX < 200 && !judge) {
                        console.log(e.clientX);
                        judge = true;
                        if (self.currentIndex !== 0) {
                            self.currentIndex--;
                            swiper.slideTo(self.currentIndex)
                        }
                    } else if (e.clientX > screenWidth - 200 && !judge) {
                        console.log(e.clientX);
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
            dragStart(e){
                console.log('start')
            },
            onDrag(){
                console.log('dragging')
            },
            onChoose() {

            },
            onStart(evt) {
                this.dragging = true;
//                let suggestion = document.getElementById('suggestions');
//                console.log(78787);
//                let rootEl = document.getElementById('suggestions');
//                let dragEl = evt.item;
//                console.log(evt.item);
//                let cloneEl = dragEl.cloneNode(true);
//                let rect = dragEl.getBoundingClientRect();
//                cloneEl.style.top = rect.top - parseInt(dragEl.style.marginTop,10);
//                cloneEl.style.left = rect.left - parseInt(dragEl.style.marginLeft,10);
//                cloneEl.style.width = rect.width;
//                cloneEl.style.height = rect.height;
//                cloneEl.style.position = 'absolute';
//                cloneEl.getElementsByClassName('item-img')[0].style.display = 'inline-block';
//                cloneEl.getElementsByClassName('item-img-del')[0].style.display = 'none';
//                cloneEl.getElementsByClassName('item-name')[0].style.opacity = 1;
//                console.log(cloneEl);
////                console.log(evt.item);
////                let element = evt.item;
////                element.style.position = 'absolute';
////                element.style.left = 0;
////                element.style.top = 0;
//                let disX = evt.clientX - cloneEl.offsetLeft;
//                let disY = evt.clientY - cloneEl.offsetTop;
//                document.onmousemove = function (e) {
//                    let left = e.clientX - disX;
//                    let top = e.clientY - disY;
//                    cloneEl.style.left = left + 'px';
//                    cloneEl.style.top = top + 'px';
//                };
//                document.onmouseup = (e) => {
////                console.log(this.currentIndex);
//                    document.onmousemove = null;
//                    document.onmouseup = null;
//                };
//                rootEl.appendChild(cloneEl);

//            this.movePage = true;
//            let element = evt.item;

            },
            onEnd() {
                this.dragging = false;
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
                let odiv = e.target;        //获取目标元素
//            //算出鼠标相对元素的位置
//            let self = this;
//            let beforeX = e.clientX;
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
//            let left = 0;
//            let top = 0;
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
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
        margin-top: 4vh;
        /*height: 340px;*/
        /*width: 1100px;*/
        position: relative;
        /*overflow: hidden;*/
    }
    #suggestions .swiper-container{
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
        margin-top: 3vh;
        z-index: 10;
        text-align: center;
    }

    .bullet span {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: none;
        background: white;
        display: inline-block;
        margin-right: 15px;
        opacity: 0.5
    }
    .bullet span:last-child{
        margin-right: 0;
    }

    .active {
        background: #ffc81f !important;
    }

    .sortable-fallback {
        cursor: pointer;
        /*background-color: red;*/
    }
    .sortable-chosen{
        /*position: absolute;*/
        /*top:0;*/
    }
    /*.sortable-drag{*/
        /*position:absolute;*/
    /*}*/
</style>