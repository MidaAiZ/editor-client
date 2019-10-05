<template>
  <v-app>
    <div>
      <background />
      <systemBar />
      <settingDialog />
      <div id="content">
        <div id="main">
          <customSearch />
          <suggestions />
        </div>
      </div>
    </div>
      
  </v-app>
</template>
<script>
import background from './section/Background.vue'
import systemBar from './section/SystemBar.vue'
import suggestions from './section/Suggestions.vue'
import customSearch from './section/CustomSearch.vue'
import settingDialog from './section/SettingDialog.vue'

export default {
    name: 'root',
    components: {
        systemBar,
        background,
        suggestions,
        customSearch,
        settingDialog,
    }
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
</style>