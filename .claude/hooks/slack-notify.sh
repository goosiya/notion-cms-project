#!/bin/bash

# Slack 알림 스크립트
# Claude Code hooks에서 호출되어 Slack으로 알림을 전송합니다

# UTF-8 인코딩 설정 (Windows Git Bash 호환)
export LANG=C.UTF-8
export LC_ALL=C.UTF-8

set -euo pipefail

# 환경 변수 로드
# 스크립트 위치 기준으로 프로젝트 루트 찾기
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$SCRIPT_DIR")")}"

if [ -f "$PROJECT_DIR/.claude/.env" ]; then
    source "$PROJECT_DIR/.claude/.env"
else
    echo "Error: .env file not found at $PROJECT_DIR/.claude/.env" >&2
    exit 1
fi

# Slack 웹훅 URL 확인
if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
    echo "Error: SLACK_WEBHOOK_URL is not set" >&2
    exit 1
fi

# 이벤트 타입 파라미터
EVENT_TYPE="${1:-unknown}"

# 현재 시간
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# 이벤트 타입에 따른 메시지 생성
case "$EVENT_TYPE" in
    idle)
        EMOJI="⏸️"
        TITLE="Claude Code 입력 대기"
        MESSAGE="Claude가 입력을 기다리고 있습니다"
        ;;
    stop)
        EMOJI="🏁"
        TITLE="Claude Code 응답 완료"
        MESSAGE="Claude가 응답을 완료했습니다"
        ;;
    *)
        EMOJI="ℹ️"
        TITLE="Claude Code 알림"
        MESSAGE="알림이 도착했습니다"
        ;;
esac

# Slack 메시지 페이로드를 임시 파일로 생성 (UTF-8 인코딩 보장)
TEMP_PAYLOAD_FILE="${PROJECT_DIR}/.claude/temp_slack_payload.json"

cat > "$TEMP_PAYLOAD_FILE" <<EOF
{
    "text": "$EMOJI $TITLE",
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*$EMOJI $TITLE*\n$MESSAGE\n\n*시간*: $TIMESTAMP\n*프로젝트*: claude-nextjs-starters"
            }
        }
    ]
}
EOF

# curl을 사용하여 전송 (--data-binary는 파일을 그대로 전송)
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST \
    -H "Content-Type: application/json; charset=UTF-8" \
    --data-binary "@$TEMP_PAYLOAD_FILE" \
    "$SLACK_WEBHOOK_URL" 2>&1 || echo "000")

# 임시 파일 삭제
rm -f "$TEMP_PAYLOAD_FILE"

# 응답 확인 (200이면 성공)
if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "ok" ]; then
    echo "Slack notification sent: $TITLE" >&2
    exit 0
else
    echo "Failed to send Slack notification (HTTP $RESPONSE)" >&2
    exit 1
fi
