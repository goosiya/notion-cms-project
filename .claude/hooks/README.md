# Claude Code Slack 알림 통합

Claude Code 작업 중 권한 요청이나 작업 완료 시 Slack으로 실시간 알림을 받을 수 있습니다.

## 기능

- 🔐 **권한 요청 알림**: Claude가 Bash 명령이나 파일 수정 권한을 요청할 때
- ✅ **작업 완료 알림**: Claude가 할당된 작업을 완료했을 때
- ⏸️ **입력 대기 알림**: Claude가 사용자 입력을 기다리고 있을 때

## 설정 방법

### 1. Slack 웹훅 URL 생성

1. [Slack API 페이지](https://api.slack.com/apps) 접속
2. **"Create New App"** 클릭 → **"From scratch"** 선택
3. App 이름 입력 (예: "Claude Code Notifications")
4. 워크스페이스 선택
5. 좌측 메뉴에서 **"Incoming Webhooks"** 클릭
6. **"Activate Incoming Webhooks"** 토글 활성화
7. **"Add New Webhook to Workspace"** 클릭
8. 알림을 받을 채널 선택 (예: #claude-notifications)
9. 생성된 Webhook URL 복사 (https://hooks.slack.com/services/...)

### 2. 환경 변수 설정

```bash
# .claude/.env 파일 열기
notepad .claude/.env

# 또는 직접 복사
cp .claude/.env.example .claude/.env
```

`.claude/.env` 파일에서 `SLACK_WEBHOOK_URL`을 실제 웹훅 URL로 교체:

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

### 3. Claude Code 재시작

hooks 설정이 적용되도록 Claude Code를 재시작합니다.

## 테스트

### 스크립트 직접 테스트

터미널에서 다음 명령으로 알림이 정상 작동하는지 확인:

```bash
cd C:\GOOSIA\workspace\claude-nextjs-starters
bash .claude/hooks/slack-notify.sh permission_request
```

Slack 채널에 "🔐 Claude Code 권한 요청" 메시지가 도착하면 성공입니다.

### 실제 사용 테스트

Claude Code에서 권한이 필요한 작업 요청:

```
"git status 명령을 실행해주세요"
```

권한 요청 시 Slack 알림이 도착하는지 확인합니다.

## 문제 해결

### 알림이 오지 않는 경우

1. **환경 변수 확인**:
   ```bash
   cat .claude/.env
   ```
   - `SLACK_WEBHOOK_URL`이 올바르게 설정되었는지 확인

2. **스크립트 권한 확인**:
   ```bash
   ls -l .claude/hooks/slack-notify.sh
   ```
   - 실행 권한(`-rwxr-xr-x`)이 있는지 확인
   - 없다면: `chmod +x .claude/hooks/slack-notify.sh`

3. **수동 테스트**:
   ```bash
   bash .claude/hooks/slack-notify.sh permission_request
   ```
   - 에러 메시지 확인

### Git Bash가 없는 경우

Windows에서 Git Bash가 설치되어 있지 않다면:

1. [Git for Windows](https://git-scm.com/download/win) 다운로드 및 설치
2. 설치 시 "Git Bash Here" 옵션 선택

## 보안 주의사항

- ⚠️ `.claude/.env` 파일은 **절대 Git에 커밋하지 마세요**
- ⚠️ Slack 웹훅 URL은 **민감 정보**입니다
- ⚠️ 이미 `.gitignore`에 추가되어 있지만, 공유 전 확인하세요

## 파일 구조

```
.claude/
├── hooks/
│   ├── slack-notify.sh       # Slack 알림 스크립트
│   └── README.md             # 이 문서
├── .env                       # Slack 웹훅 URL (gitignore)
├── .env.example               # 환경 변수 템플릿
└── settings.local.json        # hooks 설정
```

## 커스터마이징

메시지 내용을 변경하려면 `slack-notify.sh` 파일의 `case` 문을 수정하세요:

```bash
case "$EVENT_TYPE" in
    permission_request)
        EMOJI="🔐"
        TITLE="Claude Code 권한 요청"
        MESSAGE="권한 요청이 대기 중입니다"
        ;;
    # ...
esac
```

## 지원

문제가 발생하면 다음을 확인하세요:

1. Slack 웹훅 URL이 유효한지
2. `.claude/.env` 파일이 올바르게 설정되었는지
3. Git Bash가 설치되어 있는지
4. 스크립트 실행 권한이 있는지

여전히 문제가 있다면 Claude Code에 문의하세요.
