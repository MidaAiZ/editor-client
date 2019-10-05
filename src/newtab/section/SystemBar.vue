<template>
    <div>
        <el-button class="open-system-bar-btn" @click="drawer = true" icon="el-icon-menu" size="medium" circle>
        </el-button>
        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            :show-close="false"
            size="500px"
            :modal="false"
        >
            <barTab slot="title"></barTab>
            <barSearch></barSearch>
            <div v-if="hasLogin === false" style="margin-top: 10px;">
                <el-alert
                    :title="loginSuggest"
                    type="warning">
                </el-alert>
            </div>
            <webList class="web-list"></webList>
        </el-drawer>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import localeText from '../../../static/locale/index.js'
import barTab from '../component/BarTab.vue'
import barSearch from '../component/BarSearch.vue'
import webList from '../component/WebList.vue'

export default {
    name: 'systemBar',
    components: {
        barTab,
        barSearch,
        webList,
    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        loginSuggest: '',
      };
    },
    computed: {
        ...mapState('user', ['hasLogin']),
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        this.loginSuggest = localeText[this.location].loginSuggest
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
}
</script>
<style scoped>
    .open-system-bar-btn {
        position: fixed;
        right: 25px;
        top: 25px;
        border: 0px;
        background-color: #555;
        opacity: 0.5;
        color: #fff;
        transition: all 0.3s;
        z-index: 11;
    }
    .open-system-bar-btn:hover {
        transform: scale(1.1);
        background-color: #555;
        opacity: 0.5;
        color: #fff;
    }
    .web-list {
        height: auto;
        overflow: auto;
    }
</style>