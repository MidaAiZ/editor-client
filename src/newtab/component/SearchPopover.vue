<template>
    <div id="search-popover" :style="borderRadius">
        <div class="search-engine-container" v-for="(item,index) in engineList" @click="changeEngine(index)"
            :key="index">
            <div v-if="index === engineList.length-1" class="search-engine">
                <span v-if="index === engineList.length-1" class="add-icon">
                    <div class="icon-container"><i class="el-icon-circle-plus-outline"></i></div>
                </span>
            </div>
            <div v-else class="search-engine">
                <img :src="item.iconSrc" class="engine-img" />
                <div class="engine-name">{{item.title}}</div>
            </div>
        </div>
        <el-drawer :visible="drawer" size="500px" @close="drawerClose()" :show-close="false" :modal="false">
            <div slot="title" class="engine-drawer-top">
                <span class="engine-drawer-title">{{search}}</span>
                <span class="engine-drawer-close" @click="drawerClose()">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <div>
                <div style="display:flex">
                    <span class="engine-drawer-tab" :class="{'backgroundColor':isDefault}"
                        @click="isDefault=true">{{defaultAdd}}</span>
                    <span class="engine-drawer-tab" :class="{'backgroundColor':!isDefault}"
                        @click="isDefault=false">{{custom}}</span>
                </div>
                <div v-if="isDefault">
                    <div class="engine-list-container">
                        <div class="engine-list-item" v-for="(item,index) in allEngineList" :key="item.id">
                            <span style="display: flex;align-items: center">
                                <img :src="item.iconSrc" />
                                <span class="engine-item-name">{{item.title}}</span>
                            </span>
                            <el-switch v-model="item.isChoose" @change="changeChoose(index)"></el-switch>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="custom-engine">
                        <div v-if="!isAdd">
                            <div v-if="customEngineList.length!==0">
                                <div class="engine-list-item" v-for="(item,index) in customEngineList" :key="index">
                                    <span class="engine-list-item-left">
                                        <img :src="item.iconSrc" />
                                        <span class="engine-item-name">{{item.title}}</span>
                                    </span>
                                    <span class="engine-list-item-right">
                                        <el-switch v-model="item.isChoose" @change='customEngineChange(index)'></el-switch>
                                        <span class="delete-custom-engine-button" @click="deleteCustomEngine(item)"><i class="el-icon-close"></i></span>
                                    </span>
                                </div>
                            </div>
                            <div v-else class="not-add-engine-text">{{notAddCustomEngine}}</div>
                            <button class="add-custom-engine-button"
                                @click="isAdd=true">{{addNewSearchEngine}}</button>
                        </div>
                        <div v-else>
                            <div class="form-item-container">
                                <div class="form-label">{{searchEngine}}</div>
                                <el-input v-model="customEngine.title"></el-input>
                            </div>
                            <div class="form-item-container">
                                <div class="form-label">{{engineUrl}}</div>
                                <el-input type="textarea" v-model="customEngine.urls.web"></el-input>
                            </div>
                            <div class="form-item-container">
                                <div class="form-label">{{engineIcon}}</div>
                                <div>
                                    <el-upload class="avatar-uploader" :show-file-list="false"
                                        action=""
                                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                                        :on-change="uploadChange" :auto-upload="false">
                                        <img v-if="customEngine.iconSrc" :src="customEngine.iconSrc" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <button class="add-custom-engine-button" @click="addCustomEngine">{{add}}</button>
                            <button class="cancel-custom-engine-button"
                                @click="isAdd=false">{{cancel}}</button>
                            <!-- <image-cropper v-on:finish='getCropperData' :img='imageUrl'></image-cropper> -->
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-dialog 
            :visible.sync="dialogVisible"
            width="360px" 
            :modal="false" 
            :append-to-body="true"
            class="cropper-dialog"
        >
            <image-cropper v-on:finish='getCropperData' :img='imageUrl'></image-cropper>
        </el-dialog>
    </div>
