<template>
    <div class="open-system-bar-btn">
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            点我打开
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
        right: 20px;
        top: 20px;
    }
</style>