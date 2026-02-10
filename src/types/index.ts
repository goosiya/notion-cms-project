import { LucideIcon } from "lucide-react"

// 네비게이션 아이템 타입은 constants.ts에서 export됨
export type { NavItem, Feature } from "@/lib/constants"

// 추가 공통 타입 정의
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}
