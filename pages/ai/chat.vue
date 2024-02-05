<template>
  <view class="page-content" @click="hideCopyBtn">
<!--    <view class="page" :class="{gold: model === 'model4'}">-->
    <view class="page">
<!--      <view class="tab-model" v-if="hasModel4">
        <view class="tab-item" :class="{active: model === 'default'}" @tap="switchModel('default')">
          {{ '默认' | lang }}</view>
        <view class="tab-item" :class="{active: model === 'model4'}" @tap="switchModel('model4')">{{model4Name}}
        </view>
      </view>-->
      <view class="scroll-container">
        <scroll-view v-if="lists && lists.length > 0" class="box-msg-list" :scroll-x="false" :scroll-y="true"
                     :scroll-with-animation="false" :scroll-top="scrollTop">
          <view class="list">
            <block v-for="(item, index) in lists" :key="index">
              <view class="message" :data-index="index" v-if="item.user == 'AI'" style="background: #f7f7f8">
                <view class="avatar">
                  <img src="@/static/images/ic_ai.jpg" />
                </view>
                <view class="text markdown-body">
                  <textComponent :text="item.message"></textComponent>
                  <view class="tools">
                    <view>
                      <view class="btn" @click="copyText(item.message)">
                        <image class="icon" src="@/static/images/ic_copy.png"></image>
                        <span>{{ '复制内容' | lang }}</span>
                      </view>
                    </view>
                    <view>
                      <view class="btn" :title="'重新回答' | lang" @tap="retry(index - 1)"
                            style="margin-right: 0;">
                        <image class="icon" src="@/static/images/ic_retry.png"></image>
                      </view>
                    </view>
                  </view>
                
                </view>
              </view>
              
              <view class="message" v-else style="background: #fff">
                <view class="avatar" style="background: #9aa37e">
                  <img mode="widthFix" :src="userAvatar" />
                </view>
                <view class="text markdown-body" @longpress="showCopyBtn" :data-text="item.message">
                  <textComponent :text="item.message"></textComponent>
                </view>
              </view>
            </block>
            <view class="message" style="background: #f7f7f8" v-if="writing || writingText">
              <view class="avatar">
                <img src="@/static/images/ic_ai.jpg" />
              </view>
              <view class="text markdown-body">
                <textComponent :text="writingText" :writing="!!(writing || writingText)"></textComponent>
                <view class="tools">
                  <view>
                    <view class="btn" @click="stopFetch">
                      <image class="icon" src="@/static/images/ic_stop.png"></image>
                      <span>{{ '停止回复' | lang }}</span>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            
            <view class="btn-copy" :style="'left:' + copyBtnLeft +'px;top:' + copyBtnTop + 'px;'"
                  @tap="copyText(copyBtnText)">{{ '复制' | lang }}</view>
          </view>
        </scroll-view>
        <scroll-view v-else class="box-msg-list" :scroll-x="false" :scroll-y="true" :scroll-with-animation="false"
                   style="background: #f7f7f8;">
        <welcome module="chat" :title="welcomeTitle" :desc="welcomeDesc" :tips="welcomeTips"
                 :hasModel4="!!hasModel4" @use="quickMessage"></welcome>
      </scroll-view>
      </view>
      <view class="box-input">
        <view class="input">
					<textarea type="text" v-model="message" confirm-type="send" @confirm="sendConfirm"
                    @focus="inputFocus" :auto-height="true" :placeholder="'输入你的问题' | lang" maxlength="3000"
                    cursor-spacing="0"></textarea>
          <button class="btn-send" @tap="sendText">
            <image mode="widthFix" src="@/static/images/ic_send.png"></image>
          </button>
        </view>
<!--        <view class="balance4" v-if="model === 'model4'" @tap="toModel4Pay">
          {{model4Name}} {{ '余额' | lang }}<text>{{balance_model4}}</text>{{ '万字' | lang }}
        </view>-->
      </view>
    </view>
  
  </view>
</template>

