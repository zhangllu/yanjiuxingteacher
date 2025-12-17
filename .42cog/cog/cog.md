# 研究型教师成长系统 - 认知模型文档

<meta>
  <document-id>yanjiuxingteacher-cog</document-id>
  <version>1.0.0</version>
  <project>研究型教师成长系统</project>
  <type>认知模型</type>
  <created>2025-12-17</created>
  <depends>real.md</depends>
</meta>

## 文档说明

本文档基于"智能体 + 信息 + 上下文"框架，定义研究型教师成长系统的认知模型。本系统旨在帮助中小学教师将教学经验转化为可理解、可检验、可分享的教育研究能力，通过"理解 + 实践 + 反思"的成长路径，实现从"教书教师"向"研究型教师"的转变。

---

## 一、智能体（Agents）

<agents>

### 1.1 人类智能体

<agent type="human" id="A1">
<name>教师（Teacher）</name>
<identifier>UUID，注册时生成</identifier>
<classification>
  <by-stage>初级（研究意识培养）| 中级（基础研究能力）| 高级（研究实践与传播）</by-stage>
  <by-school-level>幼儿园 | 小学 | 初中 | 高中</by-school-level>
  <by-subject>语文 | 数学 | 英语 | 科学 | 艺术 | 体育 | 其他</by-subject>
</classification>
<capabilities>
  - 观察课堂与学生行为
  - 记录教学反思与观察日志
  - 提出教育问题
  - 设计小规模行动研究
  - 分析教学数据
  - 撰写研究报告
  - 分享研究成果
</capabilities>
<goals>
  - 建立教育问题意识和研究意识
  - 掌握基础教育研究方法
  - 将研究融入日常教学
  - 提升专业发展能力
  - 改善课堂教学质量
  - 更好地支持学生成长
</goals>
</agent>

<agent type="human" id="A2">
<name>学生（Student）</name>
<identifier>去标识化代号（如：S001、学生A），不存储真实身份信息</identifier>
<classification>
  <by-grade>幼儿园 | 小学低年级 | 小学高年级 | 初中 | 高中</by-grade>
  <by-observation-focus>学习表现 | 心理健康 | 社交行为 | 课堂参与</by-observation-focus>
</classification>
<capabilities>
  - 参与课堂学习
  - 展现学习行为和情绪状态
  - 提供学习反馈
</capabilities>
<goals>
  - 获得更好的学习体验
  - 得到教师的有效支持
  - 实现个人成长
</goals>
</agent>

### 1.2 人工智能体

<agent type="ai" id="A3">
<name>AI研究助手（AI Research Assistant）</name>
<identifier>provider + model_id（如：anthropic/claude-3-opus）</identifier>
<classification>
  <by-function>观察记录提炼 | 研究问题生成 | 研究设计辅助 | 反思写作支持</by-function>
</classification>
<interaction-pattern>
  输入：教师的观察记录、教学问题、研究草稿
  输出：结构化建议、研究框架、反思提示（明确标注为"AI辅助建议"）
</interaction-pattern>
</agent>

</agents>

---

## 二、信息（Information）

<information>

### 2.1 核心实体

<entity id="E1">
<name>教师（Teacher）</name>
<unique-code>teacher_id：UUID，注册时生成</unique-code>
<classification>
  <by-stage>初级 | 中级 | 高级</by-stage>
  <by-school-level>幼儿园 | 小学 | 初中 | 高中</by-school-level>
  <by-subject>学科分类</by-subject>
</classification>
<attributes>
  - username：用户名
  - email：邮箱（加密存储）
  - school_type：学校类型
  - teaching_years：教龄
  - current_stage：当前成长阶段
  - created_at：注册时间
</attributes>
<relations>
  - 拥有多个观察记录（1:N）
  - 拥有多个研究项目（1:N）
  - 拥有多个反思日志（1:N）
</relations>
</entity>

<entity id="E2">
<name>观察记录（Observation）</name>
<unique-code>observation_id：UUID</unique-code>
<classification>
  <by-focus>课堂教学 | 学生行为 | 学习表现 | 心理健康 | 课堂组织</by-focus>
  <by-method>自然观察 | 结构化观察 | 视频记录 | 文字记录</by-method>
