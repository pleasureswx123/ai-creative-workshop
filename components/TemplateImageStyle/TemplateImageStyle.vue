<template>
  <view class="photo-style-wrapper">
    <view class="title">{{title}}</view>
    <view ref="photoBox" class="photo-style-box" :style="styleGrid">
      <view
          class="item"
          v-for="item in list"
          :key="item.id"
          :class="{active: currentId === item.id}"
          @tap="change(item)">
        <view class="img-box">
          <image :src="item.img_url" mode="aspectFill"></image>
          <view class="name">{{item.title}}</view>
        </view>
      </view>
      <view v-if="isShowMore" class="item" @tap="show = true">
        <view class="img-box"><text class="more-btn">更多</text></view>
      </view>
    </view>
    <template v-if="isShowMore">
      <QmPop
          v-if="show"
          :show.sync="show"
          :currentInfo.sync="curInfo"
          :title="title"
          :componentName="componentName"
          :paramsInfo="params"
          :getList="getList"
          :proxyList="proxyList" />
    </template>
  </view>
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '选择风格'
    },
    getList: {
      type: Function,
      default: () => ({})
    },
    proxyList: {
      type: Function,
      default: (item) => ({...item})
    },
    params: {
      type: Object,
      default: () => ({})
    },
    currentInfo: {
      type: Object,
      default: () => (null)
    },
  },
  data() {
    return {
      show: false,
      isShowMore: true,
      gridNums: 4,
      list: [],
      listBak: [],
    }
  },
  computed: {
    curInfo: {
      get() {
        return this.currentInfo
      },
      set(info) {
        this.$emit('update:currentInfo', info)
      }
    },
    currentId() {
      return this.curInfo?.id || this.curInfo?.img_style_id || ''
    },
    styleGrid() {
      return {
        'grid-template-columns': `repeat(${this.gridNums}, 1fr)`
      }
    },
    watchIdList() {
      return {
        id: this.currentId,
        list: this.list
      }
    }
  },
  watch: {
    watchIdList(item) {
      if(!this.isShowMore) {
        return;
      }
      const {id, list} = item || {};
      const ids = list.map(item => item.id);
      if(!id || !ids.length) {
        return
      }
      if(!ids.includes(id)) {
        const temp = [...this.listBak];
        this.list = [...temp.slice(0, -1), this.currentInfo]
      }
    }
  },
  mounted() {
    const {width} = this.$refs.photoBox.$el.getBoundingClientRect();
    this.gridNums = Math.floor(width / 80);
    this.getList(Object.assign({page: 1, pagesize: 50}, this.params)).then(res => {
      const len = (res?.list || []).length;
      this.isShowMore = len > this.gridNums;
      this.list = (((res?.list || []).slice(0, this.gridNums - +this.isShowMore ))).map(this.proxyList);
      this.listBak = this.list;
    });
  },
  methods: {
    change(item) {
      if(this.currentId === item.id) {
        this.curInfo = null
        return
      }
      this.curInfo = item
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-style-wrapper {
  padding: 0 30rpx 30rpx;
  border-radius: 10rpx;
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  font-size: 28rpx;
  margin-bottom: 30rpx;
  color: #fff;
  .title {
    height: 80rpx;
    line-height: 80rpx;
  }
  .photo-style-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    background: #141517;
    border-radius: 10rpx;
    padding: 6rpx 0;
    .item {
      width: 80px;
      min-width: 0;
      cursor: pointer;
      padding: 2px;
      border-radius: 10rpx;
      box-sizing: border-box;
      &.active {
        background: var(--red-color1);
        .name {
          font-weight: bold;
        }
      }
      .img-box {
        width: 76px;
        height: 76px;
        margin: 0 auto;
        border-radius: 10rpx;
        background: #233549;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        image {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 10rpx;
        }
        .more-btn {
          font-weight: bold;
          font-size: 28rpx;
        }
      }
      .name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 24rpx;
        background-color: var(--red-color2);
        padding-top: 8rpx;
        text-align: center;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>