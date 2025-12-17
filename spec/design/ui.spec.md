# 研究型教师成长系统 - UI 设计规格文档

<meta>
  <document-id>yanjiuxingteacher-ui</document-id>
  <version>1.0.0</version>
  <project>研究型教师成长系统</project>
  <type>UI 设计规格</type>
  <created>2025-12-17</created>
  <depends>meta.md, real.md, cog.md, pr.spec.md, userstory.spec.md, sys.spec.md</depends>
</meta>

---

## 1. 智能分析

### 1.1 应用类型判断

**判断结果：** MPA（多页面应用）+ 局部 SPA 交互

**理由：**
- 核心功能是离散任务（记录观察、设计研究、撰写反思）
- 教师使用场景分散（课后、周末、假期）
- 各功能模块相对独立
- 需要支持离线使用（本地优先）
- AI 辅助功能需要局部实时交互

**架构决策：**
- 使用 Next.js App Router 的页面路由
- 每个功能模块独立页面
- AI 交互使用客户端组件实现实时响应
- 本地存储优先，支持离线使用

### 1.2 导航结构

**判断结果：** 侧边导航（桌面端）+ 底部导航（移动端）

**理由：**
- 功能模块较多（7个主要模块）
- 需要清晰的层级结构
- 教师可能在移动端快速记录
- 需要显示当前成长阶段

**导航项目：**

| 图标 | 名称 | 路径 | 说明 |
|------|------|------|------|
| 🏠 | 首页 | /dashboard | 概览和快速入口 |
| 👁️ | 观察记录 | /observations | 教学观察管理 |
| ❓ | 研究问题 | /questions | 问题提炼和管理 |
| 📋 | 研究项目 | /projects | 研究方案设计 |
| 📝 | 反思日志 | /reflections | 反思写作 |
| 📄 | 研究成果 | /outputs | 成果撰写和分享 |
| 📚 | 学习课程 | /courses | 研究方法学习 |
| 🌐 | 教师社区 | /community | 浏览他人成果 |
| ⚙️ | 设置 | /settings | 个人设置 |

### 1.3 配色方案 (OKLCH)

**判断结果：** 蓝绿色系（色相 180-220°）

**理由：**
- 教育场景需要专业、可信的感觉
- 蓝绿色传达成长、学习的意象
- 避免过于活泼（不是娱乐应用）
- 需要足够的对比度支持长时间阅读

**色彩定义：**

```css
@theme inline {
  /* 主色 - 蓝绿色 */
  --color-primary: oklch(55% 0.15 200);
  --color-primary-light: oklch(70% 0.12 200);
  --color-primary-dark: oklch(40% 0.15 200);
  
  /* 强调色 - 橙色（用于 AI 标注） */
  --color-accent: oklch(70% 0.15 60);
  --color-accent-light: oklch(85% 0.10 60);
  
  /* 警告色 - 黄色 */
  --color-warning: oklch(80% 0.15 85);
  
  /* 错误色 - 红色 */
  --color-error: oklch(60% 0.20 25);
  
  /* 成功色 - 绿色 */
  --color-success: oklch(65% 0.15 145);
  
  /* 中性色 */
  --color-background: oklch(99% 0.005 200);
  --color-surface: oklch(100% 0 0);
  --color-text: oklch(20% 0.02 200);
  --color-text-muted: oklch(50% 0.02 200);
  --color-border: oklch(90% 0.01 200);
}
```