</template>
<script>
    import './style/upload.css';
    import ImageCropper from './imageCropper.vue';
    import localeText from '../../../static/locale/index.js';
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex';
    import {
        VueCropper
    } from 'vue-cropper';
    import { localSave } from '../utils/localSave.js';
    export default {
        components: {
            VueCropper,
            ImageCropper
        },
        computed: {
            ...mapGetters('engineList',['maxID']),
            ...mapState('engineList', ['searchEngineList', 'allEngineList','customEngineList']),
            ...mapState('settings', ['searchBarRadiusValue']),
            ...mapState('locale', [
                'location',
            ]),
            borderRadius: function () {
                return {
                    'border-radius': 4.0 * (this.searchBarRadiusValue * 2.0) / 100 + 'vh'
                }
            },
            engineList: function () {
                let result = this.searchEngineList.slice();
                result.push({
                    'name': 'add'
                });
                return result
            },
            search: function() {
                return localeText[this.location].search
            },
            defaultAdd: function() {
                return localeText[this.location].addType.default
            },
            custom: function() {
                return localeText[this.location].addType.customize
            },
            notAddCustomEngine: function() {
                return localeText[this.location].notAddCustomEngine
            },
            addNewSearchEngine: function() {
                return localeText[this.location].addNewSearchEngine
            },
            searchEngine: function() {
                return localeText[this.location].searchEngine
            },
            engineUrl: function() {
                return localeText[this.location].engineUrl
            },
            engineIcon: function() {
                return localeText[this.location].icon
            },
            add: function() {
                return localeText[this.location].addSite
            },
            cancel: function() {
                return localeText[this.location].cancel
            },
            complete: function() {
                return localeText[this.location].complete
            },
        },
        data() {
            return {
                drawer: false,
                isDefault: true,
                isAdd: false,
                imageUrl: '',
                fileUrl: '',
                dialogVisible: false,
                customEngine: {
                    id: '',
                    urls: {web: ''},
                    iconSrc: '',
                    title: '',
                    isChoose: true
                },
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
                //                isShow:false
            }
        },
        created: function() {
            // this.getEngineList()
            if (!localStorage.getItem('engineList')) {
                localSave('engineList', {engineList: this.searchEngineList})
            }
        },
        methods: {
            ...mapMutations('engineList', ['DELETE_CHOOSE_ENGINE', 'ADD_CHOOSE_ENGINE', 'CHANGE_CURRENT_ENGINE',
            'ADD_CUSTOM_ENGINE','DELETE_CUSTOME_ENGINE','OPEN_CUSTOM_ENGINE','CLOSE_CUSTOM_ENGINE']),
            ...mapActions('engineList', ['getEngineList']),
            changeEngine: function (index) {
                if (index === this.engineList.length - 1) {
                    this.drawer = true;
                } else {
                    this.CHANGE_CURRENT_ENGINE(index);
                }
            },
            drawerClose() {
                this.customEngine = {
                    id: '',
                    urls: {web: ''},
                    iconSrc: '',
                    title: '',
                    isChoose: true
                }
                this.isAdd = false
                this.drawer = false;
            },
            changeChoose(index) {
                if (this.allEngineList[index].isChoose) {
                    this.ADD_CHOOSE_ENGINE(index);
                } else {
                    this.DELETE_CHOOSE_ENGINE(index);
                }
            },
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
            handleAvatarSuccess(res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                // console.log(file)
                // this.dialogVisible = true;
            },
            uploadChange(file, fileList) {
                this.imageUrl = window.URL.createObjectURL(file.raw);
                this.option.img = window.URL.createObjectURL(file.raw);

                this.dialogVisible = true;
            },
            cropperFinish(type){
                let self = this;
                this.$refs.cropper.getCropData( data => {
                    self.customEngine.img = data;
                    self.dialogVisible = false;
                })
            },
            addCustomEngine(){
                this.customEngine.id = this.maxID + 1;
                this.customEngine.isChoose = true;
                // this.customEngine.urls = {web: this.customEngine.urls}
                // console.log('ce', this.customEngine)
                this.ADD_CUSTOM_ENGINE(this.customEngine);
                // this.customEngine.urls.web = '';
                // this.customEngine.iconSrc = '';
                // this.customEngine.title = '';
                // this.isAdd = false;
            },
            deleteCustomEngine(item){
                this.DELETE_CUSTOME_ENGINE(item);
            },
            customEngineChange(index){
                if(this.customEngineList[index].isChoose){
                    this.OPEN_CUSTOM_ENGINE(index);
                }else{
                    this.CLOSE_CUSTOM_ENGINE(index);                                        
                }
            },
            getCropperData(data){
                this.customEngine.iconSrc = data;
                this.dialogVisible = false;
            }
        }
    }
