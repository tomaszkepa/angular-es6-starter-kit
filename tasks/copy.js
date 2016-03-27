import cp from 'copy';
import path from 'path';
import gaze from 'gaze';
import Promise from 'bluebird';

/**
 * Copies static files such as index.html to the output (dist) folder.
 */
async function copy({ watch } = {}) {
  await Promise.all([
    cp('src/templates/*.html', 'dist'),
    cp('src/components/**/*.html', 'dist/views'),
    cp('src/shared/**/*.html', 'dist/views'),
  ]);

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze('src/**/*.html', (err, val) => err ? reject(err) : resolve(val));
    });
    watcher.on('changed', async (file) => {
      const filePath = file.substr(path.join(__dirname, '../').length);
      const templatesPatt = /templates/g;

      if (templatesPatt.test(filePath)) {
        await cp(filePath, 'dist');
      } else {
        await cp(filePath, 'dist/views');
      }
    });
  }
}

export default copy;
