
cordova create

git init
npm init
npm install -g typescript gulp-cli
npm install --save-dev gulp gulp-typescript
touch gulpfile.js

mkdir src
mkdir src/typings

npm install --save-dev browserify tsify vinyl-source-stream


ALWAYS ADD THIS TO YOUR tsconfig.json !!

 "exclude": [
    "node_modules"
  ]


  http://ticons.fokkezb.nl/#result  -> launch image and icons

to simulate  cordova app on ios simulator from vscode:
brew install ios-webkit-debug-proxy
change port to 9222 or try 9220
see debug at
chrome-devtools://devtools/bundled/inspector.html?ws=localhost:9223/devtools/page/1
https://github.com/Microsoft/vscode-cordova/issues/54

use gulp serve:dist -> gulp serve is not updated for typescript yet


http://soundbible.com/suggest.php?q=weapon&x=0&y=0