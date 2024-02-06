<template>
  <QmPopup
      :show="show"
      @close="$emit('update:show', false)"
      @confirm="handleConfirm"
      :title="title">
    <template #tips>
      <slot name="tips"></slot>
    </template>
    <slot v-if="$slots.default"></slot>
    <scroll-view
        v-else
        scroll-y="true"
        style="height: 100%"
        @scrolltolower="loadMore">
      <view class="item-wrapper" :style="styleStr">
        <component
            :is="componentName"
            v-for="item in list"
            :key="item.id"
            :info="item"
            :active="currentId === item.id"
            @select="info => { selectedInfo = info }" />
      </view>
      <u-gap height="150rpx" />
    </scroll-view>
  </QmPopup>
</template>

<script>
import StyleItem from './Item/StyleItem.vue';
import TemplateItem from './Item/TemplateItem.vue';

export default {
  components: { StyleItem, TemplateItem },
  props: {
    componentName: {
      type: String,
      default: ''
    },
    styleStr: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: false
    },
    currentInfo: {
      type: Object,
      default: () => (null)
    },
    paramsInfo: {
      type: Object,
      default: () => ({})
    },
    getList: {
      type: Function,
      default: () => (() => {})
    },
    proxyList: { // 保证必须有id
      type: Function,
    },
  },
  data() {
    return {
      page: 1,
      pagesize: 10,
      list: [],
      isHaveMore: true,
      selectedInfo: null
    }
  },
  computed: {
    currentId() {
      return this.selectedInfo?.id || '';
    },
    params() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        ...this.paramsInfo
      }
    },
  },
  created() {
    this.initData();
  },
  watch: {
    show: {
      immediate: true,
      handler(status) {
        if(status) {
          
          if(this.currentInfo) {
            this.selectedInfo = this.currentInfo;
          }
        }
      }
    }
  },
  methods: {
    initData() {
      this.initParams();
      this.getData().then(info => {
        this.selectedInfo = info;
        info && this.$emit('update:currentInfo', info);
      });
    },
    initParams() {
      this.page = 1;
      this.pagesize = 10;
      this.list = [];
    },
    loadMore() {
      if(this.isHaveMore) {
        this.page +=1;
        this.getData();
      }
    },
    getData() {
      return this.getList(this.params).then(res => {
        const {list = [], count} = res || {};
        const temp = list || [];
        const listData = this.proxyList ? (temp.map(this.proxyList)) : temp;
        this.count = count;
        this.list = [...this.list, ...(listData || [])];
        this.isHaveMore = this.count > this.list.length;
        return (listData || [])?.[0] || null;
      })
    },
    handleConfirm() {
      this.$emit('update:currentInfo', this.selectedInfo);
      this.$emit('update:show', false);
    }
  },
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}
/deep/ {
  .u-popup__content {
    background-color: transparent;
  }
}
</style>