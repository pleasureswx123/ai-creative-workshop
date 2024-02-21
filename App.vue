<script>
	import jssdk from "weixin-js-sdk";
	import util from "./utils/util.js"
	import siteinfo from "./siteinfo.js"
	export default {
		data() {
			return {};
		},
    onShow() {
      let isDarkMode = true;
      const root = document.documentElement;
      const bgColor1 = isDarkMode ? '--bg-color1-dark' : '--bg-color1-light';
      const bgColor2 = isDarkMode ? '--bg-color2-dark' : '--bg-color2-light';
      const bgColor3 = isDarkMode ? '--bg-color3-dark' : '--bg-color3-light';
      const txtColor1 = isDarkMode ? '--txt-color1-dark' : '--txt-color1-light';
      const txtColor2 = isDarkMode ? '--txt-color2-dark' : '--txt-color2-light';
      const txtColor3 = isDarkMode ? '--txt-color3-dark' : '--txt-color3-light';
      const txtColor4 = isDarkMode ? '--txt-color4-dark' : '--txt-color4-light';
      const txtColor5 = isDarkMode ? '--txt-color5-dark' : '--txt-color5-light';
      const txtColor6 = isDarkMode ? '--txt-color6-dark' : '--txt-color6-light';
      const txtColor7 = isDarkMode ? '--txt-color7-dark' : '--txt-color7-light';
      root.style.setProperty('--bg-color1', `var(${bgColor1})`);
      root.style.setProperty('--bg-color2', `var(${bgColor2})`);
      root.style.setProperty('--bg-color3', `var(${bgColor3})`);
      root.style.setProperty('--txt-color1', `var(${txtColor1})`);
      root.style.setProperty('--txt-color2', `var(${txtColor2})`);
      root.style.setProperty('--txt-color3', `var(${txtColor3})`);
      root.style.setProperty('--txt-color4', `var(${txtColor4})`);
      root.style.setProperty('--txt-color5', `var(${txtColor5})`);
      root.style.setProperty('--txt-color6', `var(${txtColor6})`);
      root.style.setProperty('--txt-color7', `var(${txtColor7})`);
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
@import "@/static/icon/iconfont.css";
image {
  vertical-align: middle;
}
.pointer {
  cursor: pointer;
}
.pd-tb-20 {
  padding: 0 40rpx;
}
.ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.flex1 {
  flex: 1;
  min-width: 0;
}
.uni-system-preview-image {
  z-index: 20500;
}
.uni-textarea-textarea,
.uni-textarea-placeholder {
  font-size: 13px!important;
}
page {
  min-height: calc(100vh - var(--window-bottom) - var(--window-top));
  background: var(--bg-color1)!important;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}
	button::after {
		display: none;
	}
	
	.uni-tabbar .uni-tabbar__item {
		display: none;
	}
	uni-modal {
	  z-index: 999999 !important;
	}
	uni-modal {
	  z-index: 999999 !important;
	}


@media screen and (min-width: 960px) {
  page {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>