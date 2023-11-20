/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */

import {ObjectValue} from './utils.js';

export type Config = {
  debug: boolean;
  spin: boolean;
  spawn: {
    log: {
      stdout: LogMethod;
      stderr: LogMethod;
    };
  };
};

export type LogOption = {
  spin: boolean;
};

export const LOG_METHOD = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;

export type LogMethod = ObjectValue<typeof LOG_METHOD>;
