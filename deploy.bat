@echo off
REM ================================================
REM Deploy Script for Windows (GitHub Pages)
REM ================================================

echo.
echo ================================================
echo   DEPLOY TO GITHUB PAGES
echo ================================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

REM Add all changes
echo [1/3] Adding changes...
git add .

REM Commit
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update: auto deploy

echo [2/3] Committing with message: %commit_msg%
git commit -m "%commit_msg%"

REM Push
echo.
echo [3/3] Pushing to GitHub...
git push

echo.
echo ================================================
echo   DEPLOY COMPLETE!
echo ================================================
echo.
echo Wait 1-2 minutes for changes to appear on:
echo https://YOUR-USERNAME.github.io/audio-library/
echo.
echo Don't forget to:
echo - Replace YOUR-USERNAME with your GitHub username
echo - Enable GitHub Pages in repository Settings
echo.
pause

