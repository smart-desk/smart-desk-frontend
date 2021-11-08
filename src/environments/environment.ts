// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiURL: 'http://localhost:3001/api',
    retry: 0,
    googleClientId: '725037573536-orc0fpben8knki7kfqrl3d734t173t3c.apps.googleusercontent.com',
    googleMapsApiKey: 'AIzaSyAdJwILlE4YP3369mGiGjqbpwRRnKxRDYI',
    webSocketUrl: 'http://localhost:3001',
    vkAppId: '7865563',
    host: 'http://localhost:4200',
    stripePublicKey: 'pk_test_51J0ZFPCUnxSYC4x5Fd8di1tY1lsc4A4J9p90y3VPHSQJEJQl7zYAUP4qUDezVRu6yZzB9r8oZOMZe5THod8e6KgR00dZN8LpYe',
    facebookClientId: '1154824365026588',
    imageKitPublicKey: 'public_iuBTsj8LfA8eT1yeQj4BUJ70O/8=',
    imageKitUrlEndpoint: 'https://ik.imagekit.io/nq6norqqrwz',
    imageKitAuthenticationEndpoint: 'http://localhost:3001/api/s3/imagekit/auth',
    s3path: 'https://smart-desk-advert.s3.eu-central-1.amazonaws.com/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
