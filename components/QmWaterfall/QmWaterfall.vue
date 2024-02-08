<template>
  <view class="waterfall">
    <uv-waterfall ref="waterfall"
                  v-model="list"
                  :add-time="10"
                  :left-gap="leftGap"
                  :right-gap="rightGap"
                  :column-gap="columnGap"
                  @changeList="changeList">
      <template v-slot:list1>
        <view>
          <view v-for="(item, index) in list1"
                :key="item.id"
                :class="{active: item.id === selectId}"
                class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]" @tap="handleSelect(item)">
              <image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
            </view>
          </view>
        </view>
      </template>
      <template v-slot:list2>
        <view>
          <view v-for="(item, index) in list2"
                :key="item.id"
                :class="{active: item.id === selectId}"
                class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]" @tap="handleSelect(item)">
              <image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
            </view>
          </view>
        </view>
      </template>
    </uv-waterfall>
    <view class="no-more" v-if="showNoMore">没有更多了</view>
    <view class="load-more" v-else>
      <view class="more-btn" @tap="loadMore">加载更多</view>
    </view>
  </view>
</template>

<script>
import {guid} from '@/uni_modules/uv-ui-tools/libs/function/index.js'

export default {
  props: {
    selectId: {
      type: [String, Number],
      default: ''
    },
    paramsInfo: {
      type: Object,
      default: () => ({})
    },
    proxyList: {
      type: Function,
    },
    getList: {
      type: Function,
      default: () => (() => {
        return new Promise(() => {})
      }),
      required: true
    },
  },
  data() {
    return {
      page: 1,
      list: [],// 瀑布流全部数据
      list1: [],// 瀑布流第一列数据
      list2: [],// 瀑布流第二列数据
      leftGap: 10,
      rightGap: 10,
      columnGap: 10,
      showNoMore: true,
    }
  },
  computed: {
    imageStyle(item) {
      return item => {
        const v = uni.upx2px(750) - this.leftGap - this.rightGap - this.columnGap;
        const w = v / 2;
        const rate = w / item.w;
        const h = rate * item.h;
        return {
          width: w + 'px',
          height: h + 'px'
        }
      }
    },
    params() {
      return {
        page: this.page,
        pagesize: 10,
        ...this.paramsInfo,
      }
    }
  },
  watch: {
    paramsInfo: {
      deep: true,
      handler() {
        this.clearData();
        this.getData();
      }
    },
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.$refs?.waterfall?.clear?.();
  },
  methods: {
    handleSelect(item) {
      this.$emit('select', item)
    },
    clearData() {
      this.page = 1;
      this.list = [];
      this.$refs?.waterfall?.clear?.();
      this.list1 = [];
      this.list2 = [];
    },
    changeList(e) {
      this[e.name].push(e.value);
    },
    loadMore() {
      this.page++;
      this.getData();
    },
    getData() {
      this.getList(this.params).then(resData => {
        const resList = (this.proxyList ? ((resData?.list || []).map(this.proxyList)) : resData?.list).map(item => {
          const id = item.id || guid();
          return { ...item, id }
        });
        this.showNoMore = resList.length < this.params.pagesize;
        this.list = [...this.list, ...resList];
      })
    },
  }
}
</script>


<style scoped lang="scss">
$show-lines: 1;
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';

.waterfall-item {
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
  /deep/ uni-image>img {
    opacity: 1;
  }
}

.no-more {
  font-size: 24rpx;
  height: 200rpx;
  color: rgba(255,255,255,.5);
  text-align: center;
  line-height: 200rpx;
}
.load-more {
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .more-btn {
    height: 80rpx;
    line-height: 80rpx;
    width: 50%;
    border-radius: 16rpx;
    text-align: center;
    border: 2rpx solid rgba(255,255,255,.8);
    color: rgba(255,255,255,.8);
    font-size: 28rpx;
  }
}
.active {
  //position: relative;
  //&::after {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  right: 0;
  //  bottom: 0;
  //  box-sizing: border-box;
  //  border: 2rpx solid red;
  //}
  outline: 3rpx solid red;
}
</style>