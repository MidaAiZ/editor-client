// import defaultWallPaperSrc from '../../../static/defaultWallPapers/xiagu.jpg';

export default function storageWallPaper(imgSrc, srcUrl, wallDomId) {
    //在本地存储中保存图片
    var storageWallPaper = JSON.parse(localStorage.getItem(`storageWallPaper`)) || {},
    wallPaperDom = document.getElementById(wallDomId),
    imgDom = document.createElement('img'),
    storageFilesDate = storageWallPaper.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
    console.log('wallPaper', wallPaperDom)
    imgDom.setAttribute("src", srcUrl);
    // 检查数据，如果不存在或者数据过期，则创建一个本地存储
    if (typeof storageFilesDate === "undefined" || storageFilesDate <= todaysDate) {
        // if (!storageFilesDate) {
        //     console.log('fuck')
        //     wallPaperDom.style.backgroundImage = "url('../../../static/defaultWallPapers/xiagu.jpg')`
        // }
        // 图片加载完成后执行
        imgDom.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
        // 确保canvas尺寸和图片一致
        imgCanvas.width = imgDom.width;
        imgCanvas.height = imgDom.height;
        // 在canvas中绘制图片
        imgContext.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);
        // 将图片保存为Data URI
        storageWallPaper.wallPaper = imgCanvas.toDataURL("image/png");
        storageWallPaper.date = todaysDate;
        storageWallPaper.imgSrc = imgSrc;
        // 将JSON保存到本地存储中
        try {
        localStorage.setItem("storageWallPaper", JSON.stringify(storageWallPaper));
        }
        catch (e) {
        console.log("Storage failed: " + e);
        }
        }, false);
        // 设置图片
        // wallPaperDom.setAttribute("style", `background-image: url(${srcUrl})`);
        // wallPaperDom.style.backgroundImage = `url(${storageWallPaper.wallPaper})`
        return storageWallPaper.wallPaper
    }
    else {
    // Use image from localStorage
    // wallPaperDom.setAttribute("style", `background-image: url(${storageWallPaper.wallPaper})`);
        // wallPaperDom.style.backgroundImage = `url(${storageWallPaper.wallPaper})`
        return storageWallPaper.wallPaper
        // wallPaperDom.style.storageWallPaper.wallPaper
    }
}