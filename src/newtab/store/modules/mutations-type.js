// home 页的mutation
export const SET_SYSBARVIS = 'SET_SYSBARVIS' // 打开主添加面板
export const SET_BMHIS = 'SET_BMHIS' // 打开书签和历史记录
// user 的mutation
export const setLogRegModalVis = 'setLogRegModalVis' // 登录mutation


// setting 的mutation

export const SET_SETTINGVIS = 'SET_SETTINGVIS' // 打开设置面板
export const SET_BGSRC = 'SET_BGSRC' // 更换壁纸源
export const SET_BGMASKOPACITY = 'SET_BGMASKOPACITY' // 调节壁纸蒙版透明度
export const SET_BGBLUR = 'SET_BGBLUR' // 调节壁纸模糊度
export const SET_CLOUDSAVE = 'SET_CLOUDSAVE' // 调节壁纸模糊度
export const SET_NEWTYPE = 'SET_NEWTYPE' // 调节打开各类型内容的方式
export const SET_HOMEBTN = 'SET_HOMEBTN' // 调节主页各按钮是否显示
export const SET_LAYOUT = 'SET_LAYOUT' // 调节主页各图标布局
export const HIDE_ALLICONS = 'HIDE_ALLICONS' // 隐藏所有图标
export const SET_ICONRADIUS = 'SET_ICONRADIUS' // 调节图标圆角弧度
export const SET_ICONSIZE = 'SET_ICONSIZE' // 调节图标大小
export const HIDE_SEARCHBAR = 'HIDE_SEARCHBAR' // 是否隐藏搜索框
export const HIDE_SEARCHTYPE = 'HIDE_SEARCHTYPE' // 是否隐藏搜索类型
export const SET_SEARCHBARRADIUS = 'SET_SEARCHBARRADIUS' // 设置搜索框圆角
export const SET_SEARCHBARSIZE = 'SET_SEARCHBARSIZE' // 设置搜索框大小
export const SET_SEARCHBAROPACITY = 'SET_SEARCHBAROPACITY' // 设置搜索框透明度
export const SET_FONTSIZE = 'SET_FONTSIZE' // 设置字体大小
export const SET_FONTCOLOR = 'SET_FONTCOLOR' // 设置字体颜色
export const RESET_ALL = 'RESET_ALL' // 恢复默认设置

// wallPaper 相关mutations

export const SET_WALLPAPERLOADING = 'SET_WALLPAPERLOADING' // 设置壁纸加载状态
export const SET_WALLPAPER = 'SET_WALLPAPER' // 设置壁纸加载状态


//搜索引擎 相关的mutation
export const DELETE_CHOOSE_ENGINE = 'DELETE_CHOOSE_ENGINE'; // 删除已选中的搜索引擎
export const ADD_CHOOSE_ENGINE = 'ADD_CHOOSE_ENGINE'; // 添加已有的搜索引擎
export const OPEN_ENGINE_POPOVER = 'OPEN_ENGINE_POPOVER'; // 打开搜索引擎弹出框
export const CLOSE_ENGINE_POPOVER = 'CLOSE_ENGINE_POPOVER'; // 关闭搜索引擎弹出框
export const CHANGE_CURRENT_ENGINE = 'CHANGE_CURRENT_ENGINE'; // 修改当前搜索引擎
export const ADD_CUSTOM_ENGINE = 'ADD_CUSTOM_ENGINE'; // 添加自定义搜索引擎
export const DELETE_CUSTOME_ENGINE = 'DELETE_CUSTOME_ENGINE'; // 删除自定义搜索引擎
export const OPEN_CUSTOM_ENGINE = 'OPEN_CUSTOM_ENGINE'; // 打开自定义搜索引擎
export const CLOSE_CUSTOM_ENGINE = 'CLOSE_CUSTOM_ENGINE'; // 关闭自定义搜索引擎

// 获取网站分类 相关的mutation
export const SET_CATEGORIES = 'SET_CATEGORIES' // 设置网站分类
export const SET_SITES_CATEGORY = 'SET_SITES_CATEGORY' // 设置当前分类的网站内容

// 主页添加网站 相关的mutation

export const SET_HOMEMENUS = 'SET_HOMEMENUS' // 设置主页网站
