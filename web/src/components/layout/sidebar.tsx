"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Eye, HelpCircle, FolderKanban, BookOpen, FileText, Users, Settings, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { StageIndicator } from "@/components/common/stage-indicator";
import { useAuthStore } from "@/stores/auth.store";

const navItems = [
  { icon: Home, label: "首页", href: "/dashboard" },
  { icon: Eye, label: "观察记录", href: "/observations" },
  { icon: HelpCircle, label: "研究问题", href: "/questions" },
  { icon: FolderKanban, label: "研究项目", href: "/projects" },
  { icon: BookOpen, label: "反思日志", href: "/reflections" },
  { icon: FileText, label: "研究成果", href: "/outputs" },
  { icon: GraduationCap, label: "学习课程", href: "/courses" },
  { icon: Users, label: "教师社区", href: "/community" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { teacher } = useAuthStore();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 bg-white border-r">
      <div className="flex items-center h-16 px-6 border-b">
        <GraduationCap className="h-8 w-8 text-primary mr-2" />
        <span className="font-semibold text-lg">研究型教师</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        {teacher && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">当前阶段</span>
            <StageIndicator stage={teacher.stage} />
          </div>
        )}
        <Link
          href="/settings"
          className="flex items-center px-3 py-2 mt-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <Settings className="h-5 w-5 mr-3" />
          设置
        </Link>
      </div>
    </aside>
  );
}
