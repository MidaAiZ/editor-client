<template>
    <div class="manage-bookmarks-section">
        <div class="manage-bookmarks-sider">
            <!-- <el-tree
                :data="marksTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="true"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.title }}</span>
                    <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => append(data)">
                        Append
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)">
                        Delete
                    </el-button>
                    </span>
                </span>
                </el-tree> -->
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../../utils/bookmarks.js'

export default {
    name: 'manageBookmarks',
    components: {
    },
    data() {
        return {
            marksTree: []
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
            this.marksTree = tree
        }
    }
}
</script>
<style scoped>
    .manage-bookmarks-section {
        width: 100%;
        height: calc(88vh - 125px);
        overflow: auto
    }
    .manage-bookmarks-sider {
        width: 20%;
        float: left;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>