import weather from './apis/weather.js';
import req from './index.js';

export default async function getWeather(location = 'auto_ip', lang = 'EN') {
    const { data } = await req(weather.forecast, {location, lang})
    // console.log('天气', data)
    return data
}