<template>
    <el-drawer :visible="settingVis" :modal="false" size="500px" custom-class="setting-drawer" top="5vh" @close="closeSetting(false)":show-close="false">
        <div class="setting-title" slot="title">
            <span class="setting-name">{{settingName}}</span>
            <i class="el-icon-close close-setting" @click="closeSetting(false)"></i>
        </div>
        <div class="setting-wrap">
            <wallPaper />
            <wallPaperMask />
            <cloudSaveBtn />
            <openWay />
            <viewSetting />
            <iconLayout />
            <iconSetting />
            <searchBarSetting />
            <fontSetting />
            <resetAll />
            <localeSetting />
        </div>
    </el-drawer>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import localeText from '../../../static/locale/index.js';
import '../component/settingComponents/setting.css';
import cloudSaveBtn from '../component/settingComponents/CloudSaveBtn.vue';
import wallPaper from '../component/settingComponents/WallPaper.vue';
import wallPaperMask from '../component/settingComponents/WallPaperMask.vue';
import openWay from '../component/settingComponents/OpenWay.vue';
import viewSetting from '../component/settingComponents/ViewSetting.vue';
import iconLayout from '../component/settingComponents/IconLayout.vue';
import iconSetting from '../component/settingComponents/IconSetting.vue';
import searchBarSetting from '../component/settingComponents/SearchBarSetting.vue';
import fontSetting from '../component/settingComponents/FontSetting.vue';
import resetAll from '../component/settingComponents/ResetAll.vue';
import localeSetting from '../component/settingComponents/LocaleSetting.vue';

export default {
    name: 'settingDialog',
    components: {
        wallPaper,
        wallPaperMask,
        openWay,
        viewSetting,
        iconLayout,
        iconSetting,
        searchBarSetting,
        fontSetting,
        resetAll,
        cloudSaveBtn,
        localeSetting
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('drawersVis', [
            'settingVis',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        settingName: function() {
            return localeText[this.location].settingName
        }
    },
    methods: {
        closeSetting(vis) {
            this.SET_SETTINGVIS(vis)
        },
        ...mapMutations('drawersVis', [
            'SET_SETTINGVIS',
        ]),
    }
}
</script>
<style scoped>
</style>
