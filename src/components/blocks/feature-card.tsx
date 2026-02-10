import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  href: string
}

/**
 * 기능 소개 카드 컴포넌트
 * 랜딩 페이지의 Features 섹션에서 사용
 */
export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full">
        <CardHeader>
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
