"use client";

import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROJECTS } from "@/lib/mock-data";

const stageLabels: Record<string, { label: string; color: string }> = {
  design: { label: "设计阶段", color: "bg-blue-100 text-blue-700" },
  implementation: { label: "实施阶段", color: "bg-purple-100 text-purple-700" },
  analysis: { label: "分析阶段", color: "bg-amber-100 text-amber-700" },
  completed: { label: "已完成", color: "bg-green-100 text-green-700" },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的研究项目</h1>
          <p className="text-gray-500 mt-1">管理您的研究项目</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建项目
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_PROJECTS.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderKanban className="h-4 w-4 text-gray-400" />
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{project.design.objective}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={stageLabels[project.stage].color}>
                      {stageLabels[project.stage].label}
                    </Badge>
                    <span className="text-xs text-gray-400">开始于 {project.startDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
