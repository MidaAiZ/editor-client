<template>
    <div v-if="getting" class="loading-tip">
        {{loadCloud}}
    </div>
</template>
<script>
// import './newBGbrush.scss'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import localeText from '../../../static/locale/index.js';

export default {
    name: 'cloudTips',
    components: {
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState('homeWebList', ['getting']),
        ...mapState('locale', ['location']),
        loadCloud: function() {
            return localeText[this.location].loadCloud
        }
    },
    methods: {
       
    }
}
</script>
<style scoped>
    .loading-tip {
        font-size: 15px;
        color: #efefef;
        opacity: 0.8;
    }
</style>