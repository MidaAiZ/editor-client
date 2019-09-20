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
import settingDialog from './component/SettingDialog.vue'

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
    margin-top: 100px;
  }
</style>