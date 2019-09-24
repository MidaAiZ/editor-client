<template>
    <el-drawer :visible="settingVis" :modal="false" size="500px" custom-class="setting-drawer" top="5vh" @close="closeSetting(false)":show-close="false">
        <div class="setting-title" slot="title">
            <span class="setting-name">{{settingName}}</span>
            <i class="el-icon-close close-setting" @click="closeSetting(false)"></i>
        </div>
        <div class="setting-wrap">
            <div class="setting-modal background-setting">
                <p class="setting-type-name">
                    {{backgroundImgSetting}}
                </p>
                <div class="setting-bg-item">
                    <el-radio @change="changeBgSrc('Bing')" v-model="bgSrc" label="Bing">
                        <span class="bg-name">{{ BingBg }}</span>
                    </el-radio>
                    <p class="bg-desc">
                        {{ BingDesc }}
                    </p>
                </div>
                <div class="setting-bg-item">
                    <el-radio @change="changeBgSrc('Unsplash')" v-model="bgSrc" label="Unsplash">
                        <span class="bg-name">{{ UnsplashBg }}</span>
                        <p class="bg-desc">
                            {{ UnsplashDesc }}
                        </p>
                    </el-radio>
                </div>
                <div class="setting-bg-item-last">
                    <el-radio @change="changeBgSrc('random')" v-model="bgSrc" label="random">
                        <span class="bg-name">{{ randomBg }}</span>
                        <p class="bg-desc">
                            {{ randomDesc }}
                        </p>
                    </el-radio>
                </div>
            </div>
            <div class="setting-modal setting-modal-not-first">
                <div class="bg-mask-setting-item">
                    <p class="setting-type-name bg-mask-setting-item-name">
                        {{ bgMaskOpacity }}
                    </p>
                    <el-slider :format-tooltip="formatTooltip" v-model="maskOpacityValue" @input="changeOpacity($event)"></el-slider>
                </div>
                <div class="bg-mask-setting-item-last">
                    <p class="setting-type-name bg-mask-setting-item-name">
                        {{ bgBlur }}
                    </p>
                    <el-slider v-model="bgBlurValue" @input="changeBlur($event)" :format-tooltip="formatTooltip"></el-slider>
                </div>
            </div>
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
            <div class="setting-modal setting-modal-not-first">
                <p class="setting-type-name">
                    {{ layout }}
                </p>
                <div class="setting-layout-wrap">
                    <div class="setting-layout layout-2-4">
                        <div class="setting-layout-item">
                            <div v-for="i in 8" @click="setLayout('2x4', 2, 4)" class="layout-block" :style="{width: '28px', height: '35px', backgroundColor: (iconLayout.name=='2x4' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">2 x 4</p>
                    </div>
                    <div class="setting-layout layout-2-5">
                        <div class="setting-layout-item">
                            <div v-for="i in 10" @click="setLayout('2x5', 2, 5)" class="layout-block" :style="{width: '22px', height: '35px', backgroundColor: (iconLayout.name=='2x5' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">2 x 5</p>
                    </div>
                    <div class="setting-layout layout-2-6">
                        <div class="setting-layout-item">
                            <div v-for="i in 12" @click="setLayout('2x6', 2, 6)" class="layout-block" :style="{width: '18px', height: '35px', backgroundColor: (iconLayout.name=='2x6' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">2 x 6</p>
                    </div>
                    <div class="setting-layout layout-2-7">
                        <div class="setting-layout-item">
                            <div v-for="i in 14" @click="setLayout('2x7', 2, 7)" class="layout-block" :style="{width: '15px', height: '35px', backgroundColor: (iconLayout.name=='2x7' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">2 x 7</p>
                    </div>
                    <div class="setting-layout layout-3-3">
                        <div class="setting-layout-item">
                            <div v-for="i in 9" @click="setLayout('3x3', 3, 3)" class="layout-block" :style="{width: '38px', height: '23px', backgroundColor: (iconLayout.name=='3x3' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">3 x 3</p>
                    </div>
                    <div class="setting-layout layout-3-4">
                        <div class="setting-layout-item">
                            <div v-for="i in 12" @click="setLayout('3x4', 3, 4)" class="layout-block" :style="{width: '28px', height: '23px', backgroundColor: (iconLayout.name=='3x4' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">3 x 4</p>
                    </div>
                    <div class="setting-layout layout-3-5">
                        <div class="setting-layout-item">
                            <div v-for="i in 15" @click="setLayout('3x5', 3, 5)" class="layout-block" :style="{width: '22px', height: '23px', backgroundColor: (iconLayout.name=='3x5' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">3 x 5</p>
                    </div>
                    <div class="setting-layout layout-3-6">
                        <div class="setting-layout-item">
                            <div v-for="i in 18" @click="setLayout('3x6', 3, 6)" class="layout-block" :style="{width: '18px', height: '23px', backgroundColor: (iconLayout.name=='3x6' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">3 x 6</p>
                    </div>
                    <div class="setting-layout layout-3-7">
                        <div class="setting-layout-item">
                            <div v-for="i in 21" @click="setLayout('3x7', 3, 7)" class="layout-block" :style="{width: '15px', height: '23px', backgroundColor: (iconLayout.name=='3x7' ? '#ffc81f' : '#ccc')}">

                            </div>
                        </div>
                        <p class="layout-title">3 x 7</p>
                    </div>
                </div>
            </div>
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
                    <el-slider :format-tooltip="formatTooltip" v-model="iconSizeValue" @input="setIconSize($event)"></el-slider>
                </div>
            </div>
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
        </div>
    </el-drawer>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../static/locale/zh_CN.js'

