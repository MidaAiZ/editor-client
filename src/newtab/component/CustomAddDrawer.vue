<template>
    <div>
        <el-drawer
            :visible.sync="customAddVis"
            @close="SET_CAVIS(false)"
            :show-close="false"
            size="500px"
            :destroy-on-close='true'
            @open="setNew"
        >
            <div slot="title" class="edit-drawer-top">
                <span class="edit-drawer-title">{{customAdd}}</span>
                <span class="edit-drawer-close" @click="SET_CAVIS(false)">
                    <i class="el-icon-close"></i>
                </span>
            </div>
           <edit-drawer></edit-drawer>
        </el-drawer>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import localeText from '../../../static/locale/index.js';
import EditDrawer from './EditDrawer.vue';

export default {
    name: 'customAddDrawer',
    components: {
        EditDrawer,
    },
    data() {
      return {
        
      };
    },
    computed: {
        ...mapState('drawersVis', ['customAddVis']),
        ...mapState('locale', ['location']),
        customAdd: function () {
            return localeText[this.location].customAdd
        },
    },
    mounted: function() {
        
    },
    methods: {
        ...mapMutations('drawersVis', ['SET_CAVIS']),
        ...mapMutations('homeWebList',['CHANGE_CURRENT_ITEM']),
        setNew() {
            let newItem = {
            iconSrc: "",
            isFolder: false,
            title: "",
            url: ""
            }
            let payload = {
                isNew: true,
                itemInfo: newItem,
                pageIndex: null,
                itemIndex: null
            }
            // this.$emit("current",this.itemInfo);
            this.CHANGE_CURRENT_ITEM(payload);
        }
    }
}
</script>
<style scoped>
    .edit-drawer-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .edit-drawer-title {
        font-size: 20px;
        font-weight: bold;
    }

    .edit-drawer-close {
        font-size: 20px;
        cursor: pointer;
    }
</style>