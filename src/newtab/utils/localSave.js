import req from '../services/index.js';

const localSave = (settingKey, settingValue) => {
    let oldSetting = localStorage.getItem(settingKey) || "{}";
    const setting = Object.assign({}, JSON.parse(oldSetting), settingValue);
    localStorage.setItem(settingKey, JSON.stringify(setting));
    // req
}

const imgToBase64 = async (srcUrl, callBack) => {
    let imgDom = new Image();
    imgDom.src = srcUrl;
    imgDom.onload = await function () {
        var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
        // 确保canvas尺寸和图片一致
        imgCanvas.width = imgDom.width;
        imgCanvas.height = imgDom.height;
        // 在canvas中绘制图片
        imgContext.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);
        // 将图片保存为Data URI
        let base64Src = imgCanvas.toDataURL("image/png");
        // console.log(base64Src)
        callBack(base64Src)
       
    };
}

const saveImg = (key, srcUrl, callBack) => {
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
        let storageImg = {};
        storageImg.img = imgCanvas.toDataURL("image/png");
        storageImg.date = todaysDate;
        // 将JSON保存到本地存储中
        try {
            localStorage.setItem(`${key}`, JSON.stringify(storageImg));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
        callBack(storageImg.img)
    };
}

export {
    localSave,
    imgToBase64,
    saveImg,
}