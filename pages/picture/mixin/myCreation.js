import {userApi} from '@/api'

export default {
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      loadStatus: '', // more/loading/noMore
    }
  },
  onShow() {
    this.initParams();
    this.loadMore();
  },
  onPullDownRefresh() {
    this.initParams();
    this.loadMore().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.page += 1;
    this.loadMore();
  },
  methods: {
    initParams() {
      this.list = [];
      this.page = 1;
      this.pagesize = 10;
      this.loadStatus = '';
    },
    loadMore() {
      if(this.loadStatus === 'noMore') {
        return;
      }
      this.loadStatus = 'loading';
      return userApi.getMyCreation({page: this.page, pagesize: this.pagesize}).then(res => {
        const {list = []} = res || {};
        this.list = [...this.list, ...(list || [])];
        this.loadStatus = list.length < this.pagesize ? 'noMore' : 'more';
      }).catch(err => {
      });
    },
    getDetailsInfo({class_type, task_id}) {
      const temp = {
        1: 'getAiDetailsInfo',
        2: 'getDrawDetailsInfo',
        3: 'getDrawDetailsInfo',
      }
      const methodName = temp?.[`${class_type}`] || 'getDrawDetailsInfo';
      return userApi?.[methodName]({task_id})
    }
  }
}