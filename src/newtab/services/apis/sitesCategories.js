import host from './_host.js'

const sitesCategories = {
    default: {
        p: `${host}site_categories`, // 默认网站分类
        m: 'GET'
    },
    getSitesInCategory: {
        p: `${host}sites`, // 获取某一分类内的网站
        m: 'GET'
    }
}

export default sitesCategories