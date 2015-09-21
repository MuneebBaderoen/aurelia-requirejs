export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css');
  // debugger;

  aurelia.start().then(a => a.setRoot());
}
