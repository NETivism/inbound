#! /bin/bash
if [ "`dpkg -l | grep npm | wc -l`" = "0" ]; then
  sudo apt install npm
fi
if [ "`npm list -g | grep browserify | wc -l`" = "0" ]; then
  sudo npm install -g browserify
fi
echo "### browserify inbound.js ..."
browserify main.js -o inbound.js
echo "Done!"
echo "### uglify inbound.js -> inbound.min.js ..."
cat inbound.js | uglifyjs  > inbound.min.js
echo "Done!"
