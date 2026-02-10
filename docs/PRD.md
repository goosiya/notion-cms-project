# Notion CMS 개인 개발 블로그 PRD

> Product Requirements Document
> 작성일: 2026-02-11
> 버전: 1.0

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
**개인 개발 블로그 with Notion CMS**

### 1.2 프로젝트 목적과 비전
개발자가 기술 지식을 쉽게 공유하고, 개인 브랜딩을 구축할 수 있는 모던 웹 블로그 플랫폼을 구축합니다. Notion을 CMS(Content Management System)로 활용하여 콘텐츠 작성과 관리를 간소화하고, Next.js 기반의 세련된 프론트엔드로 최상의 사용자 경험을 제공합니다.

### 1.3 Notion을 CMS로 선택한 이유

**장점:**
- ✅ **익숙한 작성 환경**: Notion의 직관적인 블록 에디터로 글 작성 생산성 극대화
- ✅ **자동 반영**: Notion에서 글 작성 후 별도 배포 없이 자동으로 블로그에 반영 (ISR)
- ✅ **관리자 페이지 불필요**: 별도의 백엔드 CMS 구축 및 유지보수 비용 제로
- ✅ **무료**: Notion 개인 플랜 무료 사용
- ✅ **데이터 소유권**: 언제든 Notion에서 데이터 추출 가능
- ✅ **협업 가능**: 향후 다중 작성자 지원 가능
- ✅ **버전 관리**: Notion 자체 히스토리 기능으로 글 버전 추적

---

## 2. 목표 및 범위

### 2.1 비즈니스 목표
1. **기술 블로그 운영**: 개발 경험과 학습 내용을 체계적으로 기록
2. **개인 브랜딩**: 기술력과 전문성을 대외적으로 어필
3. **지식 공유**: 오픈소스 커뮤니티에 기여하고 네트워킹 확장
4. **SEO 최적화**: 검색 엔진을 통한 자연 유입 확보

### 2.2 사용자 목표
**작성자 (블로그 운영자)**:
- Notion에서 편안하게 글 작성 및 수정
- 카테고리/태그로 콘텐츠 체계적으로 분류
- 발행/비공개 상태 관리

**독자 (방문자)**:
- 깔끔하고 읽기 편한 UI/UX
- 관심 주제의 글을 빠르게 찾기 (카테고리, 검색)
- 모바일/데스크톱 모든 환경에서 쾌적한 경험
- 다크모드 지원으로 눈의 피로 최소화

### 2.3 프로젝트 범위

**MVP (Minimum Viable Product) 범위:**
- Notion API 연동 및 글 데이터 가져오기
- 글 목록/상세 페이지
- 카테고리별 필터링
- 반응형 디자인 + 다크모드
- 기본 SEO 설정

**향후 확장 기능:**
- 댓글 시스템 (giscus 등)
- 조회수 추적
- 글 좋아요/북마크
- RSS 피드
- 상세 SEO 최적화 (Open Graph, JSON-LD)
- 다국어 지원 (i18n)
- 검색 기능 고도화 (전문 검색)

---

## 3. 주요 기능

### 3.1 글 목록 페이지

**기능:**
- Notion 데이터베이스에서 "발행됨" 상태의 글 목록 가져오기
- 최신순 정렬 (발행일 기준 내림차순)
- 각 글 카드 표시 정보:
  - 썸네일 이미지 (커버 이미지)
  - 제목
  - 요약 (Excerpt)
  - 발행일
  - 카테고리 배지
  - 태그 목록

**UI/UX:**
- 그리드 레이아웃 (데스크톱: 3열, 태블릿: 2열, 모바일: 1열)
- 호버 시 카드 애니메이션 효과
- 무한 스크롤 또는 페이지네이션 (MVP에서는 페이지네이션)

### 3.2 글 상세 페이지

**기능:**
- Notion 페이지 내용을 렌더링 (모든 블록 타입 지원)
- 제목, 메타 정보 (작성일, 카테고리, 태그) 표시
- 목차(TOC) 자동 생성 (H2, H3 기준)
- 이전/다음 글 네비게이션
- 공유 버튼 (트위터, 페이스북, 링크 복사)

