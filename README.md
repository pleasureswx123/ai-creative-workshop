# AI创意工坊-超级语言 (AI Creative Workshop)

## 项目概述

AI创意工坊-超级语言是一个基于 uni-app 框架开发的多功能 AI 创意平台，致力于为用户提供全方位的 AI 创意工具和服务。本项目采用前后端分离架构，通过整合多种先进的 AI 生成技术，实现了文本生成图像、图像编辑、视频制作等多样化功能。

## 系统架构

### 技术架构
- **前端框架**：uni-app（支持多端统一开发）
- **UI 框架**：uView UI
- **状态管理**：Vuex
- **网络请求**：@aigcui/request
- **构建工具**：webpack
- **包管理器**：npm/yarn

### 系统模块
```
├── 用户系统
│   ├── 用户认证
│   ├── 个人中心
│   └── 作品管理
├── AI创作系统
│   ├── 文生图
│   ├── 图生图
│   └── 图生视频
├── 社区系统
│   ├── 作品展示
│   ├── 互动点赞
│   └── 分享功能
└── 支付系统
    ├── 订单管理
    └── 支付集成
```

## 项目结构

```
├── api/                # API 接口目录
│   ├── user.js        # 用户相关接口
│   ├── photo.js       # 图片处理接口
│   ├── novel.js       # 文本生成接口
│   └── sound.js       # 音频处理接口
├── components/         # 公共组件
│   ├── common/        # 通用组件
│   └── business/      # 业务组件
├── pages/             # 页面文件
│   ├── index/         # 首页
│   ├── create/        # 创作中心
│   └── user/          # 用户中心
├── static/            # 静态资源
├── store/             # Vuex 状态管理
├── utils/             # 工具函数
├── config/            # 配置文件
└── mock/              # 模拟数据
```

## 产品需求说明（PRD）

### 1. 文本生成图像
- **功能描述**：用户输入文本描述，系统生成对应的图像
- **核心特性**：
  - 多种艺术风格选择
  - 提示词优化建议
  - 批量生成功能
  - 历史记录保存

### 2. 图像编辑与生成
- **功能描述**：提供多样化的图像编辑和生成工具
- **核心特性**：
  - 智能抠图
  - 风格迁移
  - 图像修复
  - 超分辨率重建

### 3. 图像生成视频
- **功能描述**：将静态图片转换为动态视频内容
- **核心特性**：
  - 多种动画效果
  - 自定义时长
  - 转场特效
  - 音乐配乐

### 4. 智能人像生成
- **功能描述**：基于 AI 的智能人像生成系统
- **核心特性**：
  - 面部特征定制
  - 表情生成
  - 姿态调整
  - 风格化处理

## 开发环境要求

- Node.js >= 12.0.0
- HBuilderX 最新版
- npm 或 yarn
- 内存 >= 8GB（推荐16GB）

## 快速开始

1. **克隆项目**
```bash
git clone [项目地址]
cd ai-creative-workshop
```

2. **安装依赖**
```bash
# 使用 yarn
yarn install

# 或使用 npm
npm install
```

3. **运行项目**
```bash
# 开发模式
npm run dev:h5

# 生产构建
npm run build:h5
```

## API 文档

API 文档使用 Swagger 生成，访问地址：`http://localhost:3000/api-docs`

## 部署指南

1. **环境准备**
   - Node.js 环境配置
   - nginx 配置（生产环境）
   - SSL 证书（可选）

2. **构建部署**
   - 执行构建命令
   - 上传静态资源
   - 配置 nginx 反向代理

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'Add xxx feature'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 许可证

本项目基于 ISC 许可证开源。

```bash

yarn install

cnpm i
```