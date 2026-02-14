# Notion CMS 개인 개발 블로그 로드맵

> 개발 로드맵 문서
> 작성일: 2026-02-14
> 총 예상 기간: 9-14일

---

## 프로젝트 개요

### 프로젝트명
**Notion CMS 개인 개발 블로그**

### 총 예상 기간
**9-14일** (5개 Phase로 구성)

### 기술 스택 요약

**Frontend**
- Framework: Next.js 16.1.6 (App Router)
- Language: TypeScript 5
- Styling: Tailwind CSS v4 (@tailwindcss/postcss)
- UI Library: shadcn/ui (Radix UI 기반)
- Icons: Lucide React
- Theme: next-themes (다크모드)

**Backend / CMS**
- CMS: Notion (Notion API)
- SDK: @notionhq/client
- Rendering: react-notion-x

**Deployment**
- Hosting: Vercel
- Caching: ISR (Incremental Static Regeneration)
- Revalidation: 60초

---

## Phase 1: 프로젝트 초기 설정

### ⏱️ 예상 소요 시간
**1-2일**

### 🎯 목표
개발 환경 구축 및 Notion API 연동 준비

### 📋 작업 목록

#### 1.1 Next.js 프로젝트 구조 확인 및 정리
- 현재 프로젝트 디렉토리 구조 검토
- 불필요한 파일 정리
- Route Groups 구조 검증 (`(auth)`, `(dashboard)`, `(features)`)

#### 1.2 Notion API 패키지 설치
```bash
npm install @notionhq/client react-notion-x
npm install --save-dev @types/react
```

#### 1.3 환경 변수 설정
- `.env.local` 파일 생성
- 필수 환경 변수 설정:
  ```env
  NOTION_API_KEY=secret_xxxxxxxxxxxxx
  NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxx
  ```
- `.env.example` 파일 생성 (템플릿 제공)

