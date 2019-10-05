<template>
     <div class="setting-modal background-setting">
        <p class="setting-type-name">
            {{backgroundImgSetting}}
        </p>
        <div class="setting-bg-item">
            <el-radio @change="changeBgSrc('default')" v-model="bgSrc" label="default">
                <span class="bg-name">{{ defaultBg }}</span>
            </el-radio>
            <p class="bg-desc">
                {{ defaultDesc }}
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
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'wallPaper',
    data() {
        return {
            backgroundImgSetting: '',
            BingBg: '',
            UnsplashBg: '',
            randomBg: '',
            BingDesc: '',
            UnsplashDesc: '',
            randomDesc: '',
        }
    },
    created: function() {
        this.backgroundImgSetting = localeText[this.location].backgroundImgSetting
        this.defaultBg = localeText[this.location].defaultBg.title
        this.defaultDesc = localeText[this.location].defaultBg.desc
        this.BingBg = localeText[this.location].BingBg.title
        this.UnsplashBg = localeText[this.location].UnsplashBg.title
        this.randomBg = localeText[this.location].randomBg.title
        this.BingDesc = localeText[this.location].BingBg.desc
        this.UnsplashDesc = localeText[this.location].UnsplashBg.desc
        this.randomDesc = localeText[this.location].randomBg.desc
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
        ]),
        ...mapState('locale', [
            'location',
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