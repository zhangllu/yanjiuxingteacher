# Vercel 自动化部署指南

本指南将帮助您配置从 GitHub 自动部署到 Vercel 的流程。

## 前置条件

1. 拥有 Vercel 账户（免费注册：https://vercel.com）
2. 拥有 GitHub 账户
3. 项目已推送到 GitHub 仓库

## 第一步：在 Vercel 上创建项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 授权 GitHub 并选择您的仓库 `zhangllu/yanjiuxingteacher`
5. 配置项目：
   - **Project Name**: `yanjiuxingteacher`（或您喜欢的名称）
   - **Framework Preset**: 选择 `Next.js`
   - **Root Directory**: 设置为 `web`（因为项目在 web/ 目录下）
   - **Build Command**: `bun run build`（或使用默认的 `next build`）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `bun install`（或使用默认的 `npm install`）
6. 点击 "Deploy"

## 第二步：获取部署所需的密钥

部署完成后，您需要获取以下密钥：

### 方法一：通过 Vercel CLI（推荐）

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 登录并链接项目：
   ```bash
   vercel login
   cd /path/to/yanjiuxingteacher
   vercel link
   ```

3. 获取密钥：
   ```bash
   vercel env pull .env.local
   ```

4. 从 `.env.local` 文件中提取以下值，或运行：
   ```bash
   vercel inspect
   ```

### 方法二：通过 Web 界面

1. 在 Vercel 项目仪表板中，点击 "Settings" 选项卡
2. 在左侧菜单选择 "Git"
3. 找到 "Connected Git Repository" 部分
4. 点击 "Regenerate" 或查看 "Install Command" 配置

## 第三步：在 GitHub 设置 Secrets

1. 打开您的 GitHub 仓库：https://github.com/zhangllu/yanjiuxingteacher
2. 点击 "Settings" 选项卡
3. 在左侧菜单选择 "Secrets and variables" > "Actions"
4. 点击 "New repository secret" 按钮，添加以下密钥：

### 必需的 Secrets：

#### 1. VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: 您的 Personal Access Token
  - 访问 https://vercel.com/account/tokens
  - 点击 "Create Token"
  - 复制生成的 token

#### 2. VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: 您的组织 ID
  - 在 Vercel 项目设置中查找
  - 或通过 `vercel inspect` 命令获取

#### 3. VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: 您的项目 ID
  - 在 Vercel 项目设置中查找
  - 或通过 `vercel inspect` 命令获取

## 第四步：验证部署

完成以上配置后，每次您推送代码到 `main` 分支时：

1. GitHub Actions 将自动触发部署流程
2. 构建和测试将在云端进行
3. 成功后自动部署到 Vercel
4. 您将收到部署完成的邮件通知

## 手动部署

您也可以手动触发部署：

1. 在 GitHub 仓库中点击 "Actions" 选项卡
2. 选择 "Deploy to Vercel" 工作流
3. 点击 "Run workflow"
4. 选择要部署的分支（通常是 `main`）

## 常见问题

### Q: 部署失败怎么办？
A: 检查 GitHub Actions 页面的工作流日志，查看具体错误信息

### Q: 如何查看部署历史？
A: 在 Vercel 项目仪表板的 "Deployments" 选项卡中查看

### Q: 如何回滚到之前的版本？
A: 在 Vercel 的 "Deployments" 页面，点击任意部署记录旁的 "..." 按钮，选择 "Promote to Production"

### Q: 如何配置自定义域名？
A: 在 Vercel 项目设置的 "Domains" 选项卡中添加您的域名

## 性能优化建议

1. **启用缓存**：在 `vercel.json` 中配置适当的缓存策略
2. **启用压缩**：Vercel 默认启用 Gzip 压缩
3. **使用 CDN**：Vercel 自动提供全球 CDN 加速
4. **优化图片**：使用 Next.js 的 Image 组件和 Vercel Image Optimization

## 参考资源

- [Vercel 官方文档](https://vercel.com/docs)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)

---

**提示**：首次部署可能需要几分钟时间，后续部署通常在 1-2 分钟内完成。