#### 1.4 Notion 워크스페이스 설정
- Notion에서 "블로그 글" 데이터베이스 생성
- Integration 생성 및 API 키 발급 (https://www.notion.so/my-integrations)
- 데이터베이스를 Integration에 연결
- 필수 Properties 설정:
  - Title (title)
  - Category (select)
  - Tags (multi_select)
  - Published (date)
  - Status (select: 초안/발행됨/비공개)
  - Slug (rich_text)
  - Excerpt (rich_text)
  - CoverImage (files)

#### 1.5 샘플 데이터 작성
- 최소 5개 이상의 샘플 글 작성
- 다양한 카테고리로 분산 (React, Next.js, TypeScript 등)
- 각 글에 커버 이미지, 태그, 요약 설정
- Status를 "발행됨"으로 설정

#### 1.6 기본 레이아웃 구조 생성
- `components/layout/header.tsx` 생성 (네비게이션 메뉴)
- `components/layout/footer.tsx` 생성 (저작권, 소셜 링크)
- 루트 레이아웃(`app/layout.tsx`)에 헤더/푸터 적용

### ✅ 완료 기준

- [ ] Notion API 연결 테스트 성공 (간단한 API 호출 테스트)
- [ ] `.env.local` 파일에 API 키 및 Database ID 설정 완료
- [ ] Notion 데이터베이스에 5개 이상의 샘플 글 작성됨
- [ ] 기본 레이아웃(헤더, 푸터)이 모든 페이지에 적용됨
- [ ] 개발 서버 실행 시 에러 없이 정상 작동

### 📦 산출물

- `.env.local` (환경 변수)
- `.env.example` (환경 변수 템플릿)
- Notion 데이터베이스 (샘플 글 5개 이상)
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- 업데이트된 `app/layout.tsx`

---

## Phase 2: 공통 모듈 개발

### ⏱️ 예상 소요 시간
**2-3일**

### 🎯 목표
재사용 가능한 코드 기반 구축 (API, 타입, 공통 컴포넌트)

### 📋 작업 목록

#### 2.1 Notion API 공통 함수 작성

**`lib/notion.ts` 생성**
- Notion 클라이언트 초기화
- Database ID export
```typescript
import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!
```

**`lib/notion-api.ts` 생성**
- 핵심 API 함수 구현:
  - `getPosts(category?: string, limit?: number)`: 글 목록 가져오기
  - `getPostBySlug(slug: string)`: 특정 글 가져오기
  - `getCategories()`: 카테고리 목록 가져오기
  - `getPostContent(pageId: string)`: 글 본문 블록 가져오기
  - `getTags()`: 태그 목록 가져오기
- Rate Limit 에러 핸들링
- 재시도 로직 구현

#### 2.2 공통 타입 정의

**`types/notion.ts` 생성**
```typescript
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

export interface NotionBlock {
  // Notion 블록 타입 정의
}
```

#### 2.3 공통 컴포넌트 개발

**`components/blog/post-card.tsx`**
- shadcn/ui Card 컴포넌트 활용
- Props: `post: Post`
- 표시 항목: 썸네일, 제목, 요약, 날짜, 카테고리, 태그
- 호버 애니메이션 효과

**`components/blog/category-badge.tsx`**
- Props: `category: string`
- 카테고리별 색상 매핑
- 클릭 시 카테고리 페이지로 이동

**`components/ui/skeleton.tsx`** (shadcn/ui 추가)
```bash
npx shadcn@latest add skeleton
```
- 로딩 상태 표시용

**`components/blog/post-list-skeleton.tsx`**
- 글 목록 로딩 상태 Skeleton UI

#### 2.4 유틸리티 함수 작성

**`lib/utils.ts` (기존 파일에 추가)**
- `formatDate(date: string)`: 날짜 포맷팅
- `generateSlug(title: string)`: Slug 자동 생성
- `truncateText(text: string, length: number)`: 텍스트 줄임

#### 2.5 API 함수 테스트
- 각 API 함수를 콘솔에서 테스트
- 임시 테스트 페이지 생성 (`app/test/page.tsx`)
- 데이터 파싱 결과 확인

### ✅ 완료 기준

- [ ] 모든 API 함수가 콘솔 테스트를 통과함
- [ ] TypeScript 타입 에러가 없음
- [ ] `getPosts()` 호출 시 샘플 글 5개가 정상 반환됨
- [ ] `getPostBySlug()` 호출 시 특정 글 상세 정보가 정상 반환됨
- [ ] 공통 컴포넌트가 테스트 페이지에서 정상 렌더링됨
- [ ] Rate Limit 에러 발생 시 재시도 로직이 작동함

### 📦 산출물

- `lib/notion.ts`
- `lib/notion-api.ts`
- `types/notion.ts`
- `components/blog/post-card.tsx`
- `components/blog/category-badge.tsx`
- `components/blog/post-list-skeleton.tsx`
- `lib/utils.ts` (유틸리티 함수 추가)
- `app/test/page.tsx` (임시 테스트 페이지)

---

## Phase 3: 핵심 기능 개발

### ⏱️ 예상 소요 시간
**3-4일**

### 🎯 목표
블로그의 핵심 기능 구현 (글 목록 페이지, 글 상세 페이지)

### 📋 작업 목록

#### 3.1 글 목록 페이지 구현

**`app/blog/page.tsx` 생성**
- Server Component로 구현
- ISR 설정: `export const revalidate = 60`
- `getPosts()` 호출하여 데이터 fetching
- 메타 데이터 설정 (`metadata` export)
```typescript
export const metadata: Metadata = {
  title: '블로그 - 모든 글',
  description: '개발 블로그 글 목록',
}

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

**반응형 그리드 레이아웃**
- 모바일: 1열
- 태블릿: 2열
- 데스크톱: 3열

**`app/blog/loading.tsx` 생성**
- Skeleton UI를 사용한 로딩 상태
- `PostListSkeleton` 컴포넌트 활용

#### 3.2 글 상세 페이지 구현

**`app/blog/[slug]/page.tsx` 생성**
- 동적 라우팅 설정
- `generateStaticParams` 구현 (빌드 시 정적 생성)
```typescript
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

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

export const revalidate = 60

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  const content = await getPostContent(post.id)

  return (
    <article className="container max-w-4xl mx-auto py-12">
      <PostHeader post={post} />
      <PostContent content={content} />
      <PostNavigation slug={post.slug} />
    </article>
  )
}
```

**`components/blog/post-header.tsx` 생성**
- 글 제목
- 커버 이미지 (있는 경우)
- PostMeta 컴포넌트 포함

**`components/blog/post-meta.tsx` 생성**
- 작성일
- 카테고리 배지
- 태그 목록
- 읽기 시간 (선택사항)

**`components/blog/post-content.tsx` 생성**
- `react-notion-x` 활용한 Notion 블록 렌더링
- 커스텀 스타일링 적용
```typescript
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'

