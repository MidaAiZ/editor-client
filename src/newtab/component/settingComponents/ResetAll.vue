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
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'resetAll',
    data() {
        return {
            resetAll: ''
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ])
    },
    methods: {
        handleReset() {
            this.RESET_ALL()
        },
        ...mapMutations('settings', [
            'RESET_ALL',
        ]),
    },
    created: function() {
        this.resetAll = localeText[this.location].resetAll
    },
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