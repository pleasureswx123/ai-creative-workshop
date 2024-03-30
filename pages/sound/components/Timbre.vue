<template>
	<view class="timbre">
		<view class="tab" :show="show" v-if="show">
			<u-tabs :list="tabList" :activeStyle="{color: 'var(--txt-color2)'}" class="item" @click="checked" :inactiveStyle="{color: '#606266'}"></u-tabs>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<view class="box-create" @tap="handCreate">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>创建我的声音
			</view>
			<view class="audioList">
				<view v-for="(item,index) in audioList">
					<view class="profile" @tap="play(item,index)" :class="{'active':asActive == index}">
						<i class="iconfont icon-jiqiren"></i>
						<view class="iconPlay" v-if="asActive == index">
						  <i class="iconfont icon-zanting1" v-if="dub_id ==item.dub_id"></i>
						  <i class="iconfont icon-bofang" v-else></i>
						</view>
					</view>
					<u--input
						class="qm-textarea"
						placeholder="请输入标题"
						border="bottom"
						v-model="item.value"
					  ></u--input>
				</view>
			</view>
			<CreatePop :show="CreateShow" @close="close"></CreatePop>
		</view>
		<view class="nav_item" v-if="isActive==1">
			<QmRecom></QmRecom>
		</view>
	</view>
</template>

<script>
import CreatePop from './CreatePop.vue';
import QmRecom from './QmRecom.vue';
import {soundApi} from '@/api'
export default{
	components:{CreatePop,QmRecom},
	props: {
	  show: {
	    type: Boolean,
	    default: true
	  },
	},
	data() {
		return{
			tabList:[{
				name:'复刻'
			},{
				name:'官方推荐'
			}],
			isActive:0,
			CreateShow:false,
			audioList:[],
			status: false,
			dub_id:'',
			innerAudioContext:null,
			asActive:0,
			page:1,
			pagesize:18,
		}
	},
	mounted() {
		this.voiceList()
	},
	beforeDestroy() {
		this.destroyAudio();
	},
	methods:{
		checked(data){
			this.isActive = data.index
		},
		handCreate(){
			this.CreateShow = true
			this.recorder = false
			if(this.innerAudioContext){
				this.innerAudioContext.destroy()
				this.dub_id = '';
			}
		},
		close(){
			this.CreateShow = false
		},
		voiceList(){
			soundApi.MyReproductionList({
				page:this.page,
				pagesize:this.pagesize
			}).then(res => {
				this.audioList =[...this.audioList, ...res.list]
				// this.lationList = [...this.lationList]
				this.$emit('onReachBottom',this.audioList)
			})
		},
		destroyAudio() {
		  if(this.innerAudioContext) {
		    this.innerAudioContext.pause();
		    this.innerAudioContext.destroy();
		    this.innerAudioContext = null;
		  }
		},
		play(item,index){
			this.asActive = index
			this.destroyAudio();
			this.dub_id = item.dub_id;
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true;
			this.innerAudioContext.src = item.dub_url;
			this.innerAudioContext.onEnded(()=> {
				this.dub_id = '';
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.tab{
	color: var(--txt-color2);
	font-size: 28rpx;
	padding: 20rpx 0 0 10rpx;
	/deep/{
		.u-tabs__wrapper__nav__item__text{
			font-size: 28rpx;
		}
		.u-tabs__wrapper__nav__item{
			height: auto!important;
			cursor: pointer;
		}
		.u-tabs__wrapper__nav__line{
			bottom: 0px;
			background: var(--txt-color2)!important;
		}
	}
}
.nav_item{
	margin: 40rpx 0;
	padding:0 30rpx ;
}
.box-create{
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 24rpx;
	.iconfont{
		margin-right: 10rpx;
	}
}
.audioList{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 20rpx;
	text-align: center;
	margin-top: 30rpx;
	.profile{
		width: 100rpx;
		height: 100rpx;
		background: #000;
		border-radius: 50%;
		position: relative;
		margin: auto;
		cursor: pointer;
		text-align: center;
		display: flex;
		align-items: center;
		border:2px solid #181818;
		justify-content: center;
		&.active{
			border: 4rpx solid #F60652;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.iconPlay{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.icon-jiqiren {
			position: absolute;
		}
	}
}
.qm-textarea {
  // background: var(--bg-color2);
  padding:0!important;
  border-bottom:1px solid var(--txt-color3)!important;
  margin: 10rpx auto 0;
  width: 80%;
  /deep/ {
	.u-input__content__field-wrapper__field {
	  font-size: 20rpx!important;
	  text-align: center!important;
	}
	.uni-input-placeholder {
	  color: var(--txt-color2)!important;
	  font-size: 20rpx!important;
	}
	.uni-input-input {
	  color: var(--txt-color1)!important;
	}
  }
}
@media screen and (min-width: 960px){
	.audioList{
		grid-template-columns: repeat(8, 1fr);
		row-gap: 40rpx;
		.profile{
			width: 200rpx;
			height: 200rpx;
		}
	}
	
}
</style>