export function PostContent({ content }: { content: any }) {
  return (
    <div className="notion-content">
      <NotionRenderer recordMap={content} />
    </div>
  )
}
```
- 코드 블록 syntax highlighting 설정
- 이미지 최적화 (Next.js Image 컴포넌트)

**`components/blog/table-of-contents.tsx` 생성**
- H2, H3 헤딩에서 TOC 자동 생성
- 스크롤 시 현재 위치 하이라이트
- 클릭 시 해당 섹션으로 스크롤
- 데스크톱: 좌측 또는 우측 고정
- 모바일: 접을 수 있는 드롭다운

**`components/blog/post-navigation.tsx` 생성**
- 이전 글 / 다음 글 링크
- 썸네일 및 제목 표시

#### 3.3 에러 핸들링

**`app/blog/[slug]/error.tsx` 생성**
- 글을 찾을 수 없을 때 404 에러 처리
- 기타 에러 상황 처리

**`app/blog/[slug]/not-found.tsx` 생성**
- 404 페이지 커스터마이징
- 홈으로 돌아가기 버튼

### ✅ 완료 기준

- [ ] 글 목록 페이지에서 모든 발행된 글이 그리드 형태로 표시됨
- [ ] 글 카드 클릭 시 상세 페이지로 이동
- [ ] 글 상세 페이지에서 Notion 블록이 정상 렌더링됨 (텍스트, 이미지, 코드 블록 등)
- [ ] 코드 블록에 syntax highlighting 적용됨
- [ ] 목차(TOC)가 자동 생성되고 클릭 시 해당 섹션으로 이동
- [ ] 이전/다음 글 네비게이션이 정상 작동
- [ ] ISR이 작동하여 Notion 수정 후 1분 내 반영됨 (테스트 필요)
- [ ] 모바일/태블릿/데스크톱에서 레이아웃이 깨지지 않음
- [ ] 존재하지 않는 slug 접근 시 404 페이지 표시

### 📦 산출물

- `app/blog/page.tsx`
- `app/blog/loading.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/[slug]/error.tsx`
- `app/blog/[slug]/not-found.tsx`
- `components/blog/post-header.tsx`
- `components/blog/post-meta.tsx`
- `components/blog/post-content.tsx`
- `components/blog/table-of-contents.tsx`
- `components/blog/post-navigation.tsx`

---

## Phase 4: 추가 기능 개발

### ⏱️ 예상 소요 시간
**2-3일**

### 🎯 목표
사용자 경험 향상 기능 추가 (카테고리 필터링, SEO, 홈페이지 개선)

### 📋 작업 목록

#### 4.1 카테고리 필터링

**`app/category/[category]/page.tsx` 생성**
- 동적 라우팅 설정
- `generateStaticParams` 구현
```typescript
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.category} 카테고리`,
    description: `${params.category} 관련 글 모음`,
  }
}

export const revalidate = 60

export default async function CategoryPage({ params }: Props) {
  const posts = await getPosts(params.category)

  return (
    <div className="container mx-auto py-12">
      <Breadcrumb category={params.category} />
      <h1 className="text-4xl font-bold mb-8">{params.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

**`components/ui/breadcrumb.tsx` 생성**
- shadcn/ui Breadcrumb 컴포넌트 추가
```bash
npx shadcn@latest add breadcrumb
```
- 네비게이션 경로 표시: 홈 > 카테고리 > [현재 카테고리]

**`components/blog/category-list.tsx` 생성**
- 모든 카테고리 목록 표시
- 각 카테고리별 글 개수 표시
- 사이드바 또는 상단 탭 형태

#### 4.2 검색 기능 (선택적, 시간 여유 시)

**`components/blog/search-bar.tsx` 생성**
- 클라이언트 사이드 검색 구현
- 제목 및 태그 기반 검색
- 실시간 필터링

**`app/search/page.tsx` 생성 (선택사항)**
- 검색 결과 페이지
- 검색어 하이라이팅

#### 4.3 SEO 최적화

**메타 태그 설정**
- 각 페이지에 `generateMetadata` 함수 구현
- Open Graph 이미지 설정
- Twitter Card 메타 태그 추가

**`app/sitemap.ts` 생성**
```typescript
import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/notion-api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://your-domain.com/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries,
  ]
}
```

**`app/robots.ts` 생성**
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/test/',
    },
    sitemap: 'https://your-domain.com/sitemap.xml',
  }
}
```

