<template>
    <div>
        <div class="bg-mask" :style="{ opacity: (maskOpacityValue / 100) }">
        </div>
        <div v-if="bgSrc === 'Bing'" class="background bing-src">
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

export default {
    name: 'background',
    data(){
        return{
            imgUrl: ''
        }
    },
    mounted: function () {
        // this.getBingWallPaper()
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue',
        ])
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
        background-position: top center;
    }
    .bing-src {
        background-image: url('http://bing.ioliu.cn/v1/rand?w=1920&h=1200');
    }
</style>