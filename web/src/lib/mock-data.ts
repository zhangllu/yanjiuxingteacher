// Mock 数据 - 根据 UI 规格书定义

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
];

export type ProjectStage = "design" | "implementation" | "analysis" | "completed";

export const MOCK_PROJECTS: Array<{
  id: string;
  title: string;
  questionId: string;
  method: "action" | "case" | "observation" | "mixed";
  design: {
    objective: string;
    dataCollection: string;
    analysisPlan: string;
  };
  stage: ProjectStage;
  ethicsConfirmed: boolean;
  startDate: string;
  createdAt: string;
}> = [
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
    stage: "implementation",
    ethicsConfirmed: true,
    startDate: "2025-12-01",
    createdAt: "2025-12-01T09:00:00Z",
  },
];

export const MOCK_REFLECTIONS = [
  {
    id: "ref-001",
    title: "关于课堂节奏的反思",
    content: "这周尝试了缩短讲解时间、增加互动环节的做法。发现学生的注意力确实有所改善，但也带来了新的问题：部分知识点讲解不够深入。需要找到平衡点。",
    projectId: null,
    aiAssisted: false,
    reflectionDate: "2025-12-15",
    createdAt: "2025-12-15T20:00:00Z",
  },
];

export const MOCK_COURSES = [
  { id: "course-001", title: "教育研究意识入门", description: "了解什么是教育研究", stage: "beginner" as const, topic: "research_awareness", order: 1 },
  { id: "course-002", title: "课堂观察方法", description: "学习如何系统地观察和记录", stage: "beginner" as const, topic: "observation", order: 2 },
  { id: "course-003", title: "从观察到问题", description: "如何从日常观察中提炼研究问题", stage: "beginner" as const, topic: "question", order: 3 },
];

export const MOCK_TEACHER = {
  id: "teacher-001",
  email: "demo@example.com",
  name: "张老师",
  schoolLevel: "primary" as const,
  subject: "数学",
  teachingYears: "5-10年",
  stage: "beginner" as const,
};
