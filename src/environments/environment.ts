// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL: "https://acadeymati-backend.drupaldev.ihorizons.com",
  API_BASE_URL_QA: "https://acadeymati-backend.drupalqa.ihorizons.com",
  // DEFAULT_IMAGE: "./assets/images/default-img.gif",
  DEFAULT_IMAGE: "./assets/images/imagePlaceholder.webp",
  USER_DEFAULT_IMAGE: "./assets/images/userProfile.webp",
  DEFAULT_IMAGE_PDF: "./assets/images/pdf.jpg",
  defaultImg: "./assets/images/pdf.jpg",//default-img.gif
  defaultErrorImg: "./assets/images/errorDefault.webp",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
