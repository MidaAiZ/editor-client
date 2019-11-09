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
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../../static/locale/index.js';
import { defaultSettings } from '../../utils/defaultOpt.js'
import './setting.css';

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
        ]),
    },
    methods: {
        handleReset() {
            this.RESET_ALL()
            this.uploadSettings(defaultSettings)
        },
        ...mapMutations('settings', [
            'RESET_ALL',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
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