<template>
    <div>
        <div
            class="open-system-bar-btn"
            @click="SET_SYSBARVIS(true)"
            :style="{top: (showBookMarkBar ? '55px' : '25px')}">
            <i class="el-icon-menu"></i>
        </div>
        <el-drawer
            :visible.sync="systemBarVis"
            :direction="direction"
            :show-close="false"
            @close="SET_SYSBARVIS(false)"
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
import { mapState, mapMutations } from 'vuex'
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
        direction: 'rtl',
        loginSuggest: '',
      };
    },
    computed: {
        ...mapState('user', ['hasLogin']),
        ...mapState('locale', [
            'location',
        ]),
        ...mapState('drawersVis', ['systemBarVis']),
        ...mapState('settings', [
            'showBookMarkBar'
        ])
    },
    created: function() {
        this.loginSuggest = localeText[this.location].loginSuggest
    },
    methods: {
      handleClose(done) {
        done();
      },
      ...mapMutations('drawersVis', [
            'SET_SYSBARVIS',
        ]),
    }
}
</script>
<style scoped>
    .open-system-bar-btn {
        position: fixed;
        right: 25px;
        border: 0px;
        opacity: 0.9;
        color: #fff;
        transition: all 0.3s;
        font-size: 18px;
        z-index: 11;
        cursor: pointer;
    }
    .open-system-bar-btn:hover {
        transform: scale(1.1);
        opacity: 0.5;
        color: #fff;
    }
    .web-list {
        height: auto;
        overflow: auto;
    }
</style>