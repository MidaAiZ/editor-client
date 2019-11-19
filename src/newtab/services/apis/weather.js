import host from './_host.js'

const weather = {
    current: {
        p: 'https://free-api.heweather.net/s6/weather/now?key=e211d3ae955a455e9a8b0627ba9dfad0', // 默认配置，不要求用户登录
        m: 'GET'
    },
    forecast: {
        p: 'https://free-api.heweather.net/s6/weather/forecast?key=e211d3ae955a455e9a8b0627ba9dfad0', // 默认配置，不要求用户登录
        m: 'GET'
    },
}

export default weather