<template>
	<view>
    <NavBar :value.sync="navShow"></NavBar>
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup
          :show="navShow" mode="right"
          @close="navShow = false" closeIconPos="top-right">
				<view class="user" @click="handleJump('2')">
					<view class="userAvater">
						<image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
					</view>
					<view class="Infor">
						<view class="userName">{{userInfoState.nickname || '未设置昵称' }}</view>
						<view class="userId">MID:{{userInfoState.user_id}}</view>
					</view>
				</view>
				<view class="integral">
					<view class="inteNum">积分<text>{{userInfoState.balance}}</text></view>
					<view class="inteBtn" @click="blChange">兑换</view>
				</view>
				<view class="headList">
          <template v-for="item in menuList">
            <view v-if="item.type === 'line'" :key="item.id" class="navSelmg"></view>
            <view v-else class="item" :key="item.id" @tap="handleJump(item.id)">
              <u-icon :name="item.iconName" size="22" color="#f5f5f5"></u-icon>{{item.name}}
            </view>
          </template>
				</view>
			</u-popup>
		</view>
		<!-- 兑换积分弹窗 -->
		<view class="inpopup">
			<u-popup
          :show="integralShow" mode="center"
          @close="integralShow = false" closeIconPos="top-right">
				<text class="title">兑换积分</text>
				<text class="text">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</text>
				<u--input placeholder="输入或粘贴兑换码" border="surround" v-model="value" placeholderStyle="fontSize:14px"></u--input>
				<view class="operateBtn">
					<view class="btn cancel" @click="integralShow = false">取消</view>
					<view class="btn sure" @click="exchange">确认兑换</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import NavBar from './NavBar.vue';

const app = getApp()
export default {
  components: {NavBar},
  data() {
    return {
      navShow: false,
      integralShow: false,
      value: '',
      menuList: [
        {id: 1, iconName: 'home', name: '首页' },
        {id: 2, iconName: 'account', name: '个人中心' },
        {id: 3, iconName: 'grid', name: '我的创作' },
        {type: 'line', id: 'line1' },
        {id: 4, iconName: 'chat', name: '智能对话' },
        {id: 5, iconName: 'camera', name: '生成图片' },
        {id: 6, iconName: 'photo', name: '图片处理' },
        {id: 7, iconName: 'mic', name: '智能配音' },
        {id: 8, iconName: 'play-right', name: '生成视频' },
        {type: 'line', id: 'line2' },
        {id: 9, iconName: 'file-text', name: '使用教程' },
        {id: 10, iconName: 'kefu-ermai', name: '联系我们' },
        {id: 11, iconName: 'order', name: '服务条款' },
        {id: 12, iconName: 'info-circle', name: '隐私协议' },
        {type: 'line', id: 'line3' },
        {id: 13, iconName: 'minus-square-fill', name: '退出登录' },
      ]
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    showPop() {
      return this.navShow || this.integralShow;
    }
  },
  watch: {
    showPop: {
      immediate: true,
      handler(status) {
        this.toggleBodyPositionStatus(status)
      }
    }
  },
  beforeDestroy() {
    this.toggleBodyPositionStatus(false)
  },
  methods: {
    ...mapActions('UserInfo', ['getUserInfo']),
    handleJump(id) {
      if(id === 13) {
        app.globalData.util.request({
          url: '/user/logout'
        }).then((res) => {
          uni.clearStorage();
          uni.reLaunch({
            url: '/pages/index/index'
          })
        })
        return
      }
      const temp = {
        1: '/pages/index/index',
        2: '/pages/user/index',
        3: '/pages/picture/index',
        4: '/pages/ai/index',
        5: '/pages/photos/index',
        6: '/pages/picture/tool',
        7: '/pages/sound/index',
        8: '/pages/picture/video-tool',
        9: '/pages/service/tutorial',
        10: '/pages/article/code',
        11: '/pages/service/article?type=service',
        12: '/pages/service/article?type=privacy',
      };
      const url = temp[`${id}`] || '';
      if(url) {
        if([2, 3].includes(+id)) {
          this.checkLoginStatus().then(() => {
            uni.navigateTo({url})
          })
        } else {
          uni.navigateTo({url})
          // uni.reLaunch({url})
        }
      }
    },
    blChange() {
      this.checkLoginStatus().then(() => {
        this.navShow = false
        this.integralShow = true
        this.value = '';
      })
    },
    exchange() {
      app.globalData.util.request({
        url: '/user/bindCard',
        data: {code: this.value,}
      }).then((res) => {
        app.globalData.util.message(res.message)
        this.integralShow = false
        this.getUserInfo();
      });
    },
  }
}
</script>

<style lang="scss" scoped>
	.popup {
		width: 100%;
	
		::v-deep .u-popup__content {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			background-color: #0D0D0D;
			overflow-y: auto;
			overflow-x: hidden;
		}
	
		.user {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
	
			.userAvater {
				height: 68rpx;
				width: 68rpx;
				background-color: #ffad08;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
	
				image {
					height: 100%;
					width: 100%;
				}
			}
			.Infor {
				.userName {
					font-size: 24rpx;
					color: rgba(255,255,255,.7);
					font-weight: 700;
				}
	
				.userId {
					font-size: 24rpx;
					margin-top: 6rpx;
					color: #818181;
				}
			}
		}
	
		.integral {
			width: 420rpx;
			padding: 20rpx 20rpx 20rpx 28rpx;
			background-color: #1D1E23;
			border-radius: 10rpx;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			margin: 40rpx 0;
			box-sizing: border-box;
	
			.inteNum {
				font-size: 24rpx;
				color: #B2B2B2;
	
				text {
					margin-left: 10rpx;
				}
			}
	
			.inteBtn {
				background-color: #F60652;
				border-radius: 8rpx;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
	
		.headList {
			.item {
				width: 100%;
				padding: 0 20rpx;
				margin: 0 0 30rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				color: rgba(255,255,255,.7);
				.u-icon {
					display: inline-block;
					margin-right: 12rpx;
				}
				/deep/.u-icon__icon{
					font-size: 22px!important;
					line-height: 22px!important;
				}
			}
	
			.navSelmg {
				width: 100%;
				height: 1px;
				background-color: rgba(255,255,255,.2);
				margin: 40rpx 0;
			}
		}
	}
	.inpopup {
		width: 80%;
	
		.title {
			font-size: 32rpx;
			text-align: center;
			font-weight: 700;
		}
	
		.text {
			font-size: 28rpx;
			text-align: center;
			margin: 20rpx 0;
		}
	
		/deep/.u-popup__content {
			width: 80%;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 80rpx 40rpx;
		}
		/deep/.u-input {
			border: 1px solid #f5f5f5;
			background-color: #f5f5f5;
			margin: 30rpx 0;
		}
		.operateBtn {
			display: flex;
			display: -webkit-flex;
			justify-content: right;
			flex-wrap: wrap;
			align-items: center;
	
			.btn {
				width: 200rpx;
				height: 50rpx;
				line-height: 50rpx;
				border: 1px solid #F60652;
				border-radius: 8rpx;
				display: inline-block;
				text-align: center;
				font-size: 28rpx;
			}
	
			.sure {
				margin-left: 20rpx;
				background-color: #F60652;
				color: #fff;
			}
		}
	}
</style>