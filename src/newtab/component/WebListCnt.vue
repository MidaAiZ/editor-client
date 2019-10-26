<template>
    <div class="web-list-cnt">
        <web-list-item v-for="item in currentSiteList" :item="item">{{item}}</web-list-item>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import localeText from '../../../static/locale/index.js'
import webListItem from './webListItem.vue'

export default {
    name: 'webListCnt',
    props: ['cid'],
    components: {
        webListItem,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('addWebList', [
            'currentSiteList'
        ])
    },
    watch: {
        cid: function(newId, oldId) {
            if(this.newId !== oldId) {
                console.log('createdCid', this.cid)
                this.getCategorySite(newId)
            }
        }
    },
    created: function() {
        // this.menuListName = localeText[this.location].appTypeList
        // console.log('createdCid', this.cid)
    },
    methods: {
        ...mapActions('addWebList', [
            'getSitesInCategory'
        ]),
        getCategorySite(id) {
            this.getSitesInCategory(id)
        }
    }
}
</script>
<style scoped>
</style>