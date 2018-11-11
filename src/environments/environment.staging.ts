export const environment = {
  production: false,
  envName: 'staging',
  firebaseConfig: { // firebase configuration for staging, replace with your own project variables.
    apiKey: 'AIzaSyDvCjr8JQuGtbwf41qsZdSOHTOrgMYzu1E',  // Fallow firebase configuration article in wiki section
    authDomain: 'gitlab-ci-staging-test.firebaseapp.com',
    databaseURL: 'https://gitlab-ci-staging-test.firebaseio.com',
    projectId: 'gitlab-ci-staging-test',
    storageBucket: 'gitlab-ci-staging-test.appspot.com',
    messagingSenderId: '12027949275'
  }
};
