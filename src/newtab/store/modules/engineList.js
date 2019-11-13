import { ADD_CHOOSE_ENGINE, DELETE_CHOOSE_ENGINE, OPEN_ENGINE_POPOVER, CLOSE_ENGINE_POPOVER, CHANGE_CURRENT_ENGINE, 
    ADD_CUSTOM_ENGINE,DELETE_CUSTOME_ENGINE,OPEN_CUSTOM_ENGINE,CLOSE_CUSTOM_ENGINE} from './mutations-type.js'
import engineList from '../../services/apis/engineList.js';
// initial state
const baidu = require('../../../../static/logos/baidu.svg');
const yahoo = require('../../../../static/logos/yahoo.svg');
const sougou = require('../../../../static/logos/sougou.svg');
const bing = require('../../../../static/logos/bing.svg');
const google = require('../../../../static/logos/google.svg');
const yandex = require('../../../../static/logos/yandex.svg');
const search360 = require('../../../../static/logos/360.svg');
const naver = require('../../../../static/logos/naver.svg');
const duckduckgo = require('../../../../static/logos/duckduckgo.svg');
const defaultEngineList = [
    {
        id: 5,
        urls:{
            web: 'https://www.baidu.com/s?wd=#content#',
            news: 'https://www.baidu.com/s?wd=#content#&tn=news',
            image: 'https://image.baidu.com/search/index?tn=baiduimage&ps=1&cl=2&ie=utf-8&word=#content#',
            video: 'https://www.baidu.com/sf/vsearch?wd=#content#&pd=video&tn=vsearch',
            map: 'https://map.baidu.com/search/f?querytype=s&wd=#content#'
        },
        iconSrc: baidu,
        title: '百度',
        isChoose: true
    },
    {
        urls: {
            news: "https://google.com/search?q=#content#&source=lnms&tbm=nws",
            image: "https://google.com/search?q=#content#&source=lnms&tbm=isch",
            web: "https://google.com/search?q=#content#&oq=#content#",
            video: "https://google.com/search?q=#content#&source=lnms&tbm=vid",
            map: "https://www.google.com/maps/search/#content#"
        },
        title: "Google",
        iconSrc: google,
        id: 0,
        isChoose: true
    },
    {
        id: 1,
        urls: {
            web: 'https://search.yahoo.com/search?p=#content#'
        },
        iconSrc: yahoo,
        title: 'Yahoo!',
        isChoose: true
    },{
        id: 4,
        urls: {
            web: 'http://www.so.com/s?q=#content#'
        },
        iconSrc: search360,
        title: '360搜索',
        isChoose: true
    },{
        id: 6,
        urls: {
            web: 'https://www.sogou.com/web?query=#content#'
        },
        iconSrc: sougou,
        title: '搜狗',
        isChoose: true
    }
];

const state = {
    searchPopoverVisible: false,
    currentSearchEngine:{
        urls: {
            news: "https://google.com/search?q=#content#&source=lnms&tbm=nws",
            image: "https://google.com/search?q=#content#&source=lnms&tbm=isch",
            web: "https://google.com/search?q=#content#&oq=#content#",
            video: "https://google.com/search?q=#content#&source=lnms&tbm=vid",
            map: "https://www.google.com/maps/search/#content#"
        },
        title: "Google",
        iconSrc: google,
        id: 0,
        isChoose: true
    },
    searchEngineList: localStorage.getItem('engineList') ? {
        ...JSON.parse(localStorage.getItem('engineList'))
      } : defaultEngineList,
    allEngineList:[
        {
            id: 5,
            urls:{
                web: 'https://www.baidu.com/s?wd=#content#',
                news: 'https://www.baidu.com/s?wd=#content#&tn=news',
                image: 'https://image.baidu.com/search/index?tn=baiduimage&ps=1&cl=2&ie=utf-8&word=#content#',
                video: 'https://www.baidu.com/sf/vsearch?wd=#content#&pd=video&tn=vsearch',
                map: 'https://map.baidu.com/search/f?querytype=s&wd=#content#'
            },
            iconSrc: baidu,
            title: '百度',
            isChoose: true
        },
        {
            urls: {
                news: "https://google.com/search?q=#content#&source=lnms&tbm=nws",
                image: "https://google.com/search?q=#content#&source=lnms&tbm=isch",
                web: "https://google.com/search?q=#content#&oq=#content#",
                video: "https://google.com/search?q=#content#&source=lnms&tbm=vid",
                map: "https://www.google.com/maps/search/#content#"
            },
            title: "Google",
            iconSrc: google,
            id: 0,
            isChoose: true
        },
        {
            id: 1,
            urls: {
                web: 'https://search.yahoo.com/search?p=#content#'
            },
            iconSrc: yahoo,
            title: 'Yahoo!',
            isChoose: true
        },{
            id: 4,
            urls: {
                web: 'http://www.so.com/s?q=#content#'
            },
            iconSrc: search360,
            title: '360搜索',
            isChoose: true
        },{
            id: 6,
            urls: {
                web: 'https://www.sogou.com/web?query=#content#'
            },
            iconSrc: sougou,
            title: '搜狗',
            isChoose: true
        }
    ],
    customEngineList:[]

}

// getters
const getters = {
    maxID: function(state){
        let max1 = 0;
        let max2 = 0;
        for(let i=0;i<state.allEngineList.length;i++){
            if(state.allEngineList[i].id>max1){
                max1=state.allEngineList[i].id;
            }
        }
        for(let i=0;i<state.customEngineList.length;i++){
            if(state.customEngineList[i].id>max2){
                max2=state.customEngineList[i].id;
            }
        }
        return max1>max2?max1:max2;
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    [DELETE_CHOOSE_ENGINE] (state,index){
        let result = state.searchEngineList.filter(engine => {
            return engine.id !== state.allEngineList[index].id
        });
        state.searchEngineList = result;
        state.allEngineList[index].isChoose = false;
    },
    [ADD_CHOOSE_ENGINE] (state,index){
        state.allEngineList[index].isChoose = true;
        state.searchEngineList.push(state.allEngineList[index]);
    },
    [OPEN_ENGINE_POPOVER] (state){
        state.searchPopoverVisible = true;
    },
    [CLOSE_ENGINE_POPOVER] (state){
        state.searchPopoverVisible = false;
    },
    [CHANGE_CURRENT_ENGINE] (state,index){
        console.log(index);
        state.currentSearchEngine = state.searchEngineList[index]
    },
    [ADD_CUSTOM_ENGINE] (state, customEngine){
        state.customEngineList.push(customEngine);
        state.searchEngineList.push(customEngine);
        console.log(state.customEngineList);
    },
    [DELETE_CUSTOME_ENGINE] (state, customEngine){
        let result = state.customEngineList.filter(engine => {
            return engine.id !== customEngine.id;
        })
        state.customEngineList = result;
        let result1 = state.searchEngineList.filter(engine => {
            return engine.id !== customEngine.id;
        })
        state.searchEngineList = result1;
    },
    [OPEN_CUSTOM_ENGINE] (state,index){
        state.customEngineList[index].isChoose = true;
        state.searchEngineList.push(state.customEngineList[index]);
    },
    [CLOSE_CUSTOM_ENGINE] (state,index){
        let result = state.searchEngineList.filter(engine => {
            return engine.id !== state.customEngineList[index].id;
        })
        state.searchEngineList = result;
        state.customEngineList[index].isChoose = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}