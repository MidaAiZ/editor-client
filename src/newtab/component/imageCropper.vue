<template>
    <div class="image-cropper">
        <div class="cropper">
                <vue-cropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                    :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                    :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" 
                    :fixed="option.fixed" :fixedNumber="option.fixedNumber"></vue-cropper>
            </div>
            <div class="cropper-operate-container">
                <span>
                    <span class="cropper-operate border-left" @click="rotateLeft()"><i class="el-icon-refresh-left"></i></span>
                    <span class="cropper-operate border-right" @click="rotateRight()"><i class="el-icon-refresh-right"></i></span>
                </span>
                <span>
                    <span class="cropper-operate border-left" @click="changeScale(1)"><i class="el-icon-zoom-in"></i></span>
                    <span class="cropper-operate border-right" @click="changeScale(-1)"><i class="el-icon-zoom-out"></i></span>
                </span>
                <span>
                    <span class="cropper-operate" style="padding: 2px 25px;
                        border-radius: 5px;" @click="cropperRefresh()"><i class="el-icon-refresh"></i>
                    </span>
                </span>
            </div>
            <div class="cropper-complete-button" @click="cropperFinish('blob')">{{complete}}</div>
    </div>
</template>
<script>
    import {VueCropper} from 'vue-cropper';
    import { mapState } from 'vuex';
    import localeText from '../../../static/locale/index.js';
    export default {
        props: ['img'],
        components: {
            VueCropper
        },
        computed: {
            ...mapState('locale', [
                'location',
            ]),
            complete: function () {
                return localeText[this.location].complete
            }
        },
        watch:{
            img:function(newImg,oldImg){
                if(newImg !== oldImg){
                    this.option.img = newImg;
                }
            }
        },
        data() {
            return {
                option: {
                    img: '', // 裁剪图片的地址  (默认：空)
                    outputSize: 1, // 裁剪生成图片的质量  (默认:1)
                    full: false, // 是否输出原图比例的截图 选true生成的图片会非常大  (默认:false)
                    outputType: 'png', // 裁剪生成图片的格式  (默认:jpg)
                    canMove: true, // 上传图片是否可以移动  (默认:true)
                    original: false, // 上传图片按照原始比例渲染  (默认:false)
                    canMoveBox: true, // 截图框能否拖动  (默认:true)
                    autoCrop: true, // 是否默认生成截图框  (默认:false)
                    autoCropWidth: 480, // 默认生成截图框宽度  (默认:80%)
                    autoCropHeight: 320, // 默认生成截图框高度  (默认:80%)
                    fixedBox: false, // 固定截图框大小 不允许改变  (默认:false)
                    fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
                    fixedNumber: [1, 1], // 截图框比例  (默认:[1:1])
                    enlarge: 1
                },
            }
        },
        methods: {
            changeScale(num){
                num = num || 1;
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft(){
                this.$refs.cropper.rotateLeft();
            },
            rotateRight(){
                this.$refs.cropper.rotateRight();
                let element = document.getElementsByClassName('vue-cropper')[0];
                console.log(element)
                element.style.backgroundImage = 'none'
                element.style.backgroundColor = 'red'
                // console.log(this.$refs.cropper)
                
            },
            cropperRefresh(){
                this.$refs.cropper.refresh();
            },
            cropperFinish(type){
                let self = this;
                this.$refs.cropper.getCropData( data => {
                    self.$emit('finish',data)
                    // self.customEngine.img = data;
                    // self.dialogVisible = false;
                })
            },
        },
        mounted() {
            this.option.img = this.img;
            console.log(this.img)
        }
    }
</script>
<style scoped>
    .image-cropper {
        width: 100%;
    }
    .cropper {
        width: 100%;
        height: 310px;
    }

    .cropper-operate {
        cursor: pointer;
        box-sizing: border-box;
        padding: 2px 15px;
        background-color: #656565;
        color: white;
        font-size: 20px;
        opacity: 0.8;
    }

    .cropper-operate:hover {
        opacity: 1;
    }

    .border-left {
        border-radius: 5px 0 0 5px;
    }

    .border-right {
        border-radius: 0 5px 5px 0;
    }

    .cropper-operate-container {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }

    .cropper-complete-button {
        background-color: #656565;
        color: white;
        cursor: pointer;
        margin-top: 15px;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        padding: 12px 0;
        opacity: 0.8;
    }

    .cropper-complete-button:hover {
        opacity: 1;
    }
</style>