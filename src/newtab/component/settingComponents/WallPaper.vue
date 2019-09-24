<template>
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
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'wallPaper',
    data() {
        return {
            backgroundImgSetting: zh_CN.backgroundImgSetting,
            BingBg: zh_CN.BingBg.title,
            UnsplashBg:zh_CN.UnsplashBg.title,
            randomBg: zh_CN.randomBg.title,
            BingDesc: zh_CN.BingBg.desc,
            UnsplashDesc: zh_CN.UnsplashBg.desc,
            randomDesc: zh_CN.randomBg.desc,
        }
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
        ])
    },
    methods: {
        changeBgSrc(src) {
            this.SET_BGSRC(src)
        },
        ...mapMutations('settings', [
            'SET_BGSRC',
        ]),
    }
}
</script>
<style scoped>
</style>