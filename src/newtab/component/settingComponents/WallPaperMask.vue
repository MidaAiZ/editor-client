<template>
    <div class="setting-modal setting-modal-not-first">
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ bgMaskOpacity }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :value="maskOpacityValue" @input="changeOpacity($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item-last">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ bgBlur }}
            </p>
            <el-slider :value="bgBlurValue" @input="changeBlur($event)" :format-tooltip="formatTooltip"></el-slider>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../../static/locale/index.js';
import './setting.css';
import debounce from '../../utils/debounce.js';

export default {
    name: 'wallPaperMask',
    data() {
        return {
        }
    },
    computed: {
        ...mapState('settings', [
            'maskOpacityValue',
            'bgBlurValue',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        bgMaskOpacity: function() {
            return localeText[this.location].bgMaskOpacity
        },
        bgBlur: function() {
            return localeText[this.location].bgBlur
        }
    },
    methods: {
        formatTooltip(val) {
            return val + '%';
        },
        changeOpacity(value) {
            this.SET_BGMASKOPACITY(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({maskOpacityValue: value})
        },
        changeBlur(blur) {
            this.SET_BGBLUR(blur)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({bgBlurValue: blur})
        },
        ...mapMutations('settings', [
            'SET_BGMASKOPACITY',
            'SET_BGBLUR',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>