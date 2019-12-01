<template>
    <div class="web-list-item">
            <div class="web-icon" :style="{backgroundImage: `url(${item.icon})`}">
                <!-- <img :src="item.icon"/> -->
            </div>
            <div class="web-content">
                <h3 style="height: 30px;line-height: 30px; color: #444;margin:0px;margin-top:10px">{{item.title}}</h3>
                <span class="web-desc" style="height: 30px;line-height: 30px;magin:0px;margin-bottom:10px;">{{item.desc ? item.desc : '网站无简介'}}</span>
            </div>
            <div class="web-action">
                <el-button 
                    @click="openNewSite" 
                    size="mini" 
                    type="primary" 
                    plain 
                    class="site-action-btn"
                >
                    {{ openSite }}
                </el-button>
                <el-button 
                    @click="addNewSite"
                    size="mini" 
                    type="primary" 
                    class="site-action-btn"
                >
                    {{ addSite }}
                </el-button>
            </div>
    </div>
</template>
<script>
import localeText from '../../../static/locale/index.js';
import {openSite} from '../services/openSite.js';
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
        ...mapState('settings', [
            'iconLayout'
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
    // watch: {
    //     cid: function(newId, oldId) {
    //         if(this.newId !== oldId) {
    //             console.log('createdCid', this.cid)
    //             this.getCategorySite(newId)
    //         }
    //     }
    // },
    created: function() {
        // this.menuListName = localeText[this.location].appTypeList
        // console.log('createdCid', this.cid)
    },
    methods: {
        ...mapActions('addWebList', [
            'getSitesInCategory'
        ]),
        ...mapActions('homeWebList', [
            'addOne'
        ]),
        ...mapMutations('homeWebList', [
            'ADD_ONE_SITE'
        ]),
        getCategorySite(id) {
            this.getSitesInCategory(id)
        },
        openNewSite() {
            let siteObj = {
                siteId: this.item.sid,
                siteUrl: this.item.url,
                siteTitle: this.item.title
            };
            openSite(siteObj, 'newtab')
        },
        addNewSite() {
            let payload = {
                item: this.item,
                size: this.iconLayout.row * this.iconLayout.col
            }
            this.addOne(payload)
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
    height: 100%;
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