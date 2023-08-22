/**
 *
 * Config set module
 *
 * @packageDocumentation
 *
 */

import * as types from '../types/index.js';
import {config} from '../config/config.js';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type ConfigParams = DeepPartial<types.Config>;

export function set(params: ConfigParams) {
  if (
    !params ||
    typeof params !== 'object' ||
    Object.entries(params).length === 0
  ) {
    return;
  }
  _merge_defaults(config, params);
}

function _merge_defaults<T>(defaults: T, partial: DeepPartial<T>) {
  for (const key in partial) {
    if (!partial.hasOwnProperty(key)) {
      delete partial[key];
    }
    if (typeof defaults[key] !== typeof partial[key]) {
      delete partial[key];
    }
    const pk = partial[key];
    if (pk && typeof pk === 'object' && pk !== null) {
      _merge_defaults(defaults[key], pk);
    } else {
      defaults[key] = partial[key] as T[typeof key];
    }
  }
}
