#!/bin/bash
set -x -e
NOW=$(date +%Y%m%d)
zip=numworx-items-$NOW.zip
cd target
java -Dtaoexport.user=$DWOUSER -Dtaoexport.pass=$DWOPASS -jar taoexport.jar  $zip
V=$USER@gemini.science.uu.nl:/science/wwwprojects/FI-Sites/www-dev/dwo/apps/
scp $zip $V
