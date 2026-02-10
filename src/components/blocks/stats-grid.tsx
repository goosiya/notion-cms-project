import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"

export interface StatData {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

interface StatsGridProps {
  stats: StatData[]
}

/**
 * 통계 카드 그리드 컴포넌트
 * 대시보드에서 여러 통계를 그리드로 표시
 */
export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.description && (
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              )}
              {stat.trend && (
                <p
                  className={`text-xs ${
                    stat.trend.isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.trend.isPositive ? "+" : ""}
                  {stat.trend.value}% 지난 달 대비
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
