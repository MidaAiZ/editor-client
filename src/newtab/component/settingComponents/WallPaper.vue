<template>
     <div class="setting-modal background-setting">
        <p class="setting-type-name">
            {{backgroundImgSetting}}
        </p>
        <div class="setting-bg-item">
            <el-radio @change="changeBgSrc('default')" :value="bgSrc" label="default">
                <span class="bg-name">{{ defaultBg }}</span>
            </el-radio>
            <p class="bg-desc">
                {{ defaultDesc }}
            </p>
        </div>
        <div class="setting-bg-item">
            <el-radio @change="changeBgSrc('Unsplash')" :value="bgSrc" label="Unsplash">
                <span class="bg-name">{{ UnsplashBg }}</span>
                <p class="bg-desc">
                    {{ UnsplashDesc }}
                </p>
            </el-radio>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'wallPaper',
    data() {
        return {
        }
    },
    computed: {
        ...mapState('settings', [
            'bgSrc',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        backgroundImgSetting: function() {
            return localeText[this.location].backgroundImgSetting
        },
        defaultBg: function() {
            return localeText[this.location].defaultBg.title
        },
        defaultDesc: function() {
            return localeText[this.location].defaultBg.desc
        },
        UnsplashBg: function() {
            return localeText[this.location].UnsplashBg.title
        },
        UnsplashDesc: function() {
            return localeText[this.location].UnsplashBg.desc
        }
    },
    methods: {
        changeBgSrc(src) {
            this.SET_BGSRC(src)
            this.uploadSettings({bgSrc: src});
        },
        ...mapMutations('settings', [
            'SET_BGSRC',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>