**UI/UX:**
- 가독성 높은 타이포그래피
- 코드 블록 syntax highlighting
- 이미지 자동 최적화 (Next.js Image)
- 좌측 또는 우측에 고정 목차 (데스크톱)
- 스크롤 시 목차 현재 위치 하이라이트

### 3.3 카테고리 필터링

**기능:**
- 카테고리별 글 목록 조회
- URL 기반 라우팅: `/category/[category-slug]`
- 브레드크럼 네비게이션

**UI/UX:**
- 사이드바 또는 상단 탭으로 카테고리 선택
- 현재 선택된 카테고리 강조 표시
- 각 카테고리별 글 개수 표시

### 3.4 검색 기능 (향후 확장)

**기능:**
- 제목, 태그 기반 검색
- 실시간 검색 결과 표시
- 검색어 하이라이팅

**UI/UX:**
- 헤더 검색 바
- 검색 결과 모달 또는 페이지

### 3.5 반응형 디자인

**기능:**
- 모바일 퍼스트 접근
- 모든 디바이스에서 최적화된 레이아웃
- 다크모드/라이트모드 토글 (기존 next-themes 활용)

**브레이크포인트:**
- Mobile: < 640px
- Tablet: 640px ~ 1024px
- Desktop: > 1024px

---

## 4. 기술 스택

### 4.1 Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **UI Library**: shadcn/ui (Radix UI 기반)
- **Icons**: Lucide React
- **Theme**: next-themes (다크모드)
- **Code Highlighting**: `shiki` 또는 `prism-react-renderer`

### 4.2 Backend / CMS
- **CMS**: Notion (Notion API)
- **SDK**: `@notionhq/client` (공식 SDK)
- **Rendering**: `react-notion-x` 또는 커스텀 렌더러

### 4.3 Deployment
- **Hosting**: Vercel
- **Caching Strategy**: ISR (Incremental Static Regeneration)
- **Revalidation**: 60초 (1분마다 데이터 갱신)

### 4.4 개발 도구
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier (권장)
- **Version Control**: Git

---

## 5. Notion 데이터베이스 구조

### 5.1 Database 정보
- **Database Name**: "블로그 글" (Blog Posts)
- **Database Type**: Full-page database

### 5.2 Properties (필드)

| Property Name | Type         | 설명                          | 필수 여부 |
|---------------|--------------|-------------------------------|-----------|
| `Title`       | title        | 글 제목                       | 필수      |
| `Category`    | select       | 카테고리 (React, Next.js 등) | 필수      |
| `Tags`        | multi_select | 태그 (hooks, tutorial 등)    | 선택      |
| `Published`   | date         | 발행일                        | 필수      |
| `Status`      | select       | 상태 (초안/발행됨/비공개)     | 필수      |
| `Slug`        | rich_text    | URL 슬러그 (자동 생성 가능)   | 선택      |
| `Excerpt`     | rich_text    | 요약 (카드에 표시)            | 선택      |
| `CoverImage`  | files        | 커버 이미지                   | 선택      |

### 5.3 Status 값
- `초안` (Draft): 작성 중, 블로그에 표시 안 됨
- `발행됨` (Published): 공개된 글
- `비공개` (Private): 작성 완료했지만 비공개

### 5.4 Category 예시
- React
- Next.js
- TypeScript
- JavaScript
- DevOps
- Algorithm
- Web Performance
- CS (Computer Science)

### 5.5 Content (본문)
- Notion 페이지 본문 (모든 블록 타입 지원)
- 지원 블록: paragraph, heading, code, image, quote, callout, toggle, list 등

---

## 6. 화면 구성

### 6.1 홈페이지 (`/`)

**섹션 구성:**
1. **Hero Section**
   - 블로그 타이틀 및 서브타이틀
   - 간단한 자기소개
   - CTA 버튼 ("전체 글 보기")

2. **최근 글 (Recent Posts)**
   - 최신 6개 글 카드 표시
   - "더 보기" 버튼 → `/blog` 이동

