import Unsplash from 'unsplash-js';
import { saveImg } from './localSave.js'

const unsplash = new Unsplash({
    applicationId: "13eb1a55029048fe62b7f870a010909cf4df45b971ee460df55ab50d21307671",
    secret: "2541289de77a508a8052332f50b6ecaa46be93bc078cf757656c487467a2e59e"
  });

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
    saveImg("storageWallPaper", srcUrl, callBack)
}

const getUnsplashWallPaper = (callBack) => {
    unsplash.photos.getRandomPhoto({query: 'wallpapers'})
        .then(res => res.json())
        .then(json => {
            // Your code
            // console.log(json[0].urls, 'unsplash')
            setWallPaper('Unsplash', json.urls.regular, callBack)
        });
}

export {
    storageWallPaper,
    setWallPaper,
    getUnsplashWallPaper,
}
