import { AuthForm } from "@/components/blocks"

/**
 * 회원가입 페이지
 */
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AuthForm mode="register" />
    </div>
  )
}
