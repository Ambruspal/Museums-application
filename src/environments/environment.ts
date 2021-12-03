// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'museumsapplication',
    appId: '1:453007242607:web:6770123ad0e3eaf0b3a49a',
    storageBucket: 'museumsapplication.appspot.com',
    locationId: 'europe-central2',
    apiKey: 'AIzaSyAoNIFzlo71M8H-2LN7ryxM4NNBHn00XxU',
    authDomain: 'museumsapplication.firebaseapp.com',
    messagingSenderId: '453007242607',
  },
  production: false,
  apiUrl: 'https://museumsapplication.herokuapp.com/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
