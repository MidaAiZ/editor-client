<template>
  <v-app>
    <div>
      <background />
      <systemBar />
      <settingDialog />
      <section>
        <v-layout>
          <div id="main">
            <customSearch />
            <suggestions />
          </div>
        </v-layout>
      </section>
    </div>
      
  </v-app>
</template>
<script>
import background from './section/Background.vue'
import systemBar from './section/SystemBar.vue'
import suggestions from './section/Suggestions.vue'
import customSearch from './section/CustomSearch.vue'
import settingDialog from './section/SettingDialog.vue'
import localSave from './utils/localSave.js'

export default {
    name: 'root',
    components: {
        systemBar,
        background,
        suggestions,
        customSearch,
        settingDialog,
    },
    created: function () {
      // chrome.bookmarks.getTree((marks) => console.log(marks))
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
    margin-top: 100px;
  }
</style>