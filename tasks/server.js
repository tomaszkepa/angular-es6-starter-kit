import browserSync from 'browser-sync';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function server() {
  const bs = browserSync.create();

  bs.watch("./dist/**/*.html").on("change", bs.reload);
  bs.watch("./dist/**/*.js").on("change", bs.reload);
  bs.watch("./dist/**/*.css", (event) => {
    if (event === "change") {
      bs.reload("*.css");
    }
  });

  await new Promise(resolve => {
    bs.init({
      server: "./dist",
      logPrefix: "angular-es6-starter-kit",
      port: 5000
    }, () => {
      resolve();
    });
  });
}

export default server;