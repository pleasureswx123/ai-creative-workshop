import {userApi} from '@/api'

export default {
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      loadStatus: '', // loadmore/loading/nomore
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
      this.pagesize = 10;
      this.loadStatus = '';
    },
    loadMore() {
      if(this.loadStatus === 'nomore') {
        return;
      }
      this.loadStatus = 'loading';
      return userApi.getPrompts({topic_id: this.topicId, page: this.page, pagesize: this.pagesize}).then(res => {
        debugger
        const {list = []} = res || {};
        this.list = [...this.list, ...(list || [])];
        this.loadStatus = list.length < this.pagesize ? 'nomore' : 'loadmore';
      }).catch(err => {
        const list = [
            {
              "id": 261,
              "title": "\u521b\u4f5c\u77ed\u89c6\u9891\u811a\u672c",
              "desc": "\u8f93\u5165\u89c6\u9891\u7684\u7b80\u77ed\u63cf\u8ff0\uff0c\u751f\u6210\uff1a\u6807\u9898\u3001\u573a\u666f\u548c\u6574\u4e2a\u811a\u672c",
              "usages": 470,
              "views": 1131,
              "isVote": 0
            }, {
            "id": 525,
            "title": "\u6587\u7ae0\u964d\u91cd\u53bb\u91cd\u5de5\u5177",
            "desc": "\u5c06\u5185\u5bb9\u53bb\u91cd",
            "usages": 1027,
            "views": 1665,
            "isVote": 0
          }, {
            "id": 531,
            "title": "\u8bba\u6587\u5f3a\u529b\u964d\u91cd\u5de5\u5177",
            "desc": "\u6587\u7ae0\u964d\u91cd\uff0c\u8bf7\u8f93\u5165\u5185\u5bb9",
            "usages": 4521,
            "views": 2656,
            "isVote": 0
          }, {
            "id": 44,
            "title": "\u53e5\u5b50\u91cd\u5199",
            "desc": "\u91cd\u65b0\u7ec4\u7ec7\u6587\u7ae0\u53e5\u5b50",
            "usages": 3522,
            "views": 2426,
            "isVote": 0
          }, {
            "id": 9,
            "title": "\u7eed\u5199\u6587\u7ae0",
            "desc": "\u5e2e\u4f60\u7eed\u5199\u6587\u7ae0",
            "usages": 1313,
            "views": 1386,
            "isVote": 0
          }, {
            "id": 7,
            "title": "\u603b\u7ed3\u6587\u7ae0\u91cd\u70b9",
            "desc": "\u603b\u7ed3\u6587\u7ae0\u7684\u91cd\u70b9",
            "usages": 777,
            "views": 675,
            "isVote": 0
          }, {
            "id": 24,
            "title": "\u7b80\u5355\u53bb\u91cd\u5de5\u5177",
            "desc": "\u5c06\u5185\u5bb9\u53bb\u91cd",
            "usages": 181,
            "views": 372,
            "isVote": 0
          }, {
            "id": 51,
            "title": "\u6d41\u7a0b\u6587\u6863\u751f\u6210\u5668",
            "desc": "\u4e3a\u56fa\u5b9a\u6d41\u7a0b\u7684\u6587\u6863\u751f\u6210\u5927\u7eb2\uff0c\u540c\u6837\u9002\u7528\u4e8e\u5176\u4ed6\u7c7b\u578b\u7684\u6587\u6863",
            "usages": 49,
            "views": 241,
            "isVote": 0
          }, {
            "id": 1,
            "title": "\u5199\u4e00\u7bc7\u6587\u7ae0",
            "desc": "\u7528\u4f60\u559c\u6b22\u7684\u8bed\u8a00\u5199\u4e00\u7bc7\u5173\u4e8e\u4efb\u4f55\u4e3b\u9898\u7684\u6587\u7ae0",
            "usages": 5019,
            "views": 4099,
            "isVote": 0
          }, {
            "id": 344,
            "title": "\u8bba\u6587\u5185\u5bb9\u6269\u5199",
            "desc": "\u6839\u636e\u8bba\u6587\u4e3b\u9898\u8fdb\u884c\u5185\u5bb9\u521b\u4f5c\u6269\u5199",
            "usages": 1182,
            "views": 1183,
            "isVote": 0
          }, {
            "id": 34,
            "title": "\u751f\u6210\u82b1\u54e8\u7684\u6807\u9898",
            "desc": "\u6839\u636e\u7ed9\u5b9a\u5173\u952e\u8bcd\uff0c\u751f\u6210\u82b1\u54e8\u7684\u6807\u9898",
            "usages": 920,
            "views": 672,
            "isVote": 0
          }, {
            "id": 39,
            "title": "\u6587\u6848\u6da6\u8272",
            "desc": "\u5bf9\u63d0\u4f9b\u7684\u63cf\u8ff0\u6da6\u8272",
            "usages": 844,
            "views": 1080,
            "isVote": 0
          }, {
            "id": 36,
            "title": "\u5185\u5bb9\u4f2a\u539f\u521b",
            "desc": "\u8f93\u5165\u9700\u8981\u6539\u5199\u7684\u5185\u5bb9\uff0c\u5e2e\u4f60\u6539\u5199\u505a\u4f2a\u539f\u521b\u3002",
            "usages": 695,
            "views": 990,
            "isVote": 0
          }, {
            "id": 491,
            "title": "\u751f\u6210\u56fe\u7247",
            "desc": "\u53ef\u4ee5\u6839\u636e\u4f60\u7684\u63cf\u8ff0\u751f\u6210\u56fe\u50cf\uff0c\u8bf7\u5f00\u59cb\u63cf\u8ff0\u56fe\u50cf\u3002",
            "usages": 674,
            "views": 856,
            "isVote": 0
          }, {
            "id": 16,
            "title": "PPT\u5236\u4f5c",
            "desc": "PPT MindShow\u6e90\u4ee3\u7801\u751f\u6210\uff0c\u53ef\u76f4\u63a5\u751f\u6210PPT\u6e90\u7801\uff0c\u9700\u4e0eMindShow\u7ed3\u5408\u3002",
            "usages": 616,
            "views": 1779,
            "isVote": 0
          }, {
            "id": 77,
            "title": "\u670b\u53cb\u5708\u6587\u6848",
            "desc": "\u4e00\u952e\u751f\u6210\u4ee4\u4eba\u5370\u8c61\u6df1\u523b\u7684\u670b\u53cb\u5708\u6587\u6848",
            "usages": 595,
            "views": 721,
            "isVote": 0
          }, {
            "id": 340,
            "title": "\u64b0\u5199\u8bba\u6587",
            "desc": "\u6839\u636e\u8981\u6c42\u5e2e\u4f60\u5199\u8bba\u6587",
            "usages": 573,
            "views": 941,
            "isVote": 0
          }, {
            "id": 480,
            "title": "\u59d3\u540d\u5206\u6790",
            "desc": "\u6839\u636e\u63d0\u4f9b\u7684\u540d\u5b57\u4e3a\u7528\u6237\u5206\u6790\u6027\u683c\u7279\u70b9\u548c\u547d\u8fd0\u8d8b\u52bf",
            "usages": 504,
            "views": 494,
            "isVote": 0
          }, {
            "id": 28,
            "title": "\u4eba\u5de5\u98ce\u683c\u6539\u5199",
            "desc": "\u5c06\u673a\u5668\u751f\u6210\u7684\u6587\u7ae0\uff0c\u6539\u5199\u6210\u4eba\u5de5\u98ce\u683c",
            "usages": 469,
            "views": 511,
            "isVote": 0
          }, {
            "id": 4,
            "title": "\u6539\u5199\u6210\u5c0f\u7ea2\u4e66\u98ce\u683c",
            "desc": "\u5c06\u6587\u672c\u6539\u5199\u6210\u5c0f\u7ea2\u4e66\u7684Emoji\u98ce\u683c\u3002",
            "usages": 455,
            "views": 831,
            "isVote": 0
          }
          ]
        this.list = list;
        this.loadStatus = 'nomore'
      });
    },
  }
}