</script>
<style scoped>
    #search-popover {
        width: 40vw;
        padding: 0;
        min-width: 450px;
        overflow: hidden;
        background-color: white;
    }

    .search-engine-container {
        float: left;
        width: 20%;
        height: 6vw;
        cursor: pointer;
        background-color: white;
        margin: 0;
        padding: 0;
        transition: background ease .2s;
        /*align-items:center;*/
        /*justify-content:center;*/
    }

    .search-engine-container:hover {
        background-color: #dddddd;
    }

    .search-engine {
        /*min-height: 85px;*/
        width: 100%;
        height: 100%;
        display: flex;
        margin: 0;
        padding: 0;
        /*flex-direction: column;*/
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .engine-img {
        width: 2vw;
        height: 2vw;
        margin-bottom: 10px;
    }

    .engine-name {
        font-size: 12px;
        line-height: 1.2;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .engine-add-container {
        display: inline-block;
        width: 20%;
        height: 6vw;
        cursor: pointer;
        background-color: white;
        margin: 0;
        padding: 0;
        transition: background ease .2s;
    }

    .engine-add-container:hover {
        background-color: #dddddd;
    }

    .add-icon {
        /*padding: 0;*/
        width: 2vw;
        height: 2vw;
        /*border: 1px #ccc dashed;*/
        position: relative;
        /*font-size: 1.5vw;*/
        /*line-height: 2vw;*/
        /*text-align:center;*/
    }

    .icon-container {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 2vw;
        transform: translate(-50%, -50%);
    }

    .engine-drawer-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .engine-drawer-title {
        font-size: 20px;
        font-weight: bold;
    }

    .engine-drawer-close {
        font-size: 20px;
        cursor: pointer;
    }

    .engine-drawer-tab {
        text-align: center;
        padding-top: 11px;
        padding-bottom: 11px;
        font-size: 13px;
        color: #656565;
        transition: background ease 0.2s;
        flex-grow: 1;
        background-color: #eee;
        cursor: pointer;
    }

    .backgroundColor {
        background-color: transparent;
    }

    .engine-list-container {
        padding: 20px 30px
    }

    .engine-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 1.3;
        color: #656565;
        margin-bottom: 20px;
    }

    .engine-list-item img {
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }

    .engine-item-name {
        max-width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
    }

    .custom-engine {
        padding: 20px 30px;
    }

    .not-add-engine-text {
        color: #ffc81f;
        font-size: 13px;
        line-height: 20px;
        margin-bottom: 20px;
    }

    .add-custom-engine-button {
        width: 100%;
        background-color: #ffc81f;
        color: white;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: pointer;
        opacity: 0.9;
    }

    .add-custom-engine-button:hover {
        opacity: 1;
    }

    .cancel-custom-engine-button {
        width: 100%;
        background-color: transparent;
        color: #ffc81f;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .form-label {
        font-size: 14px;
        color: #656565;
        margin-bottom: 12px;
        font-weight: 400;
    }

    .form-item-container {
        margin-bottom: 24px;
    }

    
    .engine-list-item-left{
        display: flex;
        align-items: center;
    }
    .engine-list-item-right{
        display: flex;
        align-items: center;
    }
    .delete-custom-engine-button{
        margin-left: 12px;
        font-size: 18px;
        cursor: pointer; 
    }

</style>