/**
 *
 * Common module
 *
 * @packageDocumentation
 *
 */

import * as types from './types/index.js';
import {weights} from './config/index.js';
import {log} from './log/index.js';

export function use_ion_method(log_method: types.LogMethod, data: any) {
  switch (log_method) {
    case 'trace': {
      log.trace(data);
      break;
    }
    case 'debug': {
      log.debug(data);
      break;
    }
    case 'info': {
      log.info(data);
      break;
    }
    case 'warn': {
      log.warn(data);
      break;
    }
    case 'error': {
      log.error(data);
      break;
    }
  }
}

export function resolve_spin(spin?: boolean): boolean {
  if (spin === true) {
    return true;
  }
  if (spin === false) {
    return true;
  }
  return weights.params.spin;
}
