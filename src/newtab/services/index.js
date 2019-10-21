// const baseURL = '//'
import $axios from './axios.js';
import wallPaper from './apis/wallPaper.js';

import { Message } from 'element-ui';

function checkCode(code = 'Success') {
//   if (code === 'Success') {
//     return code;
//   }
//   if (code === 'NotLoggedIn') {
//     message.info('请先登录');
//   }
//   if (code === 'WrongMsgCode') {
//     message.warning('错误的短信验证码');
//   }
//   if (code === 'Fail') {
//     message.warning('操作失败');
//   }
//   if (code === 'ResourceNotExist') {
//     message.info('原文件不存在');
//   }
//   if (code === 'Nopermisson') {
//     message.warning('没有该操作权限');
//   }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] `params` 是即将与请求一起发送的 URL 参数,必须是一个无格式对象(plain object)或 URLSearchParams 对象
 * @return {object}           An object containing either "data" or "err"
 */
export default async function req(service, params, data, headers, withCredentials) {
  let option =
    withCredentials === false
      ? {
          method: service.m || "GET",
          url: service.p,
          params,
          data,
          headers
        }
      : {
          method: service.m || "GET",
          url: service.p,
          params,
          data,
          withCredentials: true
        };
  const response = await $axios(option);

//   const resData = await response.json();

//   checkCode(data.code);

  const ret = {
    data: response,
    headers: {},
  };

  return ret;
}


