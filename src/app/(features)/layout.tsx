import { SiteHeader, SiteFooter } from "@/components/layout"

/**
 * Features 페이지 레이아웃
 * 모든 feature 상세 페이지에 공통으로 적용되는 레이아웃
 */
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  )
}
