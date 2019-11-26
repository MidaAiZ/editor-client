import req from '../services/index.js';
import { upBase64 } from '../services/uploadImg.js';
import imgHost from '../services/apis/imgHost.js';
import { Message } from 'element-ui';

const localSave = (settingKey, settingValue) => {
    let oldSetting = localStorage.getItem(settingKey) || "{}";
    const setting = Object.assign({}, JSON.parse(oldSetting), settingValue);
    localStorage.setItem(settingKey, JSON.stringify(setting));
    // req
}

const imgToBase64 = (srcUrl, callBack) => {
    let imgDom = new Image();
    return new Promise(resolve => {
        imgDom.onload = function () {
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
            resolve(base64Src);
        };
        imgDom.onerror = function() {
            resolve('');
        }
        imgDom.src = srcUrl;
    });
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
    imgDom.onerror = function() {
        Message.error({message: localeText[rootState.locale.location].loadImgFail})
    }
}

const NoIconFunc = async (title, width, height, color) => {
    // let imgDom = new Image();
    let imgCanvas = document.createElement("canvas");
    let imgContext = imgCanvas.getContext("2d");
        // 确保canvas尺寸和图片一致
    imgCanvas.width = width;
    imgCanvas.height = height;
    if(!color) {
        imgContext.fillStyle = 'rgba('+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +',0.8)';
    } else {
        imgContext.fillStyle = color;
    }
    imgContext.fillRect(0,0,width, height);
    let imgText = title.slice(0, 1);
    imgContext.fillStyle="#fff";
    imgContext.font = "90px YaHei";
    imgContext.textAlign = 'center';
    imgContext.textBaseline = "middle";
    imgContext.fillText(imgText, width / 2, height / 2);
    const base64Src = imgCanvas.toDataURL("image/png");
    let src;
    await upBase64(base64Src, (key, cdnHost) => {src = (cdnHost || imgHost) + key}, () => {console.log('上传失败')})
    let imgObj = {
        iconBase64: base64Src,
        iconSrc: src || ''
    }
    console.log('imgObj', imgObj)
    return imgObj;
}

export {
    localSave,
    imgToBase64,
    saveImg,
    NoIconFunc
}
