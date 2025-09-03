# This script is to be run if user does not run npm install
# That, in turn, does not trigger husky to setup git rules

#!/bin/sh
set -e

echo "🔧 Setting up Git hooks to emulate Husky..."

HOOKS_DIR=".git/hooks"
HUSKY_DIR=".husky"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "❌ No .git/hooks directory found. Are you inside a Git repo?"
  exit 1
fi

# Loop over all husky hook scripts
for hook in $HUSKY_DIR/*; do
  HOOK_NAME=$(basename "$hook")
  TARGET="$HOOKS_DIR/$HOOK_NAME"

  # Skip if not a file
  [ -f "$hook" ] || continue

  # Try to symlink first
  if ln -sf "../../$hook" "$TARGET" 2>/dev/null; then
    echo "✅ Symlinked $HOOK_NAME -> $hook"
  else
    # Fallback to copy (Windows usually here)
    cp "$hook" "$TARGET"
    echo "✅ Copied $HOOK_NAME -> $hook"
  fi

  chmod +x "$TARGET"
done

echo "🎉 Git hooks installed (Husky emulated)."
