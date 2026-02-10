import { AuthForm } from "@/components/blocks"

/**
 * 로그인 페이지
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AuthForm mode="login" />
    </div>
  )
}
