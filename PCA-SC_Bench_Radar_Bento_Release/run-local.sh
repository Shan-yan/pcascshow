#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SITE_DIR="$SCRIPT_DIR/site"

if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "Prebuilt site not found at: $SITE_DIR"
  echo "If this is the source package, run: npm install && npm run build"
  exit 1
fi

echo "PCA-SC Bench is available at http://localhost:4173"
echo "Press Ctrl+C to stop."
cd "$SITE_DIR"
(
  sleep 1
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:4173" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "http://localhost:4173" >/dev/null 2>&1 || true
  fi
) &
python3 -m http.server 4173
