import Vue from 'vue'
import root from './root.vue'
import './theme.scss';
import Element from 'element-ui';
import Vuex from 'vuex';
import store from './store'

Vue.use(Vuex);
Vue.use(Element);

new Vue({
    el: '#newtab',
    store,
    render: h => h(root)
})