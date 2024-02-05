<template>
  <page-meta page-style="background: #000000" />
  <view class="page-container" @click="hideCopyBtn">
    <view class="page-content">
      <QmNavTop></QmNavTop>
      <QmSubTabs :list="modelList" :value.sync="modelId"></QmSubTabs>
      <view class="main-content">
        <scroll-view v-if="lists && lists.length > 0" class="box-msg-list" :scroll-x="false" :scroll-y="true" :scroll-with-animation="false" :scroll-top="scrollTop" style="height: 100%;">
          <view class="list">
            <block v-for="(item, index) in lists" :key="index">
              <view class="message" :data-index="index" v-if="item.user == 'AI'" style="background: #f7f7f8">
                <view class="avatar">
                  <img mode="widthFix" src="@/static/images/ic_ai.jpg" />
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
                      <view class="btn" :title="'重新回答' | lang" @tap="retry(index - 1)" style="margin-right: 0;">
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
      
            <view class="btn-copy" :style="'left:' + copyBtnLeft +'px;top:' + copyBtnTop + 'px;'" @tap="copyText(copyBtnText)">{{ '复制' | lang }}</view>
          </view>
        </scroll-view>
  
        <scroll-view v-else class="box-msg-list" :scroll-x="false" :scroll-y="true" :scroll-with-animation="false" style="background: #f7f7f8; height: 100%;">
          <welcome
              module="write"
              :title="welcomeTitle"
              :desc="welcomeDesc"
              :tips="welcomeTips"
              @use="quickMessage"
          ></welcome>
        </scroll-view>
      </view>
      
      <view class="box-input" :style="'bottom: ' + (inputShow ? '0' : '-204rpx') + ';'">
        <view class="tools">
          <view v-for="(item, index) in langs" :key="index" class="item" :class="{active: item === lang}"
                @click="changeLang(item)">
            <text>{{item}}</text>
            <image class="ic_sj" src="@/static/images/write/ic_sj.png"></image>
          </view>
          <view class="item close" @click="showInput"
                :style="'transform: rotate(' + (inputShow ? '180' : 0) + 'deg);'">
            <image src="@/static/images/write/ic_up.png" style="width: 32rpx;height: 32rpx;"></image>
          </view>
        </view>
        <view class="input">
          <textarea type="text" v-model="message" :fixed="true" :auto-height="true" :placeholder="prompt.hint" maxlength="3000" cursor-spacing="0" @focus="inputFocus"></textarea>
          <button type="submit" class="btn-send" @click="sendText">
            <image src="@/static/images/ic_send.png"></image>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import ic_user from '@/static/images/avatar.jpg'
const app = getApp();

import TextComponent from '../../components/message/text'
import Welcome from '../../components/welcome/index2'
import 'katex/dist/katex.min.css'
import '@/static/styles/lib/tailwind.css'
import '@/static/styles/lib/highlight.scss'
import '@/static/styles/lib/github-markdown.scss'
import QmSubTabs from "./components/QmSubTabs.vue";

var textStacks = []
var textOutputSi = 0
var fetchCtrl = null

