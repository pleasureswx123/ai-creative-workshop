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
                class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]" @tap="$emit('getDetailsInfo', item.task_id)">
              <image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
            </view>
          </view>
        </view>
      </template>
      <template v-slot:list2>
        <view>
          <view v-for="(item, index) in list2"
                :key="item.id"
                class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]" @tap="$emit('getDetailsInfo', item.task_id)">
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
import { homeApi } from '@/api'

export default {
  props: {
    modeId: {
      type: String,
      default: '100'
    }
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
        model_subclass_id: this.modeId
      }
    }
  },
  watch: {
    modeId() {
      this.clearData();
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.$refs?.waterfall?.clear?.();
  },
  methods: {
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
      homeApi.getHomeFeedsList(this.params).then(resData => {
        const resList = (resData?.list || []).map(item => {
          const task = item.task_info || {};
          const {img_height: h, img_url: image, img_width: w, model_info: title} = task;
          return {...task, w, h, image, allowEdit: false, title, id: guid()}
        });
        this.showNoMore = resList.length < 10
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
</style>