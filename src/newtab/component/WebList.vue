<template>
    <div class="web-list-wrap">
        <el-menu
            :default-active="defaultActive"
            class="web-list-menu">
            <el-menu-item style="height: auto; line-height: 20px" v-for="item in categories" v-bind:key="item.cid" :index="item.index.toString()" @click="changeCategory(item.cid)" >
                <div class="menu-title" slot="title">{{ item.title }}</div>
            </el-menu-item>
        </el-menu>
        <div class="web-list-cnt">
            <web-list-cnt ref="addContent" :cid="cid"/>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations, mapActions } from 'vuex'
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
        this.getCategories()
        // this.menuListName = localeText[this.location].appTypeList
    },
    methods: {
        ...mapActions('categories', ['getCategories']),
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
        padding-top: 15px;
        padding-left: 13px;
        padding-bottom: 15px;
        height: auto;
        width: 100%;
        line-height: 20px;
        text-align: left;
        white-space: normal;
    }
    .web-list-cnt {
        width: 358px;
        height: calc(100vh - 200px);
        background: #fff;
        overflow: auto;
        float: right;
    }
</style>