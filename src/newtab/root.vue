<template>
  <v-app>
    <v-content>
      <background />
      <systemBar />
      <section>
        <v-layout>
          <v-flex>
            <customSearch />
            <suggestions />
          </v-flex>
        </v-layout>
      </section>
    </v-content>
      
  </v-app>
</template>
<script>
import background from '../section/Background'
import systemBar from '../section/SystemBar'
import suggestions from '../section/Suggestions'
import customSearch from '../section/CustomSearch'

export default {
    name: 'root',
    components: {
    systemBar,
    background,
    suggestions,
    customSearch,
  }
}
</script>
<style scoped>
::-webkit-scrollbar { 
  display: none; 
}
</style>