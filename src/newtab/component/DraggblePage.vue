<template>
    <div>
        <draggable v-model="homeWebList[index]" v-bind="dragOptions" :move="onMove" @start="onStart"
            @end="onEnd" @choose="onChoose" @change="onChange" @sort='onSort' @update='onUpdate' handle='.handle-img'
            @remove='onRemove' @add='onAdd' @drag="onDrag" group="home">
            <transition-group type="transition" name="list-complete" tag="div" style='height: 100%'>
                <!-- <draggable group="home"> -->
                <suggestion-item :dragging="dragging" v-for="item in page" draggable="true"
                    :item-info="item" :key="item.index" v-on:change="changeDrag" @mousedown="mouse_down"
                    v-on:leave="leaveDrag" class="list-complete-item">
                    <!-- <suggestions /> -->
                </suggestion-item>
                <!-- </draggable> -->
            </transition-group>
        </draggable>
    </div>
</template>
<script>
    import '../component/style/suggestion-swiper.css'
    import SuggestionItem from '../component/SuggestionItem.vue'
    import draggable from 'vuedraggable'
    import EditDrawer from '../component/EditDrawer.vue'
    import {
        swiper,
        swiperSlide,
    } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex'
    import homeWebList from "src/newtab/store/modules/homeWebList";
    import '../component/style/suggestion.css'

    export default {
        name: 'draggablePage',
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
                        'margin-bottom': 8 / this.iconLayout.row + 'vh'
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
            nameText: function () {
                return {
                    'edit': '编辑'
                }
            },
            ...mapState('homeWebList', ['homeWebList', 'editDrawerVisible']),
            ...mapState('settings', ['iconLayout', 'iconSizeValue']),
            ...mapGetters('homeWebList', ['totalSize', 'pagingArray', 'sortArray', 'isEdit']),
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
                    on: {
                        slideChangeTransitionEnd: function () {
                            self.currentIndex = this.activeIndex;
                            // console.log(this.activeIndex)
                        }
                    }
                },
                movePage: false,
                showModal: false,
                webInfo: {}
            }
        },
        watch: {
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
                let pages = self.homeWebList.length;
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
            };
        },
        methods: {
            ...mapMutations('homeWebList', ['CHANGE_IS_EDIT', 'EDIT_DRAWER_VISIBLE']),
            paging: function () {
                let rowNumber = this.iconLayout.row; //一页多少行
                let colNumber = this.iconLayout.col; //一行多少个
                let pages = Math.ceil(this.totalSize / (rowNumber * colNumber));
                let everyPageNumber = rowNumber * colNumber;
                for (let i = 0; i < pages; i++) {
                    let tempArray = (i === (pages - 1) ? this.sortArray.slice(i * everyPageNumber) : this.sortArray
                        .slice(i *
                            everyPageNumber, (i + 1) * everyPageNumber));
                    this.homeWebList.push(tempArray)
                }
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
                console.log('start')
            },
            onDrag() {
                console.log('dragging')
            },
            onChoose() {

            },
            onChange() {
                console.log('changing')
            },
            onSort() {
            },
            onUpdate() {
            },
            onRemove() {
            },
            onAdd() {
            },
            onMove(evt, originalEvt) {
                console.log('onMove');
                console.log(evt, 'evt');
                console.log(originalEvt, 'originalEvt');
                // console.log(this.homeWebList);

                // console.log(this.startIndex + '  start');
                // console.log(this.currentIndex + '  current');
                
                for (let k = 0; k < this.homeWebList[1].length; k++) {
                    // console.log(this.homeWebList[1][k].title);
                }
                // console.log('gaga')
                // console.log(this.homeWebList);
            },
            onStart(evt) {
                this.dragging = true;
                this.startIndex = this.currentIndex;
            },
            onEnd() {
                this.dragging = false;
                if (this.homeWebList[this.startIndex].length === 0) {
                    this.homeWebList = this.homeWebList.filter(function (item) {
                        return item.length > 0;
                    })
                    if (this.startIndex < this.currentIndex) {
                        this.currentIndex--;
                        let swiper = this.$refs.mySwiper.swiper;
                        swiper.slideTo(this.currentIndex);
                    }
                }
                // console.log('end   ')
                for (let k = 0; k < this.homeWebList[1].length; k++) {
                    console.log(this.homeWebList[1][k].title);
                }

                let everyPages = this.iconLayout.row * this.iconLayout.col; //一页有多少个item
                if (this.startIndex === this.currentIndex) {
                    // console.log('gg');
                    // this.homeWebList[this.currentIndex][evt.]
                } else {
                    console.log('begin');
                    console.log(this.homeWebList[this.currentIndex].length);
                    console.log(this.iconLayout.row * this.iconLayout.col);
                    if (this.homeWebList[this.currentIndex].length === this.iconLayout.row * this.iconLayout.col+1) {
                        console.log('come')
                        // let currentArray = this.homeWebList[this.currentIndex];
                        let lastItem = this.homeWebList[this.currentIndex].pop();
                        if (this.currentIndex === this.homeWebList.length - 1) {
                            var arr = [];
                            arr.push(lastItem);
                            this.homeWebList.push(arr);
                            console.log('this.homeWebList');
                            console.log(this.homeWebList);
                        } else {
                            let length = this.homeWebList.length;
                            for (let i = this.currentIndex + 1; i < length; i++) {
                                console.log(i + '   i')
                                if (this.homeWebList[i].length === everyPages) {
                                    let currentArr = this.homeWebList[i];
                                    let temp = currentArr[currentArr.length - 1]
                                    console.log(currentArr.toString());
                                    console.log(temp)
                                    for (let j = currentArr.length - 2; j >= 0; j--) {
                                        let obj = currentArr[j];
                                        console.log('obj');
                                        console.log(obj);
                                        this.homeWebList[i][j + 1] = this.homeWebList[i][j];
                                    }
                                    this.homeWebList[i][0] = lastItem;
                                    lastItem = temp;
                                    if (i === this.homeWebList.length - 1) {
                                        console.log('go')
                                        var arr = [];
                                        console.log(lastItem)
                                        arr.push(lastItem);
                                        this.homeWebList.push(arr);
                                        console.log(this.homeWebList);
                                    }
                                } else {
                                    console.log(lastItem)
                                    for (let k = 0; k < this.homeWebList[i].length; k++) {
                                            console.log(this.homeWebList[i][k].title);
                                        }
                                    this.homeWebList[i].unshift(lastItem);
                                    // let currentArr = window.this.homeWebList[i];
                                    // if (this.currentIndex < this.startIndex) {
                                    //     let index = evt.draggedContext.index;
                                    //     // for (let k = 0; k < currentArr.length; k++) {
                                    //     //     console.log(currentArr[k].title)
                                    //     // }

                                    //     this.homeWebList[i].unshift(lastItem);
                                        
                                    // } else {
                                    //     this.homeWebList[i].unshift(lastItem);
                                    // }
                                    // break;
                                }
                            }
                        }

                    }
                }
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
                this.CHANGE_IS_EDIT(true);
                let swiper = this.$refs.mySwiper.swiper;
                swiper.slideTo(this.currentIndex)
            },
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
</script>
<style scoped>
    #suggestions {
        position: relative;
        overflow: hidden;
    }

    #suggestions .swiper-container {
        height: 100%;
    }

    .bullet {
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