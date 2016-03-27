import del from 'del';
import mkdirp from 'mkdirp';

/**
 * Cleans up the output (dist) directory.
 */
async function clean() {
  await del(['.tmp', 'dist/*', '!dist/.git'], {dot: true});
  await mkdirp('dist/views');
}

export default clean;