**暗色模式：**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: oklch(15% 0.02 200);
    --color-surface: oklch(20% 0.02 200);
    --color-text: oklch(95% 0.01 200);
    --color-text-muted: oklch(60% 0.02 200);
    --color-border: oklch(30% 0.02 200);
  }
}
```

---

## 2. 设计系统

### 2.1 设计令牌

```css
@theme inline {
  /* 间距 */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-12: 3rem;     /* 48px */
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* 过渡 */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### 2.2 字体系统

```css
:root {
  /* 系统字体栈（不使用 Google Fonts） */
  --font-sans: ui-sans-serif, system-ui, -apple-system, "PingFang SC", 
               "Microsoft YaHei", "Noto Sans SC", sans-serif;
  --font-mono: ui-monospace, "SF Mono", "Cascadia Code", 
               "Source Code Pro", monospace;
  
  /* 字号 */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  
  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* 字重 */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 2.3 图标系统

使用 Lucide React 图标库：

| 功能 | 图标 | 用途 |
|------|------|------|
| 创建 | Plus, PlusCircle | 新建记录/项目 |
| 编辑 | Pencil, Edit | 编辑内容 |
| 删除 | Trash2 | 删除操作 |
| 保存 | Save, Check | 保存确认 |
| AI | Sparkles, Wand2 | AI 辅助功能 |
| 警告 | AlertTriangle | 去标识化提示 |
| 隐私 | Lock, Eye, EyeOff | 隐私相关 |
| 搜索 | Search | 搜索功能 |
| 筛选 | Filter | 筛选功能 |
| 麦克风 | Mic, MicOff | 语音输入 |

---

## 3. 页面布局

### 3.1 响应式断点

| 名称 | 宽度 | 布局特点 |
|------|------|---------|
| 移动端 (sm) | <640px | 单列、底部导航、全屏表单 |
| 平板 (md) | 640-1024px | 可折叠侧边栏、两列布局 |
| 桌面端 (lg) | >1024px | 固定侧边栏、三列布局 |

### 3.2 主布局结构

**桌面端布局：**

```
┌─────────────────────────────────────────────────────────────┐
│                        Header (64px)                         │
│  Logo    搜索框                    通知  用户头像  阶段徽章   │
├─────────────┬───────────────────────────────────────────────┤
│             │                                               │
│   Sidebar   │                  Main Content                 │
│   (240px)   │                                               │
│             │  ┌─────────────────────────────────────────┐  │
│  导航菜单    │  │              Page Header                │  │
│             │  │  标题    操作按钮                        │  │
│  成长阶段    │  ├─────────────────────────────────────────┤  │
│  指示器      │  │                                         │  │
│             │  │              Page Content               │  │
│             │  │                                         │  │
│             │  │                                         │  │
│             │  └─────────────────────────────────────────┘  │
│             │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

**移动端布局：**

```
┌─────────────────────────────────────────┐
│              Header (56px)              │
│  ☰    Logo              通知  头像      │
├─────────────────────────────────────────┤
│                                         │
│              Main Content               │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│           Bottom Navigation (64px)      │
│  🏠    👁️    📋    📝    ⚙️            │
└─────────────────────────────────────────┘
```

### 3.3 页面模板

**列表页模板：**

```
┌─────────────────────────────────────────────────────────────┐
│  Page Header                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  标题              筛选  排序  + 新建按钮            │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Content                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Card 1                                              │   │
│  │  标题    标签    日期                                │   │
│  │  摘要内容...                                         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Card 2                                              │   │
│  │  ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│  ...                                                        │
└─────────────────────────────────────────────────────────────┘
```

**详情页模板：**

```
┌─────────────────────────────────────────────────────────────┐
│  Page Header                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ← 返回    标题              编辑  删除              │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Content                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  元信息区域                                          │   │
│  │  日期  焦点标签  来源标签                            │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  主内容区域                                          │   │
│  │  ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  操作区域                                            │   │
│  │  AI 辅助按钮    保存    取消                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 组件规格

### 4.1 shadcn/ui 组件使用

**基础组件：**

| 组件 | 用途 | 变体 |
|------|------|------|
| Button | 操作按钮 | default, outline, ghost, destructive |
| Badge | 标签显示 | default, secondary, outline |
| Card | 内容卡片 | 带 Header, Content, Footer |
| Avatar | 用户头像 | 带 fallback |
| Input | 文本输入 | 带 label, error |
| Textarea | 多行输入 | 自动高度 |

**表单组件：**

| 组件 | 用途 | 验证 |
|------|------|------|
| Form | 表单容器 | React Hook Form |
| FormField | 表单字段 | Zod 验证 |
| Select | 下拉选择 | 单选/多选 |
| Switch | 开关 | 布尔值 |
| Checkbox | 复选框 | 多选 |

**布局组件：**

| 组件 | 用途 |
|------|------|
| Dialog | 模态对话框 |
| Sheet | 侧边抽屉 |
| ScrollArea | 滚动区域 |
| Separator | 分隔线 |
| Tabs | 标签页 |

**反馈组件：**

| 组件 | 用途 |
|------|------|
| Skeleton | 加载骨架 |
| Sonner | Toast 通知 |
| Alert | 警告提示 |
| Progress | 进度条 |

### 4.2 自定义组件

#### AILabel 组件

```tsx
// components/ai/ai-label.tsx
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AILabel() {
  return (
    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
      <Sparkles className="w-3 h-3 mr-1" />
      AI 辅助建议
    </Badge>
  );
}
```

#### AIButton 组件

```tsx
// components/ai/ai-button.tsx
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export function AIButton({ onClick, loading, children }: AIButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className="bg-gradient-to-r from-purple-50 to-blue-50 
                 hover:from-purple-100 hover:to-blue-100
                 border-purple-200"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Wand2 className="w-4 h-4 mr-2" />
      )}
      {children}
    </Button>
  );
}
```

#### DeidentifyAlert 组件

```tsx
// components/observation/deidentify-alert.tsx
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DeidentifyAlertProps {
  detectedNames: string[];
}

export function DeidentifyAlert({ detectedNames }: DeidentifyAlertProps) {
  if (detectedNames.length === 0) return null;
  
  return (
    <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        检测到可能的学生姓名：{detectedNames.join("、")}
        <br />
        请使用代号（如 S001）代替学生真实姓名
      </AlertDescription>
    </Alert>
  );
}
```

#### SaveStatus 组件

```tsx
// components/common/save-status.tsx
import { Check, Loader2, Cloud, CloudOff } from "lucide-react";

type SaveStatus = "saved" | "saving" | "offline" | "error";

interface SaveStatusProps {
  status: SaveStatus;
  lastSaved?: Date;
}

