"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Eye, FolderKanban, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "首页", href: "/dashboard" },
  { icon: Eye, label: "观察", href: "/observations" },
  { icon: FolderKanban, label: "项目", href: "/projects" },
  { icon: BookOpen, label: "反思", href: "/reflections" },
  { icon: Settings, label: "设置", href: "/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2",
              isActive ? "text-primary" : "text-gray-500"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