</classification>
<attributes>
  - title：观察标题
  - content：观察内容（学生信息已去标识化）
  - observation_date：观察日期
  - focus_area：观察焦点
  - teacher_id：所属教师
  - created_at：创建时间
</attributes>
<relations>
  - 属于一个教师（N:1）
  - 可关联多个研究问题（N:N）
</relations>
</entity>

<entity id="E3">
<name>研究问题（Research Question）</name>
<unique-code>question_id：UUID</unique-code>
<classification>
  <by-source>教师自主提出 | AI辅助生成</by-source>
  <by-type>描述性问题 | 解释性问题 | 干预性问题</by-type>
</classification>
<attributes>
  - question_text：问题描述
  - background：问题背景
  - source：来源（教师/AI）
  - status：状态（待研究、研究中、已完成）
  - teacher_id：所属教师
</attributes>
<relations>
  - 属于一个教师（N:1）
  - 可关联多个观察记录（N:N）
  - 可关联一个研究项目（N:1）
</relations>
</entity>

<entity id="E4">
<name>研究项目（Research Project）</name>
<unique-code>project_id：UUID</unique-code>
<classification>
  <by-method>行动研究 | 案例研究 | 观察研究 | 混合方法</by-method>
  <by-stage>设计阶段 | 实施阶段 | 分析阶段 | 完成阶段</by-stage>
</classification>
<attributes>
  - title：项目标题
  - research_question：研究问题
  - method：研究方法
  - design：研究设计
  - data_collection：数据收集计划
  - analysis_plan：分析计划
  - findings：研究发现
  - teacher_id：所属教师
  - start_date：开始日期
  - end_date：结束日期
</attributes>
<relations>
  - 属于一个教师（N:1）
  - 包含多个数据记录（1:N）
  - 关联一个研究问题（1:1）
</relations>
</entity>

<entity id="E5">
<name>反思日志（Reflection Journal）</name>
<unique-code>journal_id：UUID</unique-code>
<classification>
  <by-type>教学反思 | 研究反思 | 学习反思</by-type>
  <by-ai-support>无AI辅助 | AI辅助提炼 | AI辅助结构化</by-ai-support>
</classification>
<attributes>
  - title：日志标题
  - content：反思内容
  - reflection_date：反思日期
  - ai_assisted：是否使用AI辅助
  - teacher_id：所属教师
</attributes>
<relations>
  - 属于一个教师（N:1）
  - 可关联研究项目（N:1）
</relations>
</entity>

<entity id="E6">
<name>课程模块（Course Module）</name>
<unique-code>module_id：UUID</unique-code>
<classification>
  <by-stage>初级 | 中级 | 高级</by-stage>
  <by-topic>研究意识 | 观察方法 | 研究设计 | 数据分析 | 反思写作</by-topic>
</classification>
<attributes>
  - title：模块标题
  - description：模块描述
  - content：课程内容
  - stage：适用阶段
  - order：顺序
</attributes>
<relations>
  - 包含多个学习任务（1:N）
  - 被多个教师学习（N:N）
</relations>
</entity>

<entity id="E7">
<name>研究成果（Research Output）</name>
<unique-code>output_id：UUID</unique-code>
<classification>
  <by-type>研究报告 | 案例分析 | 反思文章 | 教学改进方案</by-type>
  <by-visibility>私密 | 社区分享（匿名化）</by-visibility>
</classification>
<attributes>
  - title：成果标题
  - content：成果内容
  - anonymized：是否已匿名化
  - shared：是否分享
  - teacher_id：所属教师
  - project_id：关联项目
</attributes>
<relations>
  - 属于一个教师（N:1）
  - 关联一个研究项目（N:1）
</relations>
</entity>

### 2.2 信息流动

<information-flow>

<flow id="F1" name="教学观察记录">
  教师 → 课堂观察 → 系统 → 记录观察内容（学生信息去标识化）→ 存储观察记录
</flow>

<flow id="F2" name="AI辅助问题提炼">
  教师 → 提交观察记录 → 系统 → 调用AI → AI研究助手 → 生成研究问题建议（标注为AI辅助）→ 教师审阅和修改 → 确认研究问题
