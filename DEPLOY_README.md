# 🚀 Vercel 自动化部署配置

本项目已配置 GitHub Actions 实现自动化部署到 Vercel。

## 📁 新增文件

```
.github/workflows/deploy.yml      # GitHub Actions 工作流
web/.vercelignore                 # Vercel 忽略文件
web/vercel.json                   # Vercel 配置文件
scripts/setup-vercel.sh           # 快速设置脚本
VERCEL_DEPLOYMENT.md              # 详细部署指南
```

## ⚡ 快速开始

### 方法一：使用自动化脚本（推荐）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 运行设置脚本
bash scripts/setup-vercel.sh

# 3. 按照提示配置 GitHub Secrets
```

### 方法二：手动配置

详见 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 🔧 工作流程

每次推送代码到 `main` 分支时：

1. ✅ **触发**: GitHub Actions 自动运行
2. 🔨 **构建**: 使用 bun 安装依赖并构建项目
3. 🚀 **部署**: 自动部署到 Vercel
4. ✅ **完成**: 获得可访问的在线 URL

## 🔑 必需的 GitHub Secrets

在 GitHub 仓库设置中添加以下三个 Secrets：

| Name | Description |
|------|-------------|
| `VERCEL_TOKEN` | Vercel Personal Access Token |
| `VERCEL_ORG_ID` | Vercel 组织 ID |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID |

## 📊 部署后访问

部署完成后，您将获得类似以下的 URL：
- Production: `https://yanjiuxingteacher.vercel.app`
- Preview: 每次 PR 会生成预览链接

## 🛠️ 技术栈

- **框架**: Next.js 16.0.10
- **包管理器**: Bun
- **部署平台**: Vercel
- **CI/CD**: GitHub Actions

## 📝 下一步

1. 在 Vercel 创建项目
2. 获取并配置 GitHub Secrets
3. 推送代码到 main 分支触发首次部署
4. 访问生成的 URL 查看网站

## 💡 提示

- 首次部署可能需要 3-5 分钟
- 后续部署通常在 1-2 分钟内完成
- 可以在 GitHub Actions 页面查看部署进度
- 在 Vercel 仪表板查看部署历史和日志

## 📚 更多资源

- [Vercel 官方文档](https://vercel.com/docs)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)

---

🎉 **恭喜！** 您的网站很快就可以在线访问了！
