const chrome = require('../../../static/logos/chrome.svg')
const bookmark = require('../../../static/logos/bookmark.svg')
const history = require('../../../static/logos/clock.svg')
const amazon = require('../../../static/logos/amazon.svg')
const apple = require('../../../static/logos/apple.svg')
const tianmao = require('../../../static/logos/tianmao.svg')
const instagram = require('../../../static/logos/instagram.svg')
const twitter = require('../../../static/logos/twitter.svg')
const jingdong = require('../../../static/logos/jingdong.svg')
const youtube = require('../../../static/logos/youtube.svg')
const bilibili = require('../../../static/logos/bilibili.svg')
const steam = require('../../../static/logos/steam.svg')
const zhihu = require('../../../static/logos/zhihu.svg')
const weibo = require('../../../static/logos/sina-weibo.svg')
const facebook = require('../../../static/logos/facebook.svg')
const ebay = require('../../../static/logos/ebay.svg')
const gmail = require('../../../static/logos/gmail.svg')

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
    maskOpacityValue: 30,
    bgBlurValue: 20,
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
    searchBarRadiusValue: 50,
    searchBarSizeValue: 50,
    searchBarOpacityValue: 100,
    fontSizeValue: 15,
    fontColorValue: '#fff',
  }

  export const defaultMenu = {
    isDefault: true,
    menus: [
    //   {
    //       id: 1,
    //       title: '天气',
    //       icon: '',
    //       url: '',
    //       index: '',
    //   },
      [{
        sid: 2,
        title: 'chrome商店',
        icon: chrome,
        url: 'https://chrome.google.com/webstore/category/extensions',
        index: 0,
        isFolder: false,
        children: []
      },
      {
        sid: 3,
        title: '书签',
        icon: bookmark,
        url: '',
        index: 1,
        isFolder: false,
        children: []
      },
      {
        sid: 4,
        title: '历史',
        icon: history,
        url: '',
        index: 2,
        isFolder: false,
        children: []
      },
      {
        sid: 5,
        title: '亚马逊',
        icon: amazon,
        url: 'https://www.amazon.com/',
        index: 3,
        isFolder: false,
        children: []
      },
      {
        sid: 6,
        title: '天猫',
        icon: tianmao,
        url: 'https://www.tmall.com/',
        index: 4,
        isFolder: false,
        children: []
      },
      {
        sid: 7,
        title: 'instagram',
        icon: instagram,
        url: 'https://www.instagram.com/',
        index: 5,
        isFolder: false,
        children: []
      },
      {
        sid: 8,
        title: 'twitter',
        icon: twitter,
        url: 'https://twitter.com/',
        index: 6,
        children: []
      },
      {
        sid: 9,
        title: '京东',
        icon: jingdong,
        url: 'https://www.jd.com/',
        index: 7,
        isFolder: false,
        children: []
      },
      {
        sid: 10,
        title: 'Youtube',
        icon: youtube,
        url: 'https://www.youtube.com/',
        index: 8,
        isFolder: false,
        children: []
      },
      {
        sid: 11,
        title: '哔哩哔哩',
        icon: bilibili,
        url: 'https://www.bilibili.com/',
        index: 9,
        isFolder: false,
        children: []
      },],
[      {
        sid: 12,
        title: 'steam',
        icon: steam,
        url: 'https://store.steampowered.com/',
        index: 10,
        isFolder: false,
        children: []
      },
      {
        sid: 13,
        title: '知乎',
        icon: zhihu,
        url: 'https://www.zhihu.com/',
        index: 11,
        isFolder: false,
        children: []
      },
      {
        sid: 14,
        title: '微博',
        icon: weibo,
        url: 'https://www.weibo.com/',
        index: 12,
        isFolder: false,
        children: []
      },
      {
        sid: 15,
        title: 'Facebook',
        icon: facebook,
        url: 'https://www.facebook.com/',
        index: 13,
        isFolder: false,
        children: []
      },
      {
        sid: 16,
        title: 'eBay',
        icon: ebay,
        url: 'https://www.ebay.com/',
        index: 14,
        isFolder: false,
        children: []
      },
      {
        sid: 17,
        title: 'gmail',
        icon: gmail,
        url: 'https://mail.google.com/mail/',
        index: 15,
        isFolder: false,
        children: []
      },]
  ]}