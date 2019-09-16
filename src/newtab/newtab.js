import Vue from 'vue'
import root from './root.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

new Vue({
    el: '#newtab',
    render: h => h(root)
})