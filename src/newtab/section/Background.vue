<template>
    <div>
        <div class="bg-mask" :style="{ opacity: (maskOpacityValue / 100) }">
        </div>
        <div
            class="background bg-not-default unsplash-src"
            :style="{
                backgroundImage: `url(${this.bgSrc === 'default' ? require('../../../static/defaultWallPapers/bg.jpg') : this.wallPaperSrc})`,
                filter: `blur(${bgBlurValue / 10}px)`,
                transform: `scale(${1 + bgBlurValue / 1000})`
                }">
        </div>
        <div class="change-bg-btn">
            <newBgBrush />
        </div>
    </div>
</template>
<script>
// import './newBGbrush.scss'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { storageWallPaper, getUnsplashWallPaper } from '../utils/wallPaperStorage.js'
import newBgBrush from '../component/NewBgBrush.vue'

export default {
    name: 'background',
    components: {
        newBgBrush,
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue',
        ]),
        ...mapState('wallPaper', [
            'wallPaperSrc',
        ]),
    },
    methods: {
        setWallPaperCb(localUrl) {
            this.imgUrl = localUrl
            // this.SET_WALLPAPERLOADING(false)
        },
        ...mapMutations('wallPaper', [
            'SET_WALLPAPERLOADING'
        ]),
    }
}
</script>
<style scoped>
    .bg-mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        background-color: #000;
    }
    .background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width:100%;
        height:100%;
        z-index: -2;
        background-repeat: no-repeat;
        background-attachment: fixed;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: center;
        transition: background-image ease .5s;
    }
    /* .background:after{
        content: "";
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(10px);
        -webkit-filter: blur(10px);
        z-index: 1;
        padding: 0;
        margin: 0;
    } */
    .change-bg-btn {
        position: fixed;
        z-index: 11;
        bottom: 50px;
        right: 60px;
        cursor: pointer;
    }
    
</style>
