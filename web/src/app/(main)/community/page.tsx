"use client";

import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/common/empty-state";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">教师社区</h1>
        <p className="text-gray-500 mt-1">浏览其他教师的研究成果</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="搜索研究成果..." className="pl-9" />
      </div>

      <EmptyState
        icon={Users}
        title="社区功能即将上线"
        description="您将可以在这里浏览和学习其他教师的研究成果"
      />
    </div>
  );
}
