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
        <!-- <div class="setting-open-item">
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
        </div> -->
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'
export default {
    name: 'viewSetting',
    data() {
        return {
    
        }
    },
    computed: {
        ...mapState('settings', [
            'randomBgBtn',
            'showOftenUsedBar',
            'showEmailBtn',
            'showBookMarkBar',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        view: function() {
            return localeText[this.location].view
        },
        showRandomBg: function() {
            return localeText[this.location].showRandomBg
        },
        showOftenUsedWeb: function() {
            return localeText[this.location].showOftenUsedWeb
        },
        showEmail: function() {
            return localeText[this.location].showEmail
        },
        showBookMark: function() {
            return localeText[this.location].showBookMark
        }
    },
    methods: {
        toggleHomeBtnSetting(value, type) {
            this.SET_HOMEBTN({
                type,
                value,
            });
            this.uploadSettings({[type]: value})
        },
        ...mapMutations('settings', [
            'SET_HOMEBTN',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>