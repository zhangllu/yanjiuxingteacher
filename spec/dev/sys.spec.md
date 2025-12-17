# 研究型教师成长系统 - 系统架构文档

<meta>
  <document-id>yanjiuxingteacher-sysarch</document-id>
  <version>1.0.0</version>
  <project>研究型教师成长系统</project>
  <type>系统架构</type>
  <created>2025-12-17</created>
  <depends>real.md, cog.md, pr.spec.md, userstory.spec.md</depends>
</meta>

---

## 1. 架构概述

### 1.1 架构模式

**选定模式：** 分层架构 + 模块化设计

```
┌─────────────────────────────────────────────────────────────┐
│                    表现层 (Presentation)                     │
│              Next.js App Router + React 组件                 │
├─────────────────────────────────────────────────────────────┤
│                    应用层 (Application)                      │
│           API Routes + Server Actions + Middleware           │
├─────────────────────────────────────────────────────────────┤
│                    领域层 (Domain)                           │
│              Services + Business Logic + AI                  │
├─────────────────────────────────────────────────────────────┤
│                  基础设施层 (Infrastructure)                  │
│         Database (Drizzle ORM) + External APIs + Storage     │
└─────────────────────────────────────────────────────────────┘
```

**选择理由：**
- 清晰的职责分离，便于维护
- 适合中等复杂度的 Web 应用
- 支持渐进式开发（迭代交付）
- 与 Next.js App Router 架构契合

### 1.2 部署策略

**开发环境：**
- 本地 PostgreSQL 数据库
- Bun 运行时
- 热重载开发

**生产环境：**
- Vercel 托管（或自托管）
- Neon Serverless PostgreSQL
- 边缘函数支持

### 1.3 技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 前端框架 | Next.js 15 (App Router) | 全栈框架，支持 RSC |
| UI 框架 | Tailwind CSS + shadcn/ui | 原子化 CSS + 组件库 |
| 语言 | TypeScript | 类型安全 |
| 包管理 | Bun | 高性能包管理和运行时 |
| 数据库 | PostgreSQL (本地) / Neon (云端) | 关系型数据库 |
| ORM | Drizzle ORM | 类型安全 ORM |
| 认证 | Better Auth | 现代认证方案 |
| AI 集成 | Vercel AI SDK | 多模型支持 |

---

## 2. 系统架构图

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                           客户端 (Client)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   浏览器     │  │   移动端     │  │   PWA       │                  │
│  │  (Desktop)  │  │  (Mobile)   │  │  (Offline)  │                  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                  │
│         │                │                │                          │
│         └────────────────┼────────────────┘                          │
│                          │                                           │
│                    LocalStorage                                      │
│                   (本地优先存储)                                      │
└──────────────────────────┼───────────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────┼───────────────────────────────────────────┐
│                          ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Next.js 应用                              │    │
│  │  ┌─────────────────────────────────────────────────────┐    │    │
│  │  │                 App Router                           │    │    │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │    │
│  │  │  │  Auth   │ │  Main   │ │  Admin  │ │   API   │   │    │    │
│  │  │  │ Routes  │ │ Routes  │ │ Routes  │ │ Routes  │   │    │    │
│  │  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘   │    │    │
│  │  └───────┼──────────┼──────────┼──────────┼───────────┘    │    │
│  │          │          │          │          │                 │    │
│  │  ┌───────┴──────────┴──────────┴──────────┴───────────┐    │    │
│  │  │                   Middleware                        │    │    │
│  │  │         (Auth Check + Rate Limit + CORS)           │    │    │
│  │  └───────────────────────┬────────────────────────────┘    │    │
│  │                          │                                  │    │
│  │  ┌───────────────────────┴────────────────────────────┐    │    │
│  │  │                    Services                         │    │    │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │    │    │
│  │  │  │  Auth  │ │Observ- │ │Research│ │   AI   │      │    │    │
│  │  │  │Service │ │ation   │ │Service │ │Service │      │    │    │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘      │    │    │
│  │  └───────────────────────┬────────────────────────────┘    │    │
│  │                          │                                  │    │
│  │  ┌───────────────────────┴────────────────────────────┐    │    │
│  │  │                  Drizzle ORM                        │    │    │
│  │  └───────────────────────┬────────────────────────────┘    │    │
│  └──────────────────────────┼────────────────────────────────┘    │
│                             │                                      │
│                    服务器 (Vercel / 自托管)                         │
└─────────────────────────────┼──────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   PostgreSQL  │   │   AI Models   │   │   External    │
│  (Neon/本地)  │   │ (Claude/GPT)  │   │    APIs       │
└───────────────┘   └───────────────┘   └───────────────┘
```

### 2.2 数据流架构

```
教师操作流程：

┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  观察   │───▶│  问题   │───▶│  研究   │───▶│  反思   │
│  记录   │    │  提炼   │    │  设计   │    │  写作   │
└────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
     │              │              │              │
     ▼              ▼              ▼              ▼
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ 本地    │    │ AI 辅助 │    │ 伦理    │    │ 匿名化  │
│ 存储    │    │ 标注    │    │ 审查    │    │ 分享    │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

---

## 3. 子系统设计

### 3.1 认证子系统 (Auth)

**职责：** 用户认证、会话管理、权限控制

**组件：**
- `auth.service.ts`：认证业务逻辑
- `auth.config.ts`：Better Auth 配置
- `middleware.ts`：认证中间件

**接口：**
- 输入：用户凭证（邮箱/密码）
- 输出：会话令牌、用户信息

**依赖关系：**
- 依赖于：数据库（用户表）
- 被使用于：所有需要认证的子系统

**约束（来自 real.md）：**
- C1：教师数据隔离，仅本人可访问
- 密码必须哈希存储
- 会话需要安全管理

### 3.2 观察记录子系统 (Observation)

**职责：** 教学观察的创建、存储、检索

**组件：**
- `observation.service.ts`：观察记录业务逻辑
- `deidentify.service.ts`：去标识化服务
- `local-storage.service.ts`：本地存储服务

**接口：**
- 输入：观察内容、焦点分类
- 输出：去标识化后的观察记录

**依赖关系：**
- 依赖于：Auth（用户身份）、AI（去标识化检测）
- 被使用于：Research（研究素材）

**约束（来自 real.md）：**
- C2：学生信息必须去标识化
- C7：本地优先存储

### 3.3 研究问题子系统 (Question)

**职责：** 研究问题的提炼、管理

**组件：**
- `question.service.ts`：问题管理业务逻辑
- `ai-question.service.ts`：AI 问题提炼服务

**接口：**
- 输入：观察记录、教师请求
- 输出：研究问题建议（带 AI 标注）

**依赖关系：**
- 依赖于：Observation、AI
- 被使用于：Research

**约束（来自 real.md）：**
- C3：AI 建议必须明确标注

### 3.4 研究项目子系统 (Research)

**职责：** 研究方案设计、项目管理、数据收集

**组件：**
- `research.service.ts`：研究项目业务逻辑
- `template.service.ts`：研究方法模板服务
- `ethics.service.ts`：伦理审查服务

**接口：**
- 输入：研究问题、方法选择、方案设计
- 输出：研究项目、数据记录

**依赖关系：**
- 依赖于：Question、AI、Auth
- 被使用于：Reflection、Output

**约束（来自 real.md）：**
- C4：必须提供伦理审查指引

### 3.5 反思日志子系统 (Reflection)

**职责：** 反思日志的创建、AI 辅助、管理

**组件：**
- `reflection.service.ts`：反思日志业务逻辑
- `ai-reflection.service.ts`：AI 反思提示服务

**接口：**
- 输入：反思内容、关联项目
- 输出：结构化反思日志

**依赖关系：**
- 依赖于：Research、AI、Auth
- 被使用于：Output

**约束（来自 real.md）：**
- C1：反思内容仅教师本人可见
- C3：AI 辅助必须标注

### 3.6 成果分享子系统 (Output)

**职责：** 研究成果撰写、匿名化、社区发布

**组件：**
- `output.service.ts`：成果管理业务逻辑
- `anonymize.service.ts`：匿名化服务
- `community.service.ts`：社区发布服务

**接口：**
- 输入：研究报告、匿名化请求
- 输出：匿名化后的成果、社区发布

**依赖关系：**
- 依赖于：Research、Reflection、Auth
- 被使用于：Community

**约束（来自 real.md）：**
- C5：分享必须匿名化

### 3.7 学习路径子系统 (Learning)

**职责：** 课程模块管理、学习进度跟踪

**组件：**
- `learning.service.ts`：学习路径业务逻辑
- `course.service.ts`：课程模块服务
- `progress.service.ts`：进度跟踪服务

**接口：**
- 输入：教师阶段、学习行为
- 输出：课程推荐、进度更新

**依赖关系：**
- 依赖于：Auth
- 被使用于：所有子系统（提供学习支持）

**约束（来自 real.md）：**
- C6：渐进式学习路径

### 3.8 AI 网关子系统 (AI Gateway)

