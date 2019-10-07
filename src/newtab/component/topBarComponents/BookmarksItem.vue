<template>
    <div class="bookmarks-item">
        <img class="fav-icon" :src="iconSrc"></img>
        {{item.title}}
    </div>
</template>
<script>
// import './newBGbrush.scss'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { getBookmarks, getBookmarksBarFolder } from '../../utils/bookmarks.js'

export default {
    name: 'bookmarksItem',
    props: ['item'],
    components: {
    },
    data(){
        return{
            iconSrc: ''
        }
    },
    computed: {
        
    },
    created: function () {
        // 获取所有书签icon
        let targetUrl = this.item.url
        let iconUrl = `chrome://favicon/size/32@2x/${targetUrl}`
        this.iconSrc = iconUrl
    },
    methods: {
        
    }
}
</script>
<style scoped>
    .bookmarks-item {
        width: 100%;
        height: 30px;
        font-size: 13px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .bookmarks-item:hover {
        background: #efefef;
        transition: all .3s;
    }
    .fav-icon {
        width: 16px;
        height: 16px;
        margin-top: 7px;
        margin-right: 5px;
        float: left;
    }
</style>