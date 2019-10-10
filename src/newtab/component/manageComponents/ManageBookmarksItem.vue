<template>
    <div class="bookmarks-item" :style="{height: (isFolder === true ? '200px' : '100px')}">
        <img v-if="!isFolder" class="fav-icon" :src="iconSrc"></img>
        <i class="el-icon-folder folder-icon" v-else></i>
        {{ mark.title }}
        <div v-if="isFolder">
            这是一个文件夹
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../../utils/bookmarks.js'

export default {
    name: 'manageBookmarksItem',
    props: ['mark'],
    components: {
        draggable
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
    height: 100%;
    background: #fff;
    border-radius: 5px;
    border: 1px #f1f1f1 solid;
    box-shadow: 2px 2px 3px 0 rgba(100,100,100,0.09);
}
.fav-icon {
        width: 16px;
        height: 16px;
        margin-top: 7px;
        margin-right: 5px;
        float: left;
    }
</style>