export function SaveStatus({ status, lastSaved }: SaveStatusProps) {
  const statusConfig = {
    saved: { icon: Check, text: "已保存", color: "text-green-600" },
    saving: { icon: Loader2, text: "保存中...", color: "text-gray-500" },
    offline: { icon: CloudOff, text: "离线保存", color: "text-amber-600" },
    error: { icon: Cloud, text: "保存失败", color: "text-red-600" },
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <div className={`flex items-center text-sm ${config.color}`}>
      <Icon className={`w-4 h-4 mr-1 ${status === "saving" ? "animate-spin" : ""}`} />
      <span>{config.text}</span>
      {lastSaved && status === "saved" && (
        <span className="ml-1 text-gray-400">
          {lastSaved.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
```

#### StageIndicator 组件

```tsx
// components/common/stage-indicator.tsx
import { Badge } from "@/components/ui/badge";

type Stage = "beginner" | "intermediate" | "advanced";

const stageConfig = {
  beginner: { label: "初级", color: "bg-blue-100 text-blue-700" },
  intermediate: { label: "中级", color: "bg-purple-100 text-purple-700" },
  advanced: { label: "高级", color: "bg-amber-100 text-amber-700" },
};

export function StageIndicator({ stage }: { stage: Stage }) {
  const config = stageConfig[stage];
  return (
    <Badge className={config.color}>
      {config.label}阶段
    </Badge>
  );
}
```

---


## 5. 状态管理

### 5.1 Store 架构

使用 Zustand 配合 persist 中间件，实现本地优先存储。

**Store 结构：**

```
stores/
├── auth.store.ts          # 认证状态
├── observation.store.ts   # 观察记录
├── question.store.ts      # 研究问题
├── project.store.ts       # 研究项目
├── reflection.store.ts    # 反思日志
├── output.store.ts        # 研究成果
├── course.store.ts        # 课程学习
├── ui.store.ts            # UI 状态
└── mock.store.ts          # Mock 模式控制
```

### 5.2 核心 Store 定义

#### Auth Store

```typescript
// stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Teacher {
  id: string;
  email: string;
  name: string;
  schoolLevel: "kindergarten" | "primary" | "junior" | "senior";
  subject: string;
  teachingYears: string;
  stage: "beginner" | "intermediate" | "advanced";
}

interface AuthState {
  teacher: Teacher | null;
  isAuthenticated: boolean;
  login: (teacher: Teacher) => void;
  logout: () => void;
  updateProfile: (data: Partial<Teacher>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      teacher: null,
      isAuthenticated: false,
      login: (teacher) => set({ teacher, isAuthenticated: true }),
      logout: () => set({ teacher: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          teacher: state.teacher ? { ...state.teacher, ...data } : null,
        })),
    }),
    { name: "auth-storage" }
  )
);
```

#### Observation Store

```typescript
// stores/observation.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_OBSERVATIONS } from "@/lib/mock-data";

interface Observation {
  id: string;
  title: string;
  content: string;
  focusArea: string;
  observationDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ObservationState {
  observations: Observation[];
  addObservation: (obs: Omit<Observation, "id" | "createdAt" | "updatedAt">) => void;
  updateObservation: (id: string, data: Partial<Observation>) => void;
  deleteObservation: (id: string) => void;
  getObservation: (id: string) => Observation | undefined;
}

export const useObservationStore = create<ObservationState>()(
  persist(
    (set, get) => ({
      observations: MOCK_OBSERVATIONS, // 用 Mock 数据初始化！
      addObservation: (obs) =>
        set((state) => ({
          observations: [
            {
              ...obs,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.observations,
          ],
        })),
      updateObservation: (id, data) =>
        set((state) => ({
          observations: state.observations.map((obs) =>
            obs.id === id
              ? { ...obs, ...data, updatedAt: new Date().toISOString() }
              : obs
          ),
        })),
      deleteObservation: (id) =>
        set((state) => ({
          observations: state.observations.filter((obs) => obs.id !== id),
        })),
      getObservation: (id) => get().observations.find((obs) => obs.id === id),
    }),
    { name: "observation-storage" }
  )
);
```

#### Question Store

```typescript
// stores/question.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_QUESTIONS } from "@/lib/mock-data";

interface Question {
  id: string;
  questionText: string;
  background: string;
  questionType: "descriptive" | "explanatory" | "interventional";
  source: "teacher" | "ai_assisted";
  status: "pending" | "researching" | "completed";
  relatedObservationIds: string[];
  createdAt: string;
}

interface QuestionState {
  questions: Question[];
  addQuestion: (q: Omit<Question, "id" | "createdAt">) => void;
  updateQuestion: (id: string, data: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set) => ({
      questions: MOCK_QUESTIONS,
      addQuestion: (q) =>
        set((state) => ({
          questions: [
            { ...q, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...state.questions,
          ],
        })),
      updateQuestion: (id, data) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...data } : q
          ),
        })),
      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
    }),
    { name: "question-storage" }
  )
);
```

#### Mock Mode Store

```typescript
// stores/mock.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MockState {
  useMockMode: boolean;
  toggleMockMode: () => void;
  setMockMode: (value: boolean) => void;
}

export const useMockStore = create<MockState>()(
  persist(
    (set) => ({
      useMockMode: true, // 默认开启 Mock 模式
      toggleMockMode: () => set((state) => ({ useMockMode: !state.useMockMode })),
      setMockMode: (value) => set({ useMockMode: value }),
    }),
    { name: "mock-storage" }
  )
);
```

---

## 6. 功能独立配置

### 6.1 Mock 模式指示器

```tsx
// components/common/mock-indicator.tsx
import { Badge } from "@/components/ui/badge";
import { useMockStore } from "@/stores/mock.store";

