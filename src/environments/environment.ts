// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: { // firebase configuration for staging
    apiKey: 'AIzaSyC3wzMNa0RaAboJuePPj3SBnEO7ST3Sdv8',
    authDomain: 'vepo-staging.firebaseapp.com',
    databaseURL: 'https://vepo-staging.firebaseio.com',
    projectId: 'vepo-staging',
    storageBucket: 'vepo-staging.appspot.com',
    messagingSenderId: '901859852634'
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
