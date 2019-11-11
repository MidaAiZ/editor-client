<template>
    <div id="edit-drawer">
        <div class="edit-drawer-input"><el-input v-model="currentItem.itemInfo.url"></el-input></div>
        <div class="edit-drawer-input"><el-input v-model="currentItem.itemInfo.title"></el-input></div>
        <div class='edit-drawer-img'>
            <img :src='currentItem.itemInfo.iconSrc'/>
            <span>
                <div class="edit-drawer-img-edit img-edit" @click="showEditDialog">{{nameText.editPicture}}</div>
                <div style="position: relative">
                    <div class="img-edit">{{nameText.removePicture}}</div>
                    <input type="file" class="img-edit-input" @change="e => inputIcon(e)"/>
                </div>
            </span>
        </div>
        <button class='edit-brawer-button' @click='editComplete'>{{nameText.complete}}</button>
        <el-dialog :visible.sync="editDialogVisible" width='360px' :modal="false" :append-to-body="true"
            :destory-on-close='true' class="cropper-dialog">
            <image-cropper v-on:finish='getCropperData' :img="cropperContent"></image-cropper>
        </el-dialog>
    </div>
</template>
<script>
    import './style/upload.css';
    import { VueCropper } from 'vue-cropper';
    import ImageCropper from './imageCropper.vue';
    import { mapMutations,mapState, mapActions } from 'vuex';
    import { upBase64 } from '../services/uploadImg.js';
    import imgHost from '../services/apis/imgHost.js';

    export default {
        name: 'app',
        // props:['info'],
        components:{
            ImageCropper,
            VueCropper
        },
        computed:{
            ...mapState('homeWebList',['currentItem', 'homeWebList']),
            ...mapState('settings', ['cloudSave', 'iconLayout']),
            nameText:function(){
                return{
                    'editPicture': '编辑图片',
                    'removePicture': '选择图片',
                    'complete': '完成'
                }
            },
        },
        data() {
            return {
                editDialogVisible: false,
                tempBase64: '',
                tempSrc: '',
                cropperContent: ''
            }
        },
        mounted(){
            console.log(this.currentItem)
            this.tempBase64 = this.currentItem.itemInfo.iconBase64 ? this.currentItem.itemInfo.iconBase64 : '';
                this.tempSrc = this.currentItem.itemInfo.iconSrc ? this.currentItem.itemInfo.iconSrc : '';
                this.cropperContent = this.currentItem.itemInfo.iconSrc ? this.currentItem.itemInfo.iconSrc : '';
            // if (!this.currentItem.isNew) {
            //     console.log('旧的')
            //     this.tempBase64 = this.currentItem.itemInfo.iconBase64 ? this.currentItem.itemInfo.iconBase64 : '';
            //     this.tempSrc = this.currentItem.itemInfo.iconSrc ? this.currentItem.itemInfo.iconSrc : '';
            //     this.cropperContent = this.currentItem.itemInfo.iconSrc ? this.currentItem.itemInfo.iconSrc : '';
            // } else {
            //     console.log('xinjian')
            //     this.tempBase64 = '';
            //     this.tempSrc = '';
            //     this.cropperContent = '';
            //     this.currentItem.itemInfo.iconSrc = '';
            //     this.currentItem.itemInfo.iconBase64 = '';
            //     this.currentItem.itemInfo.title = '';
            //     this.currentItem.itemInfo.url = '';
            // }
        },
        methods:{
            ...mapMutations('homeWebList',['CHANGE_WEB_INFO','EDIT_DRAWER_VISIBLE', 'CHANGE_CURRENT_ITEM']),
            ...mapActions('homeWebList',['afterChanged']),
            async getCropperData(data){
                this.currentItem.itemInfo.iconSrc = data;
                this.tempBase64 = data;
                if (this.cloudSave) {
                    await upBase64(data, (key) => {this.tempSrc = imgHost + key}, () => {console.log('上传失败')})
                }
                this.editDialogVisible = false;
            },
            showEditDialog(){
                this.editDialogVisible = true;
            },
            changeBg(rgb){
            },
            inputIcon(e) {
                this.tempSrc = window.URL.createObjectURL(e.target.files[0]);
                this.cropperContent = window.URL.createObjectURL(e.target.files[0]);
                this.editDialogVisible = true;
            },
            editComplete(){
                // this.CHANGE_WEB_INFO(this.currentItem);
                console.log(this.currentItem, '当前编辑');
                let changedItem = this.currentItem.itemInfo;
                changedItem.iconSrc = this.tempSrc;
                changedItem.iconBase64 = this.tempBase64;
                console.log(changedItem, '编辑后');
                let newList = this.homeWebList;
                if (this.currentItem.isNew) {
                    let pageSize = this.iconLayout.row * this.iconLayout.col;
                    if(this.homeWebList[this.homeWebList.length - 1].length === pageSize) {
                        newList.push([]);
                        newList[newList.length - 1].push(changedItem)
                    } else {
                        newList[this.currentItem.pageIndex][this.currentItem.itemIndex] = changedItem
                    }
                }
                this.afterChanged(newList)
                this.EDIT_DRAWER_VISIBLE(false);
            }
        },
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
    .img-edit-input {
        position: absolute;
        bottom: 0;
        opacity: 0;
        cursor: pointer;
    }
    /* .color-item{

    } */
</style>