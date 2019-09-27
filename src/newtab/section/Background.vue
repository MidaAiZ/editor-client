<template>
    <div>
        <div class="bg-mask" :style="{ opacity: (maskOpacityValue / 100) }">
        </div>
        <div v-if="bgSrc === 'default'" class="background default-src">
            默认壁纸
        </div>
        <div v-if="bgSrc === 'Bing'" id="bing-wall-paper" class="background bing-src" :style="{backgroundImage: `url(${imgUrl})`}">
            Bing
        </div>
        <div v-if="bgSrc === 'Unsplash'" class="background unslash-src">
            Unsplash
        </div>
        <div  v-if="bgSrc === 'random'" class="background random">
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
        bgSrc: async function(newSrc, oldSrc) {
            if(newSrc === 'Bing') {
                const localUrl = await storageWallPaper(this.bgSrc, 'http://bing.ioliu.cn/v1?w=1920&h=1200', 'bing-wall-paper')
                console.log('bingSrcx', localUrl)
                this.imgUrl = localUrl
            }
            // const localUrl = await storageWallPaper(this.bgSrc, 'http://bing.ioliu.cn/v1/rand?w=1366', 'bing-wall-paper')
        }
    },
    methods: {
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