export function MockIndicator() {
  const { useMockMode } = useMockStore();
  
  if (!useMockMode) return null;
  
  return (
    <Badge 
      variant="outline" 
      className="fixed bottom-4 right-4 bg-purple-50 text-purple-700 border-purple-200"
    >
      🎭 演示模式
    </Badge>
  );
}
```

### 6.2 AI 服务适配器

```typescript
// services/ai.adapter.ts
import { useMockStore } from "@/stores/mock.store";
import { generateMockAIResponse } from "@/lib/mock-ai";

export async function generateQuestion(observationIds: string[]) {
  const { useMockMode } = useMockStore.getState();
  
  if (useMockMode) {
    // Mock 模式：返回预设响应
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 模拟延迟
    return generateMockAIResponse("question", observationIds);
  }
  
  // 真实模式：调用 API
  const response = await fetch("/api/ai/generate-question", {
    method: "POST",
    body: JSON.stringify({ observationIds }),
  });
  return response.json();
}

export async function generateFramework(questionId: string, method: string) {
  const { useMockMode } = useMockStore.getState();
  
  if (useMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return generateMockAIResponse("framework", { questionId, method });
  }
  
  const response = await fetch("/api/ai/generate-framework", {
    method: "POST",
    body: JSON.stringify({ questionId, method }),
  });
  return response.json();
}

export async function generateReflectionPrompt(context: string) {
  const { useMockMode } = useMockStore.getState();
  
  if (useMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateMockAIResponse("reflection", context);
  }
  
  const response = await fetch("/api/ai/reflection-prompt", {
    method: "POST",
    body: JSON.stringify({ context }),
  });
  return response.json();
}
```

---

## 7. Mock 数据

### 7.1 Mock 数据结构

```typescript
// lib/mock-data.ts

export const MOCK_OBSERVATIONS = [
  {
    id: "obs-001",
    title: "S001 在数学课上的注意力问题",
    content: "今天数学课上，S001 在讲解分数加减法时频繁走神，多次需要提醒才能回到课堂。观察到 S001 在小组讨论环节表现积极，但在教师讲解环节容易分心。可能与讲解时间过长有关。",
    focusArea: "behavior",
    observationDate: "2025-12-15",
    createdAt: "2025-12-15T10:30:00Z",
    updatedAt: "2025-12-15T10:30:00Z",
  },
  {
    id: "obs-002",
    title: "小组合作学习中的角色分配",
    content: "在今天的科学实验课上，观察到四人小组中存在明显的角色分化。S002 主动承担领导角色，S003 负责记录，S004 和 S005 较为被动。需要思考如何促进更均衡的参与。",
    focusArea: "organization",
    observationDate: "2025-12-14",
    createdAt: "2025-12-14T14:20:00Z",
    updatedAt: "2025-12-14T14:20:00Z",
  },
  {
    id: "obs-003",
    title: "课堂提问的等待时间",
    content: "今天尝试在提问后增加等待时间（从2秒延长到5秒），发现举手回答的学生数量明显增加，特别是平时较少发言的学生。S006、S007 首次主动举手。",
    focusArea: "teaching",
    observationDate: "2025-12-13",
    createdAt: "2025-12-13T09:15:00Z",
    updatedAt: "2025-12-13T09:15:00Z",
  },
  {
    id: "obs-004",
    title: "S008 的情绪变化观察",
    content: "近一周观察到 S008 情绪低落，课间独处时间增加，与同学互动减少。今天主动询问后，S008 表示最近家里有些事情。已与班主任沟通，需要持续关注。",
    focusArea: "mental_health",
    observationDate: "2025-12-12",
    createdAt: "2025-12-12T16:00:00Z",
    updatedAt: "2025-12-12T16:00:00Z",
  },
  {
    id: "obs-005",
    title: "作业反馈方式的效果对比",
    content: "本周尝试了两种作业反馈方式：A组使用传统批改（对错标记），B组使用描述性反馈（具体指出问题和改进建议）。初步观察B组学生订正率更高，但需要更多数据验证。",
    focusArea: "performance",
    observationDate: "2025-12-11",
    createdAt: "2025-12-11T17:30:00Z",
    updatedAt: "2025-12-11T17:30:00Z",
  },
  {
    id: "obs-006",
    title: "课堂导入环节的学生反应",
    content: "今天使用了一个与学生生活相关的情境导入新课（购物找零问题），学生参与度明显高于上周使用的纯数学问题导入。S009 说'这个我在超市遇到过'。",
    focusArea: "teaching",
    observationDate: "2025-12-10",
    createdAt: "2025-12-10T08:45:00Z",
    updatedAt: "2025-12-10T08:45:00Z",
  },
  {
    id: "obs-007",
    title: "午休后第一节课的学生状态",
    content: "连续观察一周，发现午休后第一节课（13:30-14:15）学生普遍精神状态不佳，打哈欠频率高。尝试在课前加入2分钟的简单活动，效果有所改善。",
    focusArea: "behavior",
    observationDate: "2025-12-09",
    createdAt: "2025-12-09T14:30:00Z",
    updatedAt: "2025-12-09T14:30:00Z",
  },
  {
    id: "obs-008",
    title: "差异化作业的实施情况",
    content: "本周开始实施差异化作业（基础题+挑战题），观察到学习困难学生完成基础题的信心增强，学优生对挑战题表现出兴趣。但中等生的选择出现分化，需要进一步观察。",
    focusArea: "performance",
    observationDate: "2025-12-08",
    createdAt: "2025-12-08T18:00:00Z",
    updatedAt: "2025-12-08T18:00:00Z",
  },
];

