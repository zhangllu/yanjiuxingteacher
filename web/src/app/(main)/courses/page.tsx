"use client";

import { GraduationCap, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_COURSES } from "@/lib/mock-data";
import { useAuthStore } from "@/stores/auth.store";

const stageLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: "初级", color: "bg-blue-100 text-blue-700" },
  intermediate: { label: "中级", color: "bg-purple-100 text-purple-700" },
  advanced: { label: "高级", color: "bg-amber-100 text-amber-700" },
};

export default function CoursesPage() {
  const { teacher } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">学习课程</h1>
        <p className="text-gray-500 mt-1">系统学习教育研究方法</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_COURSES.map((course) => {
          const isCurrentStage = course.stage === teacher?.stage;
          return (
            <Card key={course.id} className={isCurrentStage ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className={stageLabels[course.stage].color}>
                    {stageLabels[course.stage].label}
                  </Badge>
                </div>
                <h3 className="font-medium mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <Play className="h-4 w-4 mr-2" />
                  开始学习
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