**职责：** AI 模型调用、响应处理、标注管理

**组件：**
- `ai.service.ts`：AI 调用统一接口
- `ai-label.service.ts`：AI 标注服务
- `model-router.ts`：多模型路由

**接口：**
- 输入：提示词、上下文
- 输出：AI 响应（带标注）

**依赖关系：**
- 依赖于：外部 AI API（Claude/GPT）
- 被使用于：Question、Research、Reflection

**约束（来自 real.md）：**
- C3：所有 AI 输出必须标注

---

## 4. API 设计

### 4.1 API 结构概览

```
/api
├── /auth                    # 认证相关
│   ├── POST /register       # 用户注册
│   ├── POST /login          # 用户登录
│   ├── POST /logout         # 用户登出
│   └── GET  /session        # 获取当前会话
│
├── /observations            # 观察记录
│   ├── GET  /               # 列出观察记录
│   ├── POST /               # 创建观察记录
│   ├── GET  /:id            # 获取观察详情
│   ├── PUT  /:id            # 更新观察记录
│   └── DELETE /:id          # 删除观察记录
│
├── /questions               # 研究问题
│   ├── GET  /               # 列出研究问题
│   ├── POST /               # 创建研究问题
│   ├── GET  /:id            # 获取问题详情
│   ├── PUT  /:id            # 更新研究问题
│   └── DELETE /:id          # 删除研究问题
│
├── /projects                # 研究项目
│   ├── GET  /               # 列出研究项目
│   ├── POST /               # 创建研究项目
│   ├── GET  /:id            # 获取项目详情
│   ├── PUT  /:id            # 更新研究项目
│   ├── DELETE /:id          # 删除研究项目
│   └── POST /:id/data       # 添加研究数据
│
├── /reflections             # 反思日志
│   ├── GET  /               # 列出反思日志
│   ├── POST /               # 创建反思日志
│   ├── GET  /:id            # 获取反思详情
│   ├── PUT  /:id            # 更新反思日志
│   └── DELETE /:id          # 删除反思日志
│
├── /outputs                 # 研究成果
│   ├── GET  /               # 列出研究成果
│   ├── POST /               # 创建研究成果
│   ├── GET  /:id            # 获取成果详情
│   ├── PUT  /:id            # 更新研究成果
│   ├── POST /:id/anonymize  # 匿名化成果
│   └── POST /:id/publish    # 发布到社区
│
├── /community               # 社区
│   ├── GET  /outputs        # 浏览社区成果
│   └── GET  /outputs/:id    # 查看成果详情
│
├── /courses                 # 课程模块
│   ├── GET  /               # 列出课程模块
│   ├── GET  /:id            # 获取课程详情
│   └── POST /:id/complete   # 完成课程
│
├── /ai                      # AI 辅助
│   ├── POST /generate-question    # 生成研究问题
│   ├── POST /generate-framework   # 生成研究框架
│   ├── POST /reflection-prompt    # 生成反思提示
│   └── POST /deidentify           # 去标识化检测
│
└── /utils                   # 工具
    └── POST /anonymize      # 匿名化文本
```

### 4.2 核心 API 详细设计

#### POST /api/auth/register

**描述：** 用户注册

**认证：** 无

**请求：**
```typescript
{
  email: string;           // 邮箱
  password: string;        // 密码（至少8位）
  schoolLevel: string;     // 学段（幼儿园/小学/初中/高中）
  subject: string;         // 学科
}
```

**响应：**
```typescript
// 200 成功
{
  user: {
    id: string;
    email: string;
    schoolLevel: string;
    subject: string;
    stage: "beginner";     // 初始阶段
    createdAt: string;
  };
  session: {
    token: string;
    expiresAt: string;
  };
}

// 400 邮箱已存在
{ error: "EMAIL_EXISTS", message: "该邮箱已注册" }

// 400 密码强度不足
{ error: "WEAK_PASSWORD", message: "密码至少8位，包含字母和数字" }
```

---

#### POST /api/observations

**描述：** 创建观察记录

**认证：** 必需

**请求：**
```typescript
{
  title: string;           // 观察标题
  content: string;         // 观察内容（已去标识化）
  focusArea: string;       // 观察焦点
  observationDate: string; // 观察日期
}
```

**响应：**
```typescript
// 201 创建成功
{
  id: string;
  title: string;
  content: string;
  focusArea: string;
  observationDate: string;
  teacherId: string;
  createdAt: string;
}

// 400 包含敏感信息
{
  error: "SENSITIVE_INFO_DETECTED",
  message: "检测到学生真实姓名，请去标识化后再保存",
  detectedItems: ["小明", "李华"]
}
```