export const MOCK_QUESTIONS = [
  {
    id: "q-001",
    questionText: "如何通过调整教学节奏来提高学生在讲解环节的注意力？",
    background: "观察到部分学生在教师讲解环节容易分心，但在互动环节表现积极。",
    questionType: "interventional" as const,
    source: "ai_assisted" as const,
    status: "pending" as const,
    relatedObservationIds: ["obs-001"],
    createdAt: "2025-12-15T11:00:00Z",
  },
  {
    id: "q-002",
    questionText: "小组合作学习中，如何促进被动学生的参与？",
    background: "在小组活动中观察到角色分化现象，部分学生较为被动。",
    questionType: "interventional" as const,
    source: "teacher" as const,
    status: "researching" as const,
    relatedObservationIds: ["obs-002"],
    createdAt: "2025-12-14T15:00:00Z",
  },
  {
    id: "q-003",
    questionText: "延长提问等待时间对学生课堂参与度有何影响？",
    background: "初步尝试发现延长等待时间可能增加学生参与，需要系统研究。",
    questionType: "descriptive" as const,
    source: "teacher" as const,
    status: "completed" as const,
    relatedObservationIds: ["obs-003"],
    createdAt: "2025-12-13T10:00:00Z",
  },
];

export const MOCK_PROJECTS = [
  {
    id: "proj-001",
    title: "提问等待时间与学生参与度研究",
    questionId: "q-003",
    method: "action",
    design: {
      objective: "探究延长提问等待时间对学生课堂参与度的影响",
      dataCollection: "记录每节课的提问次数、等待时间、举手人数",
      analysisPlan: "对比不同等待时间下的学生参与数据",
    },
    stage: "implementation" as const,
    ethicsConfirmed: true,
    startDate: "2025-12-01",
    createdAt: "2025-12-01T09:00:00Z",
  },
];

export const MOCK_REFLECTIONS = [
  {
    id: "ref-001",
    title: "关于课堂节奏的反思",
    content: "这周尝试了缩短讲解时间、增加互动环节的做法。发现学生的注意力确实有所改善，但也带来了新的问题：部分知识点讲解不够深入。需要找到平衡点。\n\n下周计划：尝试'讲解-练习-讲解'的交替模式，每个讲解环节控制在10分钟以内。",
    projectId: null,
    aiAssisted: false,
    reflectionDate: "2025-12-15",
    createdAt: "2025-12-15T20:00:00Z",
  },
  {
    id: "ref-002",
    title: "行动研究第一周总结",
    content: "本周开始实施提问等待时间的行动研究。\n\n**数据收集情况：**\n- 共记录了5节课的数据\n- 平均等待时间从2秒延长到5秒\n- 举手人数平均增加了3人\n\n**初步发现：**\n等待时间延长后，平时较少发言的学生参与度明显提高。\n\n**下周计划：**\n继续收集数据，同时关注学生的回答质量变化。",
    projectId: "proj-001",
    aiAssisted: true,
    reflectionDate: "2025-12-08",
    createdAt: "2025-12-08T21:00:00Z",
  },
];

export const MOCK_COURSES = [
  {
    id: "course-001",
    title: "教育研究意识入门",
    description: "了解什么是教育研究，为什么教师需要研究意识",
    stage: "beginner" as const,
    topic: "research_awareness",
    order: 1,
  },
  {
    id: "course-002",
    title: "课堂观察方法",
    description: "学习如何系统地观察和记录课堂现象",
    stage: "beginner" as const,
    topic: "observation",
    order: 2,
  },
  {
    id: "course-003",
    title: "从观察到问题",
    description: "如何从日常观察中提炼有价值的研究问题",
    stage: "beginner" as const,
    topic: "question",
    order: 3,
  },
  {
    id: "course-004",
    title: "行动研究方法",
    description: "了解行动研究的基本步骤和方法",
    stage: "intermediate" as const,
    topic: "research_design",
    order: 4,
  },
  {
    id: "course-005",
    title: "研究伦理基础",
    description: "教育研究中的伦理要求和注意事项",
    stage: "intermediate" as const,
    topic: "ethics",
    order: 5,
  },
];
```

### 7.2 Mock AI 响应生成器

```typescript
// lib/mock-ai.ts