**JSON-LD 구조화 데이터 추가 (선택사항)**
- 블로그 포스팅 schema.org 마크업
- 작성자 정보 마크업

#### 4.4 홈페이지 개선

**`app/page.tsx` 업데이트**
- Hero Section
- 최근 글 섹션 (6개)
- Featured Categories 섹션

**`components/sections/hero.tsx` 생성**
- 블로그 타이틀 및 서브타이틀
- 간단한 자기소개
- CTA 버튼 ("전체 글 보기" → `/blog`)
- shadcn/ui Button 컴포넌트 활용

**`components/sections/recent-posts.tsx` 생성**
- 최신 6개 글 표시
- `PostCard` 컴포넌트 재사용
- "더 보기" 버튼 → `/blog`

**`components/sections/featured-categories.tsx` 생성**
- 주요 카테고리 4개 표시
- 카테고리 카드 (아이콘, 이름, 글 개수)
- 각 카테고리 클릭 시 `/category/[category]` 이동

#### 4.5 UI/UX 개선

**다크모드 색상 조정**
- `app/globals.css` 업데이트
- Notion 컨텐츠 다크모드 스타일 커스터마이징
- 코드 블록 테마 설정

**호버 애니메이션**
- 카드 호버 시 shadow 및 transform 효과
- 버튼 호버 시 색상 변경
- 링크 underline 애니메이션

### ✅ 완료 기준

- [ ] 카테고리 페이지에서 해당 카테고리 글만 필터링되어 표시됨
- [ ] 브레드크럼 네비게이션이 정상 작동
- [ ] 모든 페이지에 적절한 메타 태그가 설정됨
- [ ] `/sitemap.xml`이 정상 생성되고 모든 글이 포함됨
- [ ] `/robots.txt`가 정상 생성됨
- [ ] 홈페이지가 PRD 명세대로 구현됨 (Hero, 최근 글, Featured Categories)
- [ ] 다크모드에서 모든 컴포넌트가 정상 표시됨
- [ ] 검색 기능이 구현되었다면 제목/태그 검색이 정상 작동함 (선택사항)

### 📦 산출물

- `app/category/[category]/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/page.tsx` (홈페이지 개선)
- `components/sections/hero.tsx`
- `components/sections/recent-posts.tsx`
- `components/sections/featured-categories.tsx`
- `components/blog/category-list.tsx`
- `components/blog/search-bar.tsx` (선택사항)
- `app/search/page.tsx` (선택사항)
- 업데이트된 `app/globals.css`

---

## Phase 5: 최적화 및 배포

### ⏱️ 예상 소요 시간
**1-2일**

### 🎯 목표
성능 최적화 및 프로덕션 배포

### 📋 작업 목록

#### 5.1 성능 최적화

