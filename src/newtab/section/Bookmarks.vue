<template>
    <div class="bookmarks">
        <div class="bookmarks-main">
            <div class="bookmarks-bar">
                <span class="main-bookmarks-title">
                    <i class="el-icon-star-on bookmarks-icon"></i>
                    {{mainBookmarks.title}}
                </span>
                <span v-for="item in mainBookmarks.children" class="bookmarks-item-wrap">
                    <bookmarksItem :item="item" />
                </span>
            </div>
            <span class="other-bookmarks">
                <i class="el-icon-folder bookmarks-icon"></i>
                {{otherBookmarks.title}}
            </span>
        </div>
        <div class="manage-btn-wrap" @click="openBmHis(true)">
            <manageBtn />
        </div>
    </div>
</template>
<script>
// import './newBGbrush.scss'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../utils/bookmarks.js'
import manageBtn from '../component/topBarComponents/ManageBtn.vue'
import bookmarksItem from '../component/topBarComponents/BookmarksItem.vue'

export default {
    name: 'bookmarks',
    components: {
        manageBtn,
        bookmarksItem
    },
    data(){
        return{
            mainBookmarks: {
                title: '',
                children: [],
                createdAt: ''
            },
            otherBookmarks: {
                title: '',
                children: [],
                createdAt: ''
            }
        }
    },
    computed: {
        
    },
    created: function () {
        // 获取所有书签
        // getBookmarks()
        getBookmarksSub(1, this.mainBookmarksCb)
        getBookmarksSub(2, this.otherBookmarksCb)
    },
    methods: {
        mainBookmarksCb(title, children, createdAt) {
            this.mainBookmarks = {
                title,
                children,
                createdAt,
            }
        },
        otherBookmarksCb(title, children, createdAt) {
            this.otherBookmarks = {
                title,
                children,
                createdAt,
            }
        },
        openBmHis(vis) {
            this.SET_BMHIS(vis)
        },
        ...mapMutations('drawersVis', [
            'SET_BMHIS'
        ])
    }
}
</script>
<style scoped>
    .bookmarks {
        width: 100%;
        height: 30px;
        background-color: #fff;
        opacity: 0.8;
    }
    .manage-btn-wrap {
        width: 80px;
        height: 100%;
        line-height: 30px;
        text-align: center;
        float: right;
    }
    .bookmarks-main {
        width: calc(100% - 80px);
        height: 30px;
        line-height: 30px;
        float: left;
    }
    .bookmarks-bar {
        width: calc(100% - 100px);
        height: 30px;
        line-height: 30px;
        float: left;
        overflow: hidden;
    }
    .other-bookmarks {
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
        float: right;
    }
    .main-bookmarks-title {
        float: left;
        font-size: 13px;
        margin-left: 5px;
        margin-right: 5px;
        height: 30px;
    }
    .bookmarks-icon {
        font-size: 18px;
        line-height: 28px;
        float: left;
        padding: auto;
        color: #ffc81f;
    }
    .bookmarks-item-wrap {
        float: left;
        min-width: 80px;
        max-width: 130px;
        height: 30px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>