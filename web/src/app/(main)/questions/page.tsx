"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, HelpCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestionStore } from "@/stores/question.store";
import { useObservationStore } from "@/stores/observation.store";
import { AIButton } from "@/components/ai/ai-button";
import { AILabel } from "@/components/ai/ai-label";
import { EmptyState } from "@/components/common/empty-state";
import { toast } from "sonner";

const questionTypeLabels: Record<string, { label: string; color: string }> = {
  descriptive: { label: "描述性问题", color: "bg-blue-100 text-blue-700" },
  explanatory: { label: "解释性问题", color: "bg-purple-100 text-purple-700" },
  interventional: { label: "干预性问题", color: "bg-green-100 text-green-700" },
};

const statusLabels: Record<string, string> = {
  pending: "待研究",
  researching: "研究中",
  completed: "已完成",
};

// Mock AI 响应
const mockAISuggestions = [
  { questionText: "如何通过调整教学策略来改善学生的课堂参与度？", questionType: "interventional", background: "基于您的观察记录，发现学生在某些环节参与度较低。" },
  { questionText: "学生在不同教学环节中的注意力表现有何差异？", questionType: "descriptive", background: "您的观察显示学生在互动环节和讲解环节表现不同。" },
  { questionText: "哪些因素影响了学生的课堂专注度？", questionType: "explanatory", background: "观察记录中提到了多种可能影响学生注意力的因素。" },
];

export default function QuestionsPage() {
  const { questions, addQuestion } = useQuestionStore();
  const { observations } = useObservationStore();
  const [selectedObs, setSelectedObs] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<typeof mockAISuggestions | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pendingQuestions = questions.filter((q) => q.status === "pending");
  const researchingQuestions = questions.filter((q) => q.status === "researching");
  const completedQuestions = questions.filter((q) => q.status === "completed");

  const handleGenerateQuestions = async () => {
    if (selectedObs.length === 0) {
      toast.error("请至少选择一条观察记录");
      return;
    }
    setAiLoading(true);
    // 模拟 AI 调用延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAiSuggestions(mockAISuggestions);
    setAiLoading(false);
  };

  const handleSelectSuggestion = (suggestion: typeof mockAISuggestions[0]) => {
    addQuestion({
      questionText: suggestion.questionText,
      background: suggestion.background,
      questionType: suggestion.questionType as "descriptive" | "explanatory" | "interventional",
      source: "ai_assisted",
      status: "pending",
      relatedObservationIds: selectedObs,
    });
    toast.success("问题已添加");
    setDialogOpen(false);
    setAiSuggestions(null);
    setSelectedObs([]);
  };

  const QuestionCard = ({ question }: { question: typeof questions[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{question.questionText}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{question.background}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={questionTypeLabels[question.questionType].color}>
                {questionTypeLabels[question.questionType].label}
              </Badge>
              {question.source === "ai_assisted" && <AILabel />}
            </div>
          </div>
          {question.status === "pending" && (
            <Button size="sm" variant="outline">开始研究</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的研究问题</h1>
          <p className="text-gray-500 mt-1">从观察中提炼研究问题</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              AI 辅助提炼
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>AI 辅助提炼研究问题</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-3">选择相关观察记录：</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {observations.map((obs) => (
                    <label key={obs.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <Checkbox
                        checked={selectedObs.includes(obs.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedObs([...selectedObs, obs.id]);
                          } else {
                            setSelectedObs(selectedObs.filter((id) => id !== obs.id));
                          }
                        }}
                      />
                      <span className="text-sm">{obs.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              <AIButton onClick={handleGenerateQuestions} loading={aiLoading}>
                生成问题建议
              </AIButton>
              {aiSuggestions && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">AI 建议：</span>
                    <AILabel />
                  </div>
                  {aiSuggestions.map((suggestion, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md" onClick={() => handleSelectSuggestion(suggestion)}>
                      <CardContent className="p-4">
                        <p className="font-medium mb-1">{suggestion.questionText}</p>
                        <p className="text-sm text-gray-500 mb-2">{suggestion.background}</p>
                        <Badge variant="outline" className={questionTypeLabels[suggestion.questionType].color}>
                          {questionTypeLabels[suggestion.questionType].label}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-xs text-gray-400">⚠️ 以上建议由 AI 生成，请教师自主判断是否采纳</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">待研究 ({pendingQuestions.length})</TabsTrigger>
          <TabsTrigger value="researching">研究中 ({researchingQuestions.length})</TabsTrigger>
          <TabsTrigger value="completed">已完成 ({completedQuestions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingQuestions.length === 0 ? (
            <EmptyState icon={HelpCircle} title="没有待研究的问题" description="使用 AI 辅助从观察中提炼研究问题" />
          ) : (
            pendingQuestions.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </TabsContent>
        <TabsContent value="researching" className="space-y-4 mt-4">
          {researchingQuestions.length === 0 ? (
            <EmptyState icon={HelpCircle} title="没有进行中的研究" description="选择一个问题开始研究" />
          ) : (
            researchingQuestions.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedQuestions.length === 0 ? (
            <EmptyState icon={HelpCircle} title="还没有完成的研究" description="完成研究后会显示在这里" />
          ) : (
            completedQuestions.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