export default {
    name: 'settingDialog',
    data() {
        return {
            settingName: zh_CN.settingName,
            backgroundImgSetting: zh_CN.backgroundImgSetting,
            BingBg: zh_CN.BingBg.title,
            UnsplashBg:zh_CN.UnsplashBg.title,
            randomBg: zh_CN.randomBg.title,
            BingDesc: zh_CN.BingBg.desc,
            UnsplashDesc: zh_CN.UnsplashBg.desc,
            randomDesc: zh_CN.randomBg.desc,
            bgMaskOpacity: zh_CN.bgMaskOpacity,
            bgBlur: zh_CN.bgBlur,
            targetOpenType: zh_CN.targetOpenType,
            targetOpenTypeTip: zh_CN.targetOpenTypeTip,
            newSiteNewTab: zh_CN.newSiteNewTab,
            searchResultNewTab: zh_CN.searchResultNewTab,
            openMarkNewTab: zh_CN.openMarkNewTab,
            historyNewTab: zh_CN.historyNewTab,
            view: zh_CN.view,
            showRandomBg: zh_CN.showRandomBg,
            showOftenUsedWeb: zh_CN.showOftenUsedWeb,
            showEmail: zh_CN.showEmail,
            showBookMark: zh_CN.showBookMark,
            layout: zh_CN.layout,
            icon: zh_CN.icon,
            hideIcon: zh_CN.hideIcon,
            iconRadius: zh_CN.iconRadius,
            iconSize: zh_CN.iconSize,
            searchBar: zh_CN.searchBar,
            hideSearchBar: zh_CN.hideSearchBar,
            hideSearchType: zh_CN.hideSearchType,
            searchBarSize: zh_CN.searchBarSize,
            searchBarRadius: zh_CN.searchBarRadius,
            searchBarOpacity: zh_CN.searchBarOpacity,
            font: zh_CN.font,
            fontSize: zh_CN.fontSize,
            fontColor: zh_CN.fontColor,
            resetAll: zh_CN.resetAll,
        }
    },
    computed: {
        ...mapState('settings', [
            'settingVis',
            'bgSrc',
            'maskOpacityValue',
            'bgBlurValue',
            'newSiteNewTabValue',
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
        ])
    },
    methods: {
        closeSetting(vis) {
            this.SET_SETTINGVIS(vis)
        },
        changeBgSrc(src) {
            this.SET_BGSRC(src)
        },
        formatTooltip(val) {
            return val + '%';
        },
        changeOpacity(value) {
            this.SET_BGMASKOPACITY(value)
        },
        changeBlur(blur) {
            this.SET_BGBLUR(blur)
        },
        toggleNewType(value, type) {
            this.SET_NEWTYPE({
                type,
                value,
            })
        },
        toggleHomeBtnSetting(value, type) {
            this.SET_HOMEBTN({
                type,
                value,
            })
        },
        setLayout(name, row, col) {
            this.SET_LAYOUT({
                name,
                row,
                col,
            })
        },
        toggleIconSetting(value) {
            this.HIDE_ALLICONS(value)
        },
        setIconRadius(value) {
            this.SET_ICONRADIUS(value)
        },
        setIconSize(value) {
            this.SET_ICONSIZE(value)
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
            'SET_SETTINGVIS',
            'SET_BGSRC',
            'SET_BGMASKOPACITY',
            'SET_BGBLUR',
            'SET_NEWTYPE',
            'SET_HOMEBTN',
            'SET_LAYOUT',
            'HIDE_ALLICONS',
            'SET_ICONRADIUS',
            'SET_ICONSIZE',
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
    .setting-drawer {
        background: #677;
        opacity: 0.3;
    }
    .setting-title {
        width: 100%;
        height: 40px;
        font-size: 20px;
    }
    .setting-name {
        width: 50px;
        height: 40px;
        line-height: 40px;
        float: left;
    }
    .close-setting {
        float: right;
        height: 40px;
        line-height: 35px;
        cursor: pointer;
    }
    .setting-wrap {
        height: calc(100vh - 100px);
        padding-left: 26px;
        padding-right: 26px;
        overflow: auto;
        margin-top: -15px;
    }
    .setting-type-name {
        font-size: 16px;
        color: #666;
    }
    .setting-modal {
        background-color: #f9f9f9;
        padding: 18px;
        padding-top: 10px;
    }
    .setting-modal-not-first {
        margin-top: 20px;
    }
    .setting-bg-item {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .setting-bg-item-last {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .bg-name {
        font-size: 16px;
    }
    .bg-desc {
        font-size: 14px;
        text-indent: 23px;
        font-weight: lighter;
        color: #666;
    }
    .bg-mask-setting-item-name {
        margin-bottom: -3px;
    }
    .setting-tip {
        font-size: 14px;
        font-weight: lighter;
        color: #666;
        margin-top: -5px;
    }
    .setting-open-item {
        margin-top: 5px;
        height: 30px;
        line-height: 30px;
    }
    .setting-switch {
        float: right
    }
    .setting-open-title {
        font-size: 15px;
        color: #888;
    }
    .setting-layout-wrap {
        width: 100%;
        height: 340px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
    }
    .setting-layout {
        width: 30%;
        height: 100px;
        padding: 5px;
        cursor: pointer;
    }
    
    .setting-layout-item {
        width: 100%;
        height: 70px;
        background-color: #f9f9f9;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: center;
    }
    .layout-title {
        height: 20px;
        line-height: 10px;
        text-align: center;
        color: #999;
    }
    .layout-block {
        background-color: #ccc;
        margin: 1px;
        border-radius: 4px;
    }
</style>