import { HeroSection, FeaturesSection, CTASection } from "@/components/sections"
import { SiteHeader, SiteFooter } from "@/components/layout"

/**
 * 랜딩 페이지 (Server Component)
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  )
}
