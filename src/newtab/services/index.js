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
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function req(service, params, data) {
  const response = await $axios({
        method: service.m,
        url: service.p,
        params,
        data,
    });

//   const resData = await response.json();

//   checkCode(data.code);

  const ret = {
    data: response,
    headers: {},
  };

  return ret;
}


