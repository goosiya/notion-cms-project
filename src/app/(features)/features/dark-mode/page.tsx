"use client"

import { PageHeader } from "@/components/blocks"
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui"
import { ThemeToggle } from "@/components/providers"
import { GiscusComments } from "@/components/blog"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

/**
 * 다크모드 페이지
 * 다크모드 기능과 사용법을 데모합니다
 */
export default function DarkModePage() {
  const { theme } = useTheme()

  return (
    <div className="container py-12 max-w-6xl">
      <PageHeader
        title="🌙 다크모드"
        description="내장된 다크모드 지원으로 사용자 경험을 향상시킵니다"
      >
        <ThemeToggle />
      </PageHeader>

      <div className="space-y-8">
        {/* 현재 테마 표시 */}
        <section>
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">현재 테마</h2>
                  <p className="text-muted-foreground">
                    시스템 설정을 따르거나 수동으로 변경할 수 있습니다
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="h-8 w-8 text-primary" />
                  ) : (
                    <Sun className="h-8 w-8 text-primary" />
                  )}
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {theme === 'dark' ? '다크' : theme === 'light' ? '라이트' : '시스템'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 다크모드의 장점 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">다크모드의 장점</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👁️ 눈의 피로 감소
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  어두운 환경에서 밝은 화면으로 인한 눈의 피로를 줄여줍니다.
                  장시간 작업 시 더욱 편안한 경험을 제공합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔋 배터리 절약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  OLED/AMOLED 디스플레이에서 어두운 픽셀은 전력을 덜 소비하여
                  배터리 수명을 연장시킵니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 시각적 계층구조
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  색상과 대비를 통해 콘텐츠의 중요도를 더욱 명확하게 표현할 수 있습니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚡ 사용자 선호도
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  많은 사용자들이 다크모드를 선호하며, 이를 제공하는 것은
                  사용자 경험을 향상시킵니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 컴포넌트 테마 데모 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">컴포넌트 테마 지원</h2>
          <Card>
            <CardHeader>
              <CardTitle>모든 컴포넌트가 자동으로 테마를 따릅니다</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 버튼 예제 */}
              <div>
                <h3 className="font-semibold mb-3">버튼</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* 배지 예제 */}
              <div>
                <h3 className="font-semibold mb-3">배지</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* 카드 예제 */}
              <div>
                <h3 className="font-semibold mb-3">카드</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        테마에 따라 배경색과 텍스트 색상이 자동으로 변경됩니다.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        모든 색상은 CSS 변수로 관리되어 일관성을 유지합니다.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        커스터마이징도 간편하게 할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 구현 방법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">구현 방법</h2>
          <Card>
            <CardHeader>
              <CardTitle>next-themes를 사용한 다크모드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. ThemeProvider 설정</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. useTheme 훅 사용</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(
      theme === "dark" ? "light" : "dark"
    )}>
      테마 변경
    </button>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Tailwind CSS 다크모드 클래스</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">
    라이트/다크 모드에 따라 색상이 변경됩니다
  </p>
</div>`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CSS 변수 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">색상 시스템</h2>
          <Card>
            <CardHeader>
              <CardTitle>CSS 변수 기반 테마 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                모든 색상은 CSS 변수로 정의되어 있어 쉽게 커스터마이징할 수 있습니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-background border" />
                  <p className="text-xs text-center">background</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-foreground" />
                  <p className="text-xs text-center">foreground</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-primary" />
                  <p className="text-xs text-center">primary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-secondary" />
                  <p className="text-xs text-center">secondary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-muted" />
                  <p className="text-xs text-center">muted</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-accent" />
                  <p className="text-xs text-center">accent</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-card border" />
                  <p className="text-xs text-center">card</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md bg-destructive" />
                  <p className="text-xs text-center">destructive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 댓글 시스템 데모 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">댓글 시스템 (Giscus)</h2>
          <Card>
            <CardHeader>
              <CardTitle>테마 자동 연동 댓글 시스템</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GitHub Discussions 기반의 Giscus 댓글 시스템입니다.
                다크모드와 자동으로 연동되며, 위의 테마 토글 버튼으로 테마를 변경하면
                댓글 위젯도 함께 변경됩니다.
              </p>
              <GiscusComments />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
