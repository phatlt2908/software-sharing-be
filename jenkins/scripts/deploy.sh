set -x
pm2 restart ecosystem.config.js
set +x

echo 'Build and deploy completed.'