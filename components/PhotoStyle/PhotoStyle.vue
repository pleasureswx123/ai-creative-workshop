<template>
  <view class="photo-style-wrapper">
    <view class="title">图片风格 Style（可不选）</view>
    <view ref="photoBox" class="photo-style-box" :style="styleGrid">
      <view
          class="item"
          v-for="item in list"
          :key="item.id"
          :class="{active: currentId === item.id}"
          @tap="change(item)">
        <view class="img-box">
          <image :src="item.img_url" mode="aspectFill"></image>
        </view>
        <view class="name">{{item.title}}</view>
      </view>
      <view class="item" @tap="showImgStylePop = true">
        <view class="img-box"><text class="more-btn">更多</text></view>
      </view>
    </view>
    <QmPop
        v-if="showImgStylePop"
        :show.sync="showImgStylePop"
        :currentInfo.sync="imgStyleInfo"
        title="选择样式"
        componentName="ImgStyleItem"
        :paramsInfo="{}"
        :getList="getImgStyleList"
        :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })" />
  </view>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  props: {
    currentInfo: {
      type: Object,
      default: () => (null)
    },
  },
  data() {
    return {
      showImgStylePop: false,
      gridNums: 4,
      list: [],
      listBak: []
    }
  },
  computed: {
    imgStyleInfo: {
      get() {
        return this.currentInfo
      },
      set(info) {
        this.$emit('update:currentInfo', info)
      }
    },
    currentId() {
      return this.imgStyleInfo?.id || this.imgStyleInfo?.img_style_id || ''
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
    this.getImgStyleList({page: 1, pagesize: 50}).then(res => {
      const temp = ((res?.list || []).slice(0, this.gridNums - 1));
      this.list = temp.map(item => {
        return {...item, id: item.img_style_id, value: 0.8}
      });
      this.listBak = this.list;
    });
  },
  methods: {
    ...mapActions('PhotoInfo', ['getImgStyleList']),
    change(item) {
      if(this.currentId === item.id) {
        this.imgStyleInfo = null
        return
      }
      this.imgStyleInfo = item
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