<#
PowerShell helper: upload_to_github.ps1
Usage: run from project root in PowerShell (may require Developer Command Prompt / Git in PATH).

This script will:
 - initialize a git repo if one doesn't exist
 - configure remote origin (default: https://github.com/samarpreet-lab/The-Punjabi-darzi.git)
 - add all files, commit (if there are staged changes), and push to the provided branch (default: main)

It does NOT embed credentials. You must authenticate using Git credential manager, GitHub CLI, or provide a PAT when prompted.

Examples:
  # run with default remote and branch
  .\upload_to_github.ps1

  # provide remote and branch
  .\upload_to_github.ps1 -RemoteUrl "https://github.com/youruser/yourrepo.git" -Branch "main"
#>
param(
    [string]$RemoteUrl = "https://github.com/samarpreet-lab/The-Punjabi-darzi.git",
    [string]$Branch = "main"
)

function Exec([string]$cmd) {
    Write-Host "$ $cmd" -ForegroundColor Cyan
    $proc = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command $cmd" -NoNewWindow -Wait -PassThru -RedirectStandardOutput stdout.txt -RedirectStandardError stderr.txt
    $out = Get-Content -Path stdout.txt -Raw
    $err = Get-Content -Path stderr.txt -Raw
    if ($out) { Write-Host $out }
    if ($err) { Write-Host $err -ForegroundColor Red }
}

# Ensure git is available
try {
    git --version > $null
} catch {
    Write-Host "Git does not appear to be installed or not in PATH. Please install Git and try again." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..."
    Exec "git init"
} else {
    Write-Host "Existing git repository detected." -ForegroundColor Yellow
}

# Ensure user.name/email set
$userName = (& git config user.name) -join ""
$userEmail = (& git config user.email) -join ""
if (-not $userName -or -not $userEmail) {
    Write-Host "Git user.name or user.email not set. You will be prompted to set them now." -ForegroundColor Yellow
    $setName = Read-Host "Enter your name for git commits (e.g. 'Your Name')"
    if ($setName) { Exec "git config user.name \"$setName\"" }
    $setEmail = Read-Host "Enter your email for git commits (e.g. you@example.com)"
    if ($setEmail) { Exec "git config user.email \"$setEmail\"" }
}

# Add / update remote
$existingRemote = (& git remote -v) -join "`n"
if ($existingRemote -match "origin") {
    Write-Host "Updating origin remote to: $RemoteUrl"
    Exec "git remote set-url origin $RemoteUrl"
} else {
    Write-Host "Adding origin remote: $RemoteUrl"
    Exec "git remote add origin $RemoteUrl"
}

# Add files
Write-Host "Staging all files..."
Exec "git add -A"

# Only commit if there are changes
$status = (& git status --porcelain) -join "`n"
if (-not [string]::IsNullOrEmpty($status)) {
    $msg = Read-Host "Enter commit message (default: 'Initial commit: upload project')"
    if (-not $msg) { $msg = "Initial commit: upload project" }
    Exec "git commit -m \"$msg\""
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Ensure branch name
Exec "git branch -M $Branch"

Write-Host "Ready to push. You may be prompted to authenticate (GitHub username + PAT or Git credential helper)." -ForegroundColor Green

# Push (will prompt for credentials if needed)
Exec "git push -u origin $Branch"

Write-Host "Done. Verify the repository on GitHub." -ForegroundColor Green

# Cleanup
Remove-Item stdout.txt, stderr.txt -ErrorAction SilentlyContinue
