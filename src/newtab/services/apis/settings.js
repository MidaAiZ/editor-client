import host from './_host.js'

const settings = {
        default: {
            p: `${host}user_settings/default`, // 默认配置，不要求用户登录
            m: 'GET'
        },
        profile: {
            p: `${host}user_settings/profile`,  // 用户的私有化配置，没有配置的情况下返回默认配置
            m: 'GET'
        },
        update: {
            p: `${host}user_settings/profile`,  // 更新用户的私有化配置，没有配置的情况下返回默认配置
            m: 'POST'
        },
    }

export default settings