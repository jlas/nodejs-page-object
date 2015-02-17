#!/bin/bash

ZIPNAME=chromedriver_mac32.zip

latest_release=$(curl http://chromedriver.storage.googleapis.com/LATEST_RELEASE)

wget http://chromedriver.storage.googleapis.com/$latest_release/$ZIPNAME

unzip $ZIPNAME
rm $ZIPNAME

sudo mv -f chromedriver /usr/bin/chromedriver