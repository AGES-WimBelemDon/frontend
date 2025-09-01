# This script allows users to set up a development environment using Docker
# That is useful when user does not have node installed locally

#!/bin/sh
set -e

echo "✅ Building dev image..."
docker compose build dev > /dev/null

echo "✅ Cleaning host node_modules folder..."
rm -rf ./node_modules

echo "✅ Starting temporary container..."
CID=$(docker compose run -d --name dev_temp dev sh -c "npm install && touch /tmp/done && tail -f /dev/null")

echo "✅ Copying node_modules from container to host..."
docker exec "$CID" sh -c "while [ ! -f /tmp/done ]; do sleep 1; done; tar -C /app -cf - node_modules" | tar -xf - -C .

echo "✅ Stopping temporary container..."
docker stop "$CID" > /dev/null
docker rm "$CID" > /dev/null

echo "✅ Cleaning Windows-specific binaries..."
rm -rf ./node_modules/.bin
find ./node_modules -name "*.exe" -type f -delete || true
find ./node_modules -name "*.cmd" -type f -delete || true
find ./node_modules -name "*.dll" -type f -delete || true

echo "🎉 node_modules successfully set up for host."