3. **카테고리 바로가기 (Featured Categories)**
   - 주요 카테고리 카드 (4개)
   - 각 카테고리 클릭 시 해당 카테고리 페이지 이동

### 6.2 글 목록 페이지 (`/blog`)

**레이아웃:**
- **헤더**: 페이지 타이틀 "모든 글"
- **사이드바** (데스크톱):
  - 카테고리 필터
  - 태그 클라우드 (선택)
- **메인 콘텐츠**:
  - 글 카드 그리드
  - 페이지네이션

**모바일:**
- 사이드바는 드롭다운 메뉴로 변경

### 6.3 글 상세 페이지 (`/blog/[slug]`)

**레이아웃:**
- **헤더**:
  - 글 제목
  - 메타 정보 (작성일, 카테고리, 태그)
  - 커버 이미지 (있을 경우)
- **좌측 사이드바** (데스크톱):
  - 목차 (TOC)
  - 스크롤 진행률
- **메인 콘텐츠**:
  - Notion 블록 렌더링
  - 최적화된 가독성 (max-width: 720px)
- **하단**:
  - 이전/다음 글 네비게이션
  - 공유 버튼

### 6.4 카테고리 페이지 (`/category/[category]`)

**레이아웃:**
- 브레드크럼: 홈 > 카테고리 > [현재 카테고리]
- 카테고리 이름 및 설명
- 해당 카테고리 글 목록 (그리드)
- 페이지네이션

---

## 7. MVP 범위

### ✅ 포함 사항 (Must Have)

1. **Notion API 연동**
   - 환경 변수 설정 (API Key, Database ID)
   - 글 목록 가져오기
   - 글 상세 가져오기

2. **페이지 구현**
   - 홈페이지 (최근 글 목록)
   - 글 목록 페이지 (`/blog`)
   - 글 상세 페이지 (`/blog/[slug]`)
   - 카테고리 페이지 (`/category/[category]`)

3. **UI/UX**
   - 반응형 레이아웃
   - 다크모드/라이트모드
   - shadcn/ui 기반 세련된 디자인
   - 로딩 상태 (Skeleton UI)

4. **성능 최적화**
   - ISR (Incremental Static Regeneration)
   - 이미지 최적화 (Next.js Image)
   - Code Splitting (자동)

5. **SEO 기본**
   - 메타 태그 (title, description)
   - Open Graph 기본 설정
   - Sitemap 생성

### ❌ 제외 사항 (향후 확장)

- 댓글 기능
- 조회수 추적
- 좋아요/북마크
- 검색 기능 (MVP 이후)
- RSS 피드
- 상세 SEO 최적화 (JSON-LD, Structured Data)
- 다국어 지원
- 관리자 대시보드

---

## 8. 구현 단계

### Phase 1: 환경 설정 (1일)

**목표:** Notion API 연동 준비

**작업:**
1. Notion API 패키지 설치
   ```bash
   npm install @notionhq/client react-notion-x
   ```

2. 환경 변수 설정 (`.env.local`)
   ```env
   NOTION_API_KEY=secret_xxxxxxxxxxxxx
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Notion 설정
   - Notion 워크스페이스에서 "블로그 글" 데이터베이스 생성
   - Integration 생성 및 API 키 발급
   - 데이터베이스를 Integration에 연결

4. 샘플 데이터 작성
   - 5개 이상의 샘플 글 작성 (다양한 카테고리)

**산출물:**
- `.env.local` 파일
- Notion 데이터베이스 (5개+ 샘플 글)

---

### Phase 2: Notion API 연동 (2일)

**목표:** Notion 데이터 가져오기 로직 구현

**작업:**
1. `lib/notion.ts` 생성
   - Notion 클라이언트 초기화
   ```typescript
   import { Client } from '@notionhq/client'

   export const notion = new Client({
     auth: process.env.NOTION_API_KEY,
   })

   export const DATABASE_ID = process.env.NOTION_DATABASE_ID!
   ```

2. `lib/notion-api.ts` 생성
   - API 헬퍼 함수 작성
   ```typescript
   // 주요 함수
   - getPosts(category?: string): 글 목록 가져오기
   - getPostBySlug(slug: string): 특정 글 가져오기
   - getCategories(): 카테고리 목록 가져오기
   - getPostContent(pageId: string): 글 본문 블록 가져오기
   ```

3. `types/notion.ts` 생성
   - TypeScript 타입 정의
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
   ```

