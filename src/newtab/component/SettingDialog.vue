<template>
    <el-drawer :visible="settingVis" :modal="false" size="500px" custom-class="setting-drawer" top="5vh" @close="closeSetting(false)":show-close="false">
        <div class="setting-title" slot="title">
            <span class="setting-name">{{settingName}}</span>
            <i class="el-icon-close close-setting" @click="closeSetting(false)"></i>
        </div>
        <div class="setting-wrap">
            <div class="setting-modal background-setting">
                <p class="setting-type-name">
                    {{backgroundImgSetting}}
                </p>
                <div class="setting-bg-item">
                    <el-radio @change="changeBgSrc('Bing')" v-model="bgSrc" label="Bing">
                        <span class="bg-name">{{ BingBg }}</span>
                    </el-radio>
                    <p class="bg-desc">
                        {{ BingDesc }}
                    </p>
                </div>
                <div class="setting-bg-item">
                    <el-radio @change="changeBgSrc('Unsplash')" v-model="bgSrc" label="Unsplash">
                        <span class="bg-name">{{ UnsplashBg }}</span>
                        <p class="bg-desc">
                            {{ UnsplashDesc }}
                        </p>
                    </el-radio>
                </div>
                <div class="setting-bg-item-last">
                    <el-radio @change="changeBgSrc('random')" v-model="bgSrc" label="random">
                        <span class="bg-name">{{ randomBg }}</span>
                        <p class="bg-desc">
                            {{ randomDesc }}
                        </p>
                    </el-radio>
                </div>
            </div>
            <div class="setting-modal setting-modal-not-first">
                <div class="bg-mask-setting-item">
                    <p class="setting-type-name bg-mask-setting-item-name">
                        {{ bgMaskOpacity }}
                    </p>
                    <el-slider :format-tooltip="formatTooltip" v-model="maskOpacityValue" @input="changeOpacity($event)"></el-slider>
                </div>
                <div class="bg-mask-setting-item-last">
                    <p class="setting-type-name bg-mask-setting-item-name">
                        {{ bgBlur }}
                    </p>
                    <el-slider v-model="bgBlurValue" @input="changeBlur($event)" :format-tooltip="formatTooltip"></el-slider>
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../static/locale/zh_CN.js'

export default {
    name: 'settingDialog',
    data() {
        return {
            settingName: zh_CN.settingName,
            backgroundImgSetting: zh_CN.backgroundImgSetting,
            BingBg: zh_CN.BingBg.title,
            UnsplashBg:zh_CN.UnsplashBg.title,
            randomBg: zh_CN.randomBg.title,
            BingDesc: zh_CN.BingBg.desc,
            UnsplashDesc: zh_CN.UnsplashBg.desc,
            randomDesc: zh_CN.randomBg.desc,
            bgMaskOpacity: zh_CN.bgMaskOpacity,
            bgBlur: zh_CN.bgBlur
        }
    },
    computed: {
        ...mapState('settings', [
            'settingVis',
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue'
        ])
    },
    methods: {
        closeSetting(vis) {
            this.SET_SETTINGVIS(vis)
        },
        changeBgSrc(src) {
            this.SET_BGSRC(src)
        },
        formatTooltip(val) {
            return val + '%';
        },
        changeOpacity(value) {
            this.SET_BGMASKOPACITY(value)
        },
        changeBlur(blur) {
            this.SET_BGBLUR(blur)
        },
        ...mapMutations('settings', [
            'SET_SETTINGVIS',
            'SET_BGSRC',
            'SET_BGMASKOPACITY',
            'SET_BGBLUR'
        ]),
    }
}
</script>
<style scoped>
    .setting-drawer {
        background: #677;
        opacity: 0.3;
    }
    .setting-title {
        width: 100%;
        height: 40px;
        font-size: 20px;
    }
    .setting-name {
        width: 50px;
        height: 40px;
        line-height: 40px;
        float: left;
    }
    .close-setting {
        float: right;
        height: 40px;
        line-height: 35px;
        cursor: pointer;
    }
    .setting-wrap {
        height: calc(100vh - 100px);
        padding-left: 26px;
        padding-right: 26px;
        overflow: auto;
        margin-top: -15px;
    }
    .setting-type-name {
        font-size: 16px;
        color: #666;
    }
    .setting-modal {
        background-color: #f9f9f9;
        padding: 18px;
    }
    .setting-modal-not-first {
        margin-top: 20px;
    }
    .setting-bg-item {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .setting-bg-item-last {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .bg-name {
        font-size: 16px;
    }
    .bg-desc {
        font-size: 14px;
        text-indent: 23px;
        font-weight: lighter;
        color: #666;
    }
    .bg-mask-setting-item-name {
        margin-bottom: -3px;
    }
</style>