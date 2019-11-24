<template>
    <div class="bar-web-search-wrap">
        <input class="bar-web-search" @input="handleSearchSite($event.target.value)" :value="searchSiteIptValue" :placeholder="addAppPlaceholder" />
        <el-button @click="openCustomAdd" class="add-web-btn" icon="el-icon-plus" size="medium" circle></el-button>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import localeText from '../../../static/locale/index.js';
import debounce from '../utils/debounce.js';

export default {
    name: 'barSearch',
    data() {
        return {
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        ...mapState('addWebList', [
            'searchSiteIptValue',
        ]),
        addAppPlaceholder: function() {
            return localeText[this.location].addAppPlaceholder
        },
    },
    methods: {
        ...mapMutations('addWebList', [
            'SET_SEARCH_SITES_VALUE'
        ]),
        ...mapMutations('categories', [
            'ADD_SEARCH_CATE',
            'DELETE_SEARCH_CATE'
        ]),
        ...mapMutations('drawersVis', [
            'SET_CAVIS',
        ]),
        ...mapActions('addWebList', [
            'searchSite'
        ]),
        setValue(value) {
            this.SET_SEARCH_SITES_VALUE(value)
        },
        handleSearchSite(value) {
            if(value) {
                this.ADD_SEARCH_CATE()
                let debounceReq = debounce(this.searchSite, 200)
                // this.searchSite({keyword: value, pageNum: 1, pageSize: 100})
                debounceReq({keyword: value, pageNum: 1, pageSize: 100})
            } else {
                this.DELETE_SEARCH_CATE()
            }
        },
        openCustomAdd() {
            this.SET_CAVIS(true)
        }
    }
}
</script>
<style scoped>
    .bar-web-search-wrap {
        width: 100%;
        height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: -10px;
    }
    .bar-web-search {
        width: 380px;
        height: 40px;
        border-radius: 40px;
        border: 0;
        background-color: #efefef;
        padding-left: 20px;
        outline: 0;
        float: left;
    }
    .add-web-btn {
        float: right;
        width: 40px;
        height: 40px;
        margin-right: 3px;
        background-color: #efefef;
        color: #fff;
        transition: all 0.3s;
        font-weight: bolder;
        border: 0;
    }
    .add-web-btn:hover {
        transform: scale(1.1);
        background-color: #555;
        color: #fff;
    }
</style>