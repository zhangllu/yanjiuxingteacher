import { Badge } from "@/components/ui/badge";

type Stage = "beginner" | "intermediate" | "advanced";

const stageConfig = {
  beginner: { label: "初级", color: "bg-blue-100 text-blue-700 border-blue-200" },
  intermediate: { label: "中级", color: "bg-purple-100 text-purple-700 border-purple-200" },
  advanced: { label: "高级", color: "bg-amber-100 text-amber-700 border-amber-200" },
};

export function StageIndicator({ stage }: { stage: Stage }) {
  const config = stageConfig[stage];
  return (
    <Badge variant="outline" className={config.color}>
      {config.label}阶段
    </Badge>
  );
}
