import req from './index.js'
import siteHistory from './apis/siteHistory.js'

/**
 *
 * @param  {object} siteObj       打开的新网站的对象，包含{siteUrl, siteTitle, siteId}
 * @param  {string} openWay       打开新网站的方式，实在本页面直接打开还是在新标签页打开
 */
export const openSite = (siteObj, openWay) => {
    req(siteHistory.record, {}, siteObj)
    let trackData;
    let trackUrl = new URL(siteObj.siteUrl)
    let trackSearch = trackUrl.search
    let params = new URLSearchParams(trackSearch);
    if(localStorage.getItem('track')) {
        trackData = JSON.parse(localStorage.getItem('track')).data
        trackData.forEach((item) => {
            params.set(item.key, item.value)
        });
        trackUrl.search = params.toString();
    }
    if(openWay === 'newtab') {
        window.open(trackUrl.href)
    } else {
        window.location = trackUrl.href
    }
}