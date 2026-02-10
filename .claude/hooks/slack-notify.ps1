# Slack notification script for Claude Code hooks
# PowerShell version for Windows compatibility

param(
    [string]$EventType = "unknown"
)

# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Load environment variables from .env file
$ProjectDir = $env:CLAUDE_PROJECT_DIR
if (-not $ProjectDir) {
    $ProjectDir = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
}

$EnvFile = Join-Path $ProjectDir ".claude\.env"
if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*?)\s*=\s*(.+?)\s*$') {
            $name = $matches[1]
            $value = $matches[2]
            Set-Item -Path "env:$name" -Value $value
        }
    }
} else {
    Write-Error "Error: .env file not found at $EnvFile"
    exit 1
}

# Check Slack webhook URL
if (-not $env:SLACK_WEBHOOK_URL) {
    Write-Error "Error: SLACK_WEBHOOK_URL is not set"
    exit 1
}

# Current timestamp
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Message based on event type
switch ($EventType) {
    "idle" {
        $Emoji = "⏸️"
        $Title = "Claude Code 입력 대기"
        $Message = "Claude가 입력을 기다리고 있습니다"
    }
    "stop" {
        $Emoji = "🏁"
        $Title = "Claude Code 응답 완료"
        $Message = "Claude가 응답을 완료했습니다"
    }
    default {
        $Emoji = "ℹ️"
        $Title = "Claude Code 알림"
        $Message = "알림이 도착했습니다"
    }
}

# Create Slack payload
$Payload = @{
    text = "$Emoji $Title"
    blocks = @(
        @{
            type = "section"
            text = @{
                type = "mrkdwn"
                text = "*$Emoji $Title*`n$Message`n`n*시간*: $Timestamp`n*프로젝트*: claude-nextjs-starters"
            }
        }
    )
} | ConvertTo-Json -Depth 10 -Compress

# Send to Slack
try {
    $Response = Invoke-RestMethod -Uri $env:SLACK_WEBHOOK_URL `
        -Method Post `
        -ContentType "application/json; charset=utf-8" `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($Payload)) `
        -ErrorAction Stop

    Write-Host "Slack notification sent: $Title"
    exit 0
} catch {
    Write-Error "Failed to send Slack notification: $_"
    exit 1
}
