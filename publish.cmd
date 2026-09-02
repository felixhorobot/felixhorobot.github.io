@echo off
cd /d "%~dp0"
echo ============================================
echo  Publishing your portfolio...
echo ============================================
git add -A
git commit -m "Update portfolio content"
git push origin main
echo.
echo ============================================
echo  Done. If there are no errors above, the site
echo  updates in about 1 minute at:
echo  https://felixhorobot.github.io
echo ============================================
pause
