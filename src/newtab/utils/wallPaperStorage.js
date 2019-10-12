import { saveImg } from './localSave.js'
import req from '../services/index.js'
import wallPaper from '../services/apis/wallPaper.js'

const storageWallPaper = (imgSrc, srcUrl, wallDomId, callBack) => {
    //在本地存储中保存图片
    var storageWallPaper = JSON.parse(localStorage.getItem(`storageWallPaper`)) || {},
    storageFilesDate = storageWallPaper.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
    // 检查数据，如果不存在或者数据过期，则创建一个本地存储
    if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
        setWallPaper(imgSrc, srcUrl, callBack)
    }
    else {
    // Use image from localStorage
        callBack(storageWallPaper.wallPaper)
    }
}

const setWallPaper = (imgSrc, srcUrl, callBack) => {
    saveImg("storageWallPaper", srcUrl, callBack) // 将图片缓存在本地
}

const getUnsplashWallPaper = async (callBack) => {
    const { data } = await req(wallPaper.random)
    setWallPaper('Unsplash', data.data, callBack)
}

export {
    storageWallPaper,
    setWallPaper,
    getUnsplashWallPaper,
}
