<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ font }}
        </p>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ fontSize }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :min="12" :max="30" v-model="fontSizeValue" @input="setFontSize($event)"></el-slider>
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import { Chrome } from 'vue-color'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'searchBarSetting',
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            font: zh_CN.font,
            fontSize: zh_CN.fontSize,
            fontColor: zh_CN.fontColor,
            colorPickerVis: false,
        }
    },
    computed: {
        ...mapState('settings', [
            'fontSizeValue',
            'fontColorValue'
        ])
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
        },
        setFontColor(value) {
            this.SET_FONTCOLOR(value.hex)
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
        z-index: 111;
    }
</style>