**이미지 최적화**
- 모든 이미지에 Next.js Image 컴포넌트 적용
- `next.config.js`에 Notion CDN 도메인 추가
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
```

**코드 스플리팅 확인**
- 동적 import 활용 (필요 시)
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

**번들 사이즈 분석**
```bash
npm install --save-dev @next/bundle-analyzer
```
- `next.config.js` 설정 추가
- `npm run build` 실행 후 번들 사이즈 확인
- 불필요한 의존성 제거

**Lighthouse 성능 측정**
- Chrome DevTools Lighthouse 실행
- 목표: Performance > 80
- 개선 포인트 파악 및 최적화

#### 5.2 반응형 디자인 개선

**모든 브레이크포인트에서 UI 검증**
- Mobile (< 640px): 1열 레이아웃, 햄버거 메뉴
- Tablet (640px ~ 1024px): 2열 레이아웃
- Desktop (> 1024px): 3열 레이아웃, 사이드바

**다크모드 색상 조정**
- 모든 컴포넌트에서 다크모드 테스트
- 가독성 확인 (텍스트 대비, 배경 색상)
- Notion 컨텐츠 다크모드 스타일 미세 조정

**터치 최적화**
- 모바일에서 버튼 크기 충분히 확보 (최소 44x44px)
- 스와이프 제스처 지원 (선택사항)

#### 5.3 로딩 및 에러 상태

**`app/loading.tsx` 생성**
- 루트 레벨 로딩 상태
- Skeleton UI 사용

**`app/error.tsx` 생성**
- 루트 레벨 에러 핸들링
- 에러 메시지 표시
- "다시 시도" 버튼

**`app/blog/loading.tsx` (이미 생성됨)**
- 글 목록 로딩 상태

**`app/blog/[slug]/loading.tsx` 생성**
- 글 상세 로딩 상태

#### 5.4 Vercel 배포

**GitHub 저장소 연결**
- GitHub에 프로젝트 푸시
- Vercel 대시보드에서 새 프로젝트 생성
- GitHub 저장소 연결

**환경 변수 설정**
- Vercel Dashboard > Settings > Environment Variables
- `NOTION_API_KEY` 추가
- `NOTION_DATABASE_ID` 추가
- Production, Preview, Development 모두 설정

**자동 배포 설정**
- main 브랜치에 푸시 시 자동 배포
- PR 생성 시 Preview 배포
- 배포 알림 설정 (Slack, Discord 등)

**프로덕션 검증**
- 배포된 사이트 동작 확인
- 모든 페이지 접속 테스트
- ISR 동작 테스트:
  1. Notion에서 글 수정
  2. 1분 대기
  3. 프로덕션 사이트에서 변경사항 확인
- Lighthouse 성능 측정 (프로덕션 환경)

**커스텀 도메인 설정 (선택사항)**
- Vercel Dashboard > Settings > Domains
- 도메인 추가 및 DNS 설정

#### 5.5 문서화

**README.md 업데이트**
- 프로젝트 소개
- 기술 스택
- 주요 기능
- 설치 방법
```bash
# 로컬 환경 설정
npm install
cp .env.example .env.local
# .env.local 파일에 Notion API 키 입력
npm run dev
```
- 배포 가이드
- 배포 URL 추가
- 스크린샷 추가 (홈페이지, 글 목록, 글 상세)

**라이선스 추가**
- `LICENSE` 파일 생성 (MIT 라이선스 권장)

**CONTRIBUTING.md 작성 (선택사항)**
- 기여 가이드라인
- 코드 스타일 가이드

#### 5.6 최종 점검

**기능 체크리스트**
- [ ] 글 목록 페이지 정상 작동
- [ ] 글 상세 페이지 정상 작동
- [ ] 카테고리 필터링 정상 작동
- [ ] 다크모드 전환 정상 작동
- [ ] 반응형 디자인 정상 작동
- [ ] ISR 정상 작동 (Notion 수정 후 1분 내 반영)
- [ ] SEO 메타 태그 모두 설정됨
- [ ] Sitemap 정상 생성
- [ ] 404 페이지 정상 작동

**성능 체크리스트**
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] 초기 로딩 시간 < 3초

**보안 체크리스트**
- [ ] 환경 변수 안전하게 관리됨 (.env.local 제외, .env.example만 포함)
- [ ] API 키가 클라이언트에 노출되지 않음
- [ ] HTTPS 적용됨 (Vercel 자동 적용)

### ✅ 완료 기준

- [ ] Lighthouse Performance Score > 80
- [ ] 모든 디바이스(모바일/태블릿/데스크톱)에서 UI가 정상 작동함
- [ ] 다크모드/라이트모드 모두 정상 작동함
- [ ] Vercel 프로덕션 배포 성공
- [ ] ISR이 프로덕션에서 정상 작동함 (Notion 수정 후 1분 내 반영)
- [ ] 모든 기능 체크리스트 항목이 완료됨
- [ ] README.md가 완성되어 있음 (프로젝트 소개, 설치 방법, 배포 URL 포함)
- [ ] 프로덕션 URL 접속 시 에러 없이 정상 작동

### 📦 산출물

- `app/loading.tsx`
- `app/error.tsx`
- `app/blog/[slug]/loading.tsx`
- 최적화된 `next.config.js`
- 프로덕션 배포 완료
- 업데이트된 `README.md`
- `LICENSE` 파일
- Vercel 프로덕션 URL
- Lighthouse 성능 측정 리포트 (선택사항)

---

## 전체 타임라인

```
Week 1
├─ Day 1-2: Phase 1 (프로젝트 초기 설정)
├─ Day 3-5: Phase 2 (공통 모듈 개발)
└─ Day 6-7: Phase 3 시작 (글 목록 페이지)

