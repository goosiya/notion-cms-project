import Link from "next/link"
import { Button } from "@/components/ui"

/**
 * 히어로 섹션 컴포넌트 (Server Component)
 * 랜딩 페이지의 메인 섹션
 */
export function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 text-center">
      <div className="container space-y-4 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          모던 웹 개발을
          <br />
          <span className="text-primary">30분 안에 시작하세요</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Next.js 15+ App Router, React 19, TypeScript, Tailwind CSS로 구성된
          프로덕션 레디 스타터킷입니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button size="lg" asChild>
            <Link href="/dashboard">시작하기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
