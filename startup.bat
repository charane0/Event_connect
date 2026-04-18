@echo off
REM Event Connect - Complete Startup Script

echo.
echo ========================================
echo   Event Connect - Startup Script
echo ========================================
echo.

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] MongoDB is not installed or not in PATH
    echo Please install MongoDB and add it to your PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js
    pause
    exit /b 1
)

echo [1] Starting MongoDB...
start cmd /k "mongod --dbpath C:\mongodb_data"
timeout /t 2 >nul

echo [2] Starting Backend Server...
start cmd /k "cd /d C:\Users\sathw\Event_connect\back_end && npm run dev"
timeout /t 3 >nul

echo [3] Starting Frontend Server...
start cmd /k "cd /d C:\Users\sathw\Event_connect\front_end && npm run dev"
timeout /t 2 >nul

echo.
echo ========================================
echo   ✅ All Services Started!
echo ========================================
echo.
echo MongoDB:     http://localhost:27017
echo Backend:     http://localhost:5000
echo Frontend:    http://localhost:3000
echo.
echo Press any key when you're done...
pause
