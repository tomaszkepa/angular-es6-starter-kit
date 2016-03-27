/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function runner(fn, options) {
  var colors = require('colors');

  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.log(`[${format(start)}]`, colors.blue(`Starting`), colors.green(`'${task.name}'`), colors.blue(`...`));
  return task(options).then(() => {
    const end = new Date();
    const time = (end.getTime() - start.getTime()) / 1000;
    console.log(`[${format(end)}]`, colors.blue(`Finished`), colors.green(`'${task.name}'`), colors.blue(`after ${time}s`));
  });
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = require(`./${process.argv[2]}.js`).default;
  runner(module).catch(err => console.error(err.stack));
}

export default runner;
