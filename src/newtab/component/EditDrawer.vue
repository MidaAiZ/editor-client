<template>
    <div id="edit-drawer">
        <div class="edit-drawer-input"><el-input v-model="currentItem.url"></el-input></div>
        <div class="edit-drawer-input"><el-input v-model="currentItem.title"></el-input></div>
        <div class='edit-drawer-img'>
            <!-- <canvas ref='editCanvas' class="edit-drawer-canvas" width="100" height="100"></canvas> -->
            <img :src='currentItem.icon'/>
            <span>
                <div class="edit-drawer-img-edit img-edit" @click="showEditDialog">{{nameText.editPicture}}</div>
                <div class="img-edit">{{nameText.removePicture}}</div>
            </span>
        </div>
        <!-- <div class="color-container">
            <span v-for='(item,index) in colorList' :key="index"></span>
        </div> -->
        <button class='edit-brawer-button' @click='editComplete'>{{nameText.complete}}</button>
        <el-dialog :visible.sync="editDialogVisible" width='360px' :modal="false" :append-to-body="true"
            :destory-on-close='true' class="cropper-dialog">
            <image-cropper v-on:finish='getCropperData' :img='currentItem.icon'></image-cropper>
        </el-dialog>
        <!-- <img ref='editImg' src='https://picsum.photos/201/300'/> -->
    </div>
</template>
<script>
    import './style/upload.css' 
    import {VueCropper} from 'vue-cropper'
    import ImageCropper from './imageCropper.vue'
    import {mapMutations,mapState} from 'vuex'
    export default {
        name: 'app',
        // props:['info'],
        components:{
            ImageCropper,
            VueCropper
        },
        // watch:{
        //     info:function(newInfo,oldInfo){
        //         if(newInfo!==oldInfo){
        //             this.webInfo = window.Object.assign({},newInfo)
        //         }
        //     }
        // },
        computed:{
            ...mapState('homeWebList',['currentItem']),
            nameText:function(){
                return{
                    'editPicture': '编辑图片',
                    'removePicture': '选择图片',
                    'complete': '完成'
                }
            },
            // webInfo: function(){
            //     return window.Object.assign({},this.currentItem)
            // }
            // webInfo: function(){
                
            // },
            // web: function(){
            //     return window.Object.assign({},this.info)
            // }
        },
        data() {
            return {
                editDialogVisible: false,
                webInfo: {
                    id: 5,
                    url: 'http://www.baidu.com/s?wd=#content#',
                    img: 'https://picsum.photos/201/300',
                    name: '百度',
                    isChoose: true
                },
                canvas:'',
                cxt: '',
                colorList: ['#1abc9c','#2ecc71','#33c5c5','#3498db','#9859b6','#34495e','#f1c40f','#e67e22','#e74c3c','']
            }
        },
        methods:{
            ...mapMutations('homeWebList',['CHANGE_WEB_INFO','EDIT_DRAWER_VISIBLE']),
            getCropperData(data){
                this.currentItem.img = data;
                this.editDialogVisible = false;
            },
            showEditDialog(){
                this.editDialogVisible = true;
            },
            changeBg(rgb){
                // let self = this;
                // this.cxt.fillStyle = rgb
                // this.canvas.style.backgroundImage = rgb;
                // this.cxt.fillRect(0,0,100,100);
                // let img = new Image();
                // img.onload = function(){
                // // cxt.drawImage(img,0,0,100,100)
                // let scale = img.height/(img.width*1.0);
                // if(scale>1){
                //     img.width = 100/scale;
                //     img.height = 100.0;
                //     let offset = 100.0-img.width;
                //     self.cxt.drawImage(img,offset/2.0,0,img.width,img.height)
                //     // let offset = 1 
                // }else{
                //     img.height = 100 * scale;
                //     img.width = 100;
                //     let offset = 100-img.height;
                //     self.cxt.drawImage(img,0,offset/2.0,img.width,img.height);
                // }
            // }
            // img.src = this.webInfo.img;
            },
            editComplete(){
                this.CHANGE_WEB_INFO(this.currentItem);
                this.EDIT_DRAWER_VISIBLE(false);
                // let self = this;
                // this.cxt.backgroundImg = rgb;
                // this.cxt.fillRect(0,0,100,100);
                // let img = new Image();
                // img.onload = function(){
                // cxt.drawImage(img,0,0,100,100)
            //     let scale = img.height/(img.width*1.0);
            //     if(scale>1){
            //         img.width = 100/scale;
            //         img.height = 100.0;
            //         let offset = 100.0-img.width;
            //         self.cxt.drawImage(img,offset/2.0,0,img.width,img.height)
            //         // let offset = 1 
            //     }else{
            //         img.height = 100 * scale;
            //         img.width = 100;
            //         let offset = 100-img.height;
            //         self.cxt.drawImage(img,0,offset/2.0,img.width,img.height);
            //     }
            // }
            // img.src = this.webInfo.img;
            }
        },
        mounted(){
            // this.webInfo = this.currentItem;
            // console.log(this.webInfo);
            // let self = this;
            // this.canvas = this.$refs.editCanvas;
            // this.cxt = this.canvas.getContext('2d');
            // // let img = this.$refs.editImg;
            // let img = new Image();
            // img.onload = function(){
            //     // cxt.drawImage(img,0,0,100,100)
            //     let scale = img.height/(img.width*1.0);
            //     if(scale>1){
            //         img.width = 100/scale;
            //         img.height = 100.0;
            //         let offset = 100.0-img.width;
            //         self.cxt.drawImage(img,offset/2.0,0,img.width,img.height)
            //         // let offset = 1 
            //     }else{
            //         img.height = 100 * scale;
            //         img.width = 100;
            //         let offset = 100-img.height;
            //         self.cxt.drawImage(img,0,offset/2.0,img.width,img.height);
            //     }
            // }
            // img.src = this.webInfo.img;
        },
        // updated(){
        //     this.webInfo = this.info;
        // }
    }
</script>
<style scoped>
    #edit-drawer{
        padding: 40px;
    }
    .edit-drawer-img{
        display: flex;
        align-items: center;
    }
    .edit-drawer-img img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 30px;
    }
    .edit-drawer-input{
        margin-bottom: 30px;
    }
    .img-edit{
        color: #ffc81f;
        cursor: pointer;
        font-size: 15px;
    }
    .img-edit:hover{
        text-decoration: underline;
        /* border-bottom: 1px solid #ffc81f; */
    }
    .edit-drawer-img-edit{
        margin-bottom: 10px;
    }
    .edit-brawer-button{
        width: 100%;
        background-color: #ffc81f;
        color: white;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        margin-top: 30px;
        border: none;
        outline: none;
        cursor: pointer;
        letter-spacing: 10px;
    }
    .edit-drawer-canvas{
        /* height: 100px;
        width: 100px; */
        margin-right: 30px;
        border-radius: 50%;
    }
    .color-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* .color-item{

    } */
</style>