<script>
import ic_user from "@/static/images/avatar.jpg";

const app = getApp();
import {mapState} from 'vuex';
import TextComponent from '../../components/message/text'
import Welcome from '../../components/welcome/index2'
import 'katex/dist/katex.min.css'
import '@/static/styles/lib/tailwind.css'
import '@/static/styles/lib/highlight.scss'
import '@/static/styles/lib/github-markdown.scss'

var textStacks = []
var textOutputSi = 0
var fetchCtrl = null

export default {
  props: {
    modelId: {
      type: String,
      default: '',
    }
  },
  components: {
    TextComponent,
    Welcome
  },
  data() {
    return {
      isLogin: false,
      siteroot: '',
      group_id: 0,
      lists: [],
      message: '',
      writingText: '',
      writing: false,
      page: 1,
      pagesize: 10,
      scrollTop: 0,
      page_title: '',
      hasModel4: false,
      model4Name: '',
      balance_model4: 0,
      model: 'default',
      copyBtnLeft: -200,
      copyBtnTop: 0,
      copyBtnText: '',
      chatSetting: {}
    };
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    userAvatar() {
      return this.userInfoState?.avatar || ic_user
    },
    welcomeTitle() {
      return this.page_title
    },
    welcomeDesc() {
      if(!this.chatSetting.welcome && !this.chatSetting.tips) {
        return this.$lang('请输入你的问题')
      } else {
        return this.chatSetting.welcome
      }
    },
    welcomeTips() {
      return this.chatSetting.tips
    }
  },
  watch: {
    modelId() {
      this.init();
    }
  },
  created() {
    let tuid = 0
    let search = window.location.search
    if (search && search.indexOf('tuid=') != -1) {
      search = search.split('tuid=')[1]
      tuid = parseInt(search)
      if (tuid) {
        uni.setStorageSync('tuid', tuid);
      }
    }
    
    this.setData({
      system: app.globalData.system,
      siteroot: app.globalData.siteroot.replace('/web.php', '')
    });
    this.init();
    app.globalData.util.checkLogin().then(() => {
      this.setData({
        isLogin: true
      })
    })
    setTimeout(() => {
      this.setData({
        page_title: app.globalData.page_title
      })
      uni.setNavigationBarTitle({
        title: app.globalData.page_title
      })
    }, 300)
  },
  onShow() {
    // uni.setNavigationBarTitle({
    //   title: app.globalData.page_title
    // })
    // this.setData({
    //   page_title: app.globalData.page_title
    // })
  },
  methods: {
    init() {
      this.getChatSetting();
      this.getHistoryMsg();
      this.checkModel4();
    },
    inputFocus() {
      if (!this.isLogin) {
        app.globalData.util.toLogin('请登录')
        return
      }
    },
    async sendText() {
      if (this.writing) {
        return
      }
      if (!this.isLogin) {
        app.globalData.util.toLogin('请登录')
        return
      }
      const message = this.trim(this.message)
      if (!message) {
        app.globalData.util.message('请输入你的问题')
        this.message = ''
        return
      }
      
      if (textOutputSi) {
        clearInterval(textOutputSi)
        textOutputSi = 0
        textStacks = []
      }
      
      this.lists.push({
        user: '我',
        message: message
      });
      this.message = ''
      this.writing = true
      this.scrollToBottom()
      
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-site', uni.getStorageSync('sitecode'));
      const url = this.siteroot + '/web.php/chat/sendText'
      const data = {
        message: message,
        model: this.model,
        ai: this.modelId
      }
      fetchCtrl = new AbortController()
      const response = await fetch(url, {
        method: 'POST',
        signal: fetchCtrl.signal,
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        this.writing = false
        app.globalData.util.message(response.statusText)
        return
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let curAiMsg = '';
      
      textOutputSi = setInterval(() => {
        if (textStacks.length > 0) {
          this.writingText += textStacks.shift();
          this.scrollToBottom()
        } else if (!this.writing) {
          clearInterval(textOutputSi)
          textOutputSi = 0
          if (this.writingText) {
            this.lists.push({
              user: 'AI',
              message: this.writingText
            });
          }
          this.writingText = '';
          
          setTimeout(() => {
            this.scrollToBottom();
          }, 200)
        }
      }, 20)
      
      while (!done) {
        this.scrollToBottom()
        const {
          value,
          done: readerDone
        } = await reader.read();
        if (value) {
          let char = decoder.decode(value);
          if (char === '\n' && curAiMsg.endsWith('\n')) {
            continue;
          }
          if (char) {
            if (char.indexOf('[error]') !== -1) {
              this.writing = false;
              this.writingText = '';
              this.lists.pop();
              const error = char.replace('[error]', '')
              if (error.indexOf('请登录') !== -1) {
                app.globalData.util.message(error, 'error', function() {
                  app.globalData.util.toLogin(error)
                });
              } else if (error.indexOf('请充值') !== -1) {
                if (this.model == 'model4') {
                  app.globalData.util.toPay('model4');
                } else {
                  app.globalData.util.message(error, 'error', function() {
                    uni.navigateTo({
                      url: '/pages/pay/vip'
                    })
                  });
                }
              } else {
                app.globalData.util.message(error, 'error');
              }
              break;
            }
            // char = char.replaceAll("\n", "<br>");
            this.writing = true;
            // this.writingText += char;
            
            for (var i = 0; i < char.length; i++) {
              textStacks.push(char[i])
            }
          }
        }
        done = readerDone;
      }
      
      this.writing = false;
      if (this.model == 'model4') {
        this.getBalanceModel4();
      }
    },
    
    stopFetch() {
      const writingText = this.writingText
      this.writing = false
      fetchCtrl.abort()
      setTimeout(() => {
        if (!writingText) {
          this.lists.pop()
        }
      }, 50)
    },
    
    retry(index) {
      const _this = this;
      uni.showModal({
        title: this.$lang('提示'),
        content: this.$lang('确定重新回答吗？'),
        confirmText: this.$lang('确定'),
        cancelText: this.$lang('取消'),
        success: function(res) {
          if (res.confirm) {
            _this.message = _this.lists[index].message
            _this.sendText()
          }
        }
      })
    },
    
    sendConfirm() {
      setTimeout(() => {
        this.sendText()
      }, 50)
    },
    
    getChatSetting() {
      app.globalData.util
          .request({
            url: '/chat/getChatSetting'
          })
          .then((res) => {
            this.setData({
              chatSetting: res.data
            });
          });
    },
    
    getHistoryMsg() {
      app.globalData.util
          .request({
            url: '/chat/getHistoryMsg',
            data: {
              model: this.model,
              ai: this.modelId
            }
          })
          .then((res) => {
            this.setData({
              lists: res.data.list
            });
            setTimeout(() => {
              this.scrollToBottom();
            }, 300)
          });
    },
    
    checkModel4() {
      app.globalData.util
          .request({
            url: '/h5/hasModel4',
            data: {
              from: 'h5'
            },
            loading: false
          })
          .then((res) => {
            this.setData({
              hasModel4: res.data.hasModel4,
              model4Name: res.data.model4Name
            })
          });
    },
    
    getBalanceModel4() {
      if (!this.isLogin) {
        return;
      }
      app.globalData.util
          .request({
            url: '/h5/getBalance',
            loading: false
          })
          .then((res) => {
            this.setData({
              balance_model4: res.data.balance_model4
            })
          });
    },
    
    toModel4Pay() {
      wx.navigateTo({
        url: '/pages/pay/model4'
      })
    },
    
    scrollToBottom() {
      setTimeout(() => {
        let query = uni.createSelectorQuery().in(this);
        query.select('.list').boundingClientRect((res) => {
          if (res) {
            this.setData({
              scrollTop: parseInt(res.height)
            });
          }
        });
        query.exec((res) => {});
      }, 200);
    },
    
    quickMessage(text) {
      this.message = text
    },
    
    toPay() {
      uni.navigateTo({
        url: '/pages/pay/pay'
      });
    },
    
    getWxappInfo() {
      const _this = this;
      return new Promise(function(resolve, reject) {
        app.globalData.util
            .request({
              url: '/wxapp/getWxappInfo',
              loading: false
            })
            .then((res) => {
              // 设置页面标题
              let page_title = res.data.page_title;
              if (page_title) {
                uni.setNavigationBarTitle({
                  title: page_title
                });
              }
              if (res.data.index_type == 'chat' && res.data.outtype && res.data.outtype ==
                  'stream') {
                _this.setData({
                  outtype: res.data.outtype
                });
                _this.socketConnect();
              }
              
              // 设置欢迎语
              let welcome = res.data.welcome;
              if (welcome) {
                let lists = _this.lists;
                if (lists.length == 0) {
                  lists.push({
                    user: 'AI',
                    message: [welcome]
                  });
                  _this.setData({
                    lists: lists
                  });
                }
              }
              _this.setData({
                shareTitle: res.data.share_title,
                shareImage: res.data.share_image,
                is_check: res.data.is_check,
                index_type: res.data.index_type,
                content: res.data.content ? JSON.parse(res.data.content) : ''
              });
              resolve();
            });
      });
    },
    
    copyText(text) {
      let textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.readOnly = "readOnly";
      textarea.style = "width:0;height:0;";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      app.globalData.util.message('已复制');
      document.execCommand("copy");
      textarea.remove();
    },
    
    showCopyBtn(e) {
      let query = uni.createSelectorQuery().in(this);
      query.select('.list').boundingClientRect((res) => {
        if (res) {
          let x = parseInt(e.touches[0].pageX);
          let y = parseInt(e.touches[0].pageY - res.top);
          if (y < 0) {
            y = y + 70;
          }
          this.copyBtnLeft = x - 30;
          this.copyBtnTop = y - 60;
          this.copyBtnText = e.currentTarget.dataset.text;
        }
      });
      query.exec((res) => {});
    },
    
    hideCopyBtn() {
      this.copyBtnLeft = -200;
      this.copyBtnText = '';
    },
    
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    
    switchModel(name) {
      if (this.model == name) {
        this.scrollTop += 1;
        return;
      }
      if (this.writing) {
        app.globalData.util.message('输出中，请稍等')
        return;
      }
      if (name == 'model4') {
        var _this = this
        uni.showModal({
          title: this.$lang('提示'),
          content: this.model4Name + '功能更强大，但成本很高，所以单独计费',
          confirmText: '我已知晓',
          showCancel: false,
          success: function(res) {
            _this.setData({
              model: name,
              page: 1
            })
            _this.getHistoryMsg()
            _this.getBalanceModel4()
          }
          
        })
      } else {
        this.setData({
          model: name,
          page: 1
        })
        this.getHistoryMsg()
      }
    }
  }
};
</script>
<style scoped lang="scss">
.page-content {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.tab-model {
  position: fixed;
  left: 218rpx;
  top: 40rpx;
  width: 314rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background: #f6fafc;
  padding: 10rpx;
  box-sizing: border-box;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
}

.tab-model .tab-item {
  width: 140rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 20rpx;
  border: 1px solid #ebf7f5;
  color: #666;
  font-size: 30rpx;
}

.tab-model .tab-item:hover,
.tab-model .active {
  background: #fff;
  color: #666;
  border: 1px solid #f7f7f8;
}

.gold .tab-model .active {
  border: 1px solid #f5ad0c;
  color: #f5ad0c;
}

.gold .balance4 {
  line-height: 48rpx;
  margin-top: 10rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}

.gold .balance4 text {
  color: #10a37f;
  margin: 0 10rpx;
}

.gold .box-input {
  padding-bottom: 20rpx;
}

.gold .box-input .input {
  background: #fffef8;
  border: 1px solid #ffa41a;
  border-radius: 20rpx;
}

.gold .box-input .input textarea {
  min-height: 80rpx;
}


.box-input {
  width: 100%;
  padding: 40rpx 0;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid #d8d8e2;
  background: #f6fafc;
}

.box-input .input {
  width: 690rpx;
  margin: 0 30rpx;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.1);
  background: #fefefe;
}

.box-input .input textarea {
  width: 580rpx;
  padding: 20rpx 10rpx 20rpx 20rpx;
  border-radius: 10rpx;
  line-height: 40rpx;
  max-height: 800rpx;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.box-input .input .btn-send {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100rpx;
  height: 80rpx;
  padding: 0;
  border: none;
  border-radius: 10rpx;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

.box-input .input .btn-send::after {
  display: none;
}

.box-input .input .btn-send:active {
  background: #f2f2f2;
}

.box-input .input .btn-send image {
  width: 40rpx;
}

.empty {
  text-align: center;
  margin: 0 60rpx;
  padding: 80rpx 0 100rpx 0;
  margin-top: 200rpx;
  background: #fff;
  border-radius: 20rpx;
}

.empty image {
  width: 404rpx;
  height: 266rpx;
  margin-bottom: 40rpx;
}

.empty .tip {
  width: 100%;
  line-height: 40rpx;
  font-size: 32rpx;
  letter-spacing: 2rpx;
  color: #444;
}

.btn-finish {
  width: 60%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 48rpx;
  border: none;
  color: #fff;
  margin: 240rpx auto 0 20%;
  box-shadow: 0 0 20rpx rgba(0, 235, 79, 0.1);
  font-size: 30rpx;
  letter-spacing: 4rpx;
  outline: none;
  background: #39b54a;
  text-align: center;
}

.scroll-container {
  height: calc(100% - 152rpx);
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.box-msg-list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  //padding-bottom: 152rpx;
}

.list {
  width: 100%;
  height: auto;
}

.message {
  display: flex;
  justify-content: flex-start;
  padding: 40rpx 40rpx;
  border-top: 2rpx solid #eee;
}

.message:last-child {
  border-bottom: 0;
}

.message .text {
  width: 100%;
  color: #343541;
  line-height: 52rpx;
  font-size: 32rpx;
  word-break: break-all;
  padding: 4rpx 0;
  overflow: hidden;
}

.message .text span {
  display: inline;
}

.message .avatar {
  width: 48rpx;
  height: 48rpx;
  background: #10a37f;
  margin-right: 30rpx;
  color: #fff;
  font-size: 28rpx;
  border-radius: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rpx;
  overflow: hidden;
}

.message .avatar image,
.message .avatar img {
  width: 48rpx;
  height: 48rpx;
}

.account {
  margin: 20rpx 30rpx;
  padding: 16rpx 24rpx 16rpx 24rpx;
  box-sizing: border-box;
  /* background: #f3f6f9; */
  border-radius: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account .balance {
  color: #666;
  font-size: 24rpx;
}

.account .balance text {
  color: #10a37f;
  margin-right: 6rpx;
}

.account .btn-pay {
  display: inline-block;
  color: #10a37f;
  margin-left: 20rpx;
  font-size: 24rpx;
}

.banner-ad {
  width: 100%;
  height: 120rpx;
  border-top: 2rpx solid #ddd;
}

.content {
  padding: 20rpx;
}

.content view {
  margin: 10rpx 0;
  word-break: break-all;
  line-height: 1.5;
  font-size: 28rpx;
  color: #444;
}

.content image {
  width: 100%;
}

.tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}

.tools .btn {
  font-size: 32rpx;
  color: #10a37f;
  display: flex;
  align-items: center;
  float: left;
  margin-right: 10rpx;
}

.tools .btn:active {
  opacity: 0.6;
}

.tools .btn .icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 6rpx;
}

.btn-copy {
  position: absolute;
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  color: #10a37f;
  z-index: 99;
  background: #fff;
  text-align: center;
  border-radius: 10rpx;
  font-size: 28rpx;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
}
</style>