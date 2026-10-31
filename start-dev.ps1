# InternAI Development Server Launcher
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Starting InternAI (Backend + Frontend)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

Write-Host "Starting Backend on http://localhost:5001 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; npm run dev"

Write-Host "Starting Frontend on http://localhost:3000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " Backend:   http://localhost:5001" -ForegroundColor Yellow
Write-Host " API Docs:  http://localhost:5001/api-docs" -ForegroundColor Yellow
Write-Host " Frontend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Cyan
