<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ cloudSaveBtn }}
        </p>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ cloudSaveTip }}</span>
            <el-switch
                @change="toggleCloudSave($event)"
                class="setting-switch"
                v-model="cloudSave"
            >
            </el-switch>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'cloudSave',
    data() {
        return {
            resetAll: ''
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        cloudSaveBtn: function() {
            return localeText[this.location].cloudSaveBtn
        },
        cloudSaveTip: function() {
            return localeText[this.location].cloudSaveTip
        },
        ...mapState('settings', [
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue',
            'newSiteNewTabValue',
            'cloudSave',
            'searchResultNewTabValue',
            'openMarkNewTabValue',
            'historyNewTabValue',
            'randomBgBtn',
            'showOftenUsedBar',
            'showEmailBtn',
            'showBookMarkBar',
            'iconLayout',
            'hideAllIcons',
            'iconRadiusValue',
            'iconSizeValue',
            'hideSearchBarValue',
            'hideSearchTypeValue',
            'searchBarRadiusValue',
            'searchBarSizeValue',
            'searchBarOpacityValue',
            'fontSizeValue',
            'fontColorValue',
        ])
    },
    methods: {
        toggleCloudSave(value) {
            if(this.cloudSave) {
                this.uploadSettings({cloudSave: value})
                this.SET_CLOUDSAVE(value)
            } else {
                this.SET_CLOUDSAVE(value)
                let newSettings = {
                    bgSrc: this.bgSrc,
                    maskOpacityValue: this.maskOpacityValue,
                    bgBlurValue: this.bgBlurValue,
                    newSiteNewTabValue: this.newSiteNewTabValue,
                    cloudSave: this.cloudSave,
                    searchResultNewTabValue: this.searchResultNewTabValue,
                    openMarkNewTabValue: this.openMarkNewTabValue,
                    historyNewTabValue: this.historyNewTabValue,
                    randomBgBtn: this.randomBgBtn,
                    showOftenUsedBar: this.showOftenUsedBar,
                    showEmailBtn: this.showEmailBtn,
                    showBookMarkBar: this.showBookMarkBar,
                    iconLayout: this.iconLayout,
                    hideAllIcons: this.hideAllIcons,
                    iconRadiusValue: this.iconRadiusValue,
                    iconSizeValue: this.iconSizeValue,
                    hideSearchBarValue: this.hideSearchBarValue,
                    hideSearchTypeValue: this.hideSearchTypeValue,
                    searchBarRadiusValue: this.searchBarRadiusValue,
                    searchBarSizeValue: this.searchBarSizeValue,
                    searchBarOpacityValue: this.searchBarOpacityValue,
                    fontSizeValue: this.fontSizeValue,
                    fontColorValue: this.fontColorValue,
                };
                this.uploadSettings(newSettings)
            }
        },
        ...mapMutations('settings', [
            'SET_CLOUDSAVE',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    },
}
</script>
<style scoped>
    .reset-btn-wrap {
        width: 100%;
        height: 40px;
    }
    .reset-btn {
        float: right
    }
</style>