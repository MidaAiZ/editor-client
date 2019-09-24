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
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'openWay',
    data() {
        return {
            targetOpenType: zh_CN.targetOpenType,
            targetOpenTypeTip: zh_CN.targetOpenTypeTip,
            newSiteNewTab: zh_CN.newSiteNewTab,
            searchResultNewTab: zh_CN.searchResultNewTab,
            openMarkNewTab: zh_CN.openMarkNewTab,
            historyNewTab: zh_CN.historyNewTab
        }
    },
    computed: {
        ...mapState('settings', [
            'newSiteNewTabValue',
            'searchResultNewTabValue',
            'openMarkNewTabValue',
            'historyNewTabValue',
        ])
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