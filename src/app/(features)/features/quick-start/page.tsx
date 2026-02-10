import { PageHeader } from "@/components/blocks"
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input, Separator } from "@/components/ui"

/**
 * 빠른 개발 페이지
 * 사전 구축된 컴포넌트들의 예제와 사용법을 보여줍니다
 */
export default function QuickStartPage() {
  return (
    <div className="container py-12 max-w-6xl">
      <PageHeader
        title="⚡ 빠른 개발"
        description="사전 구축된 컴포넌트로 30분 안에 프로젝트를 시작하세요"
      />

      {/* 컴포넌트 갤러리 */}
      <div className="space-y-12">
        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-4">버튼 컴포넌트</h2>
          <Card>
            <CardHeader>
              <CardTitle>다양한 버튼 스타일</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-4">배지 컴포넌트</h2>
          <Card>
            <CardHeader>
              <CardTitle>상태 표시 배지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">입력 컴포넌트</h2>
          <Card>
            <CardHeader>
              <CardTitle>폼 입력 요소</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <Input type="text" placeholder="텍스트 입력" />
                <Input type="email" placeholder="이메일 입력" />
                <Input type="password" placeholder="비밀번호 입력" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">카드 컴포넌트</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>간단한 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  카드 컴포넌트는 콘텐츠를 그룹화하는 데 사용됩니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>통계 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground mt-2">전월 대비 +20%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>정보 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge>New</Badge>
                <p className="text-muted-foreground mt-2">
                  최신 기능을 확인하세요.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 빠른 시작 가이드 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">빠른 시작 가이드</h2>
          <Card>
            <CardHeader>
              <CardTitle>3단계로 시작하기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge>1</Badge> 프로젝트 클론
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  git clone [repository-url]
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge>2</Badge> 패키지 설치
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  npm install
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge>3</Badge> 개발 서버 실행
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  npm run dev
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 컴포넌트 사용 예제 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">컴포넌트 사용 예제</h2>
          <Card>
            <CardHeader>
              <CardTitle>Button 컴포넌트 import 및 사용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
{`import { Button } from "@/components/ui"

export default function MyComponent() {
  return (
    <Button onClick={() => alert('클릭!')}>
      클릭하세요
    </Button>
  )
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
