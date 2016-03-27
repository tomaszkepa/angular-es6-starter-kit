import webpack from 'webpack';
import wpConfig from './webpack.config.babel';

/**
 * Creates application bundles from the source files.
 */
async function bundle({ watch } = {}) {
  if (watch) {
    await new Promise(resolve => {
      webpack(wpConfig).watch({
        aggregateTimeout: 100, // wait so long for more changes
        poll: true // use polling instead of native watchers
      }, (err, stats) => {
        if (err) console.log(err);
        resolve();
      });
    });
  } else {
    await new Promise(resolve => {
      webpack(wpConfig, (err, stats)=> {
        if (err) console.log(err);
        if (!err) console.log(stats.toString(wpConfig.stats));
        resolve();
      });
    });
  }
}

export default bundle;