**约束：**
- 必须通过去标识化检查（C2）
- 数据归属于当前教师（C1）

---

#### POST /api/ai/generate-question

**描述：** AI 辅助生成研究问题

**认证：** 必需

**请求：**
```typescript
{
  observationIds: string[];  // 关联的观察记录 ID
  context?: string;          // 额外上下文
}
```

**响应：**
```typescript
// 200 成功
{
  suggestions: [
    {
      questionText: string;      // 问题描述
      questionType: string;      // 问题类型（描述性/解释性/干预性）
      background: string;        // 问题背景
      aiGenerated: true;         // AI 生成标记
      aiLabel: "AI 辅助建议";    // AI 标注
    }
  ];
  disclaimer: "以上建议由 AI 生成，请教师自主判断是否采纳";
}
```

**约束：**
- 所有建议必须带 AI 标注（C3）
- 必须包含免责声明（C3）

---

#### POST /api/projects

**描述：** 创建研究项目

**认证：** 必需

**请求：**
```typescript
{
  title: string;              // 项目标题
  questionId: string;         // 关联的研究问题
  method: string;             // 研究方法
  design: {
    objective: string;        // 研究目标
    dataCollection: string;   // 数据收集计划
    analysisPlan: string;     // 分析计划
  };
  ethicsConfirmed: boolean;   // 伦理审查确认
}
```

**响应：**
```typescript
// 201 创建成功
{
  id: string;
  title: string;
  questionId: string;
  method: string;
  design: object;
  stage: "design";
  teacherId: string;
  createdAt: string;
}

// 400 未确认伦理审查
{
  error: "ETHICS_NOT_CONFIRMED",
  message: "请确认所有伦理审查要点后再创建项目"
}
```

**约束：**
- 必须确认伦理审查（C4）

---

#### POST /api/outputs/:id/anonymize

**描述：** 匿名化研究成果

**认证：** 必需

**请求：**
```typescript
{
  content: string;  // 待匿名化的内容
}
```

**响应：**
```typescript
// 200 成功
{
  anonymizedContent: string;  // 匿名化后的内容
  removedItems: [
    { type: "school", original: "XX小学", replacement: "[某小学]" },
    { type: "region", original: "北京市", replacement: "[某地区]" }
  ];
  requiresConfirmation: true;
}
```

**约束：**
- 必须移除学校、地区、学生特征（C5）

---


