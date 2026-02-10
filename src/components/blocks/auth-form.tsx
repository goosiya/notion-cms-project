"use client"

import * as React from "react"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Button,
} from "@/components/ui"

interface AuthFormProps {
  mode: "login" | "register"
}

/**
 * 로그인/회원가입 폼 블록 컴포넌트
 * mode prop으로 로그인/회원가입 구분
 */
export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login"

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isLogin ? "로그인" : "회원가입"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "계정에 로그인하세요"
            : "새 계정을 만들어 시작하세요"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="홍길동" />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="example@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">{isLogin ? "로그인" : "회원가입"}</Button>
        <p className="text-sm text-muted-foreground text-center">
          {isLogin ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-primary hover:underline"
          >
            {isLogin ? "회원가입" : "로그인"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
