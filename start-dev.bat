@echo off
echo ===================================================
echo   Starting InternAI (Backend + Frontend)
echo ===================================================
echo.
echo Starting Backend on http://localhost:5001 ...
start "InternAI - Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo Starting Frontend on http://localhost:3000 ...
start "InternAI - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ===================================================
echo Backend running on: http://localhost:5001
echo API Docs running on: http://localhost:5001/api-docs
echo Frontend running on: http://localhost:3000
echo ===================================================
echo Press any key to exit this launcher window...
pause >nul
