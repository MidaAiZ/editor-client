<template>
    <div class="web-list-wrap">
        <el-menu
            :default-active="defaultActive"
            class="web-list-menu">
            <el-menu-item v-for="item in categories" v-bind:key="item.cid" :index="item.index.toString()" @click="changeCategory(item.cid)" >
                <span class="menu-title" slot="title">{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
        <div class="web-list-cnt">
            <web-list-cnt ref="addContent" :cid="cid"/>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import localeText from '../../../static/locale/index.js'
import webListCnt from './WebListCnt.vue'

export default {
    name: 'webList',
    components: {
        webListCnt,
    },
    data() {
        return {
            menuListName: {},
            cid: '0',
            defaultActive: '0',
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        ...mapState('categories', [
            'categories'
        ]),
    },
    watch: {
        categories: function() {
            if(this.categories[0].cid === 'search') {
                this.defaultActive = 'search'
            } else {
                this.changeCategory(this.categories[0].cid)
                this.$refs.addContent.getCategorySite(this.categories[0].cid)
                this.defaultActive = '0'
            }
        }
    },
    mounted: function(){
        this.cid = this.categories[0].cid;
    },
    created: function() {
        // this.menuListName = localeText[this.location].appTypeList
    },
    methods: {
        changeCategory(cid) {
            // console.log('cid', cid)
            this.cid = cid

        }
    }
}
</script>
<style scoped>
    .web-list-wrap {
        width: 100%;
        margin-top: 25px;
        overflow: auto;
    }
    .web-list-menu {
        width: 140px;
        height: calc(100vh - 150px);
        overflow: auto;
        float: left;
    }
    .menu-title {
        padding-left: 15px;
    }
    .web-list-cnt {
        width: 358px;
        height: calc(100vh - 150px);
        background: #fff;
        overflow: auto;
        float: right;
    }
</style>