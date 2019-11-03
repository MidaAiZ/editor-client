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
import { mapState,mapMutations, mapActions } from 'vuex';
import background from './section/Background.vue';
import systemBar from './section/SystemBar.vue';
import suggestions from './section/Suggestions.vue';
import customSearch from './section/CustomSearch.vue';
import settingDialog from './section/SettingDialog.vue';
import bookmarks from './section/Bookmarks.vue';
import manage from './section/Manage.vue';
import { localSave } from './utils/localSave.js';
import defaultSettings from './utils/defaultOpt.js';
import req from './services/index.js';
import track from './services/apis/track.js';

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
        ...mapActions('user', ['judgeLogin']),
        ...mapActions('settings', ['getDefaultSettings']),
        ...mapActions('categories', ['getCategories']),
        ...mapActions('homeWebList', ['getDefaultMenus', 'getUserMenus']),
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
    created: function () {
      // 判断是否登录
      this.judgeLogin()
          .then((res) => {
            console.log('rootLogin', res)
            if(res) {
              this.getUserMenus()
            } else {
              if (!localStorage.getItem('homeMenus')) {
                // 初始化主页网站列表
                this.getDefaultMenus()
              }
              // 初始化用户设置
              if (!localStorage.getItem('settings')) {
                // getDefault()
                localSave('settings', defaultSettings)
                this.getDefaultSettings()
              } else {
                // console.log('rootLogin', loginInfo)
              }
            }
          })
      // 初始化
      this.getCategories()
      this.setTrack()
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
</style>