const chrome = require('../../../static/logos/chrome.svg')
const bookmark = require('../../../static/logos/bookmark.svg')
const history = require('../../../static/logos/clock.svg')
const amazon = require('../../../static/logos/amazon.svg')
const apple = require('../../../static/logos/apple.svg')
const tianmao = require('../../../static/logos/amazon.svg')
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

  export const defaultMenu = [
    //   {
    //       id: 1,
    //       title: '天气',
    //       img: '',
    //       url: '',
    //       index: '',
    //   },
      {
        id: 2,
        title: 'chrome商店',
        img: chrome,
        url: 'https://chrome.google.com/webstore/category/extensions',
        index: 0,
      },
      {
        id: 3,
        title: '书签',
        img: bookmark,
        url: '',
        index: 1,
      },
      {
        id: 4,
        title: '历史',
        img: history,
        url: '',
        index: 2,
      },
      {
        id: 5,
        title: '亚马逊',
        img: amazon,
        url: 'https://www.amazon.com/',
        index: 3,
      },
      {
        id: 6,
        title: '天猫',
        img: tianmao,
        url: 'https://www.tmall.com/',
        index: 4,
      },
      {
        id: 7,
        title: 'instagram',
        img: instagram,
        url: 'https://www.instagram.com/',
        index: 5,
      },
      {
        id: 8,
        title: 'twitter',
        img: twitter,
        url: 'https://twitter.com/',
        index: 6,
      },
      {
        id: 9,
        title: '京东',
        img: jingdong,
        url: 'https://www.jd.com/',
        index: 7,
      },
      {
        id: 10,
        title: 'Youtube',
        img: youtube,
        url: 'https://www.youtube.com/',
        index: 8,
      },
      {
        id: 11,
        title: '哔哩哔哩',
        img: bilibili,
        url: 'https://www.bilibili.com/',
        index: 9,
      },
      {
        id: 12,
        title: 'steam',
        img: steam,
        url: 'https://store.steampowered.com/',
        index: 10,
      },
      {
        id: 13,
        title: '知乎',
        img: zhihu,
        url: 'https://www.zhihu.com/',
        index: 11,
      },
      {
        id: 14,
        title: '微博',
        img: weibo,
        url: 'https://www.weibo.com/',
        index: 12,
      },
      {
        id: 15,
        title: 'Facebook',
        img: facebook,
        url: 'https://www.facebook.com/',
        index: 13,
      },
      {
        id: 16,
        title: 'eBay',
        img: ebay,
        url: 'https://www.ebay.com/',
        index: 14,
      },
      {
        id: 17,
        title: 'gmail',
        img: gmail,
        url: 'https://mail.google.com/mail/',
        index: 15,
      },
  ]