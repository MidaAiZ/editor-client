<template>
    <div class="weather" v-if="currentCity">
        <span>{{currentCity}}</span>
        <span>{{' '}}</span>
        <span>{{currentWeather}}</span>
        <span>{{' '}}</span>
        <span>{{currentTmp + '°C'}}</span>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../static/locale/index.js';
// import getWeather from '../services/getWeather.js';


export default {
    name: 'weather',
    components: {
       
    },
    data() {
      return {
      };
    },
    computed: {
        ...mapState('weather',['currentCity', 'currentWeather', 'currentTmp']),
        ...mapState('locale', ['location'])
    },
    created: function() {
        console.log('this.location', this.location)
        let lang = this.location
        this.getCurrentWeather('auto_ip', lang)
    },
    methods: {
        ...mapActions('weather', ['getCurrentWeather'])
    }
}
</script>
<style scoped>
    .weather {
        width: auto;
        height: 20px;
        line-height: 20px;
        border-radius: 5px;
        padding: 5px;
        font-size: 14px;
        opacity: 0.7;
        color: #efefef;
        background: rgb(0, 0, 0, 0.6)
    }
</style>