Week 2
├─ Day 8-9: Phase 3 완료 (글 상세 페이지)
├─ Day 10-12: Phase 4 (추가 기능 개발)
└─ Day 13-14: Phase 5 (최적화 및 배포)
```

## 주요 마일스톤

| Milestone | 완료 예정 | 핵심 성과 |
|-----------|----------|-----------|
| Phase 1 완료 | 2일 차 | Notion API 연동 준비 완료 |
| Phase 2 완료 | 5일 차 | 재사용 가능한 코드 기반 구축 완료 |
| Phase 3 완료 | 9일 차 | 블로그 핵심 기능 구현 완료 |
| Phase 4 완료 | 12일 차 | 사용자 경험 향상 기능 추가 완료 |
| Phase 5 완료 | 14일 차 | 프로덕션 배포 및 최종 검증 완료 |

## 리스크 관리

### 주요 리스크 및 대응 방안

| 리스크 | 발생 가능성 | 영향도 | 대응 방안 |
|--------|------------|--------|-----------|
| Notion API Rate Limit 초과 | 중간 | 중간 | 재시도 로직 구현, ISR 캐싱 활용 |
| 복잡한 Notion 블록 렌더링 실패 | 높음 | 중간 | react-notion-x 활용, Fallback UI 제공 |
| Notion 이미지 URL 만료 문제 | 높음 | 중간 | Next.js Image Optimization 활용 |
| ISR 설정 최적화 필요 | 중간 | 낮음 | revalidate 시간 조정 (60초) |
| 반응형 디자인 구현 복잡도 | 낮음 | 낮음 | Tailwind CSS 유틸리티 활용 |
| 빌드 시간 증가 (글 개수 증가 시) | 낮음 | 낮음 | On-demand ISR 활용 |

### 일정 지연 시 대응 전략

**우선순위 조정:**
1. **Must Have (필수)**: Phase 1, 2, 3
2. **Should Have (권장)**: Phase 4 (카테고리, SEO, 홈페이지)
3. **Nice to Have (선택)**: 검색 기능, 상세 SEO 최적화

**일정이 촉박할 경우:**
- Phase 4의 검색 기능 제외
- Phase 5의 상세 최적화 간소화
- 최소 기능으로 먼저 배포 후 점진적 개선

## 다음 단계 (Phase 5 이후)

### 향후 확장 기능 로드맵

**Phase 6: 고급 기능 추가 (2-3주)**
- 댓글 시스템 (giscus, utterances)
- 조회수 추적 (Vercel Analytics, Google Analytics)
- 글 좋아요/북마크 기능
- RSS 피드 생성
- 검색 기능 고도화 (전문 검색)

**Phase 7: SEO 및 성능 개선 (1-2주)**
- 상세 SEO 최적화 (JSON-LD, Structured Data)
- 이미지 영구 저장 (Cloudinary, Vercel Blob Storage)
- 성능 모니터링 (Vercel Analytics, Sentry)
- 캐싱 전략 고도화

**Phase 8: UX 개선 (1-2주)**
- 관련 글 추천 기능
- 글 시리즈 기능
- 독자 통계 대시보드
- 다국어 지원 (i18n)

---

## 참고 사항

### 개발 시 주의사항

1. **Notion API Rate Limit**
   - 초당 3 요청 제한
   - 에러 핸들링 및 재시도 로직 필수

2. **Notion 이미지 URL 만료**
   - Notion CDN 이미지는 1시간 만료
   - Next.js Image Optimization 활용 필요
   - 향후 외부 호스팅 고려

3. **TypeScript 타입 안정성**
   - Notion API 응답 타입 정의 철저히
   - any 타입 최소화

4. **ISR 캐싱 전략**
   - revalidate: 60초 설정
   - On-demand Revalidation 고려 (향후)

5. **반응형 디자인**
   - Mobile First 접근
   - 모든 브레이크포인트에서 테스트

### 유용한 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (로컬)
npm start

# Linting
npm run lint

# shadcn/ui 컴포넌트 추가
npx shadcn@latest add [component-name]

# 타입 체크
npx tsc --noEmit
```

---

**문서 작성일**: 2026-02-14
**버전**: 1.0
**작성자**: Claude Sonnet 4.5

**문서 종료**
