/**
 *
 * Run module
 *
 */

import ray from './index.js';

async function main() {
  const response = await ray.spawn('ls');
  console.log(response);
}

main();
