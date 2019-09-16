import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui';
Vue.use(ElementUI);

new Vue({
    el: '#newtab',
    render: h => h(root)
})