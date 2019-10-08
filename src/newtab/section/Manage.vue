<template>
    <el-dialog
        :visible="bookmarksAndHistory"
        custom-class="manage-dialog"
        @close="closeBmHis(false)"
        width="90%"
        top="6vh"
        :title="manageTitle"
    >
        <div class="manage-content">
            <el-tabs type="border-card" v-model="activeManage" @tab-click="changeManage">
                <el-tab-pane :label="bookmarksName" name="bookmarks">
                    <div class="manage-item">
                        <manageBookmarks />
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="historyName" name="history" class="manage-item">
                    <div class="manage-item">
                    历史
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import localeText from '../../../static/locale/index.js'
import './Manage.css'
import manageBookmarks from '../component/manageComponents/ManageBookmarks.vue'

export default {
    name: 'Manage',
    components: {
        manageBookmarks,
    },
    data() {
        return {
            activeManage: "bookmarks"
        }
    },
    computed: {
        manageTitle: function() {
            return localeText[this.location].manageTitle
        },
        bookmarksName: function() {
            return localeText[this.location].bookmarksName
        },
        historyName: function() {
            return localeText[this.location].historyName
        },
        ...mapState('drawersVis', [
            'bookmarksAndHistory',
        ]),
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        // this.settingName = localeText[this.location].settingName
    },
    methods: {
        closeBmHis(vis) {
            this.SET_BMHIS(vis)
        },
        changeManage(key) {
            console.log(key)
        },
        ...mapMutations('drawersVis', [
            'SET_BMHIS',
        ]),
    }
}
</script>
<style scoped>
    .manage-content {
        width:100%;
        height: 100%;
        overflow: scroll;
    }
    .manage-item {
        height: calc(88vh - 125px);
    }
</style>