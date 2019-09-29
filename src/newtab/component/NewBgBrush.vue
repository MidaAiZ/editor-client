<template>
    <div class="change-bg-btn">
        <div v-if="brushAnimate == false" class="brush-wrapper-static">
            <div class="brush-static yellow">
                <div class="brush__brush"></div>
                <div class="brush__arm">
                <div class="arm-inner"></div>
                </div>
                <div class="brush__handle"></div>
            </div>
        </div>
        <div v-if="brushAnimate == true" class="brush-wrapper">
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
            brushAnimate: false
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
        // ...mapState('settings', [
        //     'bgSrc',
        //     'maskOpacityValue',
        //     'bgBlurValue',
        // ])
    },
}
</script>
<style scoped>
    
</style>