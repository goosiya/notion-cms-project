import { PageHeader } from "@/components/blocks"

/**
 * 분석 페이지 예제
 */
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="분석"
        description="상세한 분석 데이터를 확인하세요"
      />
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          분석 데이터가 여기에 표시됩니다.
        </p>
      </div>
    </div>
  )
}