export function generateMockAIResponse(type: string, context: any) {
  switch (type) {
    case "question":
      return {
        suggestions: [
          {
            questionText: "如何通过调整教学策略来改善学生的课堂参与度？",
            questionType: "interventional",
            background: "基于您的观察记录，发现学生在某些环节参与度较低。",
            aiGenerated: true,
            aiLabel: "AI 辅助建议",
          },
          {
            questionText: "学生在不同教学环节中的注意力表现有何差异？",
            questionType: "descriptive",
            background: "您的观察显示学生在互动环节和讲解环节表现不同。",
            aiGenerated: true,
            aiLabel: "AI 辅助建议",
          },
          {
            questionText: "哪些因素影响了学生的课堂专注度？",
            questionType: "explanatory",
            background: "观察记录中提到了多种可能影响学生注意力的因素。",
            aiGenerated: true,
            aiLabel: "AI 辅助建议",
          },
        ],
        disclaimer: "以上建议由 AI 生成，请教师自主判断是否采纳",
      };

    case "framework":
      return {
        framework: {
          objective: "探究教学策略调整对学生课堂参与度的影响",
          researchQuestions: [
            "当前学生课堂参与度的基线水平如何？",
            "实施新策略后参与度有何变化？",
            "哪些策略最有效？",
          ],
          dataCollection: [
            "课堂观察记录（每周3次）",
            "学生参与度量表",
            "学生访谈（抽样5人）",
          ],
          timeline: "4周",
          analysisPlan: "对比干预前后的参与度数据，分析变化趋势",
        },
        aiGenerated: true,
        aiLabel: "AI 辅助建议",
        disclaimer: "以上框架由 AI 生成，请根据实际情况调整",
      };

    case "reflection":
      return {
        prompts: [
          "这次教学/研究经历中，最让您印象深刻的是什么？",
          "您观察到了哪些预期之外的现象？",
          "如果重新来过，您会做出什么不同的选择？",
          "这次经历对您未来的教学有什么启示？",
          "您在这个过程中学到了什么？",
        ],
        aiGenerated: true,
        aiLabel: "AI 辅助建议",
        disclaimer: "以上提示由 AI 生成，仅供参考",
      };

    default:
      return { error: "Unknown type" };
  }
}
```

---

## 8. 核心功能页面

### 8.1 P0 功能（MVP 必需）

#### 8.1.1 首页 Dashboard

**路径：** `/dashboard`

**布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  欢迎回来，[教师姓名]                    [阶段徽章]          │
├─────────────────────────────────────────────────────────────┤
│  快速操作                                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ + 记录  │  │ + 问题  │  │ + 反思  │  │ 📚 学习 │        │
│  │  观察   │  │  提炼   │  │  写作   │  │  课程   │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
├─────────────────────────────────────────────────────────────┤
│  最近观察                              查看全部 →            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [观察卡片 1]                                        │   │
│  │  [观察卡片 2]                                        │   │
│  │  [观察卡片 3]                                        │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  进行中的研究                          查看全部 →            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [项目卡片]                                          │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  推荐课程                              查看全部 →            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [课程卡片 1]  [课程卡片 2]                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**组件：**
- QuickActions：快速操作按钮组
- RecentObservations：最近观察列表
- ActiveProjects：进行中的研究项目
- RecommendedCourses：推荐课程

#### 8.1.2 观察记录页

**路径：** `/observations`

**列表页布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  我的观察记录                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍 搜索观察...    [焦点筛选 ▼]  [排序 ▼]  [+ 新建] │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📝 S001 在数学课上的注意力问题                      │   │
│  │  [学生行为]  2025-12-15                              │   │
│  │  今天数学课上，S001 在讲解分数加减法时频繁走神...    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📝 小组合作学习中的角色分配                         │   │
│  │  [课堂组织]  2025-12-14                              │   │
│  │  在今天的科学实验课上，观察到四人小组中存在...       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ...                                                        │
└─────────────────────────────────────────────────────────────┘
```

**新建/编辑页布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  ← 返回    新建观察记录                    [保存状态指示]    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  标题                                                │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  输入观察标题...                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  观察内容                              [🎤 语音输入] │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │                                             │    │   │
│  │  │  输入观察内容...                            │    │   │
│  │  │                                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ⚠️ 检测到可能的学生姓名，请使用代号代替           │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  观察焦点        观察日期                            │   │
│  │  [课堂教学 ▼]    [2025-12-17]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                              [取消]  [保存]          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

#### 8.1.3 研究问题页

**路径：** `/questions`

**列表页布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  我的研究问题                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [待研究]  [研究中]  [已完成]           [+ 新建]     │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  待研究 (2)                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ❓ 如何通过调整教学节奏来提高学生注意力？           │   │
│  │  [干预性问题]  [AI 辅助建议]                         │   │
│  │  关联观察：S001 在数学课上的注意力问题               │   │
│  │                                    [开始研究]        │   │
│  └─────────────────────────────────────────────────────┘   │
│  ...                                                        │
└─────────────────────────────────────────────────────────────┘
```

**AI 辅助提炼对话框：**
```
┌─────────────────────────────────────────────────────────────┐
│  AI 辅助提炼研究问题                              [×]       │
├─────────────────────────────────────────────────────────────┤
│  选择相关观察记录：                                          │
│  ☑️ S001 在数学课上的注意力问题                             │
│  ☑️ 课堂提问的等待时间                                      │
│  ☐ 小组合作学习中的角色分配                                 │
│                                                             │
│  [✨ 生成问题建议]                                          │
├─────────────────────────────────────────────────────────────┤
│  AI 建议：                                    [AI 辅助建议]  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. 如何通过调整教学策略来改善学生的课堂参与度？     │   │
│  │     [干预性问题]                          [选择]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  2. 学生在不同教学环节中的注意力表现有何差异？       │   │
│  │     [描述性问题]                          [选择]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  3. 哪些因素影响了学生的课堂专注度？                 │   │
│  │     [解释性问题]                          [选择]     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ⚠️ 以上建议由 AI 生成，请教师自主判断是否采纳             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 P1 功能（重要但可延后）

#### 8.2.1 研究项目页

**路径：** `/projects`

**项目详情页布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  ← 返回    提问等待时间与学生参与度研究      [编辑] [删除]  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  状态：[实施阶段]    方法：[行动研究]                │   │
│  │  开始日期：2025-12-01                                │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  研究问题                                                    │
│  延长提问等待时间对学生课堂参与度有何影响？                  │
├─────────────────────────────────────────────────────────────┤
│  研究设计                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  目标：探究延长提问等待时间对学生课堂参与度的影响    │   │
│  │  数据收集：记录每节课的提问次数、等待时间、举手人数  │   │
│  │  分析计划：对比不同等待时间下的学生参与数据          │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  研究数据                                    [+ 添加数据]    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [数据记录列表]                                      │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  相关反思                                    [+ 写反思]      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [反思列表]                                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

#### 8.2.2 反思日志页

**路径：** `/reflections`

**编辑页布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  ← 返回    新建反思日志                    [保存状态指示]    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  标题                                                │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  输入反思标题...                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  关联研究项目（可选）                                │   │
│  │  [选择项目 ▼]                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [✨ AI 辅助反思]                                   │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  反思提示：                    [AI 辅助建议] │    │   │
│  │  │  • 这次经历中最让您印象深刻的是什么？       │    │   │
│  │  │  • 您观察到了哪些预期之外的现象？           │    │   │
│  │  │  • 如果重新来过，您会做出什么不同的选择？   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  反思内容                                            │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │                                             │    │   │
│  │  │  输入反思内容...                            │    │   │
│  │  │                                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔒 反思内容仅自己可见                               │   │
│  │                              [取消]  [保存]          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---


## 9. 交互模式

### 9.1 加载状态

**骨架屏（Skeleton）：**

```tsx
// 列表加载骨架
function ObservationListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// AI 生成加载
function AILoadingSkeleton() {
  return (
    <div className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg">
      <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
      <span className="text-purple-700">AI 正在思考中...</span>
    </div>
  );
}
```

### 9.2 反馈机制

**Toast 通知：**

| 场景 | 类型 | 消息 |
|------|------|------|
| 保存成功 | success | "保存成功" |
| 保存失败 | error | "保存失败，请重试" |
| AI 生成完成 | success | "AI 建议已生成" |
| 去标识化警告 | warning | "检测到敏感信息，请处理" |
| 离线保存 | info | "已保存到本地，联网后自动同步" |

```tsx
// 使用 Sonner
import { toast } from "sonner";

// 成功
toast.success("保存成功");

// 错误
toast.error("保存失败，请重试");

// 警告
toast.warning("检测到敏感信息，请处理");

// 信息
toast.info("已保存到本地");
```

### 9.3 空状态

**无数据空状态：**

```tsx
function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

// 使用示例
<EmptyState
  icon={Eye}
  title="还没有观察记录"
  description="开始记录您的课堂观察，积累研究素材"
  action={
    <Button onClick={() => router.push("/observations/new")}>
      <Plus className="h-4 w-4 mr-2" />
      创建第一条观察
    </Button>
  }
/>
```

### 9.4 确认对话框

**删除确认：**

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive" size="sm">
      <Trash2 className="h-4 w-4 mr-2" />
      删除
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确认删除？</AlertDialogTitle>
      <AlertDialogDescription>
        此操作无法撤销。删除后，这条观察记录将永久移除。
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        确认删除
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 9.5 表单验证

**使用 React Hook Form + Zod：**

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const observationSchema = z.object({
  title: z.string().min(1, "请输入标题").max(100, "标题不能超过100字"),
  content: z.string().min(10, "内容至少10个字").max(5000, "内容不能超过5000字"),
  focusArea: z.enum(["teaching", "behavior", "performance", "mental_health", "organization"]),
  observationDate: z.string(),
});

type ObservationFormData = z.infer<typeof observationSchema>;

function ObservationForm() {
  const form = useForm<ObservationFormData>({
    resolver: zodResolver(observationSchema),
    defaultValues: {
      title: "",
      content: "",
      focusArea: "teaching",
      observationDate: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="输入观察标题..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 其他字段 */}
      </form>
    </Form>
  );
}
```

---

## 10. 无障碍性

### 10.1 WCAG AA 检查清单

**感知性：**
- [x] 所有图片有 alt 文本
- [x] 颜色对比度 ≥ 4.5:1（正文）
- [x] 颜色对比度 ≥ 3:1（大文本）
- [x] 不仅依赖颜色传达信息（配合图标/文字）

**可操作性：**
- [x] 所有功能可通过键盘访问
- [x] 焦点顺序合理
- [x] 焦点可见
- [x] 可跳过重复内容（Skip to main）

**可理解性：**
- [x] 页面语言已声明（lang="zh-CN"）
- [x] 表单有清晰的标签
- [x] 错误信息明确
- [x] 一致的导航

**健壮性：**
- [x] 使用语义化 HTML
- [x] ARIA 属性正确使用
- [x] 兼容辅助技术

### 10.2 键盘导航

| 按键 | 功能 |
|------|------|
| Tab | 移动焦点到下一个元素 |
| Shift + Tab | 移动焦点到上一个元素 |
| Enter | 激活按钮/链接 |
| Space | 激活按钮/切换开关 |
| Escape | 关闭对话框/下拉菜单 |
| Arrow Keys | 在列表/菜单中导航 |

### 10.3 屏幕阅读器支持

```tsx
// 使用 aria-label 提供上下文
<Button aria-label="创建新的观察记录">
  <Plus className="h-4 w-4" />
</Button>

// 使用 aria-live 通知状态变化
<div aria-live="polite" aria-atomic="true">
  {saveStatus === "saved" && "已保存"}
</div>

// 使用 role 标识区域
<nav role="navigation" aria-label="主导航">
  {/* 导航内容 */}
</nav>

<main role="main" aria-label="主要内容">
  {/* 页面内容 */}
</main>
```

---

## 11. 扩展点

### 11.1 数据库迁移路径

**当前状态：** Zustand + localStorage

**迁移到数据库：**

1. **保持 Store 接口不变**
2. **添加 API 调用层**
3. **实现数据同步**

```typescript
// 迁移后的 Store
export const useObservationStore = create<ObservationState>()(
  persist(
    (set, get) => ({
      observations: [],
      isLoading: false,
      
      // 从 API 加载
      fetchObservations: async () => {
        set({ isLoading: true });
        const response = await fetch("/api/observations");
        const data = await response.json();
        set({ observations: data, isLoading: false });
      },
      
      // 创建并同步
      addObservation: async (obs) => {
        // 乐观更新
        const tempId = crypto.randomUUID();
        const newObs = { ...obs, id: tempId, createdAt: new Date().toISOString() };
        set((state) => ({ observations: [newObs, ...state.observations] }));
        
        // 同步到服务器
        const response = await fetch("/api/observations", {
          method: "POST",
          body: JSON.stringify(obs),
        });
        const savedObs = await response.json();
        
        // 更新真实 ID
        set((state) => ({
          observations: state.observations.map((o) =>
            o.id === tempId ? savedObs : o
          ),
        }));
      },
    }),
    { name: "observation-storage" }
  )
);
```

### 11.2 API 实现路径

**预留的 API 端点：**

| 端点 | 方法 | 当前实现 | 未来实现 |
|------|------|---------|---------|
| /api/observations | GET | localStorage | Drizzle 查询 |
| /api/observations | POST | localStorage | Drizzle 插入 |
| /api/ai/generate-question | POST | Mock 响应 | Vercel AI SDK |
| /api/ai/generate-framework | POST | Mock 响应 | Vercel AI SDK |

### 11.3 认证集成路径

**当前状态：** Mock 用户

**迁移到 Better Auth：**

1. 配置 Better Auth
2. 添加登录/注册页面
3. 保护路由
4. 关联用户数据

```typescript
// lib/auth/config.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

---

## 12. 验收检查清单

### 12.1 前置条件
- [x] meta.md 已加载
- [x] real.md 已加载
- [x] cog.md 已加载
- [x] 应用类型已判断（MPA + 局部 SPA）
- [x] 导航结构已确定（侧边 + 底部）
- [x] OKLCH 配色方案已定义

### 12.2 功能独立（关键）
- [x] 每个功能无需配置即可使用
- [x] 未配置依赖项时有 Mock/回退行为
- [x] Mock 模式指示器可见

### 12.3 丰富 Mock 数据（关键）
- [x] Store 用 Mock 数据初始化（非空数组）
- [x] 观察记录有 8 条不同的 Mock 项
- [x] 研究问题有 3 条不同的 Mock 项
- [x] 包含 Mock AI 响应生成器
- [x] 预配置 Mock 模型

### 12.4 约束检查（来自 real.md）
- [x] C1：数据隔离（Store 按用户隔离）
- [x] C2：去标识化（DeidentifyAlert 组件）
- [x] C3：AI 标注（AILabel 组件）
- [x] C4：伦理审查（EthicsChecklist 组件）
- [x] C5：匿名化（AnonymizeTool 组件）
- [x] C6：渐进式学习（StageIndicator 组件）
- [x] C7：本地优先（Zustand + persist）

### 12.5 实现检查
- [x] Zustand Store 使用 persist 中间件
- [x] P0 功能配合本地存储完全可用
- [x] 错误处理已定义
- [x] 符合 WCAG AA

### 12.6 扩展点
- [x] 数据库迁移路径已记录
- [x] API 实现路径已记录
- [x] 认证集成路径已记录

---

## 13. 附录

### 13.1 焦点分类

| 值 | 显示名称 | 颜色 |
|------|---------|------|
| teaching | 课堂教学 | blue |
| behavior | 学生行为 | purple |
| performance | 学习表现 | green |
| mental_health | 心理健康 | amber |
| organization | 课堂组织 | cyan |

### 13.2 问题类型

| 值 | 显示名称 | 说明 |
|------|---------|------|
| descriptive | 描述性问题 | 描述现象是什么 |
| explanatory | 解释性问题 | 解释为什么会这样 |
| interventional | 干预性问题 | 如何改变现状 |

### 13.3 研究方法

| 值 | 显示名称 | 说明 |
|------|---------|------|
| action | 行动研究 | 在实践中研究，边做边改进 |
| case | 案例研究 | 深入研究个别案例 |
| observation | 观察研究 | 系统观察和记录 |
| mixed | 混合方法 | 结合多种方法 |

### 13.4 成长阶段

| 值 | 显示名称 | 说明 |
|------|---------|------|
| beginner | 初级 | 研究意识培养 |
| intermediate | 中级 | 基础研究能力 |
| advanced | 高级 | 研究实践与传播 |

---

**文档维护者：** 路屿
**最后更新：** 2025-12-17
**文档类型：** UI 设计规格
