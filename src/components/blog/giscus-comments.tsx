"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"
import { useMounted } from "@/hooks"

interface GiscusCommentsProps {
  /**
   * Giscus 매핑 방식
   * - "pathname": URL 경로 기반 (블로그 글마다 고유 Discussion 생성)
   * - "url": 전체 URL 기반
   * - "title": 페이지 제목 기반
   * - "og:title": Open Graph 제목 기반
   * @default "pathname"
   */
  mapping?: "pathname" | "url" | "title" | "og:title"
}

/**
 * GitHub Discussions 기반 Giscus 댓글 시스템 컴포넌트
 *
 * 특징:
 * - 다크모드/라이트모드 자동 연동
 * - Hydration 불일치 방지 (useMounted 훅 사용)
 * - 환경 변수로 설정 관리
 *
 * 사용 전 준비:
 * 1. GitHub 저장소에서 Discussions 활성화
 * 2. giscus 앱 설치: https://github.com/apps/giscus
 * 3. https://giscus.app 에서 설정값 획득 후 .env.local에 추가
 */
export function GiscusComments({ mapping = "pathname" }: GiscusCommentsProps) {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  // 환경 변수 확인
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  // 마운트 전 또는 환경 변수 누락 시 로딩 표시
  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <p>댓글 시스템을 로드하는 중...</p>
      </div>
    )
  }

  if (!repo || !repoId || !category || !categoryId) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <h3 className="font-semibold text-destructive mb-2">
          Giscus 설정 오류
        </h3>
        <p className="text-sm text-destructive/80">
          환경 변수가 설정되지 않았습니다. .env.local 파일에 다음 항목을 추가하세요:
        </p>
        <ul className="mt-2 text-sm text-destructive/80 list-disc list-inside space-y-1">
          <li>NEXT_PUBLIC_GISCUS_REPO</li>
          <li>NEXT_PUBLIC_GISCUS_REPO_ID</li>
          <li>NEXT_PUBLIC_GISCUS_CATEGORY</li>
          <li>NEXT_PUBLIC_GISCUS_CATEGORY_ID</li>
        </ul>
        <p className="mt-3 text-sm text-destructive/80">
          설정 방법: <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" className="underline">https://giscus.app</a>
        </p>
      </div>
    )
  }

  return (
    <div className="giscus-container">
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark_dimmed" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}
