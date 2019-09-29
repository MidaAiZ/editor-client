<template>
    <div class="change-bg-btn" @click="newWallPaper">
        <div v-if="wallPaperLoading == false" class="brush-wrapper-static">
            <div class="brush-static yellow">
                <div class="brush__brush"></div>
                <div class="brush__arm">
                <div class="arm-inner"></div>
                </div>
                <div class="brush__handle"></div>
            </div>
        </div>
        <div v-if="wallPaperLoading == true" class="brush-wrapper">
            <div class="brush yellow">
                <div class="brush__brush"></div>
                <div class="brush__arm">
                <div class="arm-inner"></div>
                </div>
                <div class="brush__handle"></div>
            </div>
        </div>
    </div>
</template>
<script>
import './newBgBrush.scss'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'newBgBrush',
    data(){
        return{
            // brushAnimate: false
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
        ...mapState('wallPaper', [
            'wallPaperLoading',
        ])
    },
    methods: {
        newWallPaper() {
            this.SET_WALLPAPERLOADING(true)
            this.SET_BGSRC('Unsplash')
        },
        ...mapMutations('wallPaper', [
            'SET_WALLPAPERLOADING',
        ]),
        ...mapMutations('settings', [
            'SET_BGSRC',
        ]),
    }
}
</script>
<style scoped>
    
</style>