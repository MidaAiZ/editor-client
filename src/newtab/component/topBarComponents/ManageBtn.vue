<template>
    <div class="manage-btn">
        <i class="el-icon-files"></i>
        {{ manageBtn }}
    </div>
</template>
<script>
import { mapState } from 'vuex'
import localeText from '../../../../static/locale/index.js'

export default {
    name: 'manageBtn',
    components: {
        // newBgBrush,
    },
    data(){
        return{
            manageBtn: ''
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ])
    },
    created: function () {
        this.manageBtn = localeText[this.location].manageBtn
    },
    methods: {
        
    }
}
</script>
<style scoped>
    .manage-btn {
        cursor: pointer;
        font-size: 13px;
        color: #898989;
    }
    .manage-btn:hover {
        cursor: pointer;
        background: #efefef;
        transition: all .3s;
    }
</style>