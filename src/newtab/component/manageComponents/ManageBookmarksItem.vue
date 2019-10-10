<template>
    <div class="bookmarks-item" 
    >
        <div class="manage-bookmarks-title-wrap">
            <img v-if="!isFolder" class="fav-icon" :src="iconSrc"></img>
            <i class="el-icon-folder fav-icon" v-else></i>
            <span class="manage-bookmarks-title">{{ mark.title }}</span>
        </div>
        <div class="folder-content" v-if="isFolder">
            <draggable :list="mark.children" :group="{name: 'children'}">
                <manageBookmarksFolderCnt :id="mark.id"/>
            </draggable>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../../utils/bookmarks.js'
import manageBookmarksFolderCnt from './ManageBookmarksFolderCnt.vue'

export default {
    name: 'manageBookmarksItem',
    props: ['mark'],
    components: {
        draggable,
        manageBookmarksFolderCnt
    },
    data() {
        return {
            iconSrc: ''
            // mainMarksTree: [],
            // otherMarksTree: []
        }
    },
    computed: {
        isFolder: function() {
            return this.mark.children ? true : false
        }
    },
    created: function() {
        // this.settingName = localeText[this.location].settingName
        let targetUrl = this.mark.url
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
    min-height: 100px;
    height: auto;
    background: #fff;
    border-radius: 5px;
    border: 1px #f1f1f1 solid;
    box-shadow: 2px 2px 3px 0 rgba(100,100,100,0.09);
    cursor: pointer;
}
.manage-bookmarks-title-wrap {
    padding: 10px;
}
.manage-bookmarks-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.fav-icon {
        width: 16px;
        height: 16px;
        margin-top: 7px;
        margin-right: 5px;
        float: left;
    }
</style>