<template>
  <div>
    <div @click="unedit">
      <background />
      <div class="bookmarks-wrap" v-if="showBookMarkBar">
        <bookmarks />
      </div>
      <!-- <div class="weather-wrap">
        <weather />
      </div> -->
      <systemBar />
      <div class="loading-tips">
        <cloud-tips />
      </div>
      <settingDialog />
      <customAddDrawer />
      <weather />
      <manage />
      <div id="content">
        <div id="main">
          <customSearch></customSearch>
          <suggestions ></suggestions>
          <div class="engine-popover-mask" :class="{displayNone: !searchPopoverVisible}" @click="closeEnginePopover"></div>
        </div>
      </div>
    </div>
      
  </div>
</template>
<script>
import { mapState,mapMutations, mapActions } from 'vuex';
import background from './section/Background.vue';
import systemBar from './section/SystemBar.vue';
import cloudTips from './section/CloudTips.vue';
import suggestions from './section/Suggestions.vue';
import customSearch from './section/CustomSearch.vue';
import weather from './section/Weather.vue';
import customAddDrawer from './component/CustomAddDrawer.vue';
import settingDialog from './section/SettingDialog.vue';
import bookmarks from './section/Bookmarks.vue';
import manage from './section/Manage.vue';
import { localSave } from './utils/localSave.js';
import defaultSettings from './utils/defaultOpt.js';
import req from './services/index.js';
import track from './services/apis/track.js';
import localeText from '../../static/locale/index.js';

export default {
    name: 'root',
    components: {
        systemBar,
        background,
        suggestions,
        customSearch,
        settingDialog,
        customAddDrawer,
        cloudTips,
        bookmarks,
        manage,
        weather
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState('settings', [
          'showBookMarkBar',
          'cloudSave'
        ]),
        ...mapState('engineList',['searchPopoverVisible'])
    },
    methods:{
        ...mapMutations('engineList',['CLOSE_ENGINE_POPOVER']),
        ...mapMutations('settings',['SET_ALL']),
        ...mapMutations('locale',['CHANGE_LOCALE']),
        ...mapMutations('homeWebList',['CHANGE_IS_EDIT','AFTER_CHANGE']),
        closeEnginePopover(){
            this.CLOSE_ENGINE_POPOVER();
        },
        ...mapActions('user', ['judgeLogin']),
        ...mapActions('settings', ['getDefaultSettings', 'getUserSettings', 'uploadSettings']),
        ...mapActions('categories', ['getCategories']),
        ...mapActions('homeWebList', ['afterChanged', 'getDefaultMenus', 'getUserMenus']),
        ...mapActions('locale',['changeLocale']),
        unedit() {
          this.CHANGE_IS_EDIT(false);
        },
        async setTrack() {
          const { data } = await req(track.get)
          if(data.code === 'Success') {
            // console.log(data.data)
            let trackData = {
              data: data.data
            }
            localSave('track', trackData)
          }
        },
        
    },
    created: async function () {
      // console.log('languageeee', localLang)
      // 判断是否登录
      let localLang = navigator.language ? navigator.language : navigator.userLanguage;
      localLang = localLang.replace(/-/, "_");
      let localSettings = JSON.parse(localStorage.getItem('settings') || "{}")
      if(localSettings.defaultLocale && localSettings.localeVersion === 'default') {
        if(localeText[localLang]) {
          this.changeLocale(localLang)
        } else {
          this.changeLocale('en')
        }
      }
      if(!localSettings || !localSettings.defaultLocale) {
        if(localeText[localLang]) {
          this.changeLocale(localLang)
        } else {
          this.changeLocale('en')
        }
      }
      const loginInfo = await this.judgeLogin()
      if(loginInfo === 'hasLogined') {
              this.getUserSettings()
            } else {
              if (!localStorage.getItem('homeMenus')) {
                // 初始化主页网站列表
                this.getDefaultMenus()
              }
              // 初始化用户设置
              if (!localStorage.getItem('settings') || JSON.parse(localStorage.getItem('settings')) === {}) {
                // getDefault()
                localSave('settings', defaultSettings)
                this.getDefaultSettings()
              } else {
                // console.log('rootLogin', loginInfo)
              }
            }
      // 初始化
      this.setTrack()
      let that = this;
      window.addEventListener('storage', function(e) {  
        that.afterChanged(JSON.parse(e.newValue).menus);
      });
      // chrome.storage.local.get('homeMenus', (content) => {this.AFTER_CHANGE(content.menus)})
      // chrome.storage.onChanged.addListener(
      //   (content) => {
      //     if(content.homeMenus.newValue.menus) {
      //       console.log('fucksync', content)
      //       this.AFTER_CHANGE(content.homeMenus.newValue.menus)
      //     }
      //   }
      // )
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
    margin-top: 2vh;
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
  .loading-tips {
    position: absolute;
    bottom: 10px;
    left: 25px;
  }
  .weather-wrap {
    position: absolute;
    left: 25px;
    top: 20px;
  }
</style>