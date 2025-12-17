import Link from "next/link";
import { ArrowRight, BookOpen, Users, Target, MessageSquare, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">研究型教师成长系统</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                登录
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                开始使用
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
            助力研究型教师
            <span className="block text-blue-600">专业成长</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            专为教师设计的智能化成长平台，提供观察反思、问题探讨、项目协作等功能，
            陪伴每一位教师的专业发展之路。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
            >
              立即体验
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-blue-600" />}
            title="课程学习"
            description="个性化课程推荐，匹配您的专业发展阶段"
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-green-600" />}
            title="项目实践"
            description="真实教学项目，在实践中提升专业能力"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-purple-600" />}
            title="观察反思"
            description="系统化观察记录，深入反思教学实践"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-orange-600" />}
            title="专业社群"
            description="与同行交流分享，共同成长进步"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-2xl bg-blue-600 px-8 py-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">开启您的专业成长之旅</h2>
          <p className="mb-6 text-blue-100">
            加入我们，与数万教师一起在专业发展的道路上不断前行
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-lg font-medium text-blue-600 hover:bg-gray-100 transition-colors"
          >
            立即开始
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 研究型教师成长系统. 致力于教师专业发展.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
