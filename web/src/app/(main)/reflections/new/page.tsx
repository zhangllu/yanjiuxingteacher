"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIButton } from "@/components/ai/ai-button";
import { AILabel } from "@/components/ai/ai-label";
import { SaveStatus } from "@/components/common/save-status";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { toast } from "sonner";

const mockReflectionPrompts = [
  "这次教学/研究经历中，最让您印象深刻的是什么？",
  "您观察到了哪些预期之外的现象？",
  "如果重新来过，您会做出什么不同的选择？",
  "这次经历对您未来的教学有什么启示？",
  "您在这个过程中学到了什么？",
];

export default function NewReflectionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [saveStatus] = useState<"saved" | "saving">("saved");
  const [aiLoading, setAiLoading] = useState(false);
  const [prompts, setPrompts] = useState<string[] | null>(null);

  const handleGeneratePrompts = async () => {
    setAiLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPrompts(mockReflectionPrompts);
    setAiLoading(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("请输入标题");
      return;
    }
    if (!content.trim()) {
      toast.error("请输入反思内容");
      return;
    }
    toast.success("反思日志已保存");
    router.push("/reflections");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/reflections">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">新建反思日志</h1>
        </div>
        <SaveStatus status={saveStatus} />
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              placeholder="输入反思标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>关联研究项目（可选）</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="选择项目..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">不关联项目</SelectItem>
                {MOCK_PROJECTS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <AIButton onClick={handleGeneratePrompts} loading={aiLoading}>
              AI 辅助反思
            </AIButton>
            {prompts && (
              <div className="p-4 bg-purple-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">反思提示：</span>
                  <AILabel />
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {prompts.map((prompt, i) => (
                    <li key={i}>• {prompt}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-2">⚠️ 以上提示由 AI 生成，仅供参考</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">反思内容</Label>
            <Textarea
              id="content"
              placeholder="输入反思内容..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <span>反思内容仅自己可见</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/reflections">
              <Button variant="outline">取消</Button>
            </Link>
            <Button onClick={handleSubmit}>保存</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
