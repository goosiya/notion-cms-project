"use client"

import { useEffect, useState } from "react"

/**
 * 컴포넌트가 클라이언트에서 마운트되었는지 확인하는 훅
 * Hydration 불일치 방지용
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
