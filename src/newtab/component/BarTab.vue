<template>
    <div class="sys-bar-title">
        <div class="logo">
            <div v-if="hasLogin == false" @click.stop.prevent="setModalVis(true)">
                <i class="el-icon-user-solid"></i>
                {{logreg}}
            </div>
            <div @mouseover.stop.prevent="toggleLogoutVis(true)" @mouseleave="toggleLogoutVis(false)" v-else>
                {{userNameValue}}
                <span class="logout-btn" v-if="logoutVis" @click.stop.prevent="handleLogout">
                    {{logout}}
                </span>
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
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../static/locale/index.js';
import logregModal from './Logreg.vue';

export default {
    name: 'barTab',
    props: ['nameId'],
    components: {
        logregModal,
    },
    data() {
        return {
            logoutVis: false
        }
    },
    computed: {
        ...mapState('user', ['logregModalVis', 'hasLogin', 'userNameValue']),
        ...mapState('drawersVis', ['settingVis']),
        ...mapState('locale', [
            'location',
        ]),
        logout: function() {
            return localeText[this.location].logout
        },
        logreg: function() {
            return localeText[this.location].logreg
        }
    },
  methods: {
      setModalVis(vis) {
          this.setLogRegModalVis(vis)
      },
      toggleSettingDrawer(vis) {
          this.SET_SYSBARVIS(false)
          this.SET_SETTINGVIS(vis)
      },
      toggleLogoutVis(vis) {
          this.logoutVis  = vis
      },
      handleLogout() {
          this.logoutFunc()
      },
    ...mapMutations('user', [
      'setLogRegModalVis',
    ]),
    ...mapActions('user', [
        'logoutFunc'
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
        min-width: 150px;
        text-align: left;
        font-size: 20px;
        line-height: 40px;
        float: left;
        cursor: pointer;
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
    .logout-btn {
        font-size: 13px;
        line-height: 35px;
        margin-left: 10px;
        color: #ffc81f;
    }
</style>