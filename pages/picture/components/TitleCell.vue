<template>
  <view>
    <view class="cell-box">
      <view class="label" v-html="title"></view>
      <view class="rt pointer" v-if="isShowRight && (generateState === 1)" @tap="showHistoryPop = true">
        <text>从创作历史选择</text>
        <u-icon name="arrow-right" size="24rpx" color="var(--txt-color2)"></u-icon>
      </view>
    </view>
    <QmWaterFallPop
        v-if="showHistoryPop"
        :show.sync="showHistoryPop"
        :currentInfo.sync="historyInfo"
        title="选择要处理的图片"
        :getList="getHistoryList"
        :proxyList="item => {
          const {img_height: h, img_url, img_width: w, task_id} = item || {};
          const url = img_url || '';
          const titles = url.split('/').slice(-1);
          return {
            ...item,
            allowEdit: false,
            image: url,
            w, h,
            url,
            title: titles[0] || url,
            id: task_id,
            value: 0.8
          }
        }" />
  </view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  inject: ['setImgUrl'],
  props: {
    name: {
      type: String,
      default: 'sourceImg'
    },
    title: {
      type: String,
      default: '标题'
    },
    isShowRight: {
      type: Boolean,
      default: true
    },
    generateState: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showHistoryPop: false,
      historyCurrentInfo: null,
    }
  },
  computed: {
    historyInfo: {
      get() {
        return this.historyCurrentInfo || null
      },
      set(info) {
        const url = info.img_url;
        url && this.setImgUrl(this.name, url);
        this.historyCurrentInfo = info;
      }
    }
  },
  methods: {
    ...mapActions('PhotoInfo', ['getHistoryList']),
  },
}
</script>

<style lang="scss" scoped>
.cell-box {
  font-size: 28rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  .label {
    color: var(--txt-color1);
    /deep/ em {
      font-style: normal;
      color: red;
      font-weight: bold;
    }
  }
  .rt {
    font-size: 24rpx;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--txt-color2);
  }
}
</style>