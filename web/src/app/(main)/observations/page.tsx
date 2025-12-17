"use client";

import Link from "next/link";
import { Plus, Eye, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useObservationStore } from "@/stores/observation.store";
import { FocusBadge } from "@/components/common/focus-badge";
import { EmptyState } from "@/components/common/empty-state";

export default function ObservationsPage() {
  const { observations } = useObservationStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的观察记录</h1>
          <p className="text-gray-500 mt-1">记录和管理您的课堂观察</p>
        </div>
        <Link href="/observations/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建观察
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="搜索观察..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          筛选
        </Button>
      </div>

      {observations.length === 0 ? (
        <EmptyState
          icon={Eye}
          title="还没有观察记录"
          description="开始记录您的课堂观察，积累研究素材"
          action={
            <Link href="/observations/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建第一条观察
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {observations.map((obs) => (
            <Link key={obs.id} href={`/observations/${obs.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <h3 className="font-medium truncate">{obs.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{obs.content}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <FocusBadge focus={obs.focusArea} />
                      <span className="text-xs text-gray-400">{obs.observationDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
