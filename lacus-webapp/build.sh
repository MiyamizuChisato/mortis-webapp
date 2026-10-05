#/bin/bash
docker build -t lacus-app .
docker save -o lacus-app.tar lacus-app
echo build success