
<img src="https://github.com/gigocabrera/CajaFuerte/blob/master/screenshots/1.png" width="200"/> <img src="https://github.com/gigocabrera/CajaFuerte/blob/master/screenshots/cajafuerte-v2-main.png" width="200"/> <img src="https://github.com/gigocabrera/CajaFuerte/blob/master/screenshots/2.png" width="200"/> <img src="https://github.com/gigocabrera/CajaFuerte/blob/master/screenshots/3.png" width="200"/>

# CajaFuerte

 **Personal Information Manager App** Developed with Ionic, Firebase, AngularFire


## Quick Start

- Clone this repository.
- Run `npm install` from the project root.
- Run `ionic serve` in a terminal from the project root

## Connect

- Follow [@gigocabrera] on Twitter(https://twitter.com/gigocabrera)
- Follow on [LinkedIn](https://www.linkedin.com/in/luiscabrerame)
- Contact me on my [website](http://luiscabrera.site)

## Photos
- http://www.1zoom.me/en/wallpaper/437300/z2117.3/1024x768


## Update Dependencies
1. Ionic
> npm install -g ionic
2. AngularFire2
> npm install firebase @angular/fire --save
3. Firebase Tools
> npm install -g firebase-tools


## Add/Remove platforms
1. ionic cordova platform add ios
2. ionic cordova platform add android
3. ionic cordova platform rm ios
4. ionic cordova platform rm android


## PRODUCTION BUILD - PWA
1. ionic build --prod
2. firebase deploy
> The first command creates the www folder. The second command deploys www to Firebase hosting


## PRODUCTION BUILD - iOS
1. ionic cordova build ios --prod
2. Deploy to App Store - https://appstoreconnect.apple.com/login

## PRODUCTION BUILD - ANDROID
https://angularfirebase.com/snippets/deploying-ionic4-to-android-and-google-play/
0. Step 0 - Update version in config.xml
1. Step 1 - Run a Production Build
> ionic cordova build android --prod --release
2. Step 2 - Generate a Keystore (skip this step if already generated)
> keytool -genkey -v -keystore CafaFuerte-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias CafaFuerte-alias
3. Step 3 - Sign the APK
> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore CafaFuerte-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk CafaFuerte-alias
4. Step 4 - Figure out your build tools path: C:\Users\gigoc\AppData\Local\Android\Sdk\build-tools\29.0.1
5. Step 5 - Run zipalign. You need to be in under the following folder: "C:\ionic\apps\ionic4\meda-salesrep-app\platforms\android\app\build\outputs\apk\release"
> C:\Users\gigoc\AppData\Local\Android\Sdk\build-tools\29.0.1\zipalign -v 4 app-release-unsigned.apk CafaFuerte.apk
6. Step 6 - Deploy to Google Play Console
> https://developer.android.com/distribute/console/index.html


## Color Palette
> https://htmlcolorcodes.com/color-chart/


## Github Changelog Generator 

To Install
> gem install github_changelog_generator

To run in Command Prompt with Admnin Rights
> https://github.com/github-changelog-generator/github-changelog-generator
Use this to generate
> github_changelog_generator gigocabrera/cajafuerte -t 0c57dbe720c24265979376f7797536f570b12bbb

If you get this error message on changelog-generator
> `connect_nonblock': SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (Faraday::SSLError)

Gist to troubleshoot issue above
> https://gist.github.com/fnichol/867550


# License

    The MIT License (MIT)
    
    Copyright (c) 2015 - Luis Cabrera (luiscabrera.site)
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this 
	software and associated documentation files (the "Software"), to deal in the Software 
	without restriction, including without limitation the rights to use, copy, modify, 
	merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
	permit persons to whom the Software is furnished to do so, subject to the following 
	conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or 
	substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
	OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.
