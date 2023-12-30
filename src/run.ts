/**
 *
 * Run module
 *
 */

import ray from './index.js';
import ion from 'i0n';
const log = ion.create({});

ray.config.set({
  debug: true,
  spin: true,
  spinner: log.spinner,
});

async function main() {
  await ray.execute('sleep 3');
  // console.log(response);
  await ray.spawn('sleep 2');
}

main();
