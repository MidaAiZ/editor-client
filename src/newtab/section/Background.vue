<template>
    <div id="background">
        <img :src="imgUrl"/>
        <div>
            {{ bgSrc }}
        </div>
        <div>
            {{ maskOpacityValue }}
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
    name: 'background',
    data(){
        return{
            imgUrl: ''
        }
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue',
        ])
    }
}
</script>
<style scoped>
    #background{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
    }
</style>