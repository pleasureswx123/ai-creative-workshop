<template>
  <QmPopup
      :show="show"
      @close="$emit('update:show', false)"
      @confirm="handleConfirm"
      title="选择舞蹈模板">
    <u-gap height="30" />
    <scroll-view
        scroll-y="true"
        style="height: 100%"
        @scrolltolower="loadMore">
      <view class="item-wrapper">
        <TemplateItem
            v-for="item in list"
            :key="item.id"
            :info="item"
            :active="currentId === item.id"
            @select="info => { currentInfo = info }"
            @play="handlePlay"
        />
      </view>
      <u-gap height="150rpx" />
    </scroll-view>
  </QmPopup>
</template>

<script>
import {mapActions} from 'vuex';
import TemplateItem from './TemplateItem.vue';
import UGap from "../../uni_modules/uview-ui/components/u-gap/u-gap";

export default {
  components: {UGap, TemplateItem },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    selectedInfo: {
      type: Object,
      default: () => (null)
    },
  },
  data() {
    return {
      page: 1,
      pagesize: 10,
      task_type: 10,
      list: [],
      isHaveMore: true,
      currentInfo: null,
      videoContext: null
    }
  },
  created() {
    this.initData();
  },
  watch: {
    show: {
      immediate: true,
      handler(status) {
        if(status) {
          if(this.selectedInfo) {
            this.currentInfo = this.selectedInfo;
          }
        }
      }
    }
  },
  computed: {
    currentId() {
      return this.currentInfo?.id || '';
    },
    params() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        task_type: 10,
      }
    },
  },
  beforeDestroy() {
    this.destoryVideo();
  },
  methods: {
    ...mapActions('PictureInfo', ['getTemplate']),
    destoryVideo() {
      if(this.videoContext) {
        this.videoContext.pause();
        this.videoContext = null;
      }
    },
    handlePlay(info) {
      this.destoryVideo();
      this.videoContext = uni.createVideoContext(`video-temp-${info.id}`, this);
      this.videoContext.play();
    },
    initData() {
      this.initParams();
      this.getData().then(info => {
        this.currentInfo = info;
        info && this.$emit('update:selectedInfo', info);
      });
    },
    initParams() {
      this.page = 1;
      this.pagesize = 10;
      this.task_type = 10;
      this.list = [];
    },
    loadMore() {
      if(this.isHaveMore) {
        this.page +=1;
        this.getData();
      }
    },
    getData() {
      return this.getTemplate(this.params).then(res => {
        const {list = [], count} = res || {};
        this.count = count;
        this.list = [...this.list, ...(list || [])];
        this.isHaveMore = this.count > this.list.length;
        return (list || [])?.[0] || null;
      })
    },
    handleConfirm() {
      this.$emit('update:selectedInfo', this.currentInfo);
      this.$emit('update:show', false);
    }
  },
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}
</style>