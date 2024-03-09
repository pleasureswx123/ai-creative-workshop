import {userApi} from '@/api'

export default {
  provide() {
    return {
      handleDelTask: this.handleDelTask
    }
  },
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
    handleDelTask({task_id}) {
      uni.showModal({
        title: '删除任务',
        content: '该操作不可撤销，确认要删除任务吗？',
        confirmText: '确定删除',
        cancelText: '取消',
        success: res => {
          if (res.confirm) {
            userApi.delCreation({task_id}).then(res => {
              this.initParams();
              this.loadMore();
            }).catch(err => {})
          }
        }
      });
    },
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
        3: 'getDigitDetailsInfo',
      }
      const methodName = temp?.[`${class_type}`] || 'getDrawDetailsInfo';
      return userApi?.[methodName]({task_id})
    }
  }
}