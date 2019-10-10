import { ADD_CHOOSE_ENGINE, DELETE_CHOOSE_ENGINE, OPEN_ENGINE_POPOVER, CLOSE_ENGINE_POPOVER, CHANGE_CURRENT_ENGINE, 
    ADD_CUSTOM_ENGINE,DELETE_CUSTOME_ENGINE,OPEN_CUSTOM_ENGINE,CLOSE_CUSTOM_ENGINE} from './mutations-type.js'
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}