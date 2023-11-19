/**
 *
 * Common module
 *
 * @packageDocumentation
 *
 */

import * as types from './types/index.js';
import {config} from './config/config.js';
import {log} from './log/index.js';

export function use_ion_method(method: types.Method, data: any) {
  switch (config[method].log_method) {
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
    case 'success': {
      log.success(data);
      break;
    }
    case 'fail': {
      log.fail(data);
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
  return config.spin;
}
