<!-- 瀑布流布局 -->
<template>
  <view class="container">
    <view
      class="cont-box"
      :style="{ '--layout-width': 100 / flowData.column - flowData.columnSpace + '%' }"
      v-for="(numVal, index) in flowData.column"
      :key="numVal"
    >
      <view class="item-box" v-for="(item, j) in flowData[`column_${index + 1}`]" :key="j" @click="onclick">
        <image class="img-tip" :src="item.img_url" mode="widthFix" lazy-load />
      <!--  <view class="tit-tip multi-line-omit">{{ item.title }}</view>
        <view class="desc-tip multi-line-omit">{{ item.desc }}</view> -->
      </view>
    </view>
  </view>
</template>
 
<script>
	import util from '@/utils/util.js'
export default {
  data() {
    return {
      flowData: {
        list: [], // 数据值
        column: 2, // 瀑布列数
        columnSpace: 2 // 瀑布列宽间距
      }
    };
  },
  created() {
    /* 初始化每一列的数据 */
    for (let i = 1; i <= this.flowData.column; i++) {
      this.$set(this.flowData, `column_${i}`, []);
    }
  },
  onLoad() {
    /* 数据赋值 */
    // this.flowData.list = [
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679045108_thumb.jpg",
    //     title: "自动驾驶汽车对交通和城市规划的未来影响与挑战",
    //     desc: "分析自动驾驶汽车对未来交通和城市规划的潜在影响，探讨相关挑战。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044581_thumb.jpg",
    //     title: "可持续城市发展：构建环保城市的策略和实践",
    //     desc: "分析建设可持续城市的战略和实际方法，强调环保、资源利用和城市规划的重要性。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679045190_thumb.jpg",
    //     title: "消灭传染病：全球卫生领域的挑战与创新",
    //     desc: "探讨在全球范围内消灭传染病的挑战，突出卫生领域的创新方法。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044667_thumb.jpg",
    //     title: "人工智能与机器学习：颠覆性技术对未来的巨大影响",
    //     desc: "探讨人工智能和机器学习如何在多个领域引发革命性变革，从工业到医疗，对未来产生深远影响。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044562_thumb.jpg",
    //     title: "生命科学的新前沿：基因编辑和生物技术的伦理挑战",
    //     desc: "研究生命科学领域的最新发展，聚焦基因编辑和生物技术的伦理考量，探讨科技前沿的道德挑战。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679045057_thumb.jpg",
    //     title: "加密货币与区块链：重塑全球金融体系的力量",
    //     desc: "解析加密货币和区块链技术对金融体系的颠覆作用，重新定义了全球金融交易方式。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044716_thumb.jpg",
    //     title: "量子计算与量子技术应用的前沿探索",
    //     desc: "深入研究量子计算和量子技术的前沿，展示这一领域的创新及其应用前景。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044779_thumb.jpg",
    //     title: "气候变化缓解的复杂性：全球视角下的挑战与机遇",
    //     desc: "探讨应对气候变化的复杂性，强调全球合作，突出应对挑战所蕴含的机遇。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044956_thumb.jpg",
    //     title: "虚拟现实与医疗保健的交汇：革命性地改变患者护理",
    //     desc: "介绍虚拟现实技术如何在医疗领域革命性地改善患者护理和治疗方法。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044607_thumb.jpg",
    //     title: "生物工程的突破：改变医学和人类增强的科技",
    //     desc: "研究生物工程领域的创新，关注其在医学和人类增强领域的重要作用。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679045083_thumb.jpg",
    //     title: "社交媒体的演进及其对沟通和社会的影响",
    //     desc: "追溯社交媒体的发展历程，探讨其对人际沟通和社会动态的广泛影响。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044643_thumb.jpg",
    //     title: "元宇宙时代：在工作、教育和娱乐的虚拟世界中导航",
    //     desc: "介绍元宇宙时代，强调虚拟世界在工作、教育和娱乐中的多样应用。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679044936_thumb.jpg",
    //     title: "通用人工智能：人类是否准备好面对超智能机器？",
    //     desc: "研究通用人工智能的发展，引发思考人类面对超级智能机器的准备程度。"
    //   },
    //   {
    //     imgUrl: "https://www.logosc.cn/uploads/resources/2023/03/17/1679045159_thumb.jpg",
    //     title: "超越火星：人类太空探索和星际旅行的未来",
    //     desc: "展望人类在太空探索领域的未来，探讨星际旅行的潜力和挑战。"
    //   }
    // ];
	this.onlist()
    // this.$nextTick(() => {
      // this.initData(); // 数据初始化
    // });
  },
  methods: {
	  async onlist(){
		  const res = await	util.request({url: '/AiDraw/getHistory'})
		  console.log(res)
		  this.flowData.list = res.data.list
		  this.initData();
	  },
    /* 数据初始化 */
    initData() {
      const groupList = this.dynamicGrouping(this.flowData.list, this.flowData.column); // 数据动态分组
      groupList.forEach((item, i) => (this.flowData[`column_${i + 1}`] = item));
    },
   
    dynamicGrouping(data, i) {
      if (i <= 0) return "分组数必须大于0";
      const groups = [];
      for (let j = 0; j < i; j++) {
        groups.push([]);
      }
      for (let k = 0; k < data.length; k++) {
        const groupIndex = k % i;
        groups[groupIndex].push(data[k]);
      }
      return groups;
    },
	onclick(){
		console.log(1111)
	}
  }
};
</script>
 
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  $borderRadius: 12rpx;
  .cont-box {
    width: var(--layout-width);
    .item-box {
      width: 100%;
      // padding-bottom: 20rpx;
      margin-bottom: 30rpx;
      border-radius: $borderRadius;
      // box-shadow: 0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08);
      .img-tip {
        width: 100%;
        border-radius: $borderRadius $borderRadius 0 0;
      }
      // .tit-tip {
      //   text-align: justify;
      //   font-size: 30rpx;
      //   padding: 10rpx 20rpx 0;
      //   font-weight: 900;
      // }
      // .desc-tip {
      //   text-align: justify;
      //   font-size: 26rpx;
      //   padding: 5rpx 20rpx 0;
      //   margin-top: 10rpx;
      // }
    }
  }
}
/* 多行省略 */
.multi-line-omit {
  word-break: break-all; // 允许单词内自动换行，如果一个单词很长的话
  text-overflow: ellipsis; // 溢出用省略号显示
  overflow: hidden; // 超出的文本隐藏
  display: -webkit-box; // 作为弹性伸缩盒子模型显示
  -webkit-line-clamp: 2; // 显示的行
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
}
/* 单行省略 */
.one-line-omit {
  width: 100%; // 宽度100%：1vw等于视口宽度的1%；1vh等于视口高度的1%
  white-space: nowrap; // 溢出不换行
  overflow: hidden; // 超出的文本隐藏
  text-overflow: ellipsis; // 溢出用省略号显示
}
</style>