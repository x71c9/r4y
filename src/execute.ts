/**
 *
 * Execute module
 *
 * @packageDocumentation
 *
 */

import cp from 'child_process';
import {promisify} from 'util';
import crypto from 'crypto';
import {log} from './log/index.js';
import * as types from './types/index.js';
import * as common from './common.js';

type ExecuteOptions = {
  cwd?: string;
} & types.LogOption;

const exe = promisify(cp.exec);

export async function execute(
  command: string,
  options?: Partial<ExecuteOptions>
): Promise<any> {
  const id = _generate_unique_id();
  const do_spin = common.resolve_spin(options?.spin);
  const id_command = `[${id}] ${command}`;
  log.trace(id_command);
  if (do_spin) {
    log.spinner.text(command);
    log.spinner.start();
  }
  try {
    const response = await exe(command, {cwd: options?.cwd});
    const trimmed_response = response.stdout.trim();
    if (do_spin) {
      log.spinner.stop();
    }
    log.success(`Command [${id}] successfully terminated.`);
    return trimmed_response;
  } catch (e) {
    const err = e as Error;
    let err_message = typeof err.message === 'string' ? `. ${err.message}` : '';
    log.error(`Command threw an error${err_message}`);
    throw e;
  }
}

function _generate_unique_id(): string {
  const timestamp = Date.now().toString();
  const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
  const unique_id = hash.slice(0, 4).toUpperCase();
  return unique_id;
}
