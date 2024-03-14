<template>
  <view class="card-box">
    <view class="card-title">
      <view class="title">出图比例</view>
    </view>
    <view class="card-content-grid">
      <view
          class="item"
          v-for="item in radioList"
          :key="item.id"
          :class="{active: currentVal === item.id}"
          @tap="currentVal = item.id">
        <view class="ratio-box">
          <view class="ratio-box-img">
            <view class="iel" v-if="item.style" :style="item.style"></view>
          </view>
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
  data() {
    return {
      radioList: []
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(data) {
        this.radioList = data;
      }
    },
    len: {
      immediate: true,
      handler(num) {
        if(num) {
          this.$nextTick(() => {
            const query = uni.createSelectorQuery().in(this);
            query.select('.ratio-box-img')
                .boundingClientRect((data) => {
                  const {width, height} = data;
                  console.log("得到布局位置信息" + JSON.stringify({width, height}));
                  const minVal = Math.min(width, height);
                  this.radioList = [...this.radioList].map(item => {
                    const [w, h] = item.scale.split(':');
                    const cell = Math.floor(+minVal / (+w + +h));
                    const wd = cell * w;
                    const ht = cell * h;
                    return Object.assign({}, item, {
                      style: {
                        width: `${wd}px`,
                        height: `${ht}px`,
                      }
                    });
                  })
                }).exec();
          })
        }
      }
    }
  },
  computed: {
    len() {
      return this.radioList.length
    },
    currentVal: {
      get() {
        return this.value || 5
      },
      set(id) {
        this.$emit('update:value', id)
      }
    },
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
  padding: 4rpx;
  border-radius: 10rpx;
  background: #141517;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  .item {
    min-width: 0;
    border-radius: 10rpx;
    cursor: pointer;
    &.active {
      .ratio-box .ratio-box-img {
        background: #2C2E33;
      }
    }
  }
  .ratio-box {
    aspect-ratio: 16 / 9;
    max-height: 200rpx;
    margin: 0 auto 6rpx;
    box-sizing: border-box;
    .ratio-box-img {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .iel {
      border-radius: 8rpx;
      background: #1A1B1E;
      box-sizing: border-box;
      border: 6rpx solid #8D939F;
    }
  }
}

@media screen and (min-width: 750px) {
  .card-content-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>