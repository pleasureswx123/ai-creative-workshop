import Vue from 'vue';
import '@/utils/utility.js'
import App from './App';
import store from './store'
import uView from '@/uni_modules/uview-ui'
import '@/static/styles/index.css'

// import videojs from "video.js"
// import 'video.js/dist/video-js.min.css'
// Vue.prototype.$vJs = videojs;

// 全局mixins，用于实现setData等功能，请勿删除！';
import zpMixins from '@/uni_modules/zp-mixins/index.js';

import './lang.js';

Vue.prototype.$store = store;

import VueQr from 'vue-qr';
Vue.component('VueQr', VueQr);
Vue.use(uView)

uni.$u.setConfig({
	config: {
		unit: "rpx",
	}
});

Vue.use(zpMixins);

Vue.config.productionTip = false;
App.mpType = 'app';

import mixin from './common/mixin'
Vue.mixin(mixin)

import aigcui, { requestUtil } from '@aigcui/entry'

Vue.use(aigcui);

const app = new Vue({
	store,
	...App
});

requestUtil(app)

app.$mount();