4. 테스트
   - API 함수 동작 확인
   - 콘솔에 데이터 출력 확인

**산출물:**
- `lib/notion.ts`
- `lib/notion-api.ts`
- `types/notion.ts`

---

### Phase 3: 글 목록 페이지 (2일)

**목표:** 블로그 글 목록 페이지 구현

**작업:**
1. `/app/blog/page.tsx` 생성
   - 글 목록 데이터 fetching
   - ISR 설정 (`revalidate: 60`)
   ```typescript
   export const revalidate = 60 // 60초마다 재검증

   export default async function BlogPage() {
     const posts = await getPosts()
     return <PostList posts={posts} />
   }
   ```

2. `components/blog/post-card.tsx` 생성
   - shadcn/ui Card 컴포넌트 활용
   - 썸네일, 제목, 요약, 날짜, 카테고리 표시

3. `components/blog/category-filter.tsx` 생성
   - 카테고리 필터 UI
   - 클라이언트 컴포넌트로 구현

4. 스타일링
   - 그리드 레이아웃 (Tailwind CSS)
   - 반응형 디자인 적용

**산출물:**
- `/app/blog/page.tsx`
- `components/blog/post-card.tsx`
- `components/blog/category-filter.tsx`

---

### Phase 4: 글 상세 페이지 (2일)

**목표:** 개별 글 상세 페이지 구현

**작업:**
1. `/app/blog/[slug]/page.tsx` 생성
   - 동적 라우팅 설정
   - `generateStaticParams` 구현 (빌드 시 정적 생성)
   ```typescript
   export async function generateStaticParams() {
     const posts = await getPosts()
     return posts.map((post) => ({ slug: post.slug }))
   }
   ```

2. `components/blog/post-content.tsx` 생성
   - `react-notion-x` 활용한 Notion 블록 렌더링
   - 커스텀 스타일링 적용

3. `components/blog/table-of-contents.tsx` 생성
   - 헤딩 블록에서 TOC 자동 생성
   - 스크롤 시 현재 위치 하이라이트

4. 메타 정보 컴포넌트
   - 작성일, 카테고리, 태그 표시
   - 공유 버튼 (선택사항)

**산출물:**
- `/app/blog/[slug]/page.tsx`
- `components/blog/post-content.tsx`
- `components/blog/table-of-contents.tsx`

---

### Phase 5: 스타일링 및 최적화 (2일)

**목표:** 전체 디자인 통일 및 성능 최적화

**작업:**
1. **디자인 시스템 적용**
   - shadcn/ui 컴포넌트 활용 (Button, Card, Badge 등)
   - 다크모드 색상 조정 (`globals.css`)
   - 타이포그래피 최적화

2. **로딩 및 에러 상태**
   - `loading.tsx` 파일 생성 (Skeleton UI)
   - `error.tsx` 파일 생성 (에러 핸들링)
   - Suspense 경계 설정

3. **이미지 최적화**
   - Next.js Image 컴포넌트 사용
   - Notion 이미지 프록시 설정 (필요 시)

4. **SEO 기본 설정**
   - 메타 태그 설정 (`metadata` export)
   ```typescript
   export const metadata: Metadata = {
     title: '블로그 제목',
     description: '블로그 설명',
     openGraph: { ... }
   }
   ```
   - Robots.txt 생성
   - Sitemap 생성 (`sitemap.ts`)

5. **반응형 검증**
   - 모바일/태블릿/데스크톱 테스트
   - 다크모드 테스트

**산출물:**
- `app/loading.tsx`, `app/error.tsx`
- `app/sitemap.ts`
- `public/robots.txt`
- 최적화된 스타일 시트

