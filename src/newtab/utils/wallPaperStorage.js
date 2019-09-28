
export default function storageWallPaper(imgSrc, srcUrl, wallDomId, callBack) {
    //在本地存储中保存图片
    var storageWallPaper = JSON.parse(localStorage.getItem(`storageWallPaper`)) || {},
    storageFilesDate = storageWallPaper.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
    // 检查数据，如果不存在或者数据过期，则创建一个本地存储
    if (typeof storageFilesDate === "undefined" || storageFilesDate <= todaysDate) {
        getWallPaper(imgSrc, srcUrl, callBack)
    }
    else {
    // Use image from localStorage
        callBack(storageWallPaper.wallPaper)
    }
}

function getWallPaper(imgSrc, srcUrl, callBack) {
    let imgDom = new Image(),
        date = new Date(),
        todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
        imgDom.src = srcUrl;
    imgDom.onload = function () {
        var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
        // 确保canvas尺寸和图片一致
        imgCanvas.width = imgDom.width;
        imgCanvas.height = imgDom.height;
        // 在canvas中绘制图片
        imgContext.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);
        // 将图片保存为Data URI
        let storageWallPaper = {};
        storageWallPaper.wallPaper = imgCanvas.toDataURL("image/png");
        storageWallPaper.date = todaysDate;
        storageWallPaper.imgSrc = imgSrc;
        // 将JSON保存到本地存储中
        callBack(storageWallPaper.wallPaper)
        try {
            localStorage.setItem("storageWallPaper", JSON.stringify(storageWallPaper));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    };
}