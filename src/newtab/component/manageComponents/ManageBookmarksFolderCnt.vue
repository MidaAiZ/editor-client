<template>
    <div class="folder-cnt">
        <draggable :list="folderMarks" group="bookmark">
            <div v-show="showFolder" v-for="mark in folderMarks" :key="mark.id" class="manage-bookmarks-title-wrap">
                <img class="fav-icon" :src="`chrome://favicon/size/32@2x/${mark.url}`"></img>
                <span class="manage-bookmarks-title">{{ mark.title }}</span>
            </div>
        </draggable>
        <div class="open-folder-btn" @click="showFolderCnt">
            {{showFolder ? closeFolder : openFolder}}
        </div>
    </div>
</template>
<script>
// import './newBGbrush.scss'
import draggable from 'vuedraggable'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { getBookmarks, getBookmarksBarFolder, getBookmarksSub } from '../../utils/bookmarks.js'
import localeText from '../../../../static/locale/index.js'

export default {
    name: 'manageBookmarksFolderCnt',
    props: ['id'],
    components: {
        draggable
    },
    data(){
        return{
            iconSrc: '',
            folderMarks: [],
            showFolder: false,
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        openFolder: function() {
            return localeText[this.location].openFolder
        },
        closeFolder: function() {
            return localeText[this.location].closeFolder
        }
    },
    created: function () {
        getBookmarksSub(this.id, this.getFolderMarksCb)
        // 获取所有书签icon
        // let targetUrl = this.item.url
        // let iconUrl = `chrome://favicon/size/32@2x/${targetUrl}`
        // this.iconSrc = iconUrl
    },
    methods: {
        getFolderMarksCb(title, tree, date) {
            this.folderMarks = tree
            // let targetUrl = this.item.url
            // let iconUrl = `chrome://favicon/size/32@2x/${targetUrl}`
            // this.iconSrc = iconUrl
            // console.log('folderCnt', tree[0])
        },
        showFolderCnt() {
            this.showFolder = !this.showFolder
        }
    }
}
</script>
<style scoped>
    .folder-cnt {
        padding: 10px;
        height: auto;
    }
    .manage-bookmarks-title {
        width: 80%;
        float: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .open-folder-btn {
        width: 100%;
        margin-top: 10px;
        text-align: center;
    }
    .manage-bookmarks-title-wrap {
        width: 100%;
        height: 20px;
        padding: 10px 0 10px 0;
        background: #efefef;
        display: block
    }
    .fav-icon {
        width: 12px;
        height: 12px;
        float: left;
    }
</style>