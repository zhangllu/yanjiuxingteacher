# 研究型教师成长系统 - 现实约束文档

<meta>
  <document-id>yanjiuxingteacher-real</document-id>
  <version>1.0.0</version>
  <project>研究型教师成长系统</project>
  <type>现实约束</type>
  <created>2025-12-17</created>
</meta>

## 文档说明

本文档定义了研究型教师成长系统在开发和运营过程中必须遵守的现实约束。这些约束聚焦于AI可能无法预料、但违反后会造成现实损害的问题，特别关注教育场景中的伦理、隐私和专业发展质量。

<constraints>

## 必选约束（4条）

<constraint required="true" id="C1">
<title>教师隐私与数据保护</title>
<description>教师的教学观察记录、反思日志、研究数据必须严格保密，仅教师本人可访问，不得在未经明确授权的情况下分享给其他教师或第三方</description>
<rationale>教学观察和反思可能涉及课堂问题、学生个案、教师自我评价等敏感信息，泄露会影响教师职业安全和心理安全</rationale>
<violation-consequence>教师隐私泄露，导致职业风险、信任危机，违反《个人信息保护法》</violation-consequence>
</constraint>

<constraint required="true" id="C2">
<title>学生信息去标识化</title>
<description>教师在记录教学观察、案例分析时涉及的学生信息，必须进行去标识化处理（使用代号、化名），系统不得存储学生真实姓名、学号等可识别信息</description>
<rationale>保护未成年学生隐私，符合《未成年人保护法》和教育伦理要求</rationale>
<violation-consequence>学生隐私泄露，法律责任，家长投诉，学校信任危机</violation-consequence>
</constraint>

<constraint required="true" id="C3">
<title>AI辅助的边界与透明</title>
<description>AI工具仅作为"理解协助与思考伴随工具"，不得替代教师的专业判断。所有AI生成的研究框架、分析建议必须明确标注为"AI辅助建议"，教师需自主决策是否采纳</description>
<rationale>教师专业发展的核心是自主建构研究能力，AI过度介入会削弱教师的主体性和判断力</rationale>
<violation-consequence>教师过度依赖AI，丧失独立思考能力，研究成果缺乏真实性和专业性</violation-consequence>
</constraint>

<constraint required="true" id="C4">
<title>研究伦理审查机制</title>
<description>涉及学生数据收集、课堂观察、问卷调查等研究活动，必须提供伦理审查指引，确保教师了解知情同意、数据保护、研究伦理的基本要求</description>
<rationale>教育研究涉及未成年人，必须遵守研究伦理规范，避免对学生造成伤害</rationale>
<violation-consequence>研究活动违反伦理规范，引发家长投诉、学校处分、法律风险</violation-consequence>
</constraint>

## 可选约束（3条）

<constraint required="false" id="C5">
<title>研究成果分享的匿名化</title>
<description>教师在社区分享研究案例、反思报告时，系统应提供自动匿名化工具，移除学校名称、地区信息、学生特征等可能暴露身份的细节</description>
<rationale>鼓励教师分享经验，同时保护教师和学生的隐私</rationale>
</constraint>

<constraint required="false" id="C6">
<title>渐进式学习路径</title>
<description>课程内容应按"初级-中级-高级"分阶段设计，避免一次性灌输过多理论，确保教师能在实践中逐步消化和应用</description>
<rationale>教师时间有限，学习需要与教学实践结合，渐进式路径更符合成人学习规律</rationale>
</constraint>

<constraint required="false" id="C7">
<title>本地优先的数据存储</title>
<description>教师的观察记录、研究日志应优先存储在本地设备，云端同步为可选功能，确保教师对数据有完全控制权</description>
<rationale>增强教师对数据的掌控感和安全感，降低隐私泄露风险</rationale>
</constraint>

</constraints>

## 技术环境

<environment>
<stack>
  开发环境：Apple Silicon Mac + Bun + uv + cnb.cool
  前端（待定）：Next.js / React + Tailwind CSS + shadcn/ui + TypeScript
  后端（待定）：Bun / Node.js + PostgreSQL / SQLite + Drizzle ORM / Prisma
  AI集成：Vercel AI SDK + Claude / GPT-4 / 国产大模型
</stack>
</environment>

## 约束检查清单

- [ ] 教师数据访问控制已实现（仅本人可访问）
- [ ] 学生信息去标识化机制已实现
- [ ] AI生成内容有明确标注
- [ ] 研究伦理指引文档已提供
- [ ] 分享功能包含匿名化工具
- [ ] 课程内容按阶段分级
- [ ] 本地存储方案已实现（可选）

