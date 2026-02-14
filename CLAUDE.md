# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

## 프로젝트 개요

Next.js 15+ App Router 기반 모던 웹 스타터킷입니다. TypeScript, Tailwind CSS v4, shadcn/ui를 사용하여 구축되었습니다.

### 주요 기능

- Route Groups 기반 페이지 구조 (인증, 대시보드, 기능 소개)
- shadcn/ui 컴포넌트 라이브러리 완전 설정
- 다크모드/라이트모드 테마 전환 (next-themes)
- TypeScript 경로 별칭 설정 (`@/*`)
- Tailwind CSS v4 최신 스타일링
- 재사용 가능한 컴포넌트 구조 (ui, blocks, sections, layout)

### 용도

- 모던 웹 애플리케이션 빠른 프로토타이핑
- Next.js App Router 학습 및 실습용 템플릿
- shadcn/ui 기반 프로젝트 시작점
- 엔터프라이즈급 프로젝트 기반 구조

## 개발 명령어

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# ESLint 실행
npm run lint
```

## 프로젝트 아키텍처

### 디렉토리 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # Route Group: 인증 관련 페이지 (login, register)
│   ├── (dashboard)/       # Route Group: 대시보드 페이지 (dashboard, analytics, settings)
│   ├── (features)/        # Route Group: 기능 소개 페이지
│   ├── layout.tsx         # 루트 레이아웃 (폰트, ThemeProvider)
│   └── page.tsx           # 홈페이지
├── components/
│   ├── ui/                # shadcn/ui 기본 컴포넌트
│   ├── blocks/            # 재사용 가능한 블록 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트 (헤더, 푸터, 사이드바 등)
│   ├── providers/         # 프로바이더 컴포넌트 (ThemeProvider, ThemeToggle)
│   └── sections/          # 섹션 컴포넌트 (Hero, Features, CTA)
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 함수 및 상수
└── types/                 # TypeScript 타입 정의
```

### Route Groups

- `(auth)`: 인증 관련 페이지 그룹. URL에 그룹명이 포함되지 않음
- `(dashboard)`: 대시보드 레이아웃을 공유하는 페이지 그룹. 자체 layout.tsx 포함
- `(features)`: 기능 소개 페이지 그룹. 자체 layout.tsx 포함

### Path Aliases

TypeScript 경로 별칭 설정 (`tsconfig.json`):
- `@/*` → `./src/*`

shadcn/ui 별칭 설정 (`components.json`):
- `@/components` → UI 컴포넌트
- `@/lib/utils` → 유틸리티 함수
- `@/hooks` → 커스텀 훅
- `@/types` → 타입 정의

## 주요 기술 스택

- **프레임워크**: Next.js 16.1.6 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS v4 (@tailwindcss/postcss)
- **UI 라이브러리**: shadcn/ui (Radix UI 기반)
- **테마**: next-themes (다크모드 지원)
- **아이콘**: lucide-react

## shadcn/ui 컴포넌트

- 컴포넌트 추가: `npx shadcn@latest add [component-name]`
- 모든 UI 컴포넌트는 `src/components/ui/` 에 위치
- `components.json` 설정에 따라 자동으로 경로 설정됨

## 개발 가이드라인

### 컴포넌트 구조

- `src/components/ui/`: shadcn/ui 컴포넌트만 위치 (직접 수정 가능)
- `src/components/blocks/`: 여러 UI 컴포넌트를 조합한 재사용 블록
- `src/components/sections/`: 페이지 섹션 단위 컴포넌트
- `src/components/layout/`: 헤더, 푸터, 사이드바 등 레이아웃 컴포넌트
- 각 디렉토리의 `index.ts`를 통해 export 관리

### 스타일링

- Tailwind CSS 유틸리티 클래스 사용
- `cn()` 함수 (`@/lib/utils`)를 사용하여 조건부 클래스 병합
- CSS 변수를 활용한 테마 색상 관리 (`globals.css`)

### 테마

- `ThemeProvider`가 루트 레이아웃에 설정됨
- `next-themes` 라이브러리 사용
- 다크모드는 `class` 전략 사용
- `ThemeToggle` 컴포넌트로 테마 전환 가능

## Windows 환경 고려사항

이 프로젝트는 Windows 환경에서 개발되고 있습니다:
- 개발 서버 중지: PID 확인 후 `taskkill //F //PID [PID]`
- 포트 확인: `netstat -ano | findstr :[PORT]`
