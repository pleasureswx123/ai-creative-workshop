# AI创意工坊 (AI Creative Workshop)

## 项目简介

AI创意工坊是一个基于 uni-app 开发的多功能 AI 创意平台，集成了多种先进的 AI 生成技术，为用户提供丰富的创意工具。

## 主要功能

### 1. 文本生成图像 (Text-to-Image)
- 通过文字描述生成高质量图像
- 支持多种艺术风格和场景描述
- 提供详细的提示词优化建议

### 2. 图像编辑与生成 (Image-to-Image)
- 图片风格转换
- 图像修复和增强
- 智能图像编辑工具

### 3. 图像生成视频 (Image-to-Video)
- 将静态图片转换为动态视频
- 支持多种动画效果
- 自定义视频时长和效果

### 4. 智能图片生成
- 智能人像生成
- 场景图片生成
- 艺术创作辅助

### 5. AI视频制作
- 视频风格转换
- 智能视频剪辑
- 视频特效生成

## 技术栈

- 前端框架：uni-app
- UI组件：uView UI
- 状态管理：Vuex
- 依赖管理：npm/yarn
- AI 接口：@aigcui/request

## 项目结构

```
├── api/                # API 接口
├── components/         # 公共组件
├── pages/             # 页面文件
├── static/            # 静态资源
├── store/             # Vuex 状态管理
├── utils/             # 工具函数
└── config/            # 配置文件
```

## 开发环境要求

- Node.js >= 12.0.0
- HBuilderX
- npm 或 yarn

## 安装和运行

1. 安装依赖：
```bash
npm install
# 或
yarn install
```

2. 开发模式运行：
```bash
# HBuilderX中运行
# 或
npm run dev:h5
```

## 贡献指南

欢迎提交问题和功能需求。如果您想贡献代码，请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交您的更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 打开一个 Pull Request

## 许可证

本项目基于 ISC 许可证开源。

```bash

yarn install

cnpm i
```