"use client"

import { useEffect, useState } from "react"

/**
 * 모바일 화면 여부를 감지하는 훅
 * 768px 이하일 때 true 반환
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
