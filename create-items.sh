#!/bin/bash
set -x -e
NOW=$(date +%Y%m%d)
zip=numworx-items-$NOW.zip
java -jar target/taoexport.jar target/$zip
V=/volumes/FI-Sites/www-dev/dwo/apps/
cp target/$zip $V
