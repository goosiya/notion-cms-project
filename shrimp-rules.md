# Notion CMS Blog - AI Agent 개발 규칙

> 이 문서는 AI Agent가 코드를 작성할 때 반드시 따라야 하는 프로젝트 특정 규칙을 정의합니다.
> 일반적인 개발 지식이 아닌, 이 프로젝트에서만 적용되는 구체적인 규칙과 제약사항을 포함합니다.

---

## 프로젝트 개요

- **프로젝트명**: Notion CMS Blog
- **기술 스택**: Next.js 16.1.6 (App Router), TypeScript 5, Tailwind CSS v4, shadcn/ui
- **목적**: Notion을 CMS로 사용하는 개인 개발 블로그 구축
- **TypeScript 모드**: strict mode (tsconfig.json)
- **경로 별칭**: `@/*` → `./src/*`

---

## 디렉토리 구조 및 파일 위치 규칙

### 필수 디렉토리 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # Route Group: 인증 페이지
│   ├── (dashboard)/       # Route Group: 대시보드
│   ├── (features)/        # Route Group: 기능 소개
│   ├── blog/              # 블로그 페이지 (Route Group 아님)
│   ├── category/          # 카테고리 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트 (직접 작성 금지)
│   ├── blocks/            # 재사용 블록 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   ├── sections/          # 페이지 섹션 컴포넌트
│   ├── providers/         # 프로바이더 컴포넌트
│   └── blog/              # 블로그 전용 컴포넌트
├── lib/
│   ├── notion.ts          # Notion 클라이언트 초기화
│   ├── notion-api.ts      # Notion API 함수
│   ├── utils.ts           # 유틸리티 함수
│   └── constants.ts       # 상수 정의
├── types/
│   ├── notion.ts          # Notion 관련 타입
│   └── index.ts           # 타입 re-export
└── hooks/                 # 커스텀 훅
```

### 파일 위치 규칙

| 파일 유형 | 위치 | 예시 |
|----------|------|------|
| Notion API 함수 | `lib/notion-api.ts` | `getPosts()`, `getPostBySlug()` |
| Notion 타입 | `types/notion.ts` | `Post`, `Category` 인터페이스 |
| 블로그 컴포넌트 | `components/blog/` | `post-card.tsx`, `post-content.tsx` |
| UI 컴포넌트 | `components/ui/` | shadcn/ui로만 추가 |
| 유틸리티 함수 | `lib/utils.ts` | `cn()`, `formatDate()` |
| 커스텀 훅 | `hooks/` | `use-mobile.ts` |
| 상수 | `lib/constants.ts` | 사이트 정보, API 엔드포인트 |

---

## 컴포넌트 개발 규칙

### UI 컴포넌트 추가

**✅ DO: shadcn/ui 명령어로 추가**
```bash
npx shadcn@latest add [component-name]
```

**❌ DON'T: `components/ui/` 내부에 직접 작성**
```typescript
// ❌ 금지
// src/components/ui/my-button.tsx 직접 생성
```

### 컴포넌트 계층 구조

**계층 순서**: ui (기본) → blocks (조합) → sections (페이지 섹션) → layout (레이아웃)

| 계층 | 용도 | 예시 |
|------|------|------|
| **ui** | shadcn/ui 기본 컴포넌트 | Button, Card, Input |
| **blocks** | UI 컴포넌트 조합 | AuthForm, FeatureCard, StatsGrid |
| **sections** | 페이지 섹션 단위 | HeroSection, FeaturesSection, CTASection |
| **layout** | 레이아웃 컴포넌트 | SiteHeader, SiteFooter, DashboardSidebar |
| **blog** | 블로그 전용 | PostCard, PostContent, TableOfContents |

**✅ DO: 적절한 계층에 컴포넌트 배치**
```typescript
// ✅ 올바른 예시
components/blog/post-card.tsx       // 블로그 글 카드
components/blocks/feature-card.tsx  // 재사용 가능한 기능 카드
components/sections/hero-section.tsx // 홈 페이지 Hero 섹션
```

**❌ DON'T: 계층 무시**
```typescript
// ❌ 잘못된 예시
components/hero-section.tsx         // sections/ 아래 있어야 함
components/ui/post-card.tsx         // blog/ 아래 있어야 함
```

### Export 관리 규칙

**⚠️ 중요: 새 컴포넌트 생성 시 반드시 `index.ts`에 export 추가**

**✅ DO: index.ts에 export 추가**
```typescript
// components/blog/index.ts
export { PostCard } from './post-card'
export { PostContent } from './post-content'
export { TableOfContents } from './table-of-contents'
```

**사용 시**
```typescript
// ✅ 올바른 import
import { PostCard, PostContent } from '@/components/blog'

