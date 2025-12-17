#!/bin/bash

# 通用开发环境快速修复脚本
# 适用于 Next.js、React、Vue 等前端项目
# 一键解决开发环境卡顿问题
# 赋予脚本运行权限：chmod +x ./fix-dev.sh
# 运行脚本：./fix-dev.sh

echo "⚡ 开发环境快速修复"
echo "=================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检测项目类型
detect_project_type() {
    if [ -f "package.json" ]; then
        if grep -q "\"next\"" package.json; then
            echo "next"
        elif grep -q "\"vite\"" package.json; then
            echo "vite"
        elif grep -q "\"react-scripts\"" package.json; then
            echo "cra"
        elif grep -q "\"@vue/cli\"" package.json; then
            echo "vue"
        else
            echo "node"
        fi
    else
        echo "unknown"
    fi
}

# 检测包管理器
detect_package_manager() {
    if command -v bun &> /dev/null && [ -f "bun.lockb" ]; then
        echo "bun"
    elif [ -f "pnpm-lock.yaml" ]; then
        echo "pnpm"
    elif [ -f "yarn.lock" ]; then
        echo "yarn"
    elif [ -f "package-lock.json" ]; then
        echo "npm"
    elif command -v bun &> /dev/null; then
        echo "bun"
    else
        echo "npm"
    fi
}

# 检测常用端口
detect_port() {
    local project_type=$1
    case $project_type in
        next) echo "3000" ;;
        vite) echo "5173" ;;
        cra) echo "3000" ;;
        vue) echo "8080" ;;
        *) echo "3000" ;;
    esac
}

PROJECT_TYPE=$(detect_project_type)
PKG_MANAGER=$(detect_package_manager)
PORT=$(detect_port $PROJECT_TYPE)

echo -e "${BLUE}📦 项目类型: ${PROJECT_TYPE}${NC}"
echo -e "${BLUE}🔧 包管理器: ${PKG_MANAGER}${NC}"
echo -e "${BLUE}🌐 端口: ${PORT}${NC}"
echo ""

# 快速修复步骤
echo -e "${BLUE}🔥 快速执行修复步骤...${NC}"

# 1. 杀死所有相关进程
echo "1/6 停止所有开发进程..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "vue-cli-service" 2>/dev/null || true
kill -9 $(lsof -ti:${PORT} 2>/dev/null) 2>/dev/null || true
sleep 1
echo -e "${GREEN}✓ 进程已清理${NC}"

# 2. 快速清理缓存
echo "2/6 清理缓存..."
rm -rf .next 2>/dev/null || true
rm -rf dist 2>/dev/null || true
rm -rf build 2>/dev/null || true
rm -rf .cache 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true
echo -e "${GREEN}✓ 缓存已清理${NC}"

# 3. 检查并清理临时文件
echo "3/6 清理临时文件..."
find . -name "*.log" -type f -delete 2>/dev/null || true
find . -name ".DS_Store" -type f -delete 2>/dev/null || true
echo -e "${GREEN}✓ 临时文件已清理${NC}"

# 4. 设置环境变量
echo "4/6 优化环境变量..."
export NODE_OPTIONS="--max-old-space-size=8192 --expose-gc"
export NEXT_TELEMETRY_DISABLED=1
export FAST_REFRESH=true
export CI=false
echo -e "${GREEN}✓ 环境已优化${NC}"

# 5. 检查依赖完整性
echo "5/6 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ node_modules 不存在，正在安装依赖...${NC}"
    case $PKG_MANAGER in
        bun) bun install ;;
        pnpm) pnpm install ;;
        yarn) yarn install ;;
        npm) npm install ;;
    esac
else
    echo -e "${GREEN}✓ 依赖完整${NC}"
fi

# 6. 启动开发服务器
echo "6/6 启动服务器..."
echo ""
echo -e "${GREEN}🚀 正在启动优化的开发服务器...${NC}"
echo -e "${YELLOW}🌐 http://localhost:${PORT}${NC}"
echo ""
echo -e "${BLUE}提示: 按 Ctrl+C 停止服务器${NC}"
echo ""

# 执行启动命令
start_dev_server() {
    # 检查 package.json 中是否有自定义的 dev 脚本
    if [ -f "package.json" ]; then
        if grep -q "\"dev:stable\"" package.json; then
            DEV_SCRIPT="dev:stable"
        elif grep -q "\"dev\"" package.json; then
            DEV_SCRIPT="dev"
        else
            DEV_SCRIPT="start"
        fi
    else
        DEV_SCRIPT="dev"
    fi

    case $PKG_MANAGER in
        bun)
            exec bun run $DEV_SCRIPT
            ;;
        pnpm)
            exec pnpm run $DEV_SCRIPT
            ;;
        yarn)
            exec yarn $DEV_SCRIPT
            ;;
        npm)
            exec npm run $DEV_SCRIPT
            ;;
        *)
            echo -e "${RED}错误: 无法识别包管理器${NC}"
            exit 1
            ;;
    esac
}

start_dev_server
