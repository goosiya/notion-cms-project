import { DashboardSidebar, MobileNav } from "@/components/layout"
import { ThemeToggle } from "@/components/providers"

/**
 * 대시보드 레이아웃
 * 사이드바와 헤더 포함
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:pl-64">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center gap-4 px-4">
            <MobileNav />
            <div className="flex flex-1 items-center justify-between">
              <h2 className="text-lg font-semibold">대시보드</h2>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
