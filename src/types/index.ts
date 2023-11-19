/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */

import {ObjectValue} from './utils.js';

export type MethodConfig = {
  log_method: LogMethod;
};

export type Config = {
  debug: boolean;
  spin: boolean;
} & {
  [k in Method]: MethodConfig;
};

export type LogOption = {
  spin: boolean;
};

export const METHOD = {
  execute: 'execute',
  spawn: 'spawn',
} as const;

export type Method = ObjectValue<typeof METHOD>;

export const LOG_METHOD = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  success: 'success',
  fail: 'fail',
} as const;

export type LogMethod = ObjectValue<typeof LOG_METHOD>;
