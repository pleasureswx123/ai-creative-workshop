<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tab">
			<u-tabs :list="tabList" @click="click"></u-tabs>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
	                tabList: [{
	                    name: '可使用',
	                }, {
	                    name: '审核中',
	                }, {
	                    name: '审核失败'
	                }]
				}
			},
			methods: {
	            click(item) {
	                console.log('item', item);
	            }
			}
		}
</script>

<style>
</style>