<template>
    <div>
        <el-button class="open-system-bar-btn" @click="drawer = true" icon="el-icon-menu" size="medium" circle>
        </el-button>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction"
            :show-close="false"
        >
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>

export default {
    name: 'systemBar',
     data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
}
</script>
<style scoped>
    .open-system-bar-btn {
        position: fixed;
        right: 25px;
        top: 25px;
        border: 0px;
        background-color: #555;
        opacity: 0.5;
        color: #fff;
        transition: all 0.3s;
    }
    .open-system-bar-btn:hover {
        transform: scale(1.1);
        background-color: #555;
        opacity: 0.5;
        color: #fff;
    }
</style>