// ❌ 직접 import 가능하지만 비권장
import { PostCard } from '@/components/blog/post-card'
```

---

## 페이지 및 라우팅 규칙

### Route Groups 규칙

**⚠️ Route Groups는 URL에 포함되지 않음**

| Route Group | URL | 파일 경로 |
|-------------|-----|----------|
| `(auth)/login` | `/login` | `app/(auth)/login/page.tsx` |
| `(dashboard)/dashboard` | `/dashboard` | `app/(dashboard)/dashboard/page.tsx` |
| `(features)/features/dark-mode` | `/features/dark-mode` | `app/(features)/features/dark-mode/page.tsx` |

**✅ DO: 블로그 페이지는 Route Group 없이 생성**
```
app/blog/page.tsx              → /blog
app/blog/[slug]/page.tsx       → /blog/[slug]
app/category/[category]/page.tsx → /category/[category]
```

**❌ DON'T: 블로그에 Route Group 사용**
```
// ❌ 잘못됨
app/(blog)/blog/page.tsx
```

### 동적 라우팅 규칙

**✅ DO: `generateStaticParams` 구현 (ISR 사용 시)**
```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const revalidate = 60 // ISR: 60초마다 재검증
```

**✅ DO: 메타데이터 생성**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

### ISR (Incremental Static Regeneration) 설정

**⚠️ 필수: 모든 블로그 관련 페이지에 ISR 설정**

```typescript
// app/blog/page.tsx
export const revalidate = 60 // 60초마다 재검증

// app/blog/[slug]/page.tsx
export const revalidate = 60

// app/category/[category]/page.tsx
export const revalidate = 60
```

### 필수 로딩 및 에러 파일

**⚠️ 반드시 생성해야 할 파일:**

```
app/blog/loading.tsx              # Skeleton UI
app/blog/[slug]/loading.tsx       # 글 상세 로딩
app/blog/[slug]/error.tsx         # 에러 핸들링
app/blog/[slug]/not-found.tsx     # 404 페이지
app/loading.tsx                   # 루트 로딩
app/error.tsx                     # 루트 에러
```

**✅ DO: Skeleton UI 사용**
```typescript
// app/blog/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-[400px]" />
      ))}
    </div>
  )
}
```

---

## Notion API 연동 규칙

### 환경 변수

**⚠️ 필수 환경 변수**

```env
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ 환경 변수 추가 시 다중 파일 수정 필수:**
- `.env.local` (실제 값)
- `.env.example` (템플릿, 빈 값)

### 파일 구조

| 파일 | 역할 | 내용 |
|------|------|------|
| `lib/notion.ts` | 클라이언트 초기화 | Notion Client, DATABASE_ID export |
| `lib/notion-api.ts` | API 함수 | `getPosts()`, `getPostBySlug()` 등 |
| `types/notion.ts` | 타입 정의 | `Post`, `Category` 인터페이스 |

### API 함수 명명 규칙

**✅ DO: 일관된 명명 규칙 사용**

```typescript
// lib/notion-api.ts
export async function getPosts(category?: string, limit?: number): Promise<Post[]>
export async function getPostBySlug(slug: string): Promise<Post>
export async function getCategories(): Promise<Category[]>
export async function getPostContent(pageId: string): Promise<any>
```

**❌ DON'T: 불일치한 명명**
```typescript
// ❌ 잘못됨
export async function fetchPosts()      // get으로 통일
export async function retrievePost()    // get으로 통일
```

### Notion 타입 정의