export default {
  components: {
    QmSubTabs,
    TextComponent,
    Welcome
  },
  data() {
    return {
      modelId: '',
      isLogin: false,
      siteroot: '',
      lists: [],
      message: '',
      writingText: '',
      writing: false,
      page: 1,
      pagesize: 10,
      scrollTop: 0,
      prompt: {},
      lang: '简体中文',
      langs: ['简体中文', '繁体中文', 'English'],
      inputShow: true,
      copyBtnLeft: -200,
      copyBtnTop: 0,
      copyBtnText: '',
      userinfo: {}
    };
  },
  computed: {
    ...mapState('UserInfo', ['modelList', 'userInfoState']),
    welcomeTitle() {
      return this.prompt.title
    },
    welcomeDesc() {
      return this.prompt.welcome ? this.prompt.welcome : this.prompt.hint
    },
    welcomeTips() {
      return this.prompt.tips
    },
    userAvatar() {
      return this.userInfoState?.avatar || ic_user
    }
  },
  onLoad(options) {
    if (options.sid) {
      // 分享id
      uni.setStorageSync('sid', options.sid);
    }
    if (options.prompt_id) {
      this.setData({
        prompt_id: options.prompt_id
      })
    } else if (options.id) {
      this.setData({
        prompt_id: options.id
      })
    }
    
    if (window.$lang != 'zh-cn') {
      this.setData({
        lang: 'English',
        langs: ['English', '简体中文', '繁体中文'],
      })
    }
    
    this.setData({
      system: app.globalData.system,
      siteroot: app.globalData.siteroot.replace('/web.php', '')
    });
    this.getPrompt();
    this.getModelList();
    app.globalData.util.checkLogin().then(() => {
      this.setData({
        isLogin: true
      })
      this.getUserInfo();
    });
  },
  watch: {
    modelId(val) {
      this.getHistoryMsg(val);
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getModelList']),
    inputFocus() {
      if (!this.isLogin) {
        app.globalData.util.toLogin(this.$lang('请登录'))
        return
      }
    },
    async sendText() {
      if (this.writing) {
        return
      }
      if (!this.isLogin) {
        app.globalData.util.toLogin(this.$lang('请登录'))
        return
      }
      var message = this.trim(this.message)
      if (!message) {
        if (this.prompt.hint) {
          this.message = this.prompt.hint
          message = this.message
        } else {
          app.globalData.util.message(this.$lang('请输入你的问题'))
          this.message = ''
          return
        }
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
        prompt_id: this.prompt_id,
        message: message,
        lang: this.lang,
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
          }, 500)
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
                app.globalData.util.toLogin(this.$lang(error));
              } else if (error.indexOf('请充值') !== -1) {
                app.globalData.util.toPay('vip');
              } else {
                app.globalData.util.message(this.$lang(error), 'error');
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
    
    showInput() {
      this.inputShow = !this.inputShow
      setTimeout(() => {
        this.scrollToBottom()
      }, 300)
    },
    changeLang(lang) {
      this.lang = lang
      app.globalData.util.message('已切换为【' + lang + '】输出')
      this.inputShow = true
    },
    
    getHistoryMsg(ai) {
      app.globalData.util
          .request({
            url: '/chat/getHistoryMsg',
            data: {
              ai,
              prompt_id: this.prompt_id,
              page: this.page,
              pagesize: this.pagesize
            }
          })
          .then((res) => {
            if (res.data.list.length > 0) {
              this.setData({
                lists: res.data.list
              });
              setTimeout(() => {
                this.scrollToBottom();
              }, 500)
            }
          });
    },
    
    getPrompt() {
      app.globalData.util.request({
        url: '/write/getPrompt',
        data: {
          prompt_id: this.prompt_id
        }
      }).then(res => {
        this.setData({
          prompt: res.data
        })
        document.title = res.data.title
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
      }, 100);
    },
    
    quickMessage(text) {
      this.message = text
    },
  
    copyText(text) {
      let textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.readOnly = "readOnly";
      textarea.style = "width:0;height:0;";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      app.globalData.util.message(this.$lang('已复制'));
      document.execCommand("copy");
      textarea.remove();
    },
    // copyText(e) {
    //   const index = e.currentTarget.dataset.index;
    //   const lists = this.lists;
    //   let message = lists[index].message;
    //   message = message.join('\n');
    //   message = message.replaceAll('&nbsp;', ' ');
    //   uni.setClipboardData({
    //     data: message
    //   });
    // },
    
    async getShareId(way) {
      var share_id = 0;
      await app.globalData.util
          .request({
            url: '/wxapp/doShare',
            data: {
              way: way
            }
          })
          .then((res) => {
            share_id = res.data.share_id;
            if (way == 'timeline') {
              this.setData({
                timeline_share_id: share_id
              });
            }
          });
      return share_id;
    },
    
    
    showCopyBtn(e) {
      let query = uni.createSelectorQuery().in(this);
      query.select('.list').boundingClientRect((res) => {
        if (res) {
          let x = parseInt(e.touches[0].pageX);
          let y = parseInt(e.touches[0].pageY -res.top);
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
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      } else {
        return ''
      }
    },
    
    getUserInfo() {
      app.globalData.util
          .request({
            url: '/user/info',
            loading: false
          })
          .then((res) => {
            this.setData({
              userinfo: res.data
            });
          }).catch(res => {
        
      })
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  //height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
}
@supports (-webkit-touch-callout: none) {
  .page-container {
    height: 100dvh;
  }
}
.page-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.main-content {
  width: 100%;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.box-msg-list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  padding-bottom: 300rpx;
  //left: 0;
  //right: 0;
  //top: 0;
  //bottom: 0;
  background: #fff;
  z-index: 1;
  transition: all 0.3s;
}

.list {
  width: 100%;
  height: auto;
}

.box-input {
  width: 100%;
  height: auto;
  padding: 0 30rpx;
  border-top: 1px solid #d8d8e2;
  background: #f6fafc;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  transition: all 0.3s;
}

.box-input .tools {
  width: 100%;
  height: 72rpx;
  margin-bottom: 10rpx;
  box-sizing: border-box;
  margin-top: 30rpx;
}

.box-input .tools .item {
  width: auto;
  height: 56rpx;
  line-height: 56rpx;
  background: #fff;
  font-size: 24rpx;
  border-radius: 10rpx;
  border: 1px solid #ddd;
  color: #444;
  float: left;
  margin-right: 20rpx;
  position: relative;
  overflow: visible;
  padding: 0 20rpx;
}

.box-input .tools .item .ic_sj {
  width: 24rpx;
  height: 12rpx;
  position: absolute;
  left: 50%;
  margin-left: -12rpx;
  bottom: -12rpx;
  display: none;
}

.box-input .tools .item.active {
  border-color: #04BABE;
}

.box-input .tools .item.active .ic_sj {
  display: block;
}

.box-input .tools .item:active {
  background-color: #fafafa;
}

.box-input .tools .close {
  float: right;
  margin-right: 0;
  background: none;
  border: none;
  transform: rotate(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
}

.box-input .input {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  overflow: hidden;
  transition: all 1s;
  margin-bottom: 40rpx;
}

.box-input .input textarea {
  width: 100%;
  height: 240rpx;
  min-height: 120rpx;
  max-height: 600rpx;
  padding: 20rpx 10rpx 20rpx 20rpx;
  border-radius: 10rpx;
  line-height: 40rpx;
  box-sizing: border-box;
  outline: none;
  border: none;
  resize: none;
  overflow: auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}

.box-input .input .btn-send {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80rpx;
  height: 80rpx;
  padding: 0;
  border: none;
  border-radius: 10rpx;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  background:#fff;
}

.box-input .input .btn-send::after {
  display: none;
}

.box-input .input .btn-send:active {
  background: #f2f2f2;
}

.box-input .input .btn-send image {
  width: 40rpx;
  height: 40rpx;
}


.message {
  display: flex;
  justify-content: flex-start;
  padding: 40rpx 40rpx;
  border-bottom: 2rpx solid #ddd;
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
  padding: 3rpx 0;
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

.cursor {
  background: #3d3d3d;
  width: 100%;
  line-height: 100%;
  border-left: 0.1em solid transparent;
  animation: cursor 0.6s infinite;
  display: inline-block;
  width: 10rpx;
  height: 40rpx;
  position: relative;
  top: 6rpx;
}

/* Animation */
@keyframes cursor {
  50% {
    background: white;
  }
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

.content img {
  width: 100%;
}

.btn-copy {
  color: #409EFF;
}

.message .tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}
.message .tools .btn {
  font-size: 32rpx;
  color: #10a37f;
  display: flex;
  align-items: center;
  float: left;
  margin-right: 10rpx;
}
.message .tools .btn:active {
  opacity: 0.6;
}
.message .tools .btn .icon {
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