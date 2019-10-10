<template>
    <div class="manage-bookmarks-section">
        <div class="manage-bookmarks-sider">
            <manageBookmarksSider />
        </div>
        <draggable class="manage-bookmarks-wrap" v-model="mainMarksTree">
                <div v-for="marks in mainMarksTree" class="bookmarks-item-wrapper" :key="marks.id">
                    <manageBookmarksItem :mark="marks" />
                </div>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import vueWaterfallEasy from "vue-waterfall-easy"
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../../utils/bookmarks.js'
import manageBookmarksItem from './ManageBookmarksItem.vue'
import manageBookmarksSider from './ManageBookmarksSider.vue'

export default {
    name: 'manageBookmarks',
    components: {
        draggable,
        manageBookmarksItem,
        manageBookmarksSider
    },
    data() {
        return {
            mainMarksTree: [],
            otherMarksTree: []
        }
    },
    computed: {
        
    },
    created: function() {
        getBookmarks(this.getMarksTreeCb)
        // this.settingName = localeText[this.location].settingName
    },
    methods: {
        getMarksTreeCb(title, tree, date) {
            console.log('manage', tree[0].children)
            this.mainMarksTree = tree[0].children
        }
    }
}
</script>
<style scoped>
    .manage-bookmarks-section {
        width: 100%;
        height: calc(88vh - 125px);
        overflow: auto;
        padding: auto;
        background: #fefefe;
    }
    .manage-bookmarks-sider {
        width: 20%;
        height: calc(88vh - 125px);
        float:left;
    }
    .manage-bookmarks-wrap {
        width: 79%;
        height: calc(88vh - 125px);
        float: right;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .bookmarks-item-wrapper {
        width: 20%;
        float: left;
        display: inline;
        padding: 10px;
    }
</style>