**⚠️ 필수: `types/notion.ts`에 정의**

```typescript
// types/notion.ts
export interface Post {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedDate: string
  excerpt?: string
  coverImage?: string
  status: 'Draft' | 'Published' | 'Private'
}

export interface Category {
  name: string
  slug: string
  count: number
}
```

### 에러 핸들링

**✅ DO: try-catch 및 재시도 로직**

```typescript
export async function getPosts(category?: string): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: category ? {
        property: 'Category',
        select: { equals: category }
      } : undefined,
    })
    return response.results.map(parseNotionPage)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    // Rate Limit 에러 시 재시도 로직
    throw error
  }
}
```

---

## 스타일링 규칙

### Tailwind CSS 사용

**✅ DO: Tailwind 유틸리티 클래스만 사용**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <h2 className="text-2xl font-bold mb-4">제목</h2>
  </Card>
</div>
```

**❌ DON'T: 인라인 스타일 또는 CSS-in-JS**
```typescript
// ❌ 금지
<div style={{ display: 'grid', gap: '1.5rem' }}>
```

### cn() 함수 사용

**✅ DO: 조건부 클래스 병합 시 cn() 사용**

```typescript
import { cn } from '@/lib/utils'

<Card className={cn(
  "p-6 transition-shadow",
  isActive && "border-primary",
  isDisabled && "opacity-50 pointer-events-none"
)}>
```

**❌ DON'T: 템플릿 리터럴 직접 사용**
```typescript
// ❌ 잘못됨
<Card className={`p-6 ${isActive ? 'border-primary' : ''}`}>
```

### CSS 변수 기반 테마 색상

**✅ DO: Tailwind 색상 클래스 또는 CSS 변수 사용**
```typescript
// ✅ Tailwind 색상
<div className="bg-primary text-primary-foreground">

// ✅ CSS 변수 (globals.css에 정의됨)
<div className="bg-background text-foreground">
```

**❌ DON'T: 하드코딩된 색상 값**
```typescript
// ❌ 금지
<div className="bg-[#09090b] text-[#fafafa]">
```

### 반응형 디자인

**⚠️ 브레이크포인트 규칙**

| 디바이스 | 브레이크포인트 | Tailwind 접두사 | 레이아웃 |
|----------|---------------|----------------|----------|
| Mobile | < 640px | 기본 | 1열 |
| Tablet | 640px ~ 1024px | `md:` | 2열 |
| Desktop | > 1024px | `lg:` | 3열 |

**✅ DO: 모바일 퍼스트**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## TypeScript 규칙

### Strict Mode

**⚠️ 프로젝트는 TypeScript strict mode 사용**

**❌ DON'T: any 타입 사용**
```typescript
// ❌ 금지
function handleData(data: any) { ... }
```

**✅ DO: 명확한 타입 정의**
```typescript
// ✅ 올바름
function handleData(data: Post) { ... }

// ✅ 제네릭 사용
function handleData<T extends Post>(data: T) { ... }
```

### 타입 Import

**✅ DO: 타입만 import 시 `type` 키워드 사용**
```typescript
import type { Post, Category } from '@/types/notion'
import { getPosts } from '@/lib/notion-api'
```

### 타입 re-export

**⚠️ 새 타입 추가 시 `types/index.ts`에서 re-export**

```typescript
// types/index.ts
export type { Post, Category } from './notion'
```

---

## 다중 파일 수정 규칙

### 컴포넌트 추가 시

**⚠️ 반드시 함께 수정해야 할 파일:**

1. **컴포넌트 파일 생성**: `components/blog/post-card.tsx`
2. **index.ts 업데이트**: `components/blog/index.ts`에 export 추가

```typescript
// components/blog/index.ts
export { PostCard } from './post-card'  // ← 추가
```

### 환경 변수 추가 시

**⚠️ 반드시 함께 수정해야 할 파일:**

1. **실제 값**: `.env.local`
2. **템플릿**: `.env.example`

```env
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxx

# .env.example
NOTION_API_KEY=
```

### 타입 추가 시

**⚠️ 반드시 함께 수정해야 할 파일:**

1. **타입 정의**: `types/notion.ts`
2. **re-export**: `types/index.ts`

```typescript
// types/notion.ts
export interface Tag {
  name: string
  count: number
}

// types/index.ts
export type { Post, Category, Tag } from './notion'  // Tag 추가
```

### SEO 파일

**⚠️ 필수 SEO 파일:**

```
app/sitemap.ts      # Sitemap 생성
app/robots.ts       # robots.txt 생성
```

---

## 금지 사항

### 컴포넌트

- ❌ `components/ui/` 내부에 직접 컴포넌트 작성
- ❌ shadcn/ui 컴포넌트 수정 시 원본 파일 직접 수정 (Wrapper 컴포넌트 생성)
- ❌ 컴포넌트 파일에 API 함수 직접 작성

### 스타일링

- ❌ 인라인 스타일 사용 (`style={{ ... }}`)
- ❌ CSS-in-JS 라이브러리 (styled-components, emotion)
- ❌ 하드코딩된 색상 값 (`bg-[#000000]`)
- ❌ 글로벌 CSS 파일 추가 (globals.css 제외)

### 라우팅

- ❌ Route Groups에 블로그 페이지 포함 (`(blog)/blog`)
- ❌ Route Groups 괄호 없이 디렉토리 생성 (blog, category 제외)

### TypeScript

- ❌ `any` 타입 사용
- ❌ `@ts-ignore`, `@ts-expect-error` 주석 (불가피한 경우 제외)
- ❌ 타입 단언 남용 (`as any`)

### API

- ❌ 컴포넌트 파일에 Notion API 호출 직접 작성
- ❌ 환경 변수 클라이언트에 노출 (`NEXT_PUBLIC_` 접두사 없이)

---

## AI 의사결정 가이드

### 새 페이지 생성 시

**결정 트리:**

```
새 페이지 생성 필요?
├─ 인증 관련? → app/(auth)/[page]/page.tsx
├─ 대시보드 관련? → app/(dashboard)/[page]/page.tsx
├─ 기능 소개? → app/(features)/features/[page]/page.tsx
├─ 블로그 관련? → app/blog/[page]/page.tsx (Route Group 없음)
└─ 기타 → app/[page]/page.tsx
```

### 새 컴포넌트 생성 시

**결정 트리:**

```
새 컴포넌트 필요?
├─ UI 기본 컴포넌트? → shadcn/ui 추가 (npx shadcn@latest add)
├─ 블로그 전용? → components/blog/
├─ UI 조합? → components/blocks/
├─ 페이지 섹션? → components/sections/
├─ 레이아웃? → components/layout/
└─ 프로바이더? → components/providers/
```

### 스타일 적용 시

**우선순위:**

1. **Tailwind 유틸리티 클래스** (최우선)
2. **CSS 변수** (테마 색상)
3. **globals.css 커스텀** (불가피한 경우만)

### API 함수 작성 시

**체크리스트:**

- [ ] `lib/notion-api.ts`에 작성
- [ ] `async/await` 사용
- [ ] `try-catch` 에러 핸들링
- [ ] 명확한 타입 정의 (`types/notion.ts`)
- [ ] Rate Limit 고려 (재시도 로직)

---

## 예시: 전체 워크플로우

### 시나리오: 블로그 글 카드 컴포넌트 추가

**1단계: 컴포넌트 생성**
```typescript
// components/blog/post-card.tsx
import type { Post } from '@/types/notion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-2">
        <Badge>{post.category}</Badge>
        <span className="text-sm text-muted-foreground">
          {formatDate(post.publishedDate)}
        </span>
      </div>
    </Card>
  )
}
```

**2단계: index.ts 업데이트**
```typescript
// components/blog/index.ts
export { PostCard } from './post-card'
```

**3단계: 페이지에서 사용**
```typescript
// app/blog/page.tsx
import { PostCard } from '@/components/blog'
import { getPosts } from '@/lib/notion-api'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">모든 글</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

---

## 문서 업데이트

이 문서는 프로젝트 진행에 따라 업데이트됩니다.

**마지막 업데이트**: 2026-02-14
