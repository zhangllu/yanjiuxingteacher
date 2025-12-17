"use client";

import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";

export default function OutputsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的研究成果</h1>
          <p className="text-gray-500 mt-1">撰写和分享您的研究成果</p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          新建成果
        </Button>
      </div>

      <EmptyState
        icon={FileText}
        title="还没有研究成果"
        description="完成研究项目后，可以在这里撰写研究报告"
      />
    </div>
  );
}
