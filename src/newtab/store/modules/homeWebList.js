const state = {
    rowNumber: 2,
    itemNumber: 5,
    homeWebList:[
        {
            id: 1,
            title: '天猫精选',
            img: 'https://picsum.photos/150/150',
            url: '',
            index: 1
        },
        {
            id: 2,
            title: '天猫精选',
            img: 'https://picsum.photos/150/111',
            url: '',
            index: 2
        },
        {
            id: 3,
            title: '天猫精选',
            img: 'https://picsum.photos/150/123',
            url: '',
            index: 3
        },
        {
            id: 4,
            title: '天猫精选',
            img: 'https://picsum.photos/150/144',
            url: '',
            index: 4
        },
        {
            id: 5,
            title: '天猫精选',
            img: 'https://picsum.photos/130/150',
            url: '',
            index: 5
        },
        {
            id: 6,
            title: '天猫精选',
            img: 'https://picsum.photos/150/160',
            url: '',
            index: 6
        },
        {
            id: 7,
            title: '天猫精选',
            img: 'https://picsum.photos/150/166',
            url: '',
            index: 7
        },
        {
            id: 8,
            title: '天猫精选',
            img: 'https://picsum.photos/150/170',
            url: '',
            index: 8
        },
        {
            id: 9,
            title: '天猫精选',
            img: 'https://picsum.photos/152/170',
            url: '',
            index: 9
        },
        {
            id: 10,
            title: '天猫精选',
            img: 'https://picsum.photos/153/170',
            url: '',
            index: 10
        },
        {
            id: 1,
            title: '天猫精选',
            img: 'https://picsum.photos/154/170',
            url: '',
            index: 11
        },
        {
            id: 12,
            title: '天猫精选',
            img: 'https://picsum.photos/155/170',
            url: '',
            index: 12
        },
        {
            id: 13,
            title: '天猫精选',
            img: 'https://picsum.photos/156/170',
            url: '',
            index: 13
        },
        {
            id: 14,
            title: '天猫精选',
            img: 'https://picsum.photos/157/170',
            url: '',
            index: 14
        },
        {
            id: 15,
            title: '天猫精选',
            img: 'https://picsum.photos/158/170',
            url: '',
            index: 15
        },
        {
            id: 16,
            title: '天猫精选',
            img: 'https://picsum.photos/157/177',
            url: '',
            index: 16
        },
        {
            id: 17,
            title: '天猫精选',
            img: 'https://picsum.photos/143/140',
            url: '',
            index: 17
        },
        {
            id: 18,
            title: '天猫精选',
            img: 'https://picsum.photos/118/118',
            url: '',
            index: 11
        },
        {
            id: 19,
            title: '天猫精选',
            img: 'https://picsum.photos/119/119',
            url: '',
            index: 19
        },
        {
            id: 20,
            title: '天猫精选',
            img: 'https://picsum.photos/120/120',
            url: '',
            index: 20
        },
        {
            id: 21,
            title: '天猫精选',
            img: 'https://picsum.photos/121/121',
            url: '',
            index: 21
        },
        {
            id: 22,
            title: '天猫精选',
            img: 'https://picsum.photos/122/122',
            url: '',
            index: 22
        },
        {
            id: 23,
            title: '天猫精选',
            img: 'https://picsum.photos/123/123',
            url: '',
            index: 23
        },
        {
            id: 24,
            title: '天猫精选',
            img: 'https://picsum.photos/124/124',
            url: '',
            index: 24
        },
        {
            id: 25,
            title: '天猫精选',
            img: 'https://picsum.photos/125/125',
            url: '',
            index: 25
        },
        {
            id: 26,
            title: '天猫精选',
            img: 'https://picsum.photos/126/126',
            url: '',
            index: 26
        },
        {
            id: 27,
            title: '天猫精选',
            img: 'https://picsum.photos/127/127',
            url: '',
            index: 27
        },
        {
            id: 28,
            title: '天猫精选',
            img: 'https://picsum.photos/128/128',
            url: '',
            index: 28
        },
        {
            id: 29,
            title: '天猫精选',
            img: 'https://picsum.photos/129/129',
            url: '',
            index: 29
        }
    ],

};

function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

// getters
const getters = {
    totalSize: state => {
        return state.homeWebList.length
    },
    //将数组按index属性排序
    sortArray: (state,getters) => {
        return state.homeWebList.sort(compare('index'))
    },
    pagingArray:(state,getters) => {
        let sortedWebList = getters.sortArray;
        let pages = Math.ceil(getters.totalSize/(state.rowNumber*state.itemNumber));
        let everyPageNumber = state.rowNumber*state.itemNumber;
        let pageArray = [];
        for(let i=0; i<pages; i++){
            let tempArray = (i===(pages-1)?sortedWebList.slice(i*everyPageNumber):sortedWebList.slice(i*everyPageNumber,(i+1)*everyPageNumber));
            // let rows = Math.ceil(tempArray.length/state.itemNumber);
            // let rowArray = [];
            // for(let j=0; j<rows; j++){
            //     rowArray.push(j===(rows-1)?tempArray.slice(j*state.itemNumber):tempArray.slice(j*state.itemNumber,(j+1)*state.itemNumber))
            // }
            // pageArray.push(rowArray)
            pageArray.push(tempArray)
        }
        return pageArray
    }

}

// actions
const actions = {

}

// mutations
const mutations = {
    // setLogRegModalVis (state, vis) {
    //     console.log('modal visible: ',vis);
    //     state.logregModalVis = vis
    // },
    // setLoginInfo (state, payload) { // 填写登录信息
    //     state[payload.type] = payload.value
    // },
    // setLoginLoading (state, loading) { // 登录时等候的加载图标显示
    //     state.loginLoading = loading
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}