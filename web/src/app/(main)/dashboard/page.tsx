"use client";

import Link from "next/link";
import { Plus, Eye, HelpCircle, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { useObservationStore } from "@/stores/observation.store";
import { useQuestionStore } from "@/stores/question.store";
import { FocusBadge } from "@/components/common/focus-badge";
import { MOCK_COURSES, MOCK_PROJECTS } from "@/lib/mock-data";

export default function DashboardPage() {
  const { teacher } = useAuthStore();
  const { observations } = useObservationStore();
  const { questions } = useQuestionStore();

  const recentObservations = observations.slice(0, 3);
  const activeProjects = MOCK_PROJECTS.filter((p) => p.stage !== "completed");
  const recommendedCourses = MOCK_COURSES.filter((c) => c.stage === teacher?.stage).slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{teacher?.name}</h1>
        <p className="text-gray-500 mt-1">继续您的研究之旅</p>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/observations/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-blue-100 p-3 mb-2">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium">记录观察</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/questions">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-purple-100 p-3 mb-2">
                <HelpCircle className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium">问题提炼</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/reflections/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-green-100 p-3 mb-2">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">反思写作</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/courses">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-amber-100 p-3 mb-2">
                <GraduationCap className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-sm font-medium">学习课程</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 最近观察 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">最近观察</CardTitle>
          <Link href="/observations">
            <Button variant="ghost" size="sm">
              查看全部 <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentObservations.map((obs) => (
            <Link key={obs.id} href={`/observations/${obs.id}`}>
              <div className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm truncate">{obs.title}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{obs.content}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <FocusBadge focus={obs.focusArea} />
                  <span className="text-xs text-gray-400">{obs.observationDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* 进行中的研究 */}
      {activeProjects.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">进行中的研究</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                查看全部 <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activeProjects.map((project) => (
              <div key={project.id} className="p-3 rounded-lg bg-gray-50">
                <h4 className="font-medium">{project.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{project.design.objective}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 推荐课程 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">推荐课程</CardTitle>
          <Link href="/courses">
            <Button variant="ghost" size="sm">
              查看全部 <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
              <h4 className="font-medium">{course.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{course.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
