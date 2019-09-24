<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ view }}
        </p>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ showRandomBg }}</span>
            <el-switch
                @change="toggleHomeBtnSetting($event, 'randomBgBtn')"
                class="setting-switch"
                v-model="randomBgBtn"
            >
            </el-switch>
        </div>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ showOftenUsedWeb }}</span>
            <el-switch
                @change="toggleHomeBtnSetting($event, 'showOftenUsedBar')"
                class="setting-switch"
                v-model="showOftenUsedBar"
            >
            </el-switch>
        </div>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ showEmail }}</span>
            <el-switch
                @change="toggleHomeBtnSetting($event, 'showEmailBtn')"
                class="setting-switch"
                v-model="showEmailBtn"
            >
            </el-switch>
        </div>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ showBookMark }}</span>
            <el-switch
                @change="toggleHomeBtnSetting($event, 'showBookMarkBar')"
                class="setting-switch"
                v-model="showBookMarkBar"
            >
            </el-switch>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'
export default {
    name: 'viewSetting',
    data() {
        return {
            view: zh_CN.view,
            showRandomBg: zh_CN.showRandomBg,
            showOftenUsedWeb: zh_CN.showOftenUsedWeb,
            showEmail: zh_CN.showEmail,
            showBookMark: zh_CN.showBookMark,
        }
    },
    computed: {
        ...mapState('settings', [
            'randomBgBtn',
            'showOftenUsedBar',
            'showEmailBtn',
            'showBookMarkBar',
        ])
    },
    methods: {
        toggleHomeBtnSetting(value, type) {
            this.SET_HOMEBTN({
                type,
                value,
            })
        },
        ...mapMutations('settings', [
            'SET_HOMEBTN',
        ]),
    }
}
</script>
<style scoped>
</style>