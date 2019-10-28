import host from './_host.js'

const siteHistory = {
        record: {
            p: `${host}view_histories`,  // 打开一个网站时发送一个数据请求用来记录访问网站
            m: 'POST'
        },
    }

export default siteHistory