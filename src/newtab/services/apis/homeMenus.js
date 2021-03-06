import host from './_host.js'

const homeMenus = {
    default: {
        p: `${host}default_menus/default`, // 默认首页添加网站
        m: 'GET'
    },
    addOne: {
        p: `${host}default_menus/default`, // 添加一个首页网站
        m: 'POST'
    },
    changeAll: {
        p: `${host}user_menus`, // 替换首页网站
        m: 'POST'
    },
    user_menu: {
        p: `${host}user_menus`, // 获取云端用户菜单
        m: 'GET'
    }
}

export default homeMenus