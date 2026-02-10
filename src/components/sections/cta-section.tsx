import Link from "next/link"
import { Button } from "@/components/ui"

/**
 * CTA(Call-to-Action) 섹션 컴포넌트 (Server Component)
 * 사용자 액션 유도
 */
export function CTASection() {
  return (
    <section className="container py-24">
      <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-12 md:p-16">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-muted-foreground">
            모던 웹 스타터킷으로 프로젝트를 빠르게 시작하고
            비즈니스 로직에 집중하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">무료로 시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
