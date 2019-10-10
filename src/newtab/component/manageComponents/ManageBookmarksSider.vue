<template>
        <el-button class="new-folder-btn" type="primary" plain>{{ newFolder }}</el-button>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getBookmarks, getBookmarksSub } from '../../utils/bookmarks.js'
import localeText from '../../../../static/locale/index.js'

export default {
    name: 'manageBookmarksSider',
    components: {
    },
    data() {
        return {
            // mainMarksTree: [],
            // otherMarksTree: []
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        newFolder: function() {
            return localeText[this.location].newFolder
        }
    },
    created: function() {
        // this.settingName = localeText[this.location].settingName
       
    },
    methods: {
    }
}
</script>
<style scoped>

    .new-folder-btn {
        width: 70%;
        height: 40px;
        margin-left: 10%;
        margin-top: 10px;
    }
</style>