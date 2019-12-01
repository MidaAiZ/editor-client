import req from '../../services/index.js'
import weather from '../../services/apis/weather.js';
import { 
  SET_CURRENT_CITY, 
  SET_CURRENT_WEATHER, 
  SET_CURRENT_TMP,
  SET_CURRENT_ICON,
  SET_WEATHER_FORECAST,
  CHANGE_UNIT
} from './mutations-type.js';
import { localSave } from '../../utils/localSave.js';
// initial state
let localWeather = JSON.parse(localStorage.getItem('weather'));
const state = {
  cities: [],
  currentCity: '',
  unit: 'm',
  currentWeather: '',
  currentTmp: localWeather ? localWeather.tmp : '',
  currentIcon: localWeather ? require(`../../../../static/weather/${localWeather.cond_code}.png`) : require('../../../../static/weather/999.png'),
  forecast: [],
}

// getters
const getters = {
  
}

// actions
const actions = {
  async getCurrentWeather({commit, state}, payload) {
    let location = payload.location;
    let lang = payload.lang;
    const { data } = await req(weather.current, {location, lang, unit: state.unit}, {}, {}, false)
    // console.log(data, '当前天气')
    let weatherData = data.HeWeather6;
    commit('SET_CURRENT_CITY', weatherData[0].basic.location);
    commit('SET_CURRENT_WEATHER', weatherData[0].now.cond_txt);
    commit('SET_CURRENT_TMP', weatherData[0].now.tmp + (state.unit === 'm' ? '°C' : '°F'));
    commit('SET_CURRENT_ICON', weatherData[0].now.cond_code);
    localSave('weather', weatherData[0].now);
  },
  async getWeatherForecast({commit, state}, payload) {
    let location = payload.location;
    let lang = payload.lang;
    const { data } = await req(weather.forecast, {location, lang, unit: state.unit}, {}, {}, false)
    // console.log(data, '天气预报')
    let weatherData = data.HeWeather6;
    commit('SET_WEATHER_FORECAST', weatherData[0].daily_forecast)
  },
}

// mutations
const mutations = {
  [CHANGE_UNIT] (state, unit) {
    state.unit = unit
  },
  [SET_CURRENT_CITY] (state, city) {
    state.currentCity = city
  },
  [SET_CURRENT_WEATHER] (state, weather) {
    state.currentWeather = weather
  },
  [SET_CURRENT_TMP] (state, tmp) {
    state.currentTmp = tmp
  },
  [SET_WEATHER_FORECAST] (state, forecast) {
    state.forecast = forecast
  },
  [SET_CURRENT_ICON] (state, icon) {
    let src = require(`../../../../static/weather/${icon}.png`);
    state.currentIcon = src;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}