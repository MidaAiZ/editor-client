<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ language }}
        </p>
        <div class="reset-btn-wrap">
            <el-button type="primary" class="reset-btn" @click="changeLanguage">{{ language }}</el-button>
        </div>
        <el-dialog
            :title="language"
            :visible.sync="dialogVisible"
            :modal="false"
            width="60%"
        >
            <div class="locales-wrap">
                <el-radio-group v-model="location">
                    <el-radio class="locale-item" v-for="item in locationList" :key="item.code" :label="item.code">{{item.name}}</el-radio>
                </el-radio-group>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../../static/locale/index.js';
import { defaultSettings } from '../../utils/defaultOpt.js'
import './setting.css';

export default {
    name: 'localeSetting',
    data() {
        return {
            dialogVisible: false
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
            'locationList',
        ]),
        language: function() {
            return localeText[this.location].language
        },
        location: {
            get () {
                return this.$store.state.locale.location
            },
            set (value) {
                this.$store.dispatch('locale/changeLocale', value)
            }
        }
    },
    methods: {
        changeLanguage() {
            // this.RESET_ALL()
            this.dialogVisible = true;
        },
        ...mapMutations('settings', [
            'RESET_ALL',
        ]),
        ...mapMutations('locale', [
            'CHANGE_LOCALE',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
        ...mapActions('locale', [
            'changeLocale',
        ]),
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
    .locales-wrap {
        min-height: 120px;
        padding: 20px;
    }
    .locale-item {
        margin: 10px;
    }
</style>