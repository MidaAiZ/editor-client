<template>
    <div style="margin: 0; padding: 0">
        <ul style="margin: 0; padding: 0" v-if="hasContent === true" infinite-scroll-disabled="disableLoad" v-infinite-scroll="handleLoadMore">
            <li style="overflow:auto" v-for="item in currentSiteList" :key="item.sid">
                <web-list-item :item="item"></web-list-item>
            </li>
        </ul>
        <div class="null-content" v-if="hasContent === false && loading === false">
            {{ nullContent }}
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import localeText from '../../../static/locale/index.js'
import webListItem from './webListItem.vue';

export default {
    name: 'webListCnt',
    props: ['cid'],
    components: {
        webListItem,
    },
    data() {
        return {
            hasContent: true,
        }
    },
    computed: {
        ...mapState('addWebList', [
            'currentSiteList',
            'pageNum',
            'pageSize',
            'disableLoad',
            'loading'
        ]),
        ...mapState('locale', [
            'location',
        ]),
        nullContent: function() {
            return localeText[this.location].nullContent
        }
    },
    watch: {
        cid: function(newId, oldId) {
            if(this.newId !== oldId) {
                this.SET_SITES_PAGE(1)
                this.getCategorySite(newId);
            }
        },
        currentSiteList: function() {
            if(this.currentSiteList.length === 0 || !this.currentSiteList) {
                this.hasContent = false
            } else {
                this.hasContent = true
            }
        }
    },
    created: function() {
        // this.menuListName = localeText[this.location].appTypeList
        // console.log('createdCid', this.cid)
    },
    mounted: function() {
        
    },
    methods: {
        ...mapActions('addWebList', [
            'getSitesInCategory',
            'loadMore',
        ]),
        ...mapMutations('addWebList', [
            'SET_SITES_PAGE',
            'DIS_AUTO_LOAD',
            'SET_LOADING'
        ]),
        getCategorySite(id) {
            this.SET_LOADING(true)
            this.SET_SITES_PAGE(1)
            let payload = {
                categoryIds: id,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            this.getSitesInCategory(payload)
        },
        handleLoadMore() {
            this.SET_LOADING(true)
            let id = this.cid;
            let payload = {
                categoryIds: id,
                pageNum: this.pageNum + 1,
                pageSize: this.pageSize,
            }
            this.loadMore(payload)
            // this.getCategorySite(this.cid)
        }
    }
}
</script>
<style scoped>
.null-content {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    color: #aaa;

}
</style>