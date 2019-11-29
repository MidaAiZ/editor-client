<template>
    <el-drawer
        :visible="weather"
        @close="close"
        :show-close="false"
    >
        <div class="title" slot="title">
            <div class="city">{{currentCity}}</div>
            <div class="set-wrap">
                <div @click="changeUnit('m')" class="set-item" :style="{color: unit === 'm' ? '#111' : '#999'}">°C</div>
                <div @click="changeUnit('i')" class="set-item" :style="{color: unit === 'i' ? '#111' : '#999'}">°F</div>
            </div>
        </div>
        <div v-for="(item, index) in forecast" :key="index" class="forecast-item">
            <div class="weather-info">
                <img 
                    class="weather-icon"
                    :src="`${require(`../../../static/weather/${item.cond_code_d}.png`)}`" 
                    :alt="`${require('../../../static/weather/999.png')}`"
                />
                <div class="weather-txt">
                    {{item.cond_txt_d}}
                </div>
            </div>
            <div class="tmp-date">
                <div class="tmp-info">
                    <span>{{item.tmp_max + (unit === 'm' ? '°C' : '°F')}}</span>
                    <span>/</span>
                    <span>{{item.tmp_min + (unit === 'm' ? '°C' : '°F')}}</span>
                </div>
                <div class="date-info">
                    {{item.date}}
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../static/locale/index.js';
// import getWeather from '../services/getWeather.js';


export default {
    name: 'weatherDrawer',
    components: {
       
    },
    data() {
      return {
      };
    },
    computed: {
        ...mapState('weather',['currentCity', 'currentWeather', 'currentTmp', 'forecast', 'unit']),
        ...mapState('locale', ['location']),
        ...mapState('drawersVis', ['weather']),
    },
    created: function() {
        let lang = this.location
                let payload = {
                    location: 'auto_ip',
                }
        this.getCurrentWeather(payload);
        this.getWeatherForecast(payload);
    },
    methods: {
        ...mapActions('weather', ['getCurrentWeather', 'getWeatherForecast']),
        ...mapMutations('drawersVis', ['SET_WEATHER_DRAWER']),
        ...mapMutations('weather', ['CHANGE_UNIT']),
        close() {
            this.SET_WEATHER_DRAWER(false)
        },
        changeUnit(unit) {
            this.CHANGE_UNIT(unit);
            let payload = {
                    location: 'auto_ip',
                }
            this.getWeatherForecast(payload);
        }
    }
}
</script>
<style scoped>
    .title {
        width: 100%;
        height: 40px;
        font-size: 18px;
    }
    .city {
        float: left;
    }
    .set-wrap {
        float: right;

    }
    .set-item {
        float: left;
        margin-left: 10px;
        cursor: pointer;
    }
    .forecast-item {
        width: 92%;
        height: 100px;
        margin-left: 4%;
        margin-top: 10px;
        background-color: #efefef;
    }
    .weather-info {
        width: 90px;
        height: 100%;
        float: left;
    }
    .weather-icon {
        width: 60px;
        height: 60px;
        float: left;
        margin-top: 10px;
        margin-left: 15px;
    }
    .weather-txt {
        float: left;
        margin-top: 3px;
        width: 90px;
        height: 15px;
        line-height: 15px;
        color: #666;
        font-weight: lighter;
        text-align: center;
    }
    .tmp-info {
        height: 70px;
        line-height: 70px;
        font-size: 25px;
        color: #666;
        font-weight: lighter;
        text-align: center;
        margin-right: 10px;
    }
    .date-info {
        height: 15px;
        float: right;
        line-height: 15px;
        text-align: right;
        margin-right: 10px;
        font-weight: lighter;
        color: #aaa;
    }
    .tmp-date {
        float: right;
    }
</style>