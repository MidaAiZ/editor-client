const chrome = require('../../../static/logos/chrome.png')
const settings = require('../../../static/logos/settings.png')

export const defaultCategories = [ // 默认分类，如果服务器获取失败且本地没有存储，
    {
      "cid": 0,
      "title": "默认",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:41:22",
      "updatedAt": "2019-09-29 02:41:26"
    },
    {
      "cid": 2,
      "title": "科技",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:30:36",
      "updatedAt": "2019-09-29 02:28:43"
    },
    {
      "cid": 3,
      "title": "军事",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:30:36",
      "updatedAt": "2019-09-29 02:28:43"
    },
    {
      "cid": 4,
      "title": "教育",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:30:36",
      "updatedAt": "2019-09-29 02:28:43"
    },
    {
      "cid": 5,
      "title": "文化",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:30:36",
      "updatedAt": "2019-09-29 02:28:43"
    },
    {
      "cid": 6,
      "title": "游戏",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:30:36",
      "updatedAt": "2019-09-29 02:28:43"
    },
    {
      "cid": 8,
      "title": "购物",
      "index": null,
      "sitesCount": null,
      "createdAt": "2019-09-29 02:45:59",
      "updatedAt": "2019-09-29 02:46:01"
    }
  ]

  export const defaultSettings = { // 默认主页配置，如果服务器获取失败，自动设置这一套配置
    bgSrc: 'default',
    maskOpacityValue: 0,
    bgBlurValue: 0,
    newSiteNewTabValue: false,
    cloudSave: false,
    searchResultNewTabValue: false,
    openMarkNewTabValue: false,
    historyNewTabValue: false,
    randomBgBtn: false,
    showOftenUsedBar: false,
    showEmailBtn: false,
    showBookMarkBar: false,
    iconLayout: {
        name: '2x5',
        row: 2,
        col: 5,
    },
    hideAllIcons: false,
    iconRadiusValue: 50,
    iconSizeValue: 50,
    hideSearchBarValue: false,
    hideSearchTypeValue: false,
    searchBarRadiusValue: 5,
    searchBarSizeValue: 50,
    searchBarOpacityValue: 80,
    fontSizeValue: 15,
    fontColorValue: '#fff',
    defaultSearchEngine: 'google',
    defaultLocale: {
      version: 'default',
      lang: 'en'
    },
  }

// Object.defineProperties(menu, {
//   title: {
//     value: '',
//   },
//   iconBase64: {},
//   iconBase64: {
//     value: '',
//     enumerable: false,
//   }
// })


// function optimizeMenu(menus) {
//   menus.forEach(page => {
//     page.forEach(item => {
//       const obj = {};
//       Object.defineProperty(obj, 'iconBase64', {
//         value: item.iconBase64,
//         enumerable: false,
//       });
//       delete item.iconBase64;
//       Object.assign(item, obj);
//     })
//   });
// }

export const defaultMenu = {
    version: 'default',
    menus: [
    //   {
    //       id: 1,
    //       title: '天气',
    //       icon: '',
    //       url: '',
    //       index: '',
    //   },
      [{

        title: 'chrome web store',
        iconSrc: '',
        iconBase64: chrome,
        url: 'https://chrome.google.com/webstore/category/extensions',
        index: 0,
        isFolder: false,
        children: []
      },
      {
        title: 'weather',
        iconSrc: '',
        iconBase64: '',
        url: 'tabplus://weather',
        index: 1,
        isFolder: false,
        children: []
      },
      {
        title: 'settings',
        iconSrc: settings,
        iconBase64: '',
        url: 'tabplus://settings',
        index: 2,
        isFolder: false,
        children: []
      },]
  ]};

// export const defaultMenu = localMenu;

// console.log('忽略base64', JSON.stringify(defaultMenu))