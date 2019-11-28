import host from './_host.js'

const sitesCategories = {
    default: {
        p: `${host}site_categories`, // 默认网站分类
        m: 'GET'
    },
    getSitesInCategory: {
        p: `${host}sites`, // 获取某一分类内的网站
        m: 'GET'
    },
    search: {
        p: `${host}sites`, // 搜索某一网站 接收参数{keyword}
        m: 'GET'
    },
    hottest: {
        p: `${host}sites/popular`, // 获取热门站点
        m: 'GET'
    }
}

export default sitesCategories