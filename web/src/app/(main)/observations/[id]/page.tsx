"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useObservationStore } from "@/stores/observation.store";
import { FocusBadge } from "@/components/common/focus-badge";
import { toast } from "sonner";

export default function ObservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { observations, deleteObservation } = useObservationStore();
  const observation = observations.find((o) => o.id === id);

  if (!observation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">观察记录不存在</p>
        <Link href="/observations">
          <Button variant="link">返回列表</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteObservation(id);
    toast.success("已删除");
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
          <h1 className="text-xl font-bold truncate">{observation.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <Pencil className="h-4 w-4 mr-1" />
            编辑
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                删除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作无法撤销。删除后，这条观察记录将永久移除。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>确认删除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {observation.observationDate}
            </div>
            <FocusBadge focus={observation.focusArea} />
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{observation.content}</p>
          </div>

          <div className="pt-4 border-t">
            <Link href="/questions">
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                从此观察提炼研究问题
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
