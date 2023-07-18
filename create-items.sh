#!/bin/bash
set -x -e
NOW=$(date +%Y%m%d)
zip=numworx-items-$NOW.zip
cd target
java -jar taoexport.jar -Dtaoexport.user=$USER -Dtaoexport.pass=$PASS $zip
V=/Volumes/FI-Sites/www-dev/dwo/apps/
cp $zip $V
