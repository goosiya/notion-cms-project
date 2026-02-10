import { Home, LayoutDashboard, BarChart3, Settings, LucideIcon } from "lucide-react"

// 네비게이션 아이템 타입
export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  disabled?: boolean
}

// 메인 네비게이션 (랜딩 페이지 헤더)
export const mainNav: NavItem[] = [
  {
    title: "홈",
    href: "/",
  },
  {
    title: "대시보드",
    href: "/dashboard",
  },
  {
    title: "로그인",
    href: "/login",
  },
]

// 대시보드 사이드바 네비게이션
export const dashboardNav: NavItem[] = [
  {
    title: "홈",
    href: "/",
    icon: Home,
  },
  {
    title: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "분석",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "설정",
    href: "/settings",
    icon: Settings,
  },
]

// 기능 목록 (랜딩 페이지)
export interface Feature {
  title: string
  description: string
  icon: string
  href: string
}

export const features: Feature[] = [
  {
    title: "빠른 개발",
    description: "사전 구축된 컴포넌트로 30분 안에 프로젝트를 시작하세요.",
    icon: "⚡",
    href: "/features/quick-start",
  },
  {
    title: "모던 스택",
    description: "Next.js 15, React 19, TypeScript, Tailwind CSS 최신 기술을 사용합니다.",
    icon: "🚀",
    href: "/features/modern-stack",
  },
  {
    title: "다크모드",
    description: "내장된 다크모드 지원으로 사용자 경험을 향상시킵니다.",
    icon: "🌙",
    href: "/features/dark-mode",
  },
  {
    title: "반응형 디자인",
    description: "모바일부터 데스크톱까지 모든 화면 크기에 최적화되어 있습니다.",
    icon: "📱",
    href: "/features/responsive",
  },
]

// 푸터 링크
export const footerLinks = [
  {
    title: "제품",
    links: [
      { title: "기능", href: "/#features" },
      { title: "가격", href: "/#pricing" },
      { title: "문서", href: "/docs" },
    ],
  },
  {
    title: "회사",
    links: [
      { title: "소개", href: "/about" },
      { title: "블로그", href: "/blog" },
      { title: "채용", href: "/careers" },
    ],
  },
  {
    title: "지원",
    links: [
      { title: "도움말", href: "/help" },
      { title: "문의", href: "/contact" },
      { title: "상태", href: "/status" },
    ],
  },
]

// 소셜 링크
export const socialLinks = [
  { name: "GitHub", href: "https://github.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "Discord", href: "https://discord.com" },
]