## 5. 目录结构

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证路由组
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (main)/                   # 主应用路由组
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── observations/
│   │   │   ├── page.tsx          # 观察列表
│   │   │   ├── new/
│   │   │   │   └── page.tsx      # 新建观察
│   │   │   └── [id]/
│   │   │       └── page.tsx      # 观察详情
│   │   ├── questions/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── reflections/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── outputs/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── community/
│   │   │   └── page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                      # API 路由
│   │   ├── auth/
│   │   │   └── [...betterauth]/
│   │   │       └── route.ts
│   │   ├── observations/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── questions/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── data/
│   │   │           └── route.ts
│   │   ├── reflections/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── outputs/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── anonymize/
│   │   │       │   └── route.ts
│   │   │       └── publish/
│   │   │           └── route.ts
│   │   ├── community/
│   │   │   └── outputs/
│   │   │       └── route.ts
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── ai/
│   │   │   ├── generate-question/
│   │   │   │   └── route.ts
│   │   │   ├── generate-framework/
│   │   │   │   └── route.ts
│   │   │   ├── reflection-prompt/
│   │   │   │   └── route.ts
│   │   │   └── deidentify/
│   │   │       └── route.ts
│   │   └── utils/
│   │       └── anonymize/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/                   # React 组件
│   ├── ui/                       # shadcn/ui 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── alert.tsx
│   │   └── ...
│   ├── auth/                     # 认证组件
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── user-menu.tsx
│   ├── observation/              # 观察记录组件
│   │   ├── observation-form.tsx
│   │   ├── observation-card.tsx
│   │   ├── observation-list.tsx
│   │   ├── voice-input.tsx
│   │   └── deidentify-alert.tsx
│   ├── question/                 # 研究问题组件
│   │   ├── question-form.tsx
│   │   ├── question-card.tsx
│   │   └── question-list.tsx
│   ├── project/                  # 研究项目组件
│   │   ├── project-form.tsx
│   │   ├── project-card.tsx
│   │   ├── template-selector.tsx
│   │   └── ethics-checklist.tsx
│   ├── reflection/               # 反思日志组件
│   │   ├── reflection-form.tsx
│   │   ├── reflection-card.tsx
│   │   └── reflection-list.tsx
│   ├── output/                   # 研究成果组件
│   │   ├── output-form.tsx
│   │   ├── output-card.tsx
│   │   ├── anonymize-tool.tsx
│   │   └── publish-dialog.tsx
│   ├── ai/                       # AI 相关组件
│   │   ├── ai-button.tsx
│   │   ├── ai-label.tsx
│   │   ├── ai-suggestion.tsx
│   │   └── ai-loading.tsx
│   ├── course/                   # 课程组件
│   │   ├── course-card.tsx
│   │   ├── course-list.tsx
│   │   └── progress-indicator.tsx
│   └── layout/                   # 布局组件
│       ├── header.tsx
│       ├── sidebar.tsx
│       ├── footer.tsx
│       └── mobile-nav.tsx
│
├── lib/                          # 工具和配置
│   ├── db/                       # 数据库
│   │   ├── schema.ts             # Drizzle 模式定义
│   │   ├── index.ts              # 数据库连接
│   │   └── migrations/           # 迁移文件
│   ├── auth/                     # 认证
│   │   ├── config.ts             # Better Auth 配置
│   │   └── client.ts             # 客户端认证
│   ├── ai/                       # AI 配置
│   │   ├── config.ts             # AI SDK 配置
│   │   └── prompts.ts            # 提示词模板
│   ├── utils.ts                  # 通用工具
│   └── constants.ts              # 常量定义
│
├── services/                     # 业务逻辑服务
│   ├── auth.service.ts
│   ├── observation.service.ts
│   ├── deidentify.service.ts
│   ├── question.service.ts
│   ├── project.service.ts
│   ├── reflection.service.ts
│   ├── output.service.ts
│   ├── anonymize.service.ts
│   ├── course.service.ts
│   ├── community.service.ts
│   └── ai.service.ts
│
├── hooks/                        # React Hooks
│   ├── use-auth.ts
│   ├── use-observations.ts
│   ├── use-questions.ts
│   ├── use-projects.ts
│   ├── use-reflections.ts
│   ├── use-local-storage.ts
│   └── use-ai.ts
│
├── types/                        # TypeScript 类型
│   ├── auth.ts
│   ├── observation.ts
│   ├── question.ts
│   ├── project.ts
│   ├── reflection.ts
│   ├── output.ts
│   ├── course.ts
│   └── ai.ts
│
└── constants/                    # 常量
    ├── focus-areas.ts            # 观察焦点分类
    ├── research-methods.ts       # 研究方法
    ├── question-types.ts         # 问题类型
    └── stages.ts                 # 成长阶段
```

**目录命名规范：**

| 目录 | 用途 | 命名规范 |
|------|------|---------|
| app/ | 路由和页面 | 小写，kebab-case |
| components/ | React 组件 | kebab-case 目录，PascalCase 文件 |
| lib/ | 工具和配置 | camelCase.ts |
| services/ | 业务逻辑 | camelCase.service.ts |
| hooks/ | React Hooks | use-kebab-case.ts |
| types/ | 类型定义 | camelCase.ts |

---

## 6. 安全架构

### 6.1 安全层级

```
┌─────────────────────────────────────────────────────────────┐
│                      传输层安全                              │
│                   (HTTPS, HSTS, TLS 1.3)                    │
├─────────────────────────────────────────────────────────────┤
│                      认证层                                  │
│          (Better Auth, 密码哈希, 会话管理)                   │
├─────────────────────────────────────────────────────────────┤
│                      授权层                                  │
│              (数据归属验证, 资源隔离)                        │
├─────────────────────────────────────────────────────────────┤
│                      数据保护层                              │
│     (去标识化, 匿名化, 输入验证, 加密存储)                   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 安全需求矩阵

| 层级 | 需求 | 实现方式 | 约束来源 |
|------|------|---------|---------|
| 传输 | 加密通信 | 仅 HTTPS | 基础安全 |
| 认证 | 密码保护 | bcrypt 哈希 | 基础安全 |
| 认证 | 会话管理 | Better Auth + JWT | 基础安全 |
| 授权 | 数据隔离 | 所有查询带 teacherId | C1 |
| 授权 | 资源归属 | 中间件验证 | C1 |
| 数据 | 学生信息保护 | 去标识化检测 | C2 |
| 数据 | 敏感信息移除 | 匿名化服务 | C5 |
| 数据 | 输入验证 | Zod 模式验证 | 基础安全 |
| 数据 | SQL 注入防护 | Drizzle ORM 参数化 | 基础安全 |
| 数据 | XSS 防护 | React 自动转义 | 基础安全 |

