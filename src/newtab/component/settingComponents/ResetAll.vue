<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ resetAll }}
        </p>
        <div class="reset-btn-wrap">
            <el-button type="primary" class="reset-btn" @click="handleReset">{{ resetAll }}</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'resetAll',
    data() {
        return {
            resetAll: zh_CN.resetAll
        }
    },
    methods: {
        handleReset() {
            this.RESET_ALL()
        },
        ...mapMutations('settings', [
            'RESET_ALL',
        ]),
    }
}
</script>
<style scoped>
    .reset-btn-wrap {
        width: 100%;
        height: 40px;
    }
    .reset-btn {
        float: right
    }
</style>