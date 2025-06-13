<template>
  <view class="waterfall">
    <view class="waterfall-page">
      <view class="waterfall-page-column" v-for="(item, index) in colListData" :key="index">
        <view class="waterfall-img" v-for="(pItem, pIndex) in item.list" :key="pIndex" @tap="handleSelect(pItem)">
          <image class="img-el" :src="pItem.image" :lazy-load="true" mode="widthFix"></image>
        </view>
      </view>
    </view>
    <view class="no-more" v-if="showNoMore">没有更多了</view>
    <view class="load-more" v-else>
      <view class="more-btn" @tap="loadMore">加载更多</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    columnCount: {
      type: Number,
      default: 2
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
      lastList: [],
      colList: {},
      showNoMore: true,
    }
  },
  computed: {
    params() {
      return {
        page: this.page,
        pagesize: 10,
        ...this.paramsInfo,
      }
    },
    colListData() {
      return Object.values(this.colList)
    },
    watchInfo() {
      return {
        paramsInfo: this.paramsInfo,
        columnCount: this.columnCount
      }
    }
  },
  watch: {
    watchInfo: {
      immediate: true,
      deep: true,
      handler() {
        this.initData();
      }
    },
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    async initData() {
      this.clearData();
      await this.getData();
      this.setColListData();
    },
    clearData() {
      this.page = 1;
      this.list = [];
      this.lastList = [];
      this.colList = {};
    },
    getData() {
      return this.getList(this.params).then(resData => {
        const resList = (this.proxyList ? ((resData?.list || []).map(this.proxyList)) : resData?.list).map(item => {
          const id = item.id || uni.$u.guid(20);
          return { ...item, id }
        });
        // this.showNoMore = resList.length < this.params.pagesize;
        this.list = [...this.list, ...resList];
      })
    },
    setColListData() {
      this.lastList = this.list.filter(item => !item.isNew);
      if(!this.lastList.length) {
        return
      }
      if(Object.keys(this.colList).length !== this.columnCount) {
        for(let i = 0; i < this.columnCount; i++) {
          this.$set(this.colList, i, {height: 0, list: []})
        }
      }
      this.setWaterfallLayout();
    },
    async setWaterfallLayout() {
      for (let i = 0, l = this.lastList.length; i < l; i++) {
        const item = this.lastList[i];
        try {
          const imgInfo = await uni.getImageInfo({
            src: item.image,
          });
          const h = imgInfo[1].height;
          // const h = +item.img_height;
          const mH = Math.min(...Object.values(this.colList).map(item => item.height));
          const sn = (Object.keys(this.colList)).find(keyName => this.colList[`${keyName}`].height === mH);
          this.$set(item, 'isNew', true);
          this.colList[`${sn}`].list.push(item);
          this.colList[`${sn}`].height += h;
        } catch (error) {
          console.log(error);
        }
      }
    },
    handleSelect(item) {
      this.$emit('select', item)
    },
    async loadMore() {
      if(this.showNoMore) {
        return;
      }
      this.page++;
      await this.getData();
      this.setColListData();
    },
  }
}
</script>

<style lang="scss" scoped>
.waterfall {
  padding: 0 20rpx;
}
.waterfall-page {
  display: flex;
  gap: 20rpx;
  .waterfall-page-column {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }
}
.waterfall-img {
  overflow: hidden;
  border-radius: 8px;
  outline: 1px none transparent;
  .img-el {
    display: block;
    height: auto;
    width: 100%;
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
  outline: 1px solid var(--red-color1);
}
</style>