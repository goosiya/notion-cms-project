import { FeatureCard } from "@/components/blocks"
import { features } from "@/lib/constants"

/**
 * 기능 소개 섹션 컴포넌트 (Server Component)
 * 주요 기능들을 그리드로 표시
 */
export function FeaturesSection() {
  return (
    <section className="container py-24">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          주요 기능
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          프로덕션 레디 스타터킷으로 빠르게 시작하세요
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.href} {...feature} />
        ))}
      </div>
    </section>
  )
}
