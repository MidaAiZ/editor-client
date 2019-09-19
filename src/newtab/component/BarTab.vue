<template>
    <div class="sys-bar-title">
        <div class="logo">
            LOGO&NAME
        </div>
        <div class="logreg">
            <div v-if="hasLogin == false" @click="logregModalVisible = true">
                <i class="el-icon-user-solid"></i>
                {{logreg}}
            </div>
            <div v-else>
                {{userName}}
                <i class="el-icon-s-tools"></i>
            </div>
        </div>
        <el-dialog :visible.sync="logregModalVisible" :modal="false" width="400px">
            <logregModal></logregModal>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import zh_CN from '../../../static/locale/zh_CN.js'
import logregModal from './Logreg.vue'

export default {
    name: 'barTab',
    props: ['nameId'],
    components: {
        logregModal,
    },
    data() {
        return {
            logreg: zh_CN.logreg,
            logregModalVisible: false,
        }
    },
    computed: {
    ...mapState('user', ['hasLogin', 'userName']),
  },
}
</script>
<style scoped>
    .sys-bar-title {
        width: 100%;
        height: 40px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .logo {
        width: 150px;
        text-align: left;
        font-size: 20px;
        font-weight: 400;
        line-height: 40px;
        float: left;
    }
    .logreg {
        width: 200px;
        text-align: right;
        font-size: 20px;
        line-height: 40px;
        float: right;
        cursor: pointer;
    }
</style>