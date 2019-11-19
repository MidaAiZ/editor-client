import req from '../../services/index.js'
import weather from '../../services/apis/weather.js';
import { SET_CURRENT_CITY, SET_CURRENT_WEATHER, SET_CURRENT_TMP } from './mutations-type.js'
// initial state
const state = {
  cities: [],
  currentCity: '',
  unit: 'm',
  currentWeather: '',
  currentTmp: ''
}

// getters
const getters = {
  
}

// actions
const actions = {
  async getCurrentWeather({commit, state}, location, lang) {
    console.log(lang, 'lang');
    console.log(location, 'location');
    const { data } = await req(weather.current, {location, lang, unit: state.unit})
    console.log(data, '当前天气')
    let weatherData = data.HeWeather6;
    commit('SET_CURRENT_CITY', weatherData[0].basic.location);
    commit('SET_CURRENT_WEATHER', weatherData[0].now.cond_txt);
    commit('SET_CURRENT_TMP', weatherData[0].now.tmp);
  }
}

// mutations
const mutations = {
  [SET_CURRENT_CITY] (state, city) {
    state.currentCity = city
  },
  [SET_CURRENT_WEATHER] (state, weather) {
    state.currentWeather = weather
  },
  [SET_CURRENT_TMP] (state, tmp) {
    state.currentTmp = tmp
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}