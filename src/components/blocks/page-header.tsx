import * as React from "react"
import { Separator } from "@/components/ui"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

/**
 * 페이지 헤더 블록 컴포넌트
 * 제목, 설명, 액션 버튼을 포함
 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
      <Separator />
    </div>
  )
}
