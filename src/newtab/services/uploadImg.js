import req from "./index.js";
import upload from "./apis/uploadToken.js";
// import { fail } from "assert";
// import * as OSS from "ali-oss";
// var STS = OSS.STS;

export const Upload = (f, notImageCb, successCb, failCb) => {
  // notImageCb不是图片的回调函数 successCb上传成功的回调函数
  if (!f.type.match("image.*")) {
    // continue;
    console.log("所选内容不是图片");
    notImageCb();
  } else {
    const reader = new FileReader();

    reader.onload = (function(theFile) {
      return function(e) {
        upBase64(e.target.result, successCb, failCb);
        // const newImg = dataURItoBlob(e.target.result);
        // const imgList = new UploadImgServer();
        // imgList.UploadImg(newImg, successCb, failCb);
      };
    })(f);
    reader.readAsDataURL(f);
  }
};

export const upBase64 = async (file64, successCb, failCb) => {
  const newImg = dataURItoBlob(file64);
  const imgList = new UploadImgServer();
  await imgList.UploadImg(newImg, successCb, failCb);
};

const dataURItoBlob = base64Data => {
  let byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(base64Data.split(",")[1]);
  else byteString = unescape(base64Data.split(",")[1]);
  const mimeString = base64Data
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString
  });
};

// const UploadImageApi = _APIS.images.upload;
export class UploadImgServer {
  UploadImg = async (f, successCb, failCb) => {
    const imgD = new FormData();
    const { data } = await req(upload.getToken);
    console.log(data);
    console.log("所选图片", f);
    let tokenData = data;
    if (data.code === "Success") {
      //   imgD.append("file", f);
      imgD.append("OSSAccessKeyId", tokenData.data.OSSAccessKeyId);
      // imgD.append('host', data.data.host);
      imgD.append("key", tokenData.data.key);
      imgD.append("policy", tokenData.data.policy);
      imgD.append("signature", tokenData.data.signature);
      imgD.append("file", f);
      let upImgServerObj = {
        p: tokenData.data.host,
        m: "POST"
      };
      let headers = {
        // 'Host': `${tokenData.data.host}`,
        // 'Key': `${tokenData.data.key}`,
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary8ALqnqJh9LxrumzC"
        // 'Key':
      };
      let { data } = await req(upImgServerObj, {}, imgD, headers, false);
      console.log(data, "上传成功");
      successCb(tokenData.data.key, tokenData.data.cdnHost);
    } else {
      failCb();
    }
  };
}

// export default Upload;
