<template>
  <v-app>
    <div>
      <background />
      <div class="bookmarks-wrap" v-if="showBookMarkBar">
        <bookmarks />
      </div>
      <systemBar />
      <settingDialog />
      <div id="content">
        <div id="main">
          <customSearch v-on:show="showPop" :is-show="isShow"></customSearch>
          <suggestions ></suggestions>
          <search-popover v-if="isShow"></search-popover>
        </div>
        <div class="popover-mask" :class="{displayNone: !isShow}" @click="closePopover"></div>
      </div>
    </div>
      
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import background from './section/Background.vue'
import systemBar from './section/SystemBar.vue'
import suggestions from './section/Suggestions.vue'
import customSearch from './section/CustomSearch.vue'
import settingDialog from './section/SettingDialog.vue'
import bookmarks from './section/Bookmarks.vue'
import localSave from './utils/localSave.js'

export default {
    name: 'root',
    components: {
        systemBar,
        background,
        suggestions,
        customSearch,
        settingDialog,
        bookmarks,
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState('settings', [
          'showBookMarkBar'
        ])
    },
    created: function () {
      // 初始化用户设置
      if (!localStorage.getItem('settings')) {
        localSave('settings', {
          bgSrc: 'default',
          maskOpacityValue: 30,
          bgBlurValue: 20,
          newSiteNewTabValue: false,
          cloudSave: false,
          searchResultNewTabValue: false,
          openMarkNewTabValue: false,
          historyNewTabValue: false,
          randomBgBtn: false,
          showOftenUsedBar: false,
          showEmailBtn: false,
          showBookMarkBar: false,
          iconLayout: {
              name: '2x5',
              row: 2,
              col: 5,
          },
          hideAllIcons: false,
          iconRadiusValue: 50,
          iconSizeValue: 50,
          hideSearchBarValue: false,
          hideSearchTypeValue: false,
          searchBarRadiusValue: 50,
          searchBarSizeValue: 50,
          searchBarOpacityValue: 100,
          fontSizeValue: 15,
          fontColorValue: '#fff',
        })
      }
    },
}
</script>
<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }
  #main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*margin-top: 100px;*/
  }

  #content{
    position: absolute;
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }

  .bookmarks-wrap{
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 12;
  }
</style>