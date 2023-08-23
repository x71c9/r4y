/**
 *
 * Run module
 *
 */

import ray from './index.js';

const response = await ray.spawn('ls');
console.log(response);
