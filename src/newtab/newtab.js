import Vue from 'vue'
import root from './root.vue'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
Vue.use(Element);

new Vue({
    el: '#newtab',
    render: h => h(root)
})