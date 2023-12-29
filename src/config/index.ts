/**
 *
 * Config module
 *
 * @packageDocumentation
 *
 */

import ion from 'i0n';
import {Weights, DeepPartial} from 'w3i';
import * as types from '../types/index';
import {log} from '../log/index';

export const weights = new Weights<types.Config>({
  debug: false,
  spin: false,
  spawn: {
    log: {
      stdout: 'trace',
      stderr: 'error',
    },
  },
});

export function set(params: DeepPartial<types.Config>): void {
  weights.set(params);
  if (params.debug === true) {
    log.params.log_level = ion.LOG_LEVEL.TRACE;
  }
}