---

### Phase 6: 테스트 및 배포 (1일)

**목표:** 프로덕션 배포 및 최종 검증

**작업:**
1. **로컬 테스트**
   - 프로덕션 빌드 테스트
   ```bash
   npm run build
   npm start
   ```
   - 모든 페이지 정상 작동 확인
   - 성능 측정 (Lighthouse)

2. **Vercel 배포**
   - GitHub 저장소 연결
   - 환경 변수 설정 (Vercel Dashboard)
     - `NOTION_API_KEY`
     - `NOTION_DATABASE_ID`
   - 자동 배포 설정

3. **프로덕션 검증**
   - 배포된 사이트 동작 확인
   - ISR 동작 테스트 (Notion에서 글 수정 후 1분 대기)
   - 성능 측정 (Lighthouse Performance > 80)

4. **문서화**
   - README.md 업데이트
   - 배포 가이드 작성

**산출물:**
- 프로덕션 배포 완료
- 업데이트된 README.md

---

## 9. API 설계

### 9.1 Notion API 사용 예시

**글 목록 가져오기**
```typescript
const response = await notion.databases.query({
  database_id: DATABASE_ID,
  filter: {
    property: 'Status',
    select: {
      equals: '발행됨'
    }
  },
  sorts: [
    {
      property: 'Published',
      direction: 'descending'
    }
  ],
  page_size: 10
})

// 결과 파싱
const posts = response.results.map(parseNotionPage)
```

**특정 글 가져오기**
```typescript
// 페이지 메타데이터
const page = await notion.pages.retrieve({
  page_id: pageId
})

// 페이지 블록 (본문)
const blocks = await notion.blocks.children.list({
  block_id: pageId,
  page_size: 100
})
```

**카테고리 목록 가져오기**
```typescript
const response = await notion.databases.retrieve({
  database_id: DATABASE_ID
})

const categoryProperty = response.properties['Category']
if (categoryProperty.type === 'select') {
  const categories = categoryProperty.select.options.map(opt => opt.name)
}
```

### 9.2 데이터 변환 (Notion → App)

**Post 객체 변환 예시**
```typescript
function parseNotionPage(page: any): Post {
  const properties = page.properties

  return {
    id: page.id,
    title: properties.Title.title[0]?.plain_text || 'Untitled',
    slug: properties.Slug?.rich_text[0]?.plain_text || generateSlug(title),
    category: properties.Category?.select?.name || 'Uncategorized',
    tags: properties.Tags?.multi_select?.map(t => t.name) || [],
    publishedDate: properties.Published?.date?.start || '',
    excerpt: properties.Excerpt?.rich_text[0]?.plain_text || '',
    coverImage: properties.CoverImage?.files[0]?.file?.url || '',
    status: properties.Status?.select?.name || 'Draft'
  }
}
```

---

## 10. 성공 지표

### 10.1 기술적 성공 기준

- ✅ **배포 완료**: Vercel 프로덕션 배포 성공
- ✅ **샘플 콘텐츠**: 최소 5개 이상의 샘플 글 작성
- ✅ **반응형**: 모바일/태블릿/데스크톱 모두 정상 작동
- ✅ **성능**: Lighthouse Performance Score > 80
- ✅ **ISR 동작**: Notion 수정 후 1분 내 블로그 반영 확인
- ✅ **다크모드**: 라이트/다크 테마 전환 정상 작동

### 10.2 사용자 경험 지표

- **페이지 로딩 속도**: 초기 로딩 < 3초
- **글 읽기 경험**: 가독성 높은 타이포그래피, 적절한 여백
- **네비게이션**: 직관적인 카테고리 및 글 탐색
- **접근성**: 키보드 네비게이션, 시맨틱 HTML

### 10.3 비즈니스 지표 (향후 추적)

- 월간 방문자 수 (Google Analytics)
- 평균 체류 시간
- 페이지뷰 수
- 검색 엔진 유입률

---

## 11. 제약사항 및 리스크

### 11.1 제약사항

