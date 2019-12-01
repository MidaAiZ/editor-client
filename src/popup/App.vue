<template>
    <div id="app">
        <div class='edit-drawer-img'>
            <div class="tempIcon" v-if="!this.itemInfo.iconBase64">
                IMG
            </div>
            <img :src='itemInfo.iconBase64' v-else/>
        </div>
       <div id="edit-drawer">
           <div>
                <span>{{title}}</span>
                <input class="edit-drawer-input" @input="createIcon" v-model="itemInfo.title"/>
            </div>
            <div>
                <span>url</span>
                <input class="edit-drawer-input" v-model="itemInfo.url"/>
            </div>
            <div style="margin-top: 10px; width: 100%">
                <span 
                    v-for="item in colorList" 
                    :key="item" 
                    class="color-item" 
                    :style="{backgroundColor: item}"
                    @click="changeColor(item)"
                >
                </span>
            </div>
            <input v-if="!loading" type="button" :value="add" id="add-btn" class='edit-drawer-button' @click.prevent.stop='editComplete'/>
            <button class='edit-drawer-button-disabled' v-else>{{add}}</button>
        </div>
    </div>
</template>
<script>
import { localSave, NoIconFunc } from '../newtab/utils/localSave.js';
import * as localeState from '../newtab/store/modules/locale.js';
import localeText from '../../static/locale/index.js';
export default {
    name: 'app',
    data() {
        return{
            itemInfo: {
                title: '',
                url: '',
                iconSrc: '',
                iconBase64: '',
            },
            colorList: [
                "#fa8072",
                "#ffc81f",
                "blue",
                "green",
                "purple",
                "pink"
            ],
            iconColor: "#fa8072",
            loading: false,
        }
    },
    computed: {
        title: function() {
            return localeText[localeState.default.state.location].title
        },
        add: function() {
            return localeText[localeState.default.state.location].addSite
        },
    },
    mounted() {
        chrome.tabs.query({highlighted: true},(tab) => {
            this.itemInfo.url = tab[0].url;
            this.itemInfo.title = tab[0].title;
            this.createIcon()
        });
        console.log(localeState.default.state.location)
    },
    methods: {
        changeColor(item) {
            this.iconColor = item;
            this.createIcon()
        },
        async createIcon() {
            this.loading = true;
            const imgObj = await NoIconFunc(this.itemInfo.title, 200, 200, this.iconColor);
            this.itemInfo.iconSrc = imgObj.iconSrc;
            this.itemInfo.iconBase64 = imgObj.iconBase64;
            this.loading = false;
        },
        editComplete() {
            let arr = JSON.parse(localStorage.getItem('homeMenus')).menus;
            let layout = JSON.parse(localStorage.getItem('settings')).iconLayout;
            let size = layout.col * layout.row;
            let newItem = {
                url: this.itemInfo.url,
                title: this.itemInfo.title,
                iconSrc: this.itemInfo.iconSrc,
                iconBase64: this.itemInfo.iconBase64,
                index: arr[arr.length-1].length
            };
            if(arr[arr.length-1].length >= size) {
                arr.push([])
            }
            arr[arr.length-1].push(newItem);
            let menus = {
                version: JSON.parse(localStorage.getItem('homeMenus')).version,
                menus: arr
            };
            localSave('homeMenus', menus);
            window.close();
        }
    }

}
</script>
<style scoped>
#app {
    width: 440px;
    height: auto;
    padding: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
}
    #edit-drawer{
        width: 300px;
        float: right;
        /* display: inline-block; */
    }
    .edit-drawer-img{
        float: left;
        /* display: flex;
        align-items: center; */
    }
    .edit-drawer-img img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 30px;
    }
    .edit-drawer-input{
        width: 260px;
        height: 40px;
        border: 0;
        border-bottom: 1px #666 solid;
    }
    .img-edit{
        color: #ffc81f;
        cursor: pointer;
        font-size: 15px;
    }
    .img-edit:hover{
        text-decoration: underline;
        cursor: pointer;
        /* border-bottom: 1px solid #ffc81f; */
    }
    .edit-drawer-img-edit{
        margin-bottom: 10px;
    }
    .edit-drawer-button{
        width: 100%;
        background-color: #ffc81f;
        color: white;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-top: 20px;
        margin-bottom: 40px;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .edit-drawer-button-disabled {
        width: 100%;
        background-color: #ccc;
        color: 111;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-top: 20px;
        margin-bottom: 40px;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: not-allowed;
    }
    .edit-drawer-canvas{
        /* height: 100px;
        width: 100px; */
        margin-right: 30px;
        border-radius: 50%;
    }
    .color-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .img-edit-input {
        position: absolute;
        bottom: 0;
        opacity: 0;
        cursor: pointer;
    }
    .tempIcon {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        background-color: #fa8072;
        color: #fff;
        text-align: center;
        line-height: 100px;
        font-size: 30px;
        font-weight: bolder;
    }
    .color-item {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        float: left;
        margin-left: 20px;
        margin-top: 15px;
        margin-bottom: 10px;
        cursor: pointer;
    }
</style>