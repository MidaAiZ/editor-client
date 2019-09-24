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
            <el-slider :format-tooltip="formatTooltip" max="50" v-model="searchBarRadiusValue" @input="setSearchBarRadius($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ searchBarSize }}
            </p>
            <el-slider :format-tooltip="formatTooltip" v-model="searchBarSizeValue" @input="setSearchBarSize($event)"></el-slider>
        </div>
        <div class="bg-mask-setting-item">
            <p class="setting-type-name bg-mask-setting-item-name">
                {{ searchBarOpacity }}
            </p>
            <el-slider :format-tooltip="formatTooltip" v-model="searchBarOpacityValue" @input="setSearchBarOpacity($event)"></el-slider>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'searchBarSetting',
    data() {
        return {
            searchBar: zh_CN.searchBar,
            hideSearchBar: zh_CN.hideSearchBar,
            hideSearchType: zh_CN.hideSearchType,
            searchBarSize: zh_CN.searchBarSize,
            searchBarRadius: zh_CN.searchBarRadius,
            searchBarOpacity: zh_CN.searchBarOpacity,
        }
    },
    computed: {
        ...mapState('settings', [
            'hideSearchBarValue',
            'hideSearchTypeValue',
            'searchBarRadiusValue',
            'searchBarSizeValue',
            'searchBarOpacityValue',
        ])
    },
    methods: {
        formatTooltip(val) {
            return val + '%';
        },
        toggleHideSearchBar(value) {
            this.HIDE_SEARCHBAR(value)
        },
        toggleHideSearchType(value) {
            this.HIDE_SEARCHTYPE(value)
        },
        setSearchBarRadius(value) {
            this.SET_SEARCHBARRADIUS(value)
        },
        setSearchBarSize(value) {
            this.SET_SEARCHBARSIZE(value)
        },
        setSearchBarOpacity(value) {
            this.SET_SEARCHBAROPACITY(value)
        },
        ...mapMutations('settings', [
            'HIDE_SEARCHBAR',
            'HIDE_SEARCHTYPE',
            'SET_SEARCHBARRADIUS',
            'SET_SEARCHBARSIZE',
            'SET_SEARCHBAROPACITY',
        ]),
    }
}
</script>
<style scoped>
</style>