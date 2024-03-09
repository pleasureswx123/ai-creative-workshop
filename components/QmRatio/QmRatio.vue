<template>
  <view class="card-box">
    <view class="card-title">
      <view class="title">出图比例</view>
    </view>
    <view class="card-content-grid">
      <view
          class="item"
          v-for="item in ratioList"
          :key="item.id"
          :class="{active: currentVal === item.id}"
          @tap="currentVal = item.id">
        <view class="ratio-box">
<!--          <img class="img-el" :src="item.src" />-->
          <image :src="item.src" mode="aspectFit"></image>
        </view>
        <view>{{item.scale}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 5
    },
    list: {
      type: Array,
      default: () => ([
        {"id": 5, "title": "头像", "scale": "1:1", "width": "1024", "height": "1024"},
        {"id": 6, "title": "手机壁纸", "scale": "2:3", "width": "832", "height": "1216"},
        {"id": 1, "title": "文章配图", "scale": "4:3", "width": "1152", "height": "896"},
        {"id": 2, "title": "社交媒体", "scale": "3:4", "width": "896", "height": "1152"},
        {"id": 3, "title": "电脑桌面", "scale": "16:9", "width": "1344", "height": "768"},
        {"id": 4, "title": "海报", "scale": "9:16", "width": "768", "height": "1344"}
      ])
    }
  },
  computed: {
    currentVal: {
      get() {
        return this.value || 5
      },
      set(id) {
        this.$emit('update:value', id)
      }
    },
    ratioList() {
      return this.list.map(item => {
        const [w, h] = item.scale.split(':');
        const width = w * 10;
        const height = h * 10;
        return Object.assign({}, item, {
          src: `https://via.placeholder.com/${width}x${height}.png/808080/808080`
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  padding: 0 30rpx 30rpx;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  color: #fff;
  font-size: 28rpx;
  .card-title {
    display: flex;
    align-items: center;
    height: 80rpx;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.card-content-grid {
  border-radius: 10rpx;
  background: #141517;
  padding: 6rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rpx;
  text-align: center;
  .item {
    min-width: 0;
    border-radius: 10rpx;
    //background: #2C2E33;
    padding: 4rpx;
    cursor: pointer;
    &.active {
      .ratio-box {
        border-color: var(--red-color1);
      }
    }
  }
  .ratio-box {
    aspect-ratio: 16 / 9;
    max-height: 120rpx;
    padding: 10rpx;
    border: 4rpx solid #141517;
    margin: 0 auto 6rpx;
    box-sizing: border-box;
    image {
      border: 4rpx solid #141517;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      box-sizing: border-box;
    }
  }
}

@media screen and (min-width: 750px) {
  .card-content-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>