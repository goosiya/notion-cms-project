import { PageHeader, StatsGrid, type StatData } from "@/components/blocks"
import { Users, CreditCard, Activity, DollarSign } from "lucide-react"

/**
 * 대시보드 메인 페이지
 */
export default function DashboardPage() {
  const stats: StatData[] = [
    {
      title: "총 수익",
      value: "₩45,231,000",
      description: "전월 대비",
      icon: DollarSign,
      trend: { value: 20.1, isPositive: true },
    },
    {
      title: "가입자",
      value: "+2,350",
      description: "전월 대비",
      icon: Users,
      trend: { value: 180.1, isPositive: true },
    },
    {
      title: "판매",
      value: "+12,234",
      description: "전월 대비",
      icon: CreditCard,
      trend: { value: 19, isPositive: true },
    },
    {
      title: "활성 사용자",
      value: "+573",
      description: "전월 대비",
      icon: Activity,
      trend: { value: 201, isPositive: true },
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="프로젝트의 전체 개요를 확인하세요"
      />
      <StatsGrid stats={stats} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 추가 대시보드 컨텐츠 영역 */}
      </div>
    </div>
  )
}
