"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SaveStatus } from "@/components/common/save-status";
import { useObservationStore } from "@/stores/observation.store";
import { toast } from "sonner";

const focusOptions = [
  { value: "teaching", label: "课堂教学" },
  { value: "behavior", label: "学生行为" },
  { value: "performance", label: "学习表现" },
  { value: "mental_health", label: "心理健康" },
  { value: "organization", label: "课堂组织" },
];

// 简单的姓名检测（中文2-4字）
function detectNames(text: string): string[] {
  const pattern = /[\u4e00-\u9fa5]{2,4}/g;
  const matches = text.match(pattern) || [];
  // 过滤掉常见词汇，只保留可能是姓名的
  const commonWords = ["学生", "老师", "同学", "课堂", "教学", "观察", "发现", "问题", "今天", "明天", "昨天"];
  return matches.filter((m) => !commonWords.includes(m) && m.length <= 3);
}

export default function NewObservationPage() {
  const router = useRouter();
  const { addObservation } = useObservationStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focusArea, setFocusArea] = useState("teaching");
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split("T")[0]);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "offline" | "error">("saved");
  const [detectedNames, setDetectedNames] = useState<string[]>([]);

  // 自动保存到本地
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        setSaveStatus("saving");
        localStorage.setItem("draft-observation", JSON.stringify({ title, content, focusArea, observationDate }));
        setTimeout(() => setSaveStatus("saved"), 500);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [title, content, focusArea, observationDate]);

  // 检测敏感信息
  useEffect(() => {
    const names = detectNames(content);
    // 过滤掉已经是代号格式的（如 S001）
    const filtered = names.filter((n) => !/^S\d+$/.test(n));
    setDetectedNames(filtered.slice(0, 5)); // 最多显示5个
  }, [content]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("请输入标题");
      return;
    }
    if (!content.trim()) {
      toast.error("请输入观察内容");
      return;
    }
    if (detectedNames.length > 0) {
      toast.warning("请先处理检测到的敏感信息");
      return;
    }

    addObservation({ title, content, focusArea, observationDate });
    localStorage.removeItem("draft-observation");
    toast.success("观察记录已保存");
    router.push("/observations");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/observations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">新建观察记录</h1>
        </div>
        <SaveStatus status={saveStatus} />
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              placeholder="输入观察标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">观察内容</Label>
              <Button variant="ghost" size="sm" disabled>
                <Mic className="h-4 w-4 mr-1" />
                语音输入
              </Button>
            </div>
            <Textarea
              id="content"
              placeholder="输入观察内容...&#10;&#10;提示：请使用代号（如 S001）代替学生真实姓名"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {detectedNames.length > 0 && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  检测到可能的学生姓名：{detectedNames.join("、")}
                  <br />
                  请使用代号（如 S001）代替学生真实姓名
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>观察焦点</Label>
              <Select value={focusArea} onValueChange={setFocusArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {focusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>观察日期</Label>
              <Input
                type="date"
                value={observationDate}
                onChange={(e) => setObservationDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/observations">
              <Button variant="outline">取消</Button>
            </Link>
            <Button onClick={handleSubmit}>保存</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
