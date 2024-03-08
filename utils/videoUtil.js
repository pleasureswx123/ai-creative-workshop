//
// <style>
//   /* 设置视频容器大小 */
//   #video-container {
//   width: 50vw;
//   height: 50vh; /* 100% 视口高度 */
// }
// </style>
// <!-- 视频播放器容器 -->
// <view id="video-container" class="video-container"></view>

// 调用 createVideoPlayer 函数创建视频播放器
// const player = createVideoPlayer(
//   'video-container',
//   'https://st-cn.chaojiyuyan.cn/upload/user_task/video/02/2/2_1652_1707106565_60724.mp4',
//   {
//     controls: false,
//     preload: 'auto',
//     fluid: true
//   });
/**
 * format video player
 * @param videoElementId
 * @param videoSource
 * @param options
 * @return {null|*}
 */
// 创建一个公用的 Video.js 播放器实例的工具函数
function createVideoPlayer(videoElementId, videoSource, options = {}) {
  // 检查是否传入了 videoElementId 和 videoSource
  if (!videoElementId || !videoSource) {
    console.error('Video element ID and video source are required.');
    return null;
  }
  // 默认选项
  const defaultOptions = {
    width: '100%',
    height: '100%',
    // autoplay: 'muted',
    controls: true, // 是否显示默认控件
    preload: 'auto', // 是否预加载视频
    fluid: true // 是否启用自适应大小
  };

  // 合并传入选项和默认选项
  const mergedOptions = Object.assign({}, defaultOptions, options);

  // 创建 video 元素
  const videoElement = document.createElement('video');
  videoElement.id = videoElementId;
  videoElement.className = 'video-js';

  if(mergedOptions.controls) {
    videoElement.setAttribute('controls', mergedOptions.controls);
  }
  videoElement.setAttribute('preload', mergedOptions.preload);

  // 创建 source 元素
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', videoSource);
  sourceElement.setAttribute('type', 'video/mp4');

  // 将 source 元素添加到 video 元素中
  videoElement.appendChild(sourceElement);

  // 添加自定义选项
  videoElement.setAttribute('data-setup', JSON.stringify({
    fluid: mergedOptions.fluid
  }));

  // 将 video 元素添加到文档中
  const container = document.getElementById(videoElementId);
  container.appendChild(videoElement);

  // 初始化 Video.js 播放器
  const player = videojs(videoElementId);

  // 监听窗口大小变化事件，更新视频大小
  window.addEventListener('resize', function() {
    player.dimensions(window.innerWidth, window.innerHeight);
  });

  // 初始化时设置视频大小
  player.dimensions(window.innerWidth, window.innerHeight);

  return player;
}

export default createVideoPlayer;