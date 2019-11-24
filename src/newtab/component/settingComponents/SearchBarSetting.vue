<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ searchBar }}
        </p>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ hideSearchBar }}</span>
            <el-switch
                @change="toggleHideSearchBar($event)"
                class="setting-switch"
                v-model="hideSearchBarValue"
            >
            </el-switch>
        </div>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ hideSearchType }}</span>
            <el-switch
                @change="toggleHideSearchType($event)"
                class="setting-switch"
                v-model="hideSearchTypeValue"
            >
            </el-switch>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ searchBarRadius }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :max="50" :value="searchBarRadiusValue" @input="setSearchBarRadius($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ searchBarSize }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :value="searchBarSizeValue" @input="setSearchBarSize($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ searchBarOpacity }}
            </p>
            <el-slider :format-tooltip="formatTooltip" :value="searchBarOpacityValue" @input="setSearchBarOpacity($event)"></el-slider>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'
import debounce from '../../utils/debounce.js';

export default {
    name: 'searchBarSetting',
    data() {
        return {
        }
    },
    computed: {
        ...mapState('settings', [
            'hideSearchBarValue',
            'hideSearchTypeValue',
            'searchBarRadiusValue',
            'searchBarSizeValue',
            'searchBarOpacityValue',
        ]),
        ...mapState('locale', [
            'location',
        ]),
        searchBar: function() {
            return localeText[this.location].searchBar
        },
        hideSearchBar: function() {
            return localeText[this.location].hideSearchBar
        },
        hideSearchType: function() {
            return localeText[this.location].hideSearchType
        },
        searchBarSize: function() {
            return localeText[this.location].searchBarSize
        },
        searchBarRadius: function() {
            return localeText[this.location].searchBarRadius
        },
        searchBarOpacity: function() {
            return localeText[this.location].searchBarOpacity
        }
    },
    methods: {
        formatTooltip(val) {
            return val + '%';
        },
        toggleHideSearchBar(value) {
            this.HIDE_SEARCHBAR(value);
            this.uploadSettings({hideSearchBarValue: value});
        },
        toggleHideSearchType(value) {
            this.HIDE_SEARCHTYPE(value)
            this.uploadSettings({hideSearchTypeValue: value});
        },
        setSearchBarRadius(value) {
            this.SET_SEARCHBARRADIUS(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({searchBarRadiusValue: value})
        },
        setSearchBarSize(value) {
            this.SET_SEARCHBARSIZE(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({searchBarSizeValue: value})
        },
        setSearchBarOpacity(value) {
            this.SET_SEARCHBAROPACITY(value)
            let debounceReq = debounce(this.uploadSettings, 500)
            debounceReq({searchBarOpacityValue: value})
        },
        ...mapMutations('settings', [
            'HIDE_SEARCHBAR',
            'HIDE_SEARCHTYPE',
            'SET_SEARCHBARRADIUS',
            'SET_SEARCHBARSIZE',
            'SET_SEARCHBAROPACITY',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>