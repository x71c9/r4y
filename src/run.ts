/**
 *
 * Run module
 *
 */

import ray from './index.js';
ray.config.set({
  debug: true,
  spin: false,
});

async function main() {
  await ray.execute('sleep 3');

  // console.log(response);
  await ray.spawn('sleep 2');
}

main();
