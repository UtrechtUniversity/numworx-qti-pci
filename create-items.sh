#!/bin/bash
set -x -e
NOW=$(date +%Y%m%d)
zip=numworx-items-$NOW.zip
cd target
java -jar taoexport.jar $zip
V=/volumes/FI-Sites/www-dev/dwo/apps/
cp $zip $V
