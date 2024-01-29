<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container" @click="hideCopyBtn">
    <view class="page-content">
      <QmSubTabs :list="modelList" :value.sync="modelId"></QmSubTabs>
      <view class="main-content">
        <scroll-view v-if="lists && lists.length > 0" style="height: 100%;"
                     :scroll-x="false" :scroll-y="true" :scroll-with-animation="false"
                     :scroll-top="scrollTop">
          <view class="list">
            <block v-for="(item, index) in lists" :key="index">
              <view class="message" :data-index="index" v-if="item.user == 'AI'" style="background: #f7f7f8">
                <view class="avatar">
                  <image mode="widthFix" src="/static/images/ic_ai.png" />
                </view>
                <view class="text markdown-body">
                  <textComponent :text="item.message"></textComponent>
                  <view class="tools">
                    <view>
                      <view class="btn" @click="copyText(item.message)">
                        <image class="icon" src="/static/images/ic_copy.png"></image>
                        <span>{{ '复制内容' | lang }}</span>
                      </view>
                    </view>
                    <view>
                      <view class="btn" :title="'重新回答' | lang" @tap="retry(index - 1)" style="margin-right: 0;">
                        <image class="icon" src="/static/images/ic_retry.png"></image>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
        
              <view class="message" v-else style="background: #fff">
                <view class="avatar" style="background: #9aa37e">
                  <image mode="widthFix" :src="userAvatar" />
                </view>
                <view class="text markdown-body" @longpress="showCopyBtn" :data-text="item.message">
                  <textComponent :text="item.message"></textComponent>
                </view>
              </view>
            </block>
            <view class="message" style="background: #f7f7f8" v-if="writing || writingText">
              <view class="avatar">
                <image src="/static/images/ic_ai.png" />
              </view>
              <view class="text markdown-body">
                <textComponent :text="writingText" :writing="!!(writing || writingText)"></textComponent>
                <view class="tools">
                  <view>
                    <view class="btn" @click="stopFetch">
                      <image class="icon" src="/static/images/ic_stop.png"></image>
                      <span>{{ '停止回复' | lang }}</span>
                    </view>
                  </view>
                </view>
              </view>
            </view>
      
            <view class="btn-copy" :style="'left:' + copyBtnLeft +'px;top:' + copyBtnTop + 'px;'" @tap="copyText(copyBtnText)">{{ '复制' | lang }}</view>
          </view>
        </scroll-view>
        <scroll-view v-else :scroll-x="false" :scroll-y="true"
                     :scroll-with-animation="false" style="height: 100%; background: #f7f7f8;">
          <welcome
              module="cosplay"
              :title="welcomeTitle"
              :desc="welcomeDesc"
              :tips="welcomeTips"
              @use="quickMessage"
          ></welcome>
        </scroll-view>
      </view>
      
      <SendMsg
          :value.sync="message"
          :isLogin="isLogin"
          :hint="role.hint"
          @sendText="sendText"></SendMsg>
    </view>
  </view>
</template>

<script>
import {userApi} from '@/api'
import {mapState, mapActions} from 'vuex';
import SendMsg from './components/SendMsg.vue'
const app = getApp();

import TextComponent from '../../components/message/text'
import Welcome from '../../components/welcome/index2'
import 'katex/dist/katex.min.css'
import '../../static/styles/lib/tailwind.css'
import '../../static/styles/lib/highlight.scss'
import '../../static/styles/lib/github-markdown.scss'
import QmSubTabs from "./components/QmSubTabs.vue";

var textStacks = []
var textOutputSi = 0
var fetchCtrl = null

export default {
  components: {QmSubTabs, SendMsg, TextComponent, Welcome},
  data() {
    return {
      modelId: '',
      role_id: 0,
      isLogin: false,
      siteroot: '',
      lists: [],
      message: '',
      writingText: '',
      writing: false,
      page: 1,
      pagesize: 10,
      scrollTop: 0,
      copyBtnLeft: -200,
      copyBtnTop: 0,
      copyBtnText: ''
    };
  },
  computed: {
    ...mapState('UserInfo', ['modelList']),
    ...mapState('RoleInfo', ['role']),
    welcomeTitle() {
      return this.role.title
    },
    welcomeDesc() {
      return this.role.welcome
    },
    welcomeTips() {
      return this.role.tips
    },
    userAvatar() {
      if(this.userinfo && this.userinfo.avatar) {
        return this.userinfo.avatar
      } else {
        return '/static/img/ic_user.png'
      }
    }
  },
  onLoad(options) {
    const {role_id, id} = options || {};
    const currentId = role_id || id;
    this.role_id = currentId
    this.setData({
      system: app.globalData.system,
      siteroot: app.globalData.siteroot.replace('/web.php', '')
    });
    this.getRoleInfo(currentId);
    this.getModelList();
    this.checkLogin();
  },
  watch: {
    modelId(val) {
      this.getHistoryMsg(val);
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getModelList']),
    ...mapActions('RoleInfo', ['getRoleInfo']),
    async sendText() {
      if (this.writing) {
        return
      }
      var message = this.trim(this.message)
      if (!message) {
        if (this.role.hint) {
          this.message = this.role.hint
          message = this.message
        } else {
          app.globalData.util.message('请输入你的问题')
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
        role_id: this.role_id,
        message: message,
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
        uni.$u.toast(response.statusText)
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
                app.globalData.util.message(error, 'error', function() {
                  uni.navigateTo({
                    url: '/pages/pay/vip'
                  })
                });
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
  
    checkLogin() {
      userApi.checkLogin().then(res => {
        this.isLogin = true;
        userApi.getUserInfo().then(res => {
          this.userinfo = res || {};
        })
      })
    },
    
    getHistoryMsg(ai) {
      const params = {
        ai,
        role_id: this.role_id,
        page: this.page,
        pagesize: this.pagesize
      };
      userApi.getHistoryMsg(params).then(res => {
        this.lists = res.list || [];
        setTimeout(() => {
          this.scrollToBottom();
        }, 300)
      })
    },
    
    quickMessage(text) {
      this.message = text
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
  }
};
</script>
<style>
.page-container {
  height: 100vh;
  background: #fff;
}
.page-content {
  width: 100vw;
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
  overflow: hidden;
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



.list {
  width: 100%;
  height: auto;
}

.message {
  display: flex;
  justify-content: flex-start;
  padding: 40rpx 40rpx;
  border-bottom: 2rpx solid #eee;
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

.btn-copy {
  color: #409EFF;
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