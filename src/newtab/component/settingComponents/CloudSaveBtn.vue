<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ cloudSaveBtn }}
        </p>
        <div class="setting-open-item">
            <span class="setting-open-title">{{ cloudSaveTip }}</span>
            <el-switch
                @change="toggleCloudSave($event)"
                class="setting-switch"
                v-model="cloudSave"
            >
            </el-switch>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'

export default {
    name: 'cloudSave',
    data() {
        return {
            resetAll: ''
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ]),
        ...mapState('settings', [
            'cloudSave'
        ])
    },
    methods: {
        toggleCloudSave(value) {
            this.SET_CLOUDSAVE(value)
        },
        ...mapMutations('settings', [
            'SET_CLOUDSAVE',
        ]),
    },
    created: function() {
        this.cloudSaveBtn = localeText[this.location].cloudSaveBtn
        this.cloudSaveTip = localeText[this.location].cloudSaveTip
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