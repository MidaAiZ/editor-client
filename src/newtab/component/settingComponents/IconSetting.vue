<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ icon }}
        </p>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ hideIcon }}</span>
            <el-switch
                @change="toggleIconSetting($event, 'hideAllIcons')"
                class="setting-switch"
                v-model="hideAllIcons"
            >
            </el-switch>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ iconRadius }}
            </p>
            <el-slider :format-tooltip="formatTooltip" max="50" v-model="iconRadiusValue" @input="setIconRadius($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ iconSize }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :min="50" :max="100" v-model="iconSizeValue" @input="setIconSize($event)"></el-slider>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../../static/locale/index.js';
import './setting.css';
import debounce from '../../utils/debounce.js';

export default {
    name: 'iconSetting',
    data() {
        return {
            icon: '',
            hideIcon: '',
            iconRadius: '',
            iconSize: '',
        }
    },
    computed: {
        ...mapState('settings', [
            'hideAllIcons',
            'iconRadiusValue',
            'iconSizeValue',
        ]),
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        this.settingName = localeText[this.location].settingName
        this.icon = localeText[this.location].icon
        this.hideIcon = localeText[this.location].hideIcon
        this.iconRadius = localeText[this.location].iconRadius
        this.iconSize = localeText[this.location].iconSize
    },
    methods: {
        formatTooltip(val) {
            return val + '%';
        },
        toggleIconSetting(value) {
            this.HIDE_ALLICONS(value)
            this.uploadSettings({hideAllIcons: value})
        },
        setIconRadius(value) {
            this.SET_ICONRADIUS(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({iconRadiusValue: value})
        },
        setIconSize(value) {
            this.SET_ICONSIZE(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({iconSizeValue: value})
        },
        ...mapMutations('settings', [
            'HIDE_ALLICONS',
            'SET_ICONRADIUS',
            'SET_ICONSIZE',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>