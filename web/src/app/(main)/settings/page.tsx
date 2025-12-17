"use client";

import { Settings, User, Bell, Shield, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth.store";

export default function SettingsPage() {
  const { teacher } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-500 mt-1">管理您的账户和偏好设置</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            个人信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>姓名</Label>
              <Input value={teacher?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>邮箱</Label>
              <Input value={teacher?.email || ""} disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>学科</Label>
              <Input value={teacher?.subject || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>教龄</Label>
              <Input value={teacher?.teachingYears || ""} disabled />
            </div>
          </div>
          <Button variant="outline" disabled>编辑个人信息</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            通知设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">研究提醒</p>
              <p className="text-sm text-gray-500">定期提醒您记录观察和反思</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">课程推荐</p>
              <p className="text-sm text-gray-500">推送适合您阶段的学习内容</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            数据管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">本地存储</p>
              <p className="text-sm text-gray-500">数据优先保存在本地</p>
            </div>
            <Switch defaultChecked disabled />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">云端同步</p>
              <p className="text-sm text-gray-500">将数据同步到云端备份</p>
            </div>
            <Switch disabled />
          </div>
          <Button variant="outline" disabled>导出数据</Button>
        </CardContent>
      </Card>
    </div>
  );
}
