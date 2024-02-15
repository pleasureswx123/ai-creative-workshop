<template>
  <Layout :info="info" @cb="clickRightBtnEvent" @toDetails="toDetails">
    <view class="pictrue-box" :style="boxStyle">
      <u-swiper height="100%" :current="current" :list="imgUrls" imgMode="aspectFit"
          :autoplay="false" @change="change" @click="handleClick">
        <template v-if="isShowIndicator">
          <view slot="indicator" class="indicator">
            <view class="indicator__dot" v-for="(item, index) in imgUrls" :key="index"
                  :class="[index === current && 'indicator__dot--active']">
            </view>
          </view>
        </template>
      </u-swiper>
    </view>
  </Layout>
</template>

<script>
import Layout from './Layout.vue';

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
  },
  components: { Layout },
  data() {
    return {
      current: 0
    }
  },
  computed: {
    boxStyle() {
      const [width, height] = this.info?.scale?.split('*') || [];
      if(width && height) {
        return {
          'aspect-ratio': `${width} / ${height}`
        }
      } else {
        return {
          width: '100%',
          height: '400rpx'
        }
      }
    },
    imgUrls() {
      let urls = this.info?.img_urls;
      if(!Array.isArray(urls)) {
        urls = urls ? [urls] : []
      }
      return urls
    },
    isShowIndicator() {
      return this.imgUrls.length > 1
    },
    currentImg() {
      return this.imgUrls?.[this.current] || ''
    }
  },
  methods: {
    handleClick() {
      // uni.previewImage({
      //   urls: this.imgUrls
      // });
    },
    clickRightBtnEvent() {
      this.$emit('showToolAction', Object.assign({},{currentImg: this.currentImg}))
    },
    toDetails() {
      const {class_type, task_id} = this.info || {};
      this.$emit('toDetails', {
        class_type, task_id
      })
    },
    change({current}) {
      this.current = current || 0;
      this.$emit('change', this.current);
    }
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background: var(--txt-color5);
  /deep/ .u-swiper {
    background-color: transparent!important;
  }
  /deep/ .u-swiper__wrapper__item__wrapper__image {
    background-color: var(--txt-color5)!important;
  }
}

.indicator {
  @include flex(row);
  justify-content: center;
  
  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;
    
    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;
  
  &__text {
    color: #FFFFFF;
    font-size: 12px;
  }
}
</style>