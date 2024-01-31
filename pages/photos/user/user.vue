<template>
  <view class="container" >
		<view  class="list">初期的思考</view>
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
	.list{
		margin-top: 100rpx;
		text-align: center;
		font-size: 28rpx;
	}
	}
</style>