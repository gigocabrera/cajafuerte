// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAWLtjIAOfBRD0tHWU899mE9vwVJEv5mRQ",
    authDomain: "cajafuerte-2fbfb.firebaseapp.com",
    databaseURL: "https://cajafuerte-2fbfb.firebaseio.com",
    projectId: "cajafuerte-2fbfb",
    storageBucket: "cajafuerte-2fbfb.appspot.com",
    messagingSenderId: "105460697119",
    appId: "1:105460697119:web:343459e2eb64e339a7ed2a"
  },
  api: {
    url: 'https://localhost:44326/api/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
