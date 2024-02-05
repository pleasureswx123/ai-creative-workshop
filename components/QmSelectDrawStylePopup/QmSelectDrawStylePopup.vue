<template>
  <QmPopup
      :show="show"
      @close="$emit('update:show', false)"
      @confirm="handleConfirm"
      title="选择转绘风格">
    <template #tips>
      <view class="tips-txt">
        基于SD1.5训练或微调的各种大模型，对各种画风Lora的兼容表现更好，兼顾出图质量和速度。
      </view>
    </template>
    <scroll-view
        scroll-y="true"
        style="height: 100%"
        @scrolltolower="loadMore">
      <view class="item-wrapper">
        <StyleItem
            v-for="item in list"
            :key="item.id"
            :info="item"
            :active="currentId === item.id"
            @select="info => { currentInfo = info }"
        />
      </view>
      <u-gap height="150rpx" />
    </scroll-view>
  </QmPopup>
</template>

<script>
import {mapActions} from 'vuex';
import StyleItem from './StyleItem.vue';

export default {
  components: { StyleItem },
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
      task_type: 11,
      list: [],
      isHaveMore: true,
      currentInfo: null
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
        task_type: 11,
      }
    },
  },
  methods: {
    ...mapActions('PictureInfo', ['getTemplate']),
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
      this.task_type = 11;
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
.tips-txt {
  padding: 30rpx;
  font-size: 28rpx;
  color: #fff;
  line-height: 1.5;
}
.item-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}
</style>