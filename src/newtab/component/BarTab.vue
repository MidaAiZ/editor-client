<template>
    <div class="sys-bar-title">
        <div class="logo">
            <div v-if="hasLogin == false" @click.stop.prevent="setModalVis(true)">
                <i class="el-icon-user-solid"></i>
                {{logreg}}
            </div>
            <div v-else>
                {{userName}}
            </div>
        </div>
        <div class="logreg">
            <div @click.stop.prevent="toggleSettingDrawer(true)">
                <i class="el-icon-s-tools"></i>
            </div>
        </div>
        <el-dialog :visible.sync="logregModalVis" @close="setModalVis(false)" append-to-body width="400px">
            <logregModal></logregModal>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import localeText from '../../../static/locale/index.js'
import logregModal from './Logreg.vue'

export default {
    name: 'barTab',
    props: ['nameId'],
    components: {
        logregModal,
    },
    data() {
        return {
            logreg: '',
        }
    },
    computed: {
        ...mapState('user', ['logregModalVis', 'hasLogin', 'userName']),
        ...mapState('drawersVis', ['settingVis']),
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        this.logreg = localeText[this.location].logreg
    },
  methods: {
      setModalVis(vis) {
          this.setLogRegModalVis(vis)
      },
      toggleSettingDrawer(vis) {
          this.SET_SYSBARVIS(false)
          this.SET_SETTINGVIS(vis)
      },
      ...mapMutations('user', [
      'setLogRegModalVis',
    ]),
    ...mapMutations('drawersVis', [
      'SET_SETTINGVIS',
      'SET_SYSBARVIS',
    ]),
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
    .setting-title {
        font-size: 20px;
    }
</style>