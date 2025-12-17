import { Badge } from "@/components/ui/badge";

const focusConfig: Record<string, { label: string; color: string }> = {
  teaching: { label: "课堂教学", color: "bg-blue-100 text-blue-700 border-blue-200" },
  behavior: { label: "学生行为", color: "bg-purple-100 text-purple-700 border-purple-200" },
  performance: { label: "学习表现", color: "bg-green-100 text-green-700 border-green-200" },
  mental_health: { label: "心理健康", color: "bg-amber-100 text-amber-700 border-amber-200" },
  organization: { label: "课堂组织", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
};

export function FocusBadge({ focus }: { focus: string }) {
  const config = focusConfig[focus] || { label: focus, color: "bg-gray-100 text-gray-700" };
  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
}
