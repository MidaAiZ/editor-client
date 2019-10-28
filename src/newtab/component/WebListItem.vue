<template>
    <div class="web-list-item">
            <div class="web-icon" :style="{backgroundImage: `url(${item.icon})`}">
                <!-- <img :src="item.icon"/> -->
            </div>
            <div class="web-content">
                <h3>{{item.title}}</h3>
                <p class="web-desc">{{item.desc ? item.desc : '网站无简介'}}</p>
            </div>
            <div class="web-action">
                <el-button size="mini" type="primary" plain class="site-action-btn">{{ openSite }}</el-button>
                <el-button size="mini" type="primary" class="site-action-btn">{{ addSite }}</el-button>
            </div>
    </div>
</template>
<script>
import localeText from '../../../static/locale/index.js'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'webListItem',
    props: ['item'],
    data() {
        return {
        }
    },
    computed: {
        ...mapState('addWebList', [
            'currentSiteList'
        ]),
        ...mapState('locale', [
            'location',
        ]),
        openSite: function() {
            return localeText[this.location].openSite
        },
        addSite: function() {
            return localeText[this.location].addSite
        },
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
.web-list-item {
    width: calc(100% - 40px);
    padding: 10px;
    margin: 10px;
    background: #fafafa;
    height: 80px;
}
.web-icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-top: 15px;
    background: #fff;
    float: left;
    background-size:50px 50px;
}
.web-content {
    width: calc(100% - 160px);
    float: left;
    margin-left: 15px;
}
.web-desc {
    color: #999;
}
.web-action {
    float: right;
    width: 60px;
    height: 66px;
    margin-top: 4px;
    /* display: flex;
    align-item: center;
    justify-content: center; */
}
.site-action-btn {
    /* display: block; */
    float: left;
    margin-top: 5px;
    margin-left: 0px !important;
}
</style>