/**
 * service worker
 */
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// 当 Service Worker 被安装时触发，通常用于预缓存资源
self.addEventListener('install', function(event) {
  // 在安装阶段预缓存网站的静态资源
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 当 Service Worker 被激活时触发，通常用于清理旧版本缓存或其他初始化操作
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // 清理旧版本缓存
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
// 当页面发起网络请求时触发，允许 Service Worker 拦截并处理请求。
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
// 当 Service Worker 收到来自页面的消息时触发，允许 Service Worker 与页面进行通信
self.addEventListener('message', function(event) {
  console.log('接收到页面消息:', event.data);
});
// 当 Service Worker 收到推送通知时触发，允许 Service Worker 处理推送消息
self.addEventListener('push', function(event) {
  // 处理推送通知
});
// 当用户点击推送通知时触发，允许 Service Worker 处理通知的点击事件
self.addEventListener('notificationclick', function(event) {
  // 处理通知点击事件
});
// 当设备重新连接到网络时触发，允许 Service Worker 执行后台同步操作
self.addEventListener('sync', function(event) {
  // 处理后台同步操作
});
// 当网络请求发生错误时触发，允许 Service Worker 处理请求错误
self.addEventListener('fetcherror', function(event) {
  console.error('网络请求错误:', event.request.url);
});
// 当网络请求超时时触发，允许 Service Worker 处理请求超时事件
self.addEventListener('fetchtimeout', function(event) {
  console.error('网络请求超时:', event.request.url);
});
// 当网络请求被终止时触发，允许 Service Worker 处理请求被中止事件
self.addEventListener('fetchabort', function(event) {
  console.warn('网络请求被中止:', event.request.url);
});
// 当后台获取成功时触发，允许 Service Worker 处理后台获取成功事件
self.addEventListener('backgroundfetchsuccess', function(event) {
  // 后台获取成功处理逻辑
});
// 当后台获取失败时触发，允许 Service Worker 处理后台获取失败事件
self.addEventListener('backgroundfetchfail', function(event) {
  // 后台获取失败处理逻辑
});
// 当后台获取被中止时触发，允许 Service Worker 处理后台获取被中止事件
self.addEventListener('backgroundfetchabort', function(event) {
  // 后台获取被中止处理逻辑
});
// 当推送通知被关闭时触发，允许 Service Worker 处理通知被关闭事件
self.addEventListener('notificationclose', function(event) {
  // 处理通知关闭事件
});
// 当推送订阅变化时触发，允许 Service Worker 处理推送订阅变化事件
self.addEventListener('pushsubscriptionchange', function(event) {
  // 处理推送订阅变化事件
});

