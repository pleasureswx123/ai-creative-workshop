<template>
  <view class="container" @touchmove.stop.prevent="">
	<u-popup :show="show" @close="close" @open="open" @touchmove.stop.prevent="" class="popupshow">
		<scroll-view  scroll-y="true" @scrolltolower="onPhotosModelList" style="height: 600px;" >
	            <view v-for="item in value" :key="item" >
	                <text>出淤泥而不染，濯清涟而不妖</text>
	            </view>
				<view v-if="value>60" style="height: 100rpx;">没有更多了</view>
		</scroll-view>
			</u-popup>
	 </view>	
</template>
 
<script>
	import util from '@/utils/util.js'
export default {
  data() {
    return {
		 list: ['未付款', '待评价', '已付款'],
		 current: 0,
		 	src: 'https://cdn.uviewui.com/uview/album/1.jpg',
			value: 30,
			value1:'123',
			show: false
    };
  },
  created() {
    
  },
  onLoad() {
	
  },
  methods: {
	 open() {
	          // console.log('open');
			  this.show = true
	        },
	        close() {
	          this.show = false
	          // console.log('close');
	        },
	onPhotosModelList(){
		if(this.value>60)return false
		this.value+=30
	},
				moveHandle(){
					return false
				},
				disabledScroll(){
					if(this.show){
						return false
					}
				}

   
  }
};
</script>
 
<style lang="scss" scoped>
.container{
	.popupshow{
		height: 100vh;
	}
	}
</style>