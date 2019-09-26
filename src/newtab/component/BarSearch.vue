<template>
    <div class="bar-web-search-wrap">
        <input class="bar-web-search" :placeholder="placeholder" />
        <el-button class="add-web-btn" icon="el-icon-plus" size="medium" circle></el-button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import localeText from '../../../static/locale/index.js'

export default {
    name: 'barSearch',
    data() {
        return {
            placeholder: ''
        }
    },
    computed: {
        ...mapState('locale', [
            'location',
        ])
    },
    created: function() {
        this.placeholder = localeText[this.location].addAppPlaceholder
    },
}
</script>
<style scoped>
    .bar-web-search-wrap {
        width: 100%;
        height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: -10px;
    }
    .bar-web-search {
        width: 380px;
        height: 40px;
        border-radius: 40px;
        border: 0;
        background-color: #efefef;
        padding-left: 20px;
        outline: 0;
        float: left;
    }
    .add-web-btn {
        float: right;
        width: 40px;
        height: 40px;
        margin-right: 3px;
        background-color: #efefef;
        color: #fff;
        transition: all 0.3s;
        font-weight: bolder;
        border: 0;
    }
    .add-web-btn:hover {
        transform: scale(1.1);
        background-color: #555;
        color: #fff;
    }
</style>