<template>
    <div>
        <div class="bg-mask" :style="{ opacity: (maskOpacityValue / 100) }">
        </div>
        <div class="background bg-not-default unslash-src" :style="{backgroundImage: `url(${this.bgSrc === 'default' ? require('../../../static/defaultWallPapers/moren.jpg') : this.wallPaperSrc})`}">
            Unsplash
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
            // imgUrl: (this.bgSrc !== 'default' && JSON.parse(localStorage.getItem(`storageWallPaper`)))
            // ?
            // this.src,
            // :
            // require('../../../static/defaultWallPapers/moren.jpg'),
        }
    },
    // mounted: async function () {
    //     // this.getBingWallPaper()
    //     if (this.bgSrc = 'Bing') {
    //         const defaultWallPaperUrl = await storageWallPaper(this.bgSrc, 'http://bing.ioliu.cn/v1/rand?w=1366', 'bing-wall-paper')
    //     }
    //     // console.log(defaultWallPaperUrl)
    //     // this.imgUrl = defaultWallPaperUrl
    // },
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
            this.SET_WALLPAPERLOADING(false)
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
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-repeat: no-repeat;
        background-attachment: fixed;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: center;
    }
    .change-bg-btn {
        position: fixed;
        z-index: 1;
        bottom: 50px;
        right: 60px;
    }
    
</style>