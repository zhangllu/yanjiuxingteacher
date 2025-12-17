import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AILabel() {
  return (
    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
      <Sparkles className="w-3 h-3 mr-1" />
      AI 辅助建议
    </Badge>
  );
}
