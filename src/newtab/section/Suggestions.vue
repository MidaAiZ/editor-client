<template>
    <div style="z-index:1">
        <div v-if="!hideAllIcons" id="suggestions" :style="[suggestionsWidth,suggestionsHeight]">
            <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':isDrag}" style='height:100%'>
                <swiper-slide v-for="(page,index) in homeWebList" :key="index" class='suggestion-swiper'>
                    <draggable v-model="homeWebList[index]" v-bind="dragOptions" :move="onMove" @start="onStart"
                        @end="onEnd" @choose="onChoose" @change="onChange" @sort='onSort' @update='onUpdate' handle='.handle-img'
                        @remove='onRemove' @add='onAdd' @drag="onDrag" group="home">
                        <transition-group type="transition" name="list-complete" tag="div" style='height: 100%'>
                            <!-- <draggable group="home"> -->
                            <suggestion-item :dragging="dragging" v-for="(item, idx) in page" draggable="true"
                                :item-info="item" :page-index="index" :item-index="idx" :key="item.index" v-on:change="changeDrag" @mousedown="mouse_down"
                                v-on:leave="leaveDrag" class="list-complete-item">
                                <!-- <suggestions /> -->
                            </suggestion-item>
                            <!-- </draggable> -->
                        </transition-group>
                    </draggable>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <!-- <div class="bullet">
            <span v-for="(item, index) in homeWebList" :class="{ 'active':index===currentIndex }"
                @click="changeIndex($event,index)" :key="index">
            </span>
        </div> -->
        <el-drawer :visible='editDrawerVisible' size='500px' :show-close="false" :modal="showModal"
            :append-to-body='true' @close='editDrawerClose' custom-class='edit-drawer' :destroy-on-close='true'>
            <div slot="title" class="edit-drawer-top">
                <span class="edit-drawer-title">{{edit}}</span>
                <span class="edit-drawer-close" @click="editDrawerClose()">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <edit-drawer></edit-drawer>
        </el-drawer>
    </div>