**Notion API 제약:**
- ⚠️ **Rate Limit**: 초당 3 요청 (3 requests/sec)
- ⚠️ **블록 타입 제한**: 일부 Notion 블록은 API에서 미지원 가능 (예: Synced blocks)
- ⚠️ **이미지 URL**: Notion CDN 이미지는 1시간 만료 → 외부 호스팅 고려 필요

**성능:**
- 글이 많아질 경우 빌드 시간 증가 (ISR로 완화)
- Notion API 응답 속도 변동 가능

**기능:**
- 실시간 업데이트 불가 (ISR은 최소 1분 간격)
- Notion에서 삭제된 글은 수동 처리 필요

### 11.2 주요 리스크

| 리스크                        | 영향도 | 발생 가능성 | 대응 방안                                   |
|-------------------------------|--------|-------------|---------------------------------------------|
| Notion API 변경               | 높음   | 중간        | 공식 SDK 사용, 버전 고정, 정기 모니터링     |
| 복잡한 블록 렌더링 실패       | 중간   | 높음        | `react-notion-x` 활용, 커스텀 렌더러 구현   |
| ISR 캐싱 전략 최적화 필요     | 중간   | 중간        | Vercel Edge Caching, 적절한 revalidate 설정 |
| Notion 이미지 만료 문제       | 중간   | 높음        | Cloudinary/S3 등 외부 호스팅 연동           |
| 대용량 데이터 빌드 속도 저하  | 낮음   | 낮음        | 페이지네이션, On-demand ISR 활용            |

### 11.3 대응 전략

1. **API 안정성**
   - `@notionhq/client` 공식 SDK 사용
   - 에러 핸들링 및 재시도 로직 구현
   - Notion API 버전 고정 (`Notion-Version: 2022-06-28`)

2. **렌더링 호환성**
   - `react-notion-x` 라이브러리로 대부분의 블록 타입 지원
   - 미지원 블록은 Fallback UI 제공
   - 복잡한 블록은 커스텀 렌더러 구현

3. **캐싱 최적화**
   - Vercel Edge Caching 활용
   - `revalidate: 60` 설정으로 ISR 최적화
   - 이미지는 Next.js Image Optimization 활용

4. **이미지 영구 저장**
   - Phase 2 이후 Cloudinary 또는 Vercel Blob Storage 연동 고려
   - Notion 이미지 자동 다운로드 및 업로드 스크립트 작성

---

## 12. 참고 자료

### 12.1 공식 문서

- **Notion API**: https://developers.notion.com/
- **Next.js 16 (App Router)**: https://nextjs.org/docs
- **Vercel 배포**: https://vercel.com/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS v4**: https://tailwindcss.com/docs

### 12.2 라이브러리

- **@notionhq/client**: https://github.com/makenotion/notion-sdk-js
- **react-notion-x**: https://github.com/NotionX/react-notion-x
- **next-themes**: https://github.com/pacocoursey/next-themes

### 12.3 참고 프로젝트

- **Notion Blog Template**: https://github.com/transitive-bullshit/nextjs-notion-starter-kit
- **Next.js Blog Examples**: https://github.com/vercel/next.js/tree/canary/examples

### 12.4 도구

- **Notion Integration 생성**: https://www.notion.so/my-integrations
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Vercel Analytics**: https://vercel.com/analytics

---

## 13. 다음 단계

### PRD 승인 후 진행 사항

1. ✅ **PRD 검토 및 승인** (현재 단계)
   - 사용자 요구사항 확인
   - 기술 스택 최종 확정

2. 🔄 **Phase 1 시작**: 환경 설정
   - Notion 계정 및 데이터베이스 생성
   - API 키 발급
   - 패키지 설치

3. 📝 **추가 문서 작성 (필요 시)**
   - API 명세서 (상세)
   - 컴포넌트 설계 문서
   - 스타일 가이드

---

## 버전 히스토리

| 버전 | 날짜       | 작성자 | 변경 내용       |
|------|------------|--------|-----------------|
| 1.0  | 2026-02-11 | Claude | 초안 작성       |

---

**문서 종료**
