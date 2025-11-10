# Convenience script to set up everything locally (with only git and docker)
#!/bin/sh
set -e

echo "🚀 Running full local setup..."

./scripts/setup_git_hooks.sh
./scripts/setup_node_docker.sh

echo "✅ Local setup complete."
