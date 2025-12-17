"use client";

import { Check, Loader2, CloudOff, AlertCircle } from "lucide-react";

type SaveStatusType = "saved" | "saving" | "offline" | "error";

interface SaveStatusProps {
  status: SaveStatusType;
  lastSaved?: Date;
}

const statusConfig = {
  saved: { icon: Check, text: "已保存", color: "text-green-600" },
  saving: { icon: Loader2, text: "保存中...", color: "text-gray-500" },
  offline: { icon: CloudOff, text: "离线保存", color: "text-amber-600" },
  error: { icon: AlertCircle, text: "保存失败", color: "text-red-600" },
};

export function SaveStatus({ status, lastSaved }: SaveStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center text-sm ${config.color}`}>
      <Icon className={`w-4 h-4 mr-1 ${status === "saving" ? "animate-spin" : ""}`} />
      <span>{config.text}</span>
      {lastSaved && status === "saved" && (
        <span className="ml-1 text-gray-400">{lastSaved.toLocaleTimeString()}</span>
      )}
    </div>
  );
}