</flow>

<flow id="F3" name="研究设计">
  教师 → 选择研究问题 → 系统 → 提供研究方法模板 → AI辅助生成研究框架 → 教师自主设计研究方案 → 创建研究项目
</flow>

<flow id="F4" name="数据收集与分析">
  教师 → 实施研究 → 收集数据 → 系统 → 存储数据 → AI辅助分析建议 → 教师自主分析 → 记录研究发现
</flow>

<flow id="F5" name="反思写作">
  教师 → 撰写反思日志 → 系统 → AI辅助结构化建议 → 教师完善反思 → 存储反思日志
</flow>

<flow id="F6" name="成果分享">
  教师 → 完成研究报告 → 系统 → 自动匿名化处理 → 教师确认 → 发布到社区 → 其他教师浏览学习
</flow>

<flow id="F7" name="学习路径">
  教师 → 选择课程模块 → 系统 → 提供课程内容 → 完成学习任务 → 实践应用 → 反思总结 → 进入下一阶段
</flow>

</information-flow>

</information>

---

## 三、上下文（Context）

<context>

### 3.1 应用上下文

- **类型**：Web应用 + 移动端（响应式设计）
- **使用场景**：
  - 课后记录教学观察
  - 周末设计研究方案
  - 假期撰写研究报告
  - 教师社区交流分享
- **数据存储**：本地优先 + 云端同步（可选）

### 3.2 技术上下文

- **开发环境**：Apple Silicon Mac + Bun + uv + cnb.cool
- **前端架构**（待定）：Next.js / React + Tailwind CSS + shadcn/ui
- **后端架构**（待定）：Bun / Node.js + PostgreSQL / SQLite + Drizzle ORM / Prisma
- **AI集成**：Vercel AI SDK + Claude / GPT-4 / 国产大模型
- **安全机制**：
  - 教师数据隔离（仅本人可访问）
  - 学生信息去标识化
  - AI生成内容明确标注
  - 研究伦理指引

### 3.3 用户体验上下文

- **情感目标**：
  - 安全感：数据隐私有保障
  - 成就感：看到自己的研究能力成长
  - 支持感：AI是伙伴而非替代者
  - 归属感：在教师社区中交流学习
- **交互风格**：
  - 简洁：避免学术术语堆砌
  - 实用：紧贴教学实践场景
  - 渐进：分阶段引导，不急于求成
  - 尊重：强调教师的主体性和专业判断
- **核心体验**：
  - 从日常教学中发现研究问题
  - 在AI辅助下设计可行的小规模研究
  - 通过反思实践提升专业能力
  - 在社区中分享和学习

</context>

---

## 四、权重矩阵

<weights>

| 实体/交互 | 重要性 | 说明 |
|-----------|--------|------|
| 教师 | ★★★★★ | 核心用户，所有功能围绕教师成长展开 |
| 观察记录 | ★★★★★ | 研究的起点，必须易于记录和管理 |
| 研究问题 | ★★★★☆ | 连接观察与研究的关键环节 |
| 研究项目 | ★★★★☆ | 教师研究能力的具体体现 |
| 反思日志 | ★★★★☆ | 促进教师自我反思和成长 |
| AI辅助 | ★★★☆☆ | 辅助工具，不可喧宾夺主 |
| 课程模块 | ★★★★☆ | 系统化学习的基础 |
| 研究成果 | ★★★☆☆ | 成长的可见化成果 |
| 隐私保护 | ★★★★★ | 必选约束，不可妥协 |
| 研究伦理 | ★★★★★ | 必选约束，不可妥协 |

</weights>

---

## 五、验收检查

- [ ] 所有实体都定义了唯一编码
- [ ] 所有实体都有人类定义的分类
- [ ] 信息流覆盖了核心用户场景（观察-问题-研究-反思-分享）
- [ ] 上下文信息与meta.md和real.md保持一致
- [ ] 权重矩阵反映了"教师主体性"和"隐私保护"的优先级
- [ ] 学生信息去标识化机制已体现在观察记录实体中
- [ ] AI辅助的边界在信息流中明确标注

