# 小茧同学（微信小程序）智能题库框架

一个可直接在微信开发者工具中打开的**小程序整体骨架**，覆盖以下核心能力：

- 拍照上传题目（当前为本地记录，可扩展 OCR/后端识别）
- 一级模块分类、二级分类
- 模块刷题 / 二级分类刷题
- 仅刷题流程（单题作答、提交、解析）
- 错题练习 / 收藏练习
- 本地持久化学习状态（错题、收藏、上传记录）

## 1. 目录结构

```text
.
├── app.js
├── app.json
├── app.wxss
├── components
│   └── question-card
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
├── data
│   └── questions.js
├── pages
│   ├── home
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── my
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── practice
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── subcategory
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── upload
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
├── project.config.json
├── project.private.config.json
├── sitemap.json
└── store
    └── questionStore.js
```

## 2. 页面与业务流

### 首页 `pages/home`
- 展示题库统计
- 展示一级模块列表
- 入口：
  - 拍照上传
  - 我的练习
  - 进入模块二级分类

### 二级分类页 `pages/subcategory`
- 展示当前一级模块下所有二级分类
- 支持：
  - 模块刷题（不区分二级）
  - 按二级分类刷题

### 刷题页 `pages/practice`
- 仅刷题交互：
  - 选择选项
  - 提交答案
  - 查看解析
  - 上一题 / 下一题
- 答错自动入错题本，答对会从错题本移除
- 可对当前题收藏 / 取消收藏
- 支持 3 种模式：
  - `normal`：分类刷题
  - `wrong`：错题练习
  - `favorite`：收藏练习

### 拍照上传页 `pages/upload`
- 拍照或相册选图
- 记录题目备注
- 保存上传记录（本地）

### 我的练习页 `pages/my`
- 展示错题、收藏、上传等统计
- 一键进入错题练习 / 收藏练习
- 显示最近上传记录

## 3. 数据层说明

### 题库数据 `data/questions.js`
- `taxonomy`：一级 + 二级分类结构
- `questions`：示例题目列表（可按学段/学科继续扩展）

### 状态管理 `store/questionStore.js`
统一管理本地存储与题目筛选能力：

- `getModules()`
- `getSubcategories(moduleId)`
- `getQuestions(params)`
- `toggleFavorite(questionId)`
- `markWrong(questionId)` / `unmarkWrong(questionId)`
- `addUploadRecord(payload)`
- `getUploadRecords()`
- `getStats()`

## 4. 本地运行方式

1. 打开微信开发者工具
2. 导入项目目录（当前仓库根目录）
3. 使用测试号/游客模式编译
4. 默认首页为 `pages/home/index`

## 5. 后续建议扩展（下一阶段）

- 接入 OCR 服务：上传图片后自动识别题干和选项
- 接入后端 API：实现云端题库与多端同步学习进度
- 新增用户体系：登录、班级、学习报告
- 新增智能推荐：根据错题分布推荐下一轮训练
- 增加题型：填空题、判断题、主观题
- 引入单元测试与 E2E 测试，保障题库逻辑稳定
