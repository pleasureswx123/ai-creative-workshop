<script>
	import jssdk from "weixin-js-sdk";
	import util from "./utils/util.js"
	import siteinfo from "./siteinfo.js"
	export default {
		data() {
			return {};
		},
		onLaunch: function() {
			this.globalData.siteroot = siteinfo.host + '/web.php';
			const system = uni.getSystemInfoSync().system.toLowerCase();
			if (system.indexOf('android') > -1) {
				this.globalData.system = 'android';
			} else if (system.indexOf('ios') > -1) {
				this.globalData.system = 'ios';
			} else if (system.indexOf('macos') > -1) {
				this.globalData.system = 'macos';
			} else if (system.indexOf('windows') > -1) {
				this.globalData.system = 'windows';
			} else {
				this.globalData.system = 'other';
			}
			// uni.hideTabBar()
			
			// 站点sitecode
			var search = window.location.search
			if(search && search.indexOf('?') != -1) {
				var sitecode = '';
				if(search.length == 5) {
					sitecode = search.substr(1, 4)
				} else if (search.length > 5) {
					var char = search.charAt(5)
					if(char == '&' || char == '#' || char == '=' || char == '/') {
						sitecode = search.substr(1, 4)
					}
				}
				if (sitecode) {
					uni.setStorageSync('sitecode', sitecode)
				}
			}
			
			
			if (window.lang !== 'zh-cn') {
				uni.setTabBarItem({ index: 0, text: this.$lang('对话') })
				uni.setTabBarItem({ index: 1, text: this.$lang('创作') })
				uni.setTabBarItem({ index: 2, text: this.$lang('模拟') })
				uni.setTabBarItem({ index: 3, text: this.$lang('绘画') })
				uni.setTabBarItem({ index: 4, text: this.$lang('我的') })
			}
			

			// 初始化微信jssdk
			util.request({
					url: '/h5/getShareInfo',
					data: {
						url: window.location.href
					}
				})
				.then((res) => {
					const jssdkConfig = res.data.jssdk_config;
					const page_title = res.data.page_title;
					const login_phone = res.data.login_phone;
					const login_wechat = res.data.login_wechat;
					const share_title = res.data.share_title;
					const share_link = res.data.share_link;
					const share_desc = res.data.share_desc;
					const share_image = res.data.share_image;
					const tabbar = res.data.tabbar;
					
					this.globalData.page_title = page_title;
					this.globalData.login_phone = login_phone;
					this.globalData.login_wechat = login_wechat;
					this.globalData.tabbar = res.data.tabbar;
					if (!util.isWechat() && util.isMobile()) {
						this.globalData.login_wechat = 0;
					}
					if (jssdkConfig) {
						jssdk.config(jssdkConfig);
						jssdk.ready(function() {
							jssdk.updateAppMessageShareData({
								title: share_title,
								desc: share_desc,
								link: share_link,
								imgUrl: share_image,
								success: function() {
									// 设置成功
								}
							})
							jssdk.updateTimelineShareData({
								title: share_title,
								link: share_link,
								imgUrl: share_image,
								success: function() {
									// 设置成功
								}
							})
						});
					}
					
					this.globalData.jssdk = jssdk
					
					if (tabbar) {
						const tabItems = document.getElementsByClassName('uni-tabbar__item');
						for(let i=0; i < tabItems.length; i++) {
							tabItems[i].style.display = tabbar[i] ? 'block' : 'none'
						}
					}
				});
		},
		globalData: {
			siteroot: '',
			system: '',
			page_title: '',
			util: util,
			jssdk: null,
			login_phone: 1,
			login_wechat: 0
		}
	};
</script>
<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/static/iconfont/iconfont.css";
image {
  vertical-align: middle;
}
.ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flex1 {
  flex: 1;
  min-width: 0;
}
.uni-system-preview-image {
  z-index: 20500;
}
page {
  min-height: calc(100vh - var(--window-bottom) - var(--window-top));
  background: #f7f7f8;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}
	button::after {
		display: none;
	}
	
	.uni-tabbar .uni-tabbar__item {
		display: none;
	}
</style>