</template>
<script>
    import '../component/style/suggestion-swiper.css'
    import SuggestionItem from '../component/SuggestionItem.vue'
    import draggable from 'vuedraggable'
    import EditDrawer from '../component/EditDrawer.vue'
    import localeText from '../../../static/locale/index.js'
    import {
        swiper,
        swiperSlide,
    } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex'
    import homeWebList from "src/newtab/store/modules/homeWebList";
    import '../component/style/suggestion.css'
    import { imgToBase64 } from "../utils/localSave.js";
    import debounce from '../utils/debounce.js';
    let slide;

    export default {
        name: 'suggestions',
        components: {
            SuggestionItem,
            swiper,
            swiperSlide,
            draggable,
            EditDrawer
        },
        computed: {
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
                        'margin-bottom': 6 / this.iconLayout.row + 'vh'
                    }
                }
            },
            suggestionsHeight: function () {
                let heightStyle = {
                    'height': ''
                }
                if (this.iconLayout.row === 2) {
                    if (this.iconLayout.col === 4) {
                        heightStyle.height = (16 + 7) * this.iconLayout.row + 'vh'
                    } else {
                        heightStyle.height = (13 + 9) * this.iconLayout.row + 'vh'
                    }
                } else {
                    if (this.iconLayout.col === 3 || this.iconLayout.col === 4) {
                        heightStyle.height = (16 + 5) * this.iconLayout.row + 'vh'
                    } else if (this.iconLayout.col === 5) {
                        heightStyle.height = (14 + 5) * this.iconLayout.row + 'vh'
                    } else {
                        heightStyle.height = (13 + 5) * this.iconLayout.row + 'vh'
                    }
                }
                return heightStyle;
            },
            slideWidth: function () {
                return {
                    'width': (this.homeWebList.length * 15 * this.itemNumber) + 'vw',
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
            edit: function () {
                return localeText[this.location].edit
            },
            ...mapState('homeWebList', ['homeWebList', 'isEdit', 'editDrawerVisible']),
            ...mapState('settings', ['iconLayout', 'iconSizeValue', 'hideAllIcons']),
            ...mapGetters('homeWebList', ['totalSize', 'sortArray', 'isEdit']),
            ...mapState('locale', ['location']),
        },
        data() {
            const self = this;
            return {
                currentIndex: 0,
                itemNumber: 6,
                isDrag: false,
                dragging: false,
                // homeWebList: [],
                startIndex: 0,
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        slideChangeTransitionEnd: function () {
                            self.currentIndex = this.activeIndex;
                        }
                    },
                    mousewheel: true,
                },
                movePage: false,
                showModal: false,
                webInfo: {}
            }
        },
        watch: {
            iconLayout: function(newLayout, oldLayout) {
                if (newLayout.name !== oldLayout.name) {
                    console.log('fuck', this.iconLayout);
                    this.paging()
                }
            }
        },
        created() {
        },
        mounted() {
            this.judgeItemPositionToSlide();
        },
        methods: {
            ...mapMutations('homeWebList', ['CHANGE_IS_EDIT', 'EDIT_DRAWER_VISIBLE', 'AFTER_CHANGE']),
            ...mapActions('homeWebList', ['afterChanged']),
            judgeItemPositionToSlide() {
                let swiper = this.$refs.mySwiper.swiper;
                let self = this;
                let judge = false;
                document.onmousemove = function (e) {
                    let screenWidth = document.body.clientWidth;
                    let pages = self.homeWebList.length;
                    if (self.dragging) {
                        function slideLeft() {
                            if (e.clientX < 200 && !judge) {
                                judge = true;
                                clearTimeout(slide)
                                slide = setTimeout(_pageSlideLeft, 1000)
                                function _pageSlideLeft() {
                                    console.log('左', slide);
                                    if(!judge) return clearTimeout(slide);
                                    if (self.currentIndex !== 0) {
                                        self.currentIndex--;
                                        swiper.slideTo(self.currentIndex);
                                    }
                                    slide = setTimeout(_pageSlideLeft, 1000)
                                }
                                return true;
                            } 
                        }
                         function slideRight() {
                            if (e.clientX > screenWidth - 200 && !judge) {
                                judge = true;
                                clearTimeout(slide)
                                slide = setTimeout(_pageSlideRight, 1000);
                                function _pageSlideRight() {
                                    console.log('右', slide);
                                    if(!judge) return clearTimeout(slide);
                                    if (self.currentIndex !== pages - 1) {
                                        self.currentIndex++;
                                        swiper.slideTo(self.currentIndex);
                                    }
                                    slide = setTimeout(_pageSlideRight, 1000)
                                }
                                return true;
                            }
                        }
                        function cancelSlide() {
                            if (e.clientX > 200 && e.clientX < screenWidth - 200) {
                                    judge = false;
                                    clearTimeout(slide);
                                    return true;
                                }
                        }
                        slideLeft() || slideRight() || cancelSlide();
                    }
                };
            },
            paging: function () {
                let rowNumber = this.iconLayout.row; //一页多少行
                let colNumber = this.iconLayout.col; //一行多少个
                console.log('总数', this.totalSize)
                let pages = Math.ceil(this.totalSize / (rowNumber * colNumber));
                let everyPageNumber = rowNumber * colNumber;
                let wholeArr = [];
                let newList = [];
                for(let j = 0; j < this.homeWebList.length; j++) {
                    wholeArr = wholeArr.concat(this.homeWebList[j])
                }
                console.log('所有数组', wholeArr)
                for (let i = 0; i < pages; i++) {
                    let tempArray = (i === (pages - 1) 
                                            ? 
                                            wholeArr.slice(i * everyPageNumber) 
                                            : 
                                            wholeArr.slice(i * everyPageNumber, (i + 1) * everyPageNumber));
                    newList.push(tempArray)
                }
                this.afterChanged(newList)
            },
            changeItem: function (num) {
            },
            changeDrag() {
                this.isDrag = true;
            },
            leaveDrag() {
                this.isDrag = false;
            },
            dragStart(e) {
            },
            
            onStart(evt) {
                this.dragging = true;
                this.startIndex = this.currentIndex;
            },
            onEnd() {
                clearTimeout(slide);
                // 重新排序
                this.dragging = false;
                // if (this.homeWebList[this.startIndex].length === 0) {
                //     this.homeWebList = this.homeWebList.filter(function (item) {
                //         return item.length > 0;
                //     })
                //     if (this.startIndex < this.currentIndex) {
                //         this.currentIndex--;
                //         let swiper = this.$refs.mySwiper.swiper;
                //         swiper.slideTo(this.currentIndex);
                //     }
                // }
                

                let everyPages = this.iconLayout.row * this.iconLayout.col; //一页有多少个item
                // if (this.startIndex === this.currentIndex) {
                    
                //     // this.homeWebList[this.currentIndex][evt.]
                // } else {
                    
                    if (this.homeWebList[this.currentIndex].length === this.iconLayout.row * this.iconLayout.col+1) {
                        // let currentArray = this.homeWebList[this.currentIndex];
                        let lastItem = this.homeWebList[this.currentIndex].pop();
                        if (this.currentIndex === this.homeWebList.length - 1) {
                            var arr = [];
                            arr.push(lastItem);
                            this.homeWebList.push(arr);
                            
                        } else {
                            let length = this.homeWebList.length;
                            for (let i = this.currentIndex + 1; i < length; i++) {
                                
                                if (this.homeWebList[i].length === everyPages) {
                                    let currentArr = this.homeWebList[i];
                                    let temp = currentArr[currentArr.length - 1]
                                    
                                    for (let j = currentArr.length - 2; j >= 0; j--) {
                                        let obj = currentArr[j];
                                        
                                        this.homeWebList[i][j + 1] = this.homeWebList[i][j];
                                    }
                                    this.homeWebList[i][0] = lastItem;
                                    lastItem = temp;
                                    if (i === this.homeWebList.length - 1) {
                                        
                                        var arr = [];
                                        
                                        arr.push(lastItem);
                                        this.homeWebList.push(arr);
                                    }
                                } else {
                                    // for (let k = 0; k < this.homeWebList[i].length; k++) {
                                            
                                    //     }
                                    this.homeWebList[i].unshift(lastItem);
                                    
                                }
                            }
                        }

                    }
                // }
                this.afterChanged(this.homeWebList)
            },
            editDrawerClose() {
                this.EDIT_DRAWER_VISIBLE(false)
            },
            currentItem(itemInfo) {
                this.webInfo = itemInfo;
            },
            changeIndex(e, index) {
                e.preventDefault();
                this.currentIndex = index;
                if(this.isEdit) {
                    this.CHANGE_IS_EDIT(true);
                }
                let swiper = this.$refs.mySwiper.swiper;
                swiper.slideTo(this.currentIndex)
            },
        },

        mouse_down(e) {
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
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

    }
</script>
<style scoped>
    #suggestions {
        position: relative;
        overflow: hidden;
    }

    #suggestions .swiper-container {
        height: 100%;
        --swiper-theme-color: #ff6600;
        --swiper-pagination-color: #00ff33;/* 两种都可以 */
    }

    .active {
        background: #ffc81f !important;
    }

    .sortable-fallback {
        cursor: pointer;
        /*background-color: red;*/
    }

    .edit-drawer-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .edit-drawer-title {
        font-size: 20px;
        font-weight: bold;
    }

    .edit-drawer-close {
        font-size: 20px;
        cursor: pointer;
    }
</style>