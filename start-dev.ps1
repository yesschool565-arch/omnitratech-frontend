#!/bin/bash

# Windows PowerShell startup script
# Run this in PowerShell to start the development environment

Write-Host "🚀 Starting Omnitratech Development Environment" -ForegroundColor Green
Write-Host "=" * 50

# Check if backend is already running
$backendRunning = Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -match "backend" }

if (-not $backendRunning) {
    Write-Host "Starting backend..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "cd backend; npm run dev" -NoNewWindow
    Start-Sleep -Seconds 3
    Write-Host "✓ Backend started on http://localhost:3001" -ForegroundColor Green
} else {
    Write-Host "✓ Backend already running" -ForegroundColor Green
}

Write-Host "`nStarting frontend..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "npm run dev" -NoNewWindow
Start-Sleep -Seconds 2

Write-Host "`n" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host "✓ Development Environment Started!" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green

Write-Host "`n📍 Access your applications at:" -ForegroundColor Yellow
Write-Host "   Frontend:    http://localhost:5173" -ForegroundColor Cyan
Write-Host "   Backend:     http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Admin Panel: http://localhost:3001/admin" -ForegroundColor Cyan

Write-Host "`n🔐 Admin Credentials:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor Cyan
Write-Host "   Password: admin123" -ForegroundColor Cyan

Write-Host "`n⚠️  Press Ctrl+C in any terminal to stop services" -ForegroundColor Yellow
