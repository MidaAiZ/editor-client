<template>
<div class="setting-modal setting-modal-not-first">
                <p class="setting-type-name">
                    {{ targetOpenType }}
                </p>
                <p class="setting-tip">
                    {{ targetOpenTypeTip }}
                </p>
                <div class="setting-open-item">
                    <span class="setting-open-title">{{ newSiteNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'newSiteNewTabValue')"
                        class="setting-switch"
                        v-model="newSiteNewTabValue"
                    >
                    </el-switch>
                </div>
                <div class="setting-open-item">
                    <span class="setting-open-title">{{ searchResultNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'searchResultNewTabValue')"
                        class="setting-switch"
                        v-model="searchResultNewTabValue"
                    >
                    </el-switch>
                </div>
                <!-- <div class="setting-open-item">
                    <span class="setting-open-title">{{ openMarkNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'openMarkNewTabValue')"
                        class="setting-switch"
                        v-model="openMarkNewTabValue"
                    >
                    </el-switch>
                </div> -->
                <!-- <div class="setting-open-item">
                    <span class="setting-open-title">{{ historyNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'historyNewTabValue')"
                        class="setting-switch"
                        v-model="historyNewTabValue"
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
    name: 'openWay',
    data() {
        return {
            // targetOpenType: '',
        }
    },
    computed: {
        targetOpenType: function() {
            return localeText[this.location].targetOpenType
        },
        ...mapState('settings', [
            'newSiteNewTabValue',
            'searchResultNewTabValue',
            'openMarkNewTabValue',
            'historyNewTabValue',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        targetOpenTypeTip: function() {
            return localeText[this.location].targetOpenTypeTip
        },
        newSiteNewTab: function() {
            return localeText[this.location].newSiteNewTab
        },
        searchResultNewTab: function() {
            return localeText[this.location].searchResultNewTab
        },
        openMarkNewTab: function() {
            return localeText[this.location].openMarkNewTab
        },
        historyNewTab: function() {
            return localeText[this.location].historyNewTab
        }
    },
    methods: {
        toggleNewType(value, type) {
            this.SET_NEWTYPE({
                type,
                value,
            })
            this.uploadSettings({[type]: value})
        },
        ...mapMutations('settings', [
            'SET_NEWTYPE',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>