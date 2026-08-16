@echo off
setlocal
set "SITE_DIR=%~dp0site"

if not exist "%SITE_DIR%\index.html" (
  echo Prebuilt site not found at: %SITE_DIR%
  echo If this is the source package, run: npm install ^&^& npm run build
  exit /b 1
)

echo PCA-SC Bench is available at http://localhost:4173
echo Press Ctrl+C to stop.
cd /d "%SITE_DIR%"
start "" "http://localhost:4173"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 4173
) else (
  python -m http.server 4173
)
