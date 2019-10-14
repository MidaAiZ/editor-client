import { ADD_CHOOSE_ENGINE, DELETE_CHOOSE_ENGINE, OPEN_ENGINE_POPOVER, CLOSE_ENGINE_POPOVER, CHANGE_CURRENT_ENGINE, 
    ADD_CUSTOM_ENGINE,DELETE_CUSTOME_ENGINE,OPEN_CUSTOM_ENGINE,CLOSE_CUSTOM_ENGINE} from './mutations-type.js'
// initial state
const baidu = require('../../../../static/logos/baidu.svg')
const yahoo = require('../../../../static/logos/yahoo.svg')
const sougou = require('../../../../static/logos/sougou.svg')
const bing = require('../../../../static/logos/bing.svg')
const google = require('../../../../static/logos/google.svg')
const yandex = require('../../../../static/logos/yandex.svg')
const search360 = require('../../../../static/logos/360.svg')
const naver = require('../../../../static/logos/naver.svg')
const duckduckgo = require('../../../../static/logos/duckduckgo.svg')

const state = {
    searchPopoverVisible: false,
    currentSearchEngine:{
        url: 'http://www.baidu.com/s?wd=#content#',
        img: baidu,
        name: '百度',
    },
    searchEngineList:[
        {
            id: 5,
            url: 'http://www.baidu.com/s?wd=#content#',
            img: baidu,
            name: '百度',
            isChoose: true
        },{
            id: 0,
            url: 'https://www.google.com/search?q=#content#',
            img: google,
            name: '谷歌',
            isChoose: true
        },
        {
            id: 1,
            url: 'https://search.yahoo.com/search?p=#content#',
            img: yahoo,
            name: 'Yahoo!',
            isChoose: true
        },{
            id: 4,
            url: 'http://www.so.com/s?q=#content#',
            img: search360,
            name: '360搜索',
            isChoose: true
        },{
            id: 6,
            url: 'https://www.sogou.com/web?query=#content#',
            img: sougou,
            name: '搜狗',
            isChoose: true
        }
    ],
    allEngineList:[
        {
            id: 0,
            url: 'https://www.google.com/search?q=#content#',
            img: google,
            name: '谷歌',
            isChoose: true
        },
        {
            id: 1,
            url: 'https://search.yahoo.com/search?p=#content#',
            img: yahoo,
            name: 'Yahoo!',
            isChoose: true
        },{
            id: 3,
            url: 'https://yandex.ru/search/?text=#content#',
            img: yandex,
            name: 'YandexRU',
            isChoose: false
        },{
            id: 4,
            url: 'http://www.so.com/s?q=#content#',
            img: search360,
            name: '360搜索',
            isChoose: true
        },{
            id: 5,
            url: 'http://www.baidu.com/s?wd=#content#',
            img: baidu,
            name: '百度',
            isChoose: true
        },{
            id: 6,
            url: 'https://www.sogou.com/web?query=#content#',
            img: sougou,
            name: '搜狗',
            isChoose: true
        },{
            id: 7,
            url: 'https://search.naver.com/search.naver?query=#content#',
            img: naver,
            name: 'NAVER',
            isChoose: false
        },{
            id: 8,
            url: 'https://duckduckgo.com/?p=#content#',
            img: duckduckgo,
            name: 'Duckduckgo',
            isChoose: false
        },{
            id: 9,
            url: 'https://cn.bing.com/search?q=#content#',
            img: bing,
            name: '必应',
            isChoose: false
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