<template>
    <el-dialog :visible="settingVis" title="设置" @close="closeSetting(false)">
       <h3>hello vueFCK !</h3>
    </el-dialog>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
    name: 'settingDialog',
    data() {
        return {

        }
    },
    computed: {
        ...mapState('settings', [
            'settingVis'
        ])
    },
    methods: {
        closeSetting(vis) {
            this.SET_SETTINGVIS(vis);
        },
        ...mapMutations('settings', [
            'SET_SETTINGVIS',
        ]),
    }
}
</script>
<style scoped>
</style>