import Vue from 'vue'
import root from './root.vue'
import './theme.scss';
import Element from 'element-ui';
import Vuex from 'vuex';
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Draggable from 'vuedraggable'
import VueCropper from 'vue-cropper'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(Element);
Vue.use(VueAwesomeSwiper);
Vue.use(Draggable);
Vue.use(VueCropper);
Vue.use(VueResource);

new Vue({
    el: '#newtab',
    store,
    render: h => h(root)
})