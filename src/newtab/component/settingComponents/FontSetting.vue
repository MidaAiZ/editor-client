<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ font }}
        </p>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ fontSize }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :min="12" :max="30" :value="fontSizeValue" @input="setFontSize($event)"></el-slider>
        </div>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ fontColor }}</span>
            <div class="font-color-wrap" @click.stop.prevent="openColorPicker" :style="{backgroundColor: fontColorValue}">
                <div class="color-picker-wrap" :style="{display: colorPickerVis ? 'block' : 'none'}">
                    <chrome-picker v-model="fontColorValue" @input="setFontColor($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import { Chrome } from 'vue-color';
import localeText from '../../../../static/locale/index.js';
import debounce from '../../utils/debounce.js';
import './setting.css';

export default {
    name: 'searchBarSetting',
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            colorPickerVis: false,
        }
    },
    computed: {
        ...mapState('settings', [
            'fontSizeValue',
            'fontColorValue'
        ]),
        ...mapState('locale', [
            'location'
        ]),
        font: function() {
            return localeText[this.location].font
        },
        fontSize: function() {
            return localeText[this.location].fontSize
        },
        fontColor: function() {
            return localeText[this.location].fontColor
        }
    },
    mounted: function () {
        let that = this;
        document.onclick = that.closeColorPicker
    },
    methods: {
        formatTooltip(val) {
            return val + 'px';
        },
        setFontSize(value) {
            this.SET_FONTSIZE(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({fontSizeValue: value})
        },
        setFontColor(value) {
            this.SET_FONTCOLOR(value.hex)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({fontColorValue: value.hex})
        },
        openColorPicker() {
            this.colorPickerVis = true
        },
        closeColorPicker() {
            this.colorPickerVis = false
        },
        ...mapMutations('settings', [
            'SET_FONTSIZE',
            'SET_FONTCOLOR'
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
    .font-color-wrap {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        border: 1px #ccc solid;
        position: relative;
        float: right;
        margin-right: 10px;
        margin-top: 7.5px;
        cursor: pointer;
    }
    .color-picker-wrap {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 111111;
    }
</style>