import Vue from 'vue';
import App from './App';
import store from './store'
import uView from '@/uni_modules/uview-ui'
	
// 全局mixins，用于实现setData等功能，请勿删除！';
import zpMixins from '@/uni_modules/zp-mixins/index.js';

import './lang.js';

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from './polyfill/polyfill';

Polyfill.init();

Vue.prototype.$store = store;

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

const app = new Vue({
	store,
	...App
});

require('./utils/httpRequest.js')(app)

app.$mount();

