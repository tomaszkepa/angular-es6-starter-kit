import run from './runner';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import server from './server';
import friday from './friday';

/**
 * Launches a development env
 */

async function dev() {
  const today = new Date();

  await run(clean);
  await run(copy, {watch: true});
  await run(bundle, {watch: true});
  await run(server);

  if (today.getDay() === 5) {
    await run(friday);
  }
}

export default dev;