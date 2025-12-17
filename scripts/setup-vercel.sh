#!/bin/bash

# Vercel 自动化部署快速设置脚本
# 使用方法：bash scripts/setup-vercel.sh

set -e

echo "🚀 Vercel 自动化部署设置脚本"
echo "================================"
echo ""

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请先安装 Vercel CLI："
    echo "  npm install -g vercel"
    echo ""
    exit 1
fi

echo "✅ Vercel CLI 已安装"
echo ""

# 检查是否在正确的目录
if [ ! -f "web/package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "📝 设置步骤："
echo "------------"
echo ""

# 步骤 1：登录 Vercel
echo "1. 登录 Vercel"
echo "2. 链接项目到 Vercel"
echo ""

read -p "按回车键继续..."

# 登录 Vercel
echo "正在登录 Vercel..."
vercel login

# 链接项目
echo "正在链接项目..."
cd web
vercel link

echo ""
echo "🔑 获取项目配置信息..."
echo ""

# 获取项目信息
ORG_ID=$(vercel inspect --token $VERCEL_TOKEN | grep -A 5 '"orgId"' | grep -oP '"\K[^"]+' | head -1)
PROJECT_ID=$(vercel inspect --token $VERCEL_TOKEN | grep -A 5 '"projectId"' | grep -oP '"\K[^"]+' | head -1)

echo "✅ 项目配置信息："
echo "   组织 ID: $ORG_ID"
echo "   项目 ID: $PROJECT_ID"
echo ""

# 获取 Vercel Token
echo "🔐 Vercel Token 获取方法："
echo "1. 访问 https://vercel.com/account/tokens"
echo "2. 点击 'Create Token'"
echo "3. 复制生成的 token"
echo ""

read -p "请输入您的 VercEL Token（或按回车跳过）: " TOKEN

if [ ! -z "$TOKEN" ]; then
    echo ""
    echo "📋 GitHub Secrets 配置信息："
    echo "================================"
    echo ""
    echo "在 GitHub 仓库 (https://github.com/zhangllu/yanjiuxingteacher) 中添加以下 Secrets："
    echo ""
    echo "Secret 名称              | 值"
    echo "------------------------|----------------------------------------"
    echo "VERCEL_TOKEN            | $TOKEN"
    echo "VERCEL_ORG_ID           | $ORG_ID"
    echo "VERCEL_PROJECT_ID       | $PROJECT_ID"
    echo ""
    echo "添加步骤："
    echo "1. 进入 GitHub 仓库"
    echo "2. 点击 Settings > Secrets and variables > Actions"
    echo "3. 点击 'New repository secret'"
    echo "4. 分别添加上述三个密钥"
    echo ""
    echo "✅ 设置完成！"
    echo ""
    echo "现在每次推送到 main 分支时，GitHub Actions 将自动部署到 Vercel"
else
    echo "⚠️  跳过了 Token 配置"
    echo "请手动配置 GitHub Secrets 后推送代码到 main 分支"
fi

cd ..
