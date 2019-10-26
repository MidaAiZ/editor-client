<template>
    <div class="web-list-item">
            <div class="web-icon">
                <img :src="item.icon"/>
            </div>
            <div class="web-content">
                <h3>{{item.title}}</h3>
                <p class="web-desc">{{item.desc ? item.desc : '网站无简介'}}</p>
                <div class="web-action">
                    
                </div>
            </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import localeText from '../../../static/locale/index.js'

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
.web-list-item {
    width: calc(100% - 40px);
    padding: 10px;
    margin: 10px;
    background: #f1f1f1;
    min-height: 80px;
}
.web-icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-top: 10px;
    background: #fff;
    float: left;
}
.web-content {
    width: calc(100% - 65px);
    margin-left: 65px;
}
.web-desc {
    color: #999;
}
</style>