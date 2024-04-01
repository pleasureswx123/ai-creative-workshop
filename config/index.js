const memberInfo = [  // ['', '普通会员', '白银会员', '黄金会员']
  '', '黄金会员', '铂金会员', '黑金会员'
]

const routerKeyMap = {
  // 图片处理工具 classId: 1
  3: 'ai-face',
  7: 'hd-redraw',
  4: 'remove-bg',
  5: 'replace-bg',
  6: 'ai-expand',
  8: 'part-redraw',
  9: 'replace-bg-txt',

  // 个人写真摄影工具 classId: 3
  12: 'photo-clothing',
  13: 'photo-pictorials',
  14: 'photo-classical',
  15: 'photo-han',
  16: 'photo-modern',
  17: 'photo-cartoon',

  // 三八妇女节活动工具 classId: 4
  19: 'woman-style1',
  20: 'woman-style2',
  21: 'woman-style3',
  22: 'woman-style4',
  23: 'woman-style5',

  // 视频工具 classId: 2
  2: 'img-to-video',
  10: 'img-to-dance',
  11: 'img-to-draw',
  25: 'text-to-video',
  26: 'text-to-dance-video',
}

const getMapRouter = ({task_type, task_id}) => {
  let path = '';
  const taskType = +task_type;
  if(taskType === 1) {
    path = `/pages/photos/index?task_id=${task_id}`
  }
  if(taskType === 27) {
    path = `/pages/special/tweets`
  }
  if([28, 29].includes(taskType)) {
    path = `/pages/electronic/index?task_id=${task_id}`
  }
  if(Object.keys(routerKeyMap).includes(`${task_type}`)) {
    path = `/pages/picture/${routerKeyMap[`${task_type}`]}?type=${task_type}`
  }
  return path;
}

export {
  memberInfo,
  routerKeyMap,
  getMapRouter
}