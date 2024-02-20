import {userApi} from '@/api'

export default {
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 100,
      loadStatus: '', // more/loading/noMore
    }
  },
  computed: {
    watchVal() {
      return {
        navType: this.navType,
        topicId: this.topicId
      }
    }
  },
  watch: {
    watchVal: {
      deep: true,
      immediate: true,
      handler({navType, topicId}) {
        if(navType === 'assistant' && !!topicId) {
          this.initParams();
          this.loadMore();
        }
      }
    },
  },
  onPullDownRefresh() {
    if(type === 'assistant') {
      this.initParams();
      this.loadMore().then(() => {
        uni.stopPullDownRefresh();
      });
    } else {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      })
    }
  },
  onReachBottom() {
    if(type === 'assistant') {
      this.page += 1;
      this.loadMore();
    }
  },
  methods: {
    initParams() {
      this.list = [];
      this.page = 1;
      this.pagesize = 100;
      this.loadStatus = '';
    },
    loadMore() {
      if(this.loadStatus === 'noMore') {
        return;
      }
      this.loadStatus = 'loading';
      return userApi.getPrompts({topic_id: this.topicId, page: this.page, pagesize: this.pagesize}).then(res => {
        const {list = []} = res || {};
        this.list = [...this.list, ...(list || [])];
        this.loadStatus = list.length < this.pagesize ? 'noMore' : 'more';
      }).catch(err => {
        this.loadStatus = 'noMore'
      });
    },
  }
}