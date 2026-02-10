import { PageHeader } from "@/components/blocks"

/**
 * 설정 페이지 예제
 */
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="설정"
        description="계정 및 애플리케이션 설정을 관리하세요"
      />
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          설정 옵션이 여기에 표시됩니다.
        </p>
      </div>
    </div>
  )
}
