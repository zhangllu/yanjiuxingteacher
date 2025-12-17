"use client";

import Link from "next/link";
import { BookOpen, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AILabel } from "@/components/ai/ai-label";
import { MOCK_REFLECTIONS } from "@/lib/mock-data";

export default function ReflectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的反思日志</h1>
          <p className="text-gray-500 mt-1">记录您的教学反思</p>
        </div>
        <Link href="/reflections/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建反思
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {MOCK_REFLECTIONS.map((reflection) => (
          <Card key={reflection.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <h3 className="font-medium">{reflection.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{reflection.content}</p>
                  <div className="flex items-center gap-2">
                    {reflection.aiAssisted && <AILabel />}
                    <span className="text-xs text-gray-400">{reflection.reflectionDate}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span className="text-xs ml-1">仅自己可见</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
