#!/usr/bin/env bash
export PROJECT=wae-v2
echo "Copy files..."
rsync -av ./config ./index.js ./package.json ./public ./routes ./views root@128.199.172.57:/zserver/nodejs-projects/wae-v2

echo "Restart project"
ssh root@128.199.172.57 "pm2 restart 0"

exit 0

# vi:ai sw=4 ts=4 tw=0 et
