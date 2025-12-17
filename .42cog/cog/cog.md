# 活水智聊教学演示版（42chatdemo）- 认知模型文档

<meta>
  <document-id>42chat-cog</document-id>
  <version>1.0.0</version>
  <project>活水智聊教学演示版（42chatdemo）</project>
  <type>认知模型</type>
  <created>2025-12-10</created>
  <depends>real.md</depends>
</meta>

## 文档说明

本文档基于"智能体 + 信息 + 上下文"框架，定义活水智聊教学演示版（42chatdemo）的认知模型。活水智聊是一个多模型AI对话中枢，核心在于统一管理用户与多个AI模型之间的对话交互。

---

## 一、智能体（Agents）

<agents>

### 1.1 人类智能体

<agent type="human" id="A1">
<name>用户（User）</name>
<identifier>UUID，注册时生成</identifier>
<classification>
  <by-role>普通用户 | 团队管理员</by-role>
  <by-usage>轻度用户（偶尔使用）| 重度用户（日常工作依赖）</by-usage>
</classification>
<capabilities>
  - 发起对话、发送消息
  - 切换AI模型
  - 管理提示词模板
  - 搜索和检索历史对话
  - 导出对话记录
  - 配置API密钥
</capabilities>
<goals>
  - 在统一界面完成跨模型交流
  - 降低模型切换成本
  - 保留知识积累
  - 获取实时信息
</goals>
</agent>

### 1.2 人工智能体

<agent type="ai" id="A2">
<name>AI模型（AI Model）</name>
<identifier>provider + model_id（如：anthropic/claude-3-opus）</identifier>
<classification>
  <by-provider>Anthropic | OpenAI | Google | 其他</by-provider>
  <by-capability>基础对话 | 高级推理 | 代码生成 | 多模态</by-capability>
</classification>
<interaction-pattern>
  输入：用户消息 + 对话上下文 + 系统提示词
  输出：AI回复（文本、代码块、图片等）
</interaction-pattern>
</agent>

<agent type="ai" id="A3">
<name>搜索引擎（Search Engine）</name>
<identifier>provider（如：google、bing、tavily）</identifier>
<classification>
  <by-type>通用搜索 | 学术搜索 | 新闻搜索</by-type>
</classification>
<interaction-pattern>
  输入：搜索查询
  输出：搜索结果（标题、摘要、链接）
</interaction-pattern>
</agent>

</agents>

---

## 二、信息（Information）

<information>

### 2.1 核心实体

<entity id="E1">
<name>对话（Conversation）</name>
<unique-code>conversation_id：UUID，创建时生成</unique-code>
<classification>
  <by-status>进行中 | 已归档</by-status>
  <by-type>普通对话 | 模板对话</by-type>
</classification>
<attributes>
  - title：对话标题（自动生成或用户编辑）
  - created_at：创建时间
  - updated_at：最后更新时间
  - user_id：所属用户
  - model_id：当前使用的模型
</attributes>
<relations>
  - 属于一个用户（N:1）
  - 包含多条消息（1:N）
</relations>
</entity>

<entity id="E2">
<name>消息（Message）</name>
<unique-code>message_id：UUID，创建时生成</unique-code>
<classification>
  <by-role>user | assistant | system</by-role>
  <by-content-type>文本 | 代码 | 图片 | 搜索结果</by-content-type>
</classification>
<attributes>
  - content：消息内容
  - role：消息角色
  - model_id：生成此消息的模型（assistant角色）
  - created_at：创建时间
  - conversation_id：所属对话
</attributes>
<relations>
  - 属于一个对话（N:1）
</relations>
</entity>

<entity id="E3">
<name>提示词模板（Prompt Template）</name>
<unique-code>template_id：UUID</unique-code>
<classification>
  <by-scope>系统预设 | 用户自定义</by-scope>
  <by-category>写作 | 编程 | 分析 | 翻译 | 其他</by-category>
</classification>
<attributes>
  - name：模板名称
  - content：模板内容
  - variables：变量列表（可填充的占位符）
  - user_id：创建者（用户自定义时）
</attributes>
<relations>
  - 属于一个用户或系统（N:1）
  - 可应用于多个对话（N:N）
</relations>
</entity>

<entity id="E4">
<name>模型配置（Model Config）</name>
<unique-code>config_id：user_id + provider</unique-code>
<classification>
  <by-provider>Anthropic | OpenAI | Google | 其他</by-provider>
</classification>
<attributes>
  - api_key：API密钥（加密存储）
  - base_url：自定义API地址（可选）
  - default_model：默认模型
  - enabled：是否启用
</attributes>
<relations>
  - 属于一个用户（N:1）
</relations>
</entity>

### 2.2 信息流动

<information-flow>

<flow id="F1" name="发送消息">
  用户 → 输入消息 → 系统 → 调用AI模型API → AI模型 → 返回回复 → 系统 → 显示给用户
</flow>

<flow id="F2" name="切换模型">
  用户 → 选择新模型 → 系统 → 更新对话的model_id → 后续消息使用新模型
</flow>

<flow id="F3" name="联网搜索">
  用户 → 触发搜索 → 系统 → 调用搜索API → 搜索引擎 → 返回结果 → 系统 → 注入对话上下文
</flow>

<flow id="F4" name="对话检索">
  用户 → 输入搜索词 → 系统 → 全文检索 → 返回匹配的对话列表
</flow>

<flow id="F5" name="导出对话">
  用户 → 选择导出格式 → 系统 → 生成导出文件 → 用户下载
</flow>

</information-flow>

</information>

---

## 三、上下文（Context）

<context>

### 3.1 应用上下文

- **类型**：Web应用（响应式设计，支持桌面和移动端）
- **部署**：Vercel / EdgeOne Pages
- **数据存储**：云端数据库 + 本地缓存（IndexedDB）

### 3.2 技术上下文

- **前端架构**：Next.js 15 App Router + React Server Components
- **UI框架**：Tailwind CSS + shadcn/ui
- **认证方案**：Better Auth（强制登录）
- **AI集成**：Vercel AI SDK（统一多模型调用）
- **数据同步**：云端优先，本地兜底

### 3.3 用户体验上下文

- **情感目标**：流畅、可控、有安全感
- **交互风格**：简洁、高效、低学习成本
- **核心体验**：
  - 对话连贯，不中断
  - 切换顺滑，无感知
  - 数据可靠，不丢失

</context>

---

## 四、权重矩阵

<weights>

| 实体/交互 | 重要性 | 说明 |
|-----------|--------|------|
| 对话（Conversation） | ★★★★★ | 核心资产，必须可靠存储和检索 |
| 消息（Message） | ★★★★★ | 对话的组成部分，不可丢失 |
| 模型切换 | ★★★★☆ | 核心价值主张之一 |
| 提示词模板 | ★★★☆☆ | 提效工具，非核心功能 |
| 联网搜索 | ★★★☆☆ | 增强功能，按需使用 |
| 模型配置 | ★★★★☆ | 关键配置，需安全存储 |

</weights>

---

## 五、验收检查

- [ ] 所有实体都定义了唯一编码
- [ ] 所有实体都有人类定义的分类
- [ ] 信息流覆盖了核心用户场景
- [ ] 上下文信息与meta.md和real.md保持一致
- [ ] 权重矩阵反映了业务优先级
