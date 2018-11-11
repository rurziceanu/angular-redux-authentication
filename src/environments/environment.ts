// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: { // firebase configuration for staging
    apiKey: "AIzaSyC2AO4gLgP1M3c-4nMf05GfGYFmDNvLq7U",
    authDomain: "redux-auth-angular.firebaseapp.com",
    databaseURL: "https://redux-auth-angular.firebaseio.com",
    projectId: "redux-auth-angular",
    storageBucket: "redux-auth-angular.appspot.com",
    messagingSenderId: "115607357892"
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
