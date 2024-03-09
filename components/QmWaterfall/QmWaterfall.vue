<template>
  <view class="waterfall">
    <uv-waterfall ref="waterfall"
                  v-model="list"
                  :column-count="columnCount"
                  :add-time="10"
                  :left-gap="leftGap"
                  :right-gap="rightGap"
                  :column-gap="columnGap"
                  @changeList="changeList">
      <template v-for="num in columnCount" v-slot:[`list${num}`]>
        <view>
          <view v-for="(item, index) in waterfall[`list${num}`]"
                :key="item.task_id"
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
      columnCount: 2,
      page: 1,
      list: [],// 瀑布流全部数据
      waterfall: {},
      leftGap: 10,
      rightGap: 10,
      columnGap: 10,
      showNoMore: true,
    }
  },
  created() {
    this.setColumnCount();
    this.clearData();
    this.getData();
  },
  computed: {
    imageStyle(item) {
      return item => {
        const val = uni.upx2px(750);
        const num = val > 1200 ? 1200 : val;
        const v = num - this.leftGap - this.rightGap - this.columnGap;
        const w = v / this.columnCount;
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
  mounted() {
    // #ifdef H5
    // window.addEventListener('resize', this.restData)
    // #endif
  },
  beforeDestroy() {
    // #ifdef H5
    // window.removeEventListener('resize', this.restData);
    // #endif
    this.$refs?.waterfall?.clear?.();
  },
  methods: {
    restData() {
      uni.$u.debounce(this.resetColumnCount, 800);
    },
    setColumnCount() {
      const {windowWidth} = uni.getSystemInfoSync();
      if(750 < windowWidth && windowWidth < 960) {
        this.columnCount = 3;
      }
      if(windowWidth > 960) {
        this.columnCount = 4;
      }
    },
    resetColumnCount() {
      this.setColumnCount();
      this.clearData();
      return this.getData();
    },
    initListData() {
      for(let i = 0; i < this.columnCount; i++) {
        this.$set(this.waterfall, `list${i + 1}`, [])
      }
    },
    handleSelect(item) {
      this.$emit('select', item)
    },
    clearData() {
      this.page = 1;
      this.list = [];
      this.$refs?.waterfall?.clear?.();
      this.initListData();
    },
    changeList(e) {
      this.waterfall[e.name].push(e.value);
    },
    loadMore() {
      if(this.showNoMore) {
        return;
      }
      this.page++;
      this.getData();
    },
    getData() {
      return this.getList(this.params).then(resData => {
        const resList = (this.proxyList ? ((resData?.list || []).map(this.proxyList)) : resData?.list).map(item => {
          const id = item.id || uni.$u.guid(20);
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
  border-radius: 8px;
  outline: 1px none transparent;
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
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 80rpx;
    border-radius: 60rpx;
    text-align: center;
    border: 2rpx solid rgba(255,255,255,.1);
    color: rgba(255,255,255,.6);
    background-color: rgba(255,255,255, .1);
    font-size: 24rpx;
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
  outline: 1px solid var(--red-color1);
}
</style>