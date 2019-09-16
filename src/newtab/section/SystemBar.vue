<template>
    <div>
        <el-button class="open-system-bar-btn" @click="drawer = true" icon="el-icon-menu" size="medium" circle>
        </el-button>
        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            :show-close="false"
            size="40%"
        >
            <barTab slot="title"></barTab>
            <barSearch></barSearch>
        </el-drawer>
    </div>
</template>
<script>
import barTab from '../component/BarTab.vue'
import barSearch from '../component/BarSearch.vue'

export default {
    name: 'systemBar',
    components: {
        barTab,
        barSearch,
    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
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
    }
    .open-system-bar-btn:hover {
        transform: scale(1.1);
        background-color: #555;
        opacity: 0.5;
        color: #fff;
    }
</style>