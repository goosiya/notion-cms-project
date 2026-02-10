import { PageHeader } from "@/components/blocks"
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui"
import { Smartphone, Tablet, Monitor } from "lucide-react"

/**
 * 반응형 디자인 페이지
 * 반응형 그리드 시스템과 브레이크포인트를 데모합니다
 */
export default function ResponsivePage() {
  return (
    <div className="container py-12 max-w-6xl">
      <PageHeader
        title="📱 반응형 디자인"
        description="모바일부터 데스크톱까지 모든 화면 크기에 최적화되어 있습니다"
      />

      <div className="space-y-8">
        {/* 브레이크포인트 소개 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Tailwind CSS 브레이크포인트</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <Smartphone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>모바일</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">&lt; 768px</p>
                <p className="text-sm text-muted-foreground">
                  기본 스타일이 적용됩니다. 모바일 우선 접근 방식을 사용합니다.
                </p>
                <Badge variant="outline" className="mt-2">sm: 640px</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Tablet className="h-8 w-8 text-primary mb-2" />
                <CardTitle>태블릿</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">768px - 1024px</p>
                <p className="text-sm text-muted-foreground">
                  중간 크기 화면에 최적화된 레이아웃을 제공합니다.
                </p>
                <Badge variant="outline" className="mt-2">md: 768px</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Monitor className="h-8 w-8 text-primary mb-2" />
                <CardTitle>데스크톱</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">&gt; 1024px</p>
                <p className="text-sm text-muted-foreground">
                  넓은 화면을 활용하여 더 많은 콘텐츠를 표시합니다.
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">lg: 1024px</Badge>
                  <Badge variant="outline">xl: 1280px</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 반응형 그리드 데모 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">반응형 그리드 시스템</h2>
          <Card>
            <CardHeader>
              <CardTitle>1열 → 2열 → 4열 그리드</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                화면 크기를 조절하여 그리드 변화를 확인해보세요
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div
                    key={num}
                    className="bg-primary/10 border-2 border-primary/20 rounded-lg p-6 text-center"
                  >
                    <p className="text-2xl font-bold text-primary">#{num}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      그리드 아이템
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-muted rounded-md">
                <code className="text-sm">
                  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 다양한 그리드 패턴 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">다양한 레이아웃 패턴</h2>

          {/* 2/3 - 1/3 레이아웃 */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>2/3 - 1/3 레이아웃</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-primary/10 border-2 border-primary/20 rounded-lg p-6">
                    <p className="font-semibold">메인 콘텐츠 영역</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      2/3 너비 (모바일에서는 전체 너비)
                    </p>
                  </div>
                  <div className="bg-secondary/10 border-2 border-secondary/20 rounded-lg p-6">
                    <p className="font-semibold">사이드바</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      1/3 너비
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <code className="text-sm">
                    grid md:grid-cols-3 / md:col-span-2
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Auto-fit 그리드 */}
            <Card>
              <CardHeader>
                <CardTitle>자동 맞춤 그리드 (Auto-fit)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4 text-center"
                    >
                      <p className="font-semibold">Item {num}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <code className="text-sm">
                    grid-cols-[repeat(auto-fit,minmax(150px,1fr))]
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 반응형 텍스트 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">반응형 타이포그래피</h2>
          <Card>
            <CardHeader>
              <CardTitle>화면 크기에 따른 텍스트 크기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  반응형 제목
                </h3>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  text-xl sm:text-2xl md:text-3xl lg:text-4xl
                </code>
              </div>
              <div>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                  본문 텍스트도 화면 크기에 따라 조절됩니다. 모바일에서는 작게, 데스크톱에서는 크게 표시됩니다.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  text-sm md:text-base lg:text-lg
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 반응형 여백 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">반응형 여백과 패딩</h2>
          <Card>
            <CardHeader>
              <CardTitle>화면 크기별 간격 조정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 md:p-6 lg:p-8 bg-primary/10 rounded-lg border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    이 박스의 패딩은 화면 크기에 따라 변합니다
                  </p>
                  <code className="text-xs bg-background px-2 py-1 rounded mt-2 inline-block">
                    p-4 md:p-6 lg:p-8
                  </code>
                </div>
                <div className="space-y-2 md:space-y-4 lg:space-y-6">
                  <div className="bg-secondary/10 p-3 rounded">항목 1</div>
                  <div className="bg-secondary/10 p-3 rounded">항목 2</div>
                  <div className="bg-secondary/10 p-3 rounded">항목 3</div>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  space-y-2 md:space-y-4 lg:space-y-6
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 숨김/표시 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">반응형 가시성</h2>
          <Card>
            <CardHeader>
              <CardTitle>화면 크기별 요소 숨김/표시</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="md:hidden bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
                  <p className="font-semibold">📱 모바일에만 표시</p>
                  <code className="text-xs">md:hidden</code>
                </div>
                <div className="hidden md:block lg:hidden bg-secondary/10 p-4 rounded-lg border-2 border-secondary/20">
                  <p className="font-semibold">📱 태블릿에만 표시</p>
                  <code className="text-xs">hidden md:block lg:hidden</code>
                </div>
                <div className="hidden lg:block bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                  <p className="font-semibold">💻 데스크톱에만 표시</p>
                  <code className="text-xs">hidden lg:block</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 모바일 네비게이션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">모바일 네비게이션</h2>
          <Card>
            <CardHeader>
              <CardTitle>MobileNav 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                대시보드 레이아웃에서 모바일 화면 크기일 때 자동으로 햄버거 메뉴가 표시됩니다.
                데스크톱에서는 고정 사이드바가 표시되고, 모바일에서는 토글 가능한 메뉴가 제공됩니다.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm">
                  {`<MobileNav /> // 768px 이하에서만 표시
<DashboardSidebar /> // 768px 이상에서만 표시`}
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 베스트 프랙티스 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">반응형 디자인 팁</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ 모바일 우선 접근
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  기본 스타일은 모바일을 위해 작성하고,
                  md:, lg: 접두사로 큰 화면을 대응합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ 일관된 간격 사용
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tailwind의 spacing scale (4, 6, 8, 12 등)을
                  사용하여 일관성을 유지합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ 터치 타겟 크기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  모바일에서 버튼과 링크는 최소 44x44px 이상으로
                  터치하기 편하게 만듭니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ 성능 최적화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  이미지는 Next.js Image 컴포넌트를 사용하여
                  자동으로 최적화합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
