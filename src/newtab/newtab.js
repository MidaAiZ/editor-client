import Vue from 'vue'
import root from './root.vue'
import './theme.scss';
import Element from 'element-ui';
Vue.use(Element);

new Vue({
    el: '#newtab',
    render: h => h(root)
})