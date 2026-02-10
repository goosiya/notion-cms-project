import { PageHeader } from "@/components/blocks"
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui"

/**
 * 모던 스택 페이지
 * 프로젝트에서 사용하는 최신 기술 스택을 소개합니다
 */
export default function ModernStackPage() {
  const techStack = [
    {
      name: "Next.js",
      version: "16.1.6",
      icon: "▲",
      description: "React 기반의 풀스택 프레임워크",
      features: [
        "App Router (최신 라우팅 시스템)",
        "Server Components",
        "Server Actions",
        "이미지 최적화",
        "자동 코드 분할"
      ]
    },
    {
      name: "React",
      version: "19.2.3",
      icon: "⚛️",
      description: "사용자 인터페이스 구축을 위한 JavaScript 라이브러리",
      features: [
        "React Compiler (자동 최적화)",
        "Concurrent Features",
        "Server Components",
        "Hooks API",
        "Fast Refresh"
      ]
    },
    {
      name: "TypeScript",
      version: "5.x",
      icon: "TS",
      description: "JavaScript의 타입 안정성 강화 슈퍼셋",
      features: [
        "정적 타입 검사",
        "IntelliSense 지원",
        "리팩토링 용이",
        "런타임 오류 방지",
        "최신 JavaScript 기능"
      ]
    },
    {
      name: "Tailwind CSS",
      version: "4.x",
      icon: "🎨",
      description: "유틸리티 우선 CSS 프레임워크",
      features: [
        "빠른 스타일링",
        "반응형 디자인",
        "다크모드 지원",
        "커스터마이징 가능",
        "작은 번들 사이즈"
      ]
    },
    {
      name: "shadcn/ui",
      version: "Latest",
      icon: "🎭",
      description: "Radix UI 기반의 재사용 가능한 컴포넌트",
      features: [
        "접근성 우선",
        "완전한 커스터마이징",
        "복사 & 붙여넣기 방식",
        "Tailwind CSS 통합",
        "TypeScript 지원"
      ]
    }
  ]

  return (
    <div className="container py-12 max-w-6xl">
      <PageHeader
        title="🚀 모던 스택"
        description="Next.js 15, React 19, TypeScript, Tailwind CSS 최신 기술을 사용합니다"
      />

      <div className="space-y-8">
        {/* 기술 스택 소개 */}
        <section>
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">최신 기술로 구축된 스타터킷</h2>
              <p className="text-muted-foreground mb-4">
                이 프로젝트는 2026년 최신 웹 개발 기술 스택을 사용하여 구축되었습니다.
                각 기술은 프로덕션 환경에서 검증되었으며, 빠른 개발과 확장성을 제공합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>최신 버전</Badge>
                <Badge variant="secondary">프로덕션 레디</Badge>
                <Badge variant="outline">타입 안전</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 기술 스택 카드들 */}
        <section className="space-y-6">
          {techStack.map((tech) => (
            <Card key={tech.name} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{tech.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{tech.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">v{tech.version}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">주요 기능</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tech.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 패키지 정보 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">설치된 패키지</h2>
          <Card>
            <CardHeader>
              <CardTitle>주요 의존성</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`{
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "@radix-ui/react-*": "^1.x",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",
    "lucide-react": "^0.563.0",
    "next-themes": "^0.4.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.1.6"
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 시작하기 */}
        <section>
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-3">🎯 바로 시작하세요</h2>
              <p className="text-muted-foreground mb-4">
                모든 설정이 완료되어 있습니다. 비즈니스 로직 작성에만 집중하세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="cursor-pointer hover:bg-primary/80">
                  ← 빠른 개발 가이드 보기
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  다크모드 확인하기 →
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
