<template>
  <v-app>
    <div>
      <background />
      <div class="bookmarks-wrap" v-if="showBookMarkBar">
        <bookmarks />
      </div>
      <systemBar />
      <settingDialog />
      <manage />
      <div id="content">
        <div id="main">
          <customSearch></customSearch>
          <suggestions ></suggestions>
          <div class="engine-popover-mask" :class="{displayNone: !searchPopoverVisible}" @click="closeEnginePopover"></div>
        </div>
      </div>
    </div>
      
  </v-app>
</template>
<script>
import { mapState,mapMutations, mapActions } from 'vuex'
import background from './section/Background.vue'
import systemBar from './section/SystemBar.vue'
import suggestions from './section/Suggestions.vue'
import customSearch from './section/CustomSearch.vue'
import settingDialog from './section/SettingDialog.vue'
import bookmarks from './section/Bookmarks.vue'
import manage from './section/Manage.vue'
import { localSave } from './utils/localSave.js'

export default {
    name: 'root',
    components: {
        systemBar,
        background,
        suggestions,
        customSearch,
        settingDialog,
        bookmarks,
        manage
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState('settings', [
          'showBookMarkBar'
        ]),
        ...mapState('engineList',['searchPopoverVisible'])
    },
    methods:{
        ...mapMutations('engineList',['CLOSE_ENGINE_POPOVER']),
        closeEnginePopover(){
            this.CLOSE_ENGINE_POPOVER();
        },
        ...mapActions('user', ['judgeLogin'])
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
      } else {
        this.judgeLogin()
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

  .bookmarks-wrap {
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 12;
  }
  .engine-popover-mask{
    background-color: #000;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 6;
    -moz-opacity: 0.1;
    opacity:.10;
    filter: alpha(opacity=10);
  }
  .displayNone{
    display: none;
  }
</style>