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
                <div class="setting-open-item">
                    <span class="setting-open-title">{{ openMarkNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'openMarkNewTabValue')"
                        class="setting-switch"
                        v-model="openMarkNewTabValue"
                    >
                    </el-switch>
                </div>
                <div class="setting-open-item">
                    <span class="setting-open-title">{{ historyNewTab }}</span>
                    <el-switch
                        @change="toggleNewType($event, 'historyNewTabValue')"
                        class="setting-switch"
                        v-model="historyNewTabValue"
                    >
                    </el-switch>
                </div>
            </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'openWay',
    data() {
        return {
            targetOpenType: '',
            targetOpenTypeTip: '',
            newSiteNewTab: '',
            searchResultNewTab: '',
            openMarkNewTab: '',
            historyNewTab: ''
        }
    },
    computed: {
        ...mapState('settings', [
            'newSiteNewTabValue',
            'searchResultNewTabValue',
            'openMarkNewTabValue',
            'historyNewTabValue',
        ]),
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        this.resetAll = localeText[this.location].resetAll
        this.targetOpenType = localeText[this.location].targetOpenType
        this.targetOpenTypeTip = localeText[this.location].targetOpenTypeTip
        this.newSiteNewTab = localeText[this.location].newSiteNewTab
        this.searchResultNewTab = localeText[this.location].searchResultNewTab
        this.openMarkNewTab = localeText[this.location].openMarkNewTab
        this.historyNewTab = localeText[this.location].historyNewTab
    },
    methods: {
        toggleNewType(value, type) {
            this.SET_NEWTYPE({
                type,
                value,
            })
        },
        ...mapMutations('settings', [
            'SET_NEWTYPE',
        ]),
    }
}
</script>
<style scoped>
</style>