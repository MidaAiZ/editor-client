import req from './index.js'
import siteHistory from './apis/siteHistory.js'

/**
 *
 * @param  {object} siteObj       打开的新网站的对象，包含{siteUrl, siteTitle, siteId}
 * @param  {string} openWay       打开新网站的方式，实在本页面直接打开还是在新标签页打开
 */
export const openSite = (siteObj, openWay) => {
    req(siteHistory.record, {}, siteObj)
    if(openWay === 'newtab') {
        window.open(siteObj.siteUrl)
    } else {
        window.location = siteObj.siteUrl
    }
}