### 6.3 数据隔离实现

**数据库层（Row-Level Security 概念）：**

```typescript
// 所有数据查询必须带 teacherId 条件
// services/observation.service.ts

export async function getObservations(teacherId: string) {
  return db.query.observations.findMany({
    where: eq(observations.teacherId, teacherId),  // 强制隔离
    orderBy: desc(observations.createdAt),
  });
}

export async function getObservation(id: string, teacherId: string) {
  const observation = await db.query.observations.findFirst({
    where: and(
      eq(observations.id, id),
      eq(observations.teacherId, teacherId),  // 验证归属
    ),
  });
  
  if (!observation) {
    throw new Error("OBSERVATION_NOT_FOUND");
  }
  
  return observation;
}
```

**API 层（中间件验证）：**

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const session = await getSession(request);
  
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // 将 teacherId 注入请求上下文
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-teacher-id", session.user.id);
  
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
```

### 6.4 去标识化实现

```typescript
// services/deidentify.service.ts

const NAME_PATTERNS = [
  /[\u4e00-\u9fa5]{2,4}/g,  // 中文姓名（2-4字）
  /[A-Z][a-z]+\s[A-Z][a-z]+/g,  // 英文姓名
];

export function detectSensitiveInfo(content: string): string[] {
  const detected: string[] = [];
  
  for (const pattern of NAME_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      detected.push(...matches);
    }
  }
  
  return detected;
}

export function suggestDeidentification(content: string): {
  original: string;
  suggestion: string;
  replacements: Array<{ from: string; to: string }>;
} {
  const detected = detectSensitiveInfo(content);
  let suggestion = content;
  const replacements: Array<{ from: string; to: string }> = [];
  
  detected.forEach((name, index) => {
    const code = `S${String(index + 1).padStart(3, "0")}`;
    suggestion = suggestion.replace(name, code);
    replacements.push({ from: name, to: code });
  });
  
  return { original: content, suggestion, replacements };
}
```

### 6.5 AI 标注实现

```typescript
// services/ai.service.ts

import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export interface AIResponse<T> {
  data: T;
  aiGenerated: true;
  aiLabel: string;
  disclaimer: string;
}

export async function generateWithLabel<T>(
  prompt: string,
  parser: (text: string) => T
): Promise<AIResponse<T>> {
  const { text } = await generateText({
    model: anthropic("claude-3-sonnet-20240229"),
    prompt,
  });
  
  return {
    data: parser(text),
    aiGenerated: true,
    aiLabel: "AI 辅助建议",
    disclaimer: "以上内容由 AI 生成，请教师自主判断是否采纳",
  };
}
```

```tsx
// components/ai/ai-label.tsx

export function AILabel() {
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium 
                     bg-yellow-100 text-yellow-800 rounded-full">
      <SparklesIcon className="w-3 h-3 mr-1" />
      AI 辅助建议
    </span>
  );
}
```

---

## 7. 数据库设计

### 7.1 核心表结构

```typescript
// lib/db/schema.ts

import { pgTable, uuid, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

// 枚举定义
export const stageEnum = pgEnum("stage", ["beginner", "intermediate", "advanced"]);
export const schoolLevelEnum = pgEnum("school_level", ["kindergarten", "primary", "junior", "senior"]);
export const focusAreaEnum = pgEnum("focus_area", ["teaching", "behavior", "performance", "mental_health", "organization"]);
export const questionTypeEnum = pgEnum("question_type", ["descriptive", "explanatory", "interventional"]);
export const questionSourceEnum = pgEnum("question_source", ["teacher", "ai_assisted"]);
export const researchMethodEnum = pgEnum("research_method", ["action", "case", "observation", "mixed"]);
export const projectStageEnum = pgEnum("project_stage", ["design", "implementation", "analysis", "completed"]);

// 教师表
export const teachers = pgTable("teachers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  schoolLevel: schoolLevelEnum("school_level"),
  subject: text("subject"),
  teachingYears: text("teaching_years"),
  stage: stageEnum("stage").default("beginner"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 观察记录表
export const observations = pgTable("observations", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  title: text("title").notNull(),
  content: text("content").notNull(),  // 已去标识化
  focusArea: focusAreaEnum("focus_area"),
  observationDate: timestamp("observation_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 研究问题表
export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  questionText: text("question_text").notNull(),
  background: text("background"),
  questionType: questionTypeEnum("question_type"),
  source: questionSourceEnum("source").default("teacher"),
  status: text("status").default("pending"),  // pending, researching, completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 研究项目表
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  questionId: uuid("question_id").references(() => questions.id),
  title: text("title").notNull(),
  method: researchMethodEnum("method"),
  design: text("design"),  // JSON 字符串
  stage: projectStageEnum("stage").default("design"),
  ethicsConfirmed: boolean("ethics_confirmed").default(false),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 反思日志表
export const reflections = pgTable("reflections", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  projectId: uuid("project_id").references(() => projects.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  reflectionDate: timestamp("reflection_date"),
  aiAssisted: boolean("ai_assisted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 研究成果表
export const outputs = pgTable("outputs", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  projectId: uuid("project_id").references(() => projects.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  anonymized: boolean("anonymized").default(false),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 课程模块表
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  stage: stageEnum("stage"),
  topic: text("topic"),
  order: text("order"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 学习进度表
export const learningProgress = pgTable("learning_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id").notNull().references(() => teachers.id),
  courseId: uuid("course_id").notNull().references(() => courses.id),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### 7.2 关系图

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   teachers  │───1:N─│ observations│       │   courses   │
└──────┬──────┘       └─────────────┘       └──────┬──────┘
       │                                           │
       │1:N                                        │
       │                                           │
┌──────┴──────┐       ┌─────────────┐       ┌──────┴──────┐
│  questions  │───1:1─│  projects   │       │  learning   │
└─────────────┘       └──────┬──────┘       │  progress   │
                             │              └─────────────┘
                             │1:N
                             │
              ┌──────────────┼──────────────┐
              │              │              │
       ┌──────┴──────┐┌──────┴──────┐┌──────┴──────┐
       │ reflections ││   outputs   ││    data     │
       └─────────────┘└─────────────┘└─────────────┘
```

---

## 8. 技术决策记录 (ADR)

### ADR-001：全栈框架选择

**状态：** 已接受

**背景：**
需要选择一个支持服务端渲染、API 路由、类型安全的全栈框架。

**决策：**
选择 Next.js 15 with App Router。

**理由：**
- React Server Components 支持，减少客户端 JS
- App Router 提供更好的路由组织
- 内置 API 路由，无需单独后端
- Vercel 部署支持，边缘函数
- 社区活跃，生态丰富

**后果：**
- 学习曲线：需要熟悉 App Router 和 RSC
- 部署灵活：可以 Vercel 或自托管

### ADR-002：数据库选择

**状态：** 已接受

**背景：**
需要选择一个支持关系型数据、类型安全、易于部署的数据库方案。

**决策：**
- 本地开发：PostgreSQL
- 云端部署：Neon Serverless PostgreSQL

**理由：**
- PostgreSQL 功能强大，支持 JSON、全文搜索
- Neon 提供 Serverless 模式，按需付费
- 与 Drizzle ORM 完美配合
- 支持分支和预览环境

**后果：**
- 本地需要安装 PostgreSQL
- 云端成本可控（Serverless）

### ADR-003：ORM 选择

**状态：** 已接受

**背景：**
需要选择一个类型安全、性能良好的 ORM。

**决策：**
选择 Drizzle ORM。

**理由：**
- 完全类型安全，与 TypeScript 深度集成
- 轻量级，性能优秀
- SQL-like 语法，学习曲线低
- 支持迁移和模式管理
- 比 Prisma 更轻量

**后果：**
- 需要手写更多 SQL-like 代码
- 社区相对 Prisma 较小

### ADR-004：认证方案选择

**状态：** 已接受

**背景：**
需要选择一个安全、易用的认证方案。

**决策：**
选择 Better Auth。

**理由：**
- 现代化设计，支持多种认证方式
- 与 Next.js 深度集成
- 内置会话管理
- 支持 OAuth、邮箱密码等
- 开源免费

**后果：**
- 相对 NextAuth 较新，文档可能不够完善
- 需要自行管理用户表

### ADR-005：AI 集成方案

**状态：** 已接受

**背景：**
需要集成多个 AI 模型，支持流式响应。

**决策：**
选择 Vercel AI SDK。

**理由：**
- 统一的多模型接口（Claude、GPT、国产模型）
- 内置流式响应支持
- React Hooks 支持
- 与 Next.js 深度集成
- 活跃维护

**后果：**
- 依赖 Vercel 生态
- 需要管理多个 API Key

### ADR-006：本地优先存储策略

**状态：** 已接受

**背景：**
根据 real.md C7 约束，需要实现本地优先的数据存储。

**决策：**
- 使用 IndexedDB 存储本地数据
- 云端同步为可选功能
- 实现离线优先的 PWA

**理由：**
- 增强教师对数据的掌控感
- 支持离线使用
- 降低隐私泄露风险
- 符合约束要求

**后果：**
- 需要实现同步逻辑
- 冲突解决复杂度增加

### ADR-007：AI 标注策略

**状态：** 已接受

**背景：**
根据 real.md C3 约束，所有 AI 生成内容必须明确标注。

**决策：**
- 所有 AI 响应包含 `aiGenerated: true` 标记
- 前端统一使用 `<AILabel />` 组件显示标注
- 数据库记录 AI 辅助来源

**理由：**
- 保持教师主体性
- 防止过度依赖 AI
- 符合约束要求

**后果：**
- 需要在所有 AI 相关组件中添加标注
- 数据模型需要包含来源字段

---

## 9. 部署架构

### 9.1 开发环境

```
┌─────────────────────────────────────────────────────────────┐
│                    开发者本地环境                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   VS Code   │  │    Bun      │  │ PostgreSQL  │         │
│  │   + Kiro    │  │  (运行时)   │  │   (本地)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  开发命令：                                                  │
│  - bun install          # 安装依赖                          │
│  - bun run dev          # 启动开发服务器                     │
│  - bun run db:push      # 同步数据库模式                     │
│  - bun run db:studio    # 打开 Drizzle Studio               │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 生产环境

```
┌─────────────────────────────────────────────────────────────┐
│                      Vercel 平台                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Edge Network                       │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│  │  │  CDN    │  │  Edge   │  │ Static  │             │   │
│  │  │ Assets  │  │Functions│  │  Files  │             │   │
│  │  └─────────┘  └─────────┘  └─────────┘             │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Serverless Functions                 │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│  │  │  API    │  │  Auth   │  │   AI    │             │   │
│  │  │ Routes  │  │ Handler │  │ Gateway │             │   │
│  │  └─────────┘  └─────────┘  └─────────┘             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│     Neon      │   │   Anthropic   │   │    OpenAI     │
│  PostgreSQL   │   │    Claude     │   │     GPT       │
└───────────────┘   └───────────────┘   └───────────────┘
```

### 9.3 环境变量

```bash
# .env.local (开发环境)

# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/yanjiuxingteacher"

# 认证
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# AI
ANTHROPIC_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-..."

# 应用
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

```bash
# .env.production (生产环境)

# 数据库 (Neon)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/yanjiuxingteacher?sslmode=require"

# 认证
BETTER_AUTH_SECRET="production-secret-key"
BETTER_AUTH_URL="https://your-domain.com"

# AI
ANTHROPIC_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-..."

# 应用
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

---

## 10. 质量检查清单

### 10.1 架构检查

- [x] 架构模式适合需求（分层 + 模块化）
- [x] 所有子系统有清晰的职责
- [x] API 遵循 RESTful 约定
- [x] 目录结构支持模块化
- [x] 安全需求已解决
- [x] 技术决策已记录

### 10.2 约束检查（来自 real.md）

- [x] C1：教师数据隔离（所有查询带 teacherId）
- [x] C2：学生信息去标识化（deidentify.service.ts）
- [x] C3：AI 标注（ai.service.ts + AILabel 组件）
- [x] C4：伦理审查（ethics.service.ts + 检查清单）
- [x] C5：匿名化（anonymize.service.ts）
- [x] C6：渐进式学习（course.service.ts + 阶段分级）
- [x] C7：本地优先存储（IndexedDB + 可选同步）

### 10.3 技术栈检查

- [x] Next.js 15 (App Router)
- [x] Tailwind CSS + shadcn/ui
- [x] TypeScript
- [x] Bun
- [x] PostgreSQL / Neon
- [x] Drizzle ORM
- [x] Better Auth
- [x] Vercel AI SDK

---

## 11. 附录

### 11.1 参考链接

| 技术 | 文档链接 |
|------|---------|
| Next.js | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |
| Bun | https://bun.sh/docs |
| Neon | https://neon.tech/docs |
| Drizzle ORM | https://orm.drizzle.team/docs |
| Better Auth | https://www.better-auth.com/docs |
| Vercel AI SDK | https://sdk.vercel.ai/docs |

### 11.2 文档版本历史

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| 1.0.0 | 2025-12-17 | 初始版本 |

---

**文档维护者：** 路屿
**最后更新：** 2025-12-17
**文档类型：** 系统架构文档
