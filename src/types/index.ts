/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */

import ion from 'i0n';
import {ObjectValue} from './utils';

export type Config = {
  debug: boolean;
  hide_error: boolean;
  spin: boolean;
  spawn: {
    log: {
      stdout: LogMethod;
      stderr: LogMethod;
    };
  };
  spinner: ion.Spinner;
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
