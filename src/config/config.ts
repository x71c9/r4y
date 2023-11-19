/**
 *
 * Config config module
 *
 * @packageDocumentation
 *
 */

import * as types from '../types/index.js';

export const config: types.Config = {
  debug: false,
  spin: false,
  execute: {
    log_method: 'trace',
  },
  spawn: {
    log_method: 'trace',
  },
};
