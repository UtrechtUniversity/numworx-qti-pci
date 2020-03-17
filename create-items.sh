#!/bin/bash
set -x -e
NOW=$(date +%Y%m%d)
zip=numworx-items-$NOW.zip
cd target
java -jar taoexport.jar $zip
V=/Volumes/FI-Sites/www-dev/dwo/apps/
cp $zip $V
