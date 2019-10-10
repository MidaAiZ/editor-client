import { ADD_CHOOSE_ENGINE, DELETE_CHOOSE_ENGINE, OPEN_ENGINE_POPOVER, CLOSE_ENGINE_POPOVER, CHANGE_CURRENT_ENGINE } from './mutations-type.js'
// initial state
const state = {
    searchPopoverVisible: false,
    currentSearchEngine:{
        url: 'http://www.baidu.com/s?wd=#content#',
        img: 'https://picsum.photos/55/55',
        name: '百度',
    },
    searchEngineList:[
        {
            id: 5,
            url: 'http://www.baidu.com/s?wd=#content#',
            img: 'https://picsum.photos/55/55',
            name: '百度',
            isChoose: true
        },{
            id: 0,
            url: 'https://www.google.com/search?q=#content#',
            img: 'https://picsum.photos/50/50',
            name: '谷歌',
            isChoose: true
        },
        {
            id: 1,
            url: 'https://search.yahoo.com/search?p=#content#',
            img: 'https://picsum.photos/51/51',
            name: 'Yahoo!',
            isChoose: true
        },{
            id: 4,
            url: 'http://www.so.com/s?q=#content#',
            img: 'https://picsum.photos/54/54',
            name: '360搜索',
            isChoose: true
        },{
            id: 6,
            url: 'https://www.sogou.com/web?query=#content#',
            img: 'https://picsum.photos/56/56',
            name: '搜狗',
            isChoose: true
        }
    ],
    allEngineList:[
        {
            id: 0,
            url: 'https://www.google.com/search?q=#content#',
            img: 'https://picsum.photos/50/50',
            name: '谷歌',
            isChoose: true
        },
        {
            id: 1,
            url: 'https://search.yahoo.com/search?p=#content#',
            img: 'https://picsum.photos/51/51',
            name: 'Yahoo!',
            isChoose: true
        },{
            id: 3,
            url: 'https://yandex.ru/search/?text=#content#',
            img: 'https://picsum.photos/53/53',
            name: 'YandexRU',
            isChoose: false
        },{
            id: 4,
            url: 'http://www.so.com/s?q=#content#',
            img: 'https://picsum.photos/54/54',
            name: '360搜索',
            isChoose: true
        },{
            id: 5,
            url: 'http://www.baidu.com/s?wd=#content#',
            img: 'https://picsum.photos/55/55',
            name: '百度',
            isChoose: true
        },{
            id: 6,
            url: 'https://www.sogou.com/web?query=#content#',
            img: 'https://picsum.photos/56/56',
            name: '搜狗',
            isChoose: true
        },{
            id: 7,
            url: 'https://search.naver.com/search.naver?query=#content#',
            img: 'https://picsum.photos/57/57',
            name: 'NAVER',
            isChoose: false
        },{
            id: 8,
            url: 'https://duckduckgo.com/?p=#content#',
            img: 'https://picsum.photos/56/56',
            name: 'Duckduckgo',
            isChoose: false
        },{
            id: 9,
            url: 'https://cn.bing.com/search?q=#content#',
            img: 'https://picsum.photos/57/57',
            name: '必应',
            isChoose: false
        }
    ],
    customEngineList:[]

}

// getters
const getters = {

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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}