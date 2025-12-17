# 活水智聊教学演示版（42chatdemo）- 现实约束文档

<meta>
  <document-id>42chat-real</document-id>
  <version>1.0.0</version>
  <project>活水智聊教学演示版（42chatdemo）</project>
  <type>现实约束</type>
  <created>2025-12-10</created>
</meta>

## 文档说明

本文档定义了活水智聊教学演示版（42chatdemo）项目在开发和运营过程中必须遵守的现实约束。这些约束聚焦于AI可能无法预料、但违反后会造成现实损害的问题。

<constraints>

## 必选约束（4条）

<constraint required="true" id="C1">
<title>用户认证强制登录</title>
<description>所有对话功能必须在用户登录后才能使用，不提供匿名对话功能</description>
<rationale>确保对话数据归属明确、可追溯，支持数据同步和检索功能</rationale>
<violation-consequence>对话数据无法关联用户，导致数据同步、检索、导出功能失效</violation-consequence>
</constraint>

<constraint required="true" id="C2">
<title>API密钥安全存储</title>
<description>用户配置的各模型API密钥必须加密存储，不得明文保存或传输到前端</description>
<rationale>API密钥泄露会导致用户账户被盗用、产生费用损失</rationale>
<violation-consequence>用户API密钥泄露，造成经济损失和信任危机</violation-consequence>
</constraint>

<constraint required="true" id="C3">
<title>对话数据隔离</title>
<description>用户只能访问自己的对话记录，不得通过任何方式访问其他用户的对话</description>
<rationale>对话内容可能包含敏感信息、商业机密或个人隐私</rationale>
<violation-consequence>用户隐私泄露，违反《个人信息保护法》，法律风险</violation-consequence>
</constraint>

<constraint required="true" id="C4">
<title>模型调用服务端代理</title>
<description>所有AI模型的API调用必须通过服务端代理，不得在客户端直接调用模型API</description>
<rationale>防止API密钥暴露在前端，同时便于统一管理和监控调用</rationale>
<violation-consequence>API密钥暴露风险，调用无法监控和限流</violation-consequence>
</constraint>

## 可选约束（3条）

<constraint required="false" id="C5">
<title>对话本地缓存</title>
<description>对话数据应优先写入本地存储，网络恢复后再同步到云端</description>
<rationale>提供本地兜底能力，确保离线场景下不丢失用户输入</rationale>
</constraint>

<constraint required="false" id="C6">
<title>联网搜索结果标注</title>
<description>通过联网搜索获取的内容应明确标注来源，与模型生成内容区分</description>
<rationale>帮助用户识别信息来源，便于验证和追溯</rationale>
</constraint>

<constraint required="false" id="C7">
<title>模型切换无缝体验</title>
<description>在同一对话中切换模型时，应保留上下文，让新模型能继续对话</description>
<rationale>核心价值主张之一，降低模型切换成本</rationale>
</constraint>

</constraints>

## 技术环境

<environment>
<stack>
  前端：Next.js 15 + Tailwind CSS + shadcn/ui + TypeScript
  后端：Bun / Node.js + PostgreSQL + Drizzle ORM
  认证：Better Auth
  AI集成：Vercel AI SDK
  托管：Vercel / EdgeOne Pages
  数据库：Neon / Supabase
</stack>
</environment>

## 约束检查清单

- [ ] 所有页面均需登录才能访问对话功能
- [ ] API密钥使用加密存储（如AES-256）
- [ ] 数据查询均带有用户ID条件
- [ ] AI模型调用通过服务端API路由
- [ ] 本地存储方案已实现（IndexedDB/localStorage）
- [ ] 联网搜索结果有来源标注
- [ ] 模型切换时上下文得以保留
