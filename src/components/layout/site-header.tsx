"use client"

import Link from "next/link"
import { Button } from "@/components/ui"
import { ThemeToggle } from "@/components/providers"
import { mainNav } from "@/lib/constants"

/**
 * 사이트 공통 헤더 컴포넌트
 * 로고, 네비게이션, 다크모드 토글 포함
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">Starter</span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-6 text-sm font-medium">
          <div className="flex items-center space-x-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="default" size="sm" asChild>
              <Link href="/dashboard">시작하기</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
