<template>
    <div>
        <div class="bg-mask" :style="{ opacity: (maskOpacityValue / 100) }">
        </div>
        <div v-show="bgSrc === 'default'" class="background default-src">
            默认壁纸
        </div>
        <div v-show="bgSrc === 'Bing'" id="bing-wall-paper" class="background bg-not-default bing-src" :style="{backgroundImage: `url(${imgUrl})`}">
            Bing
        </div>
        <div v-show="bgSrc === 'Unsplash'" class="background bg-not-default unslash-src">
            Unsplash
        </div>
        <div  v-show="bgSrc === 'random'" class="background bg-not-default random">
            random
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import storageWallPaper from '../utils/wallPaperStorage.js'

export default {
    name: 'background',
    data(){
        return{
            imgUrl: ''
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
        ])
    },
    watch: {
        bgSrc: function(newSrc, oldSrc) {
            if(newSrc === 'Bing') {
                this.imgUrl = require('../../../static/defaultWallPapers/moren.jpg')
                storageWallPaper(this.bgSrc, 'http://bing.ioliu.cn/v1/rand?w=1024&h=768', 'bing-wall-paper', this.setWallPaperCb, false)
                // console.log('bingSrcx', localUrl)
                // this.imgUrl = localUrl
            }
            // const localUrl = await storageWallPaper(this.bgSrc, 'http://bing.ioliu.cn/v1/rand?w=1366', 'bing-wall-paper')
        }
    },
    methods: {
        setWallPaperCb(localUrl) {
            this.imgUrl = localUrl
        },
        ...mapActions('wallPaper', [
            'getBingWallPaper',
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
        background-position: center 0;
    }
    .default-src {
        background-image: url('../../../static/defaultWallPapers/moren.jpg');
    }
</style>