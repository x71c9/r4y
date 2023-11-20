/**
 *
 * Spawn module
 *
 * @packageDocumentation
 *
 */

import cp from 'child_process';
import * as types from './types/index.js';
import {log} from './log/index.js';
import {weights} from './config/index.js';
import * as common from './common.js';

type Stdio = 'pipe' | 'overlapped' | 'ignore' | 'inherit';

type SpawnOption = {
  stdio: Stdio | Stdio[];
  shell: boolean;
  cwd: string;
  detached: boolean;
} & types.LogOption;

export async function spawn(command: string, options?: Partial<SpawnOption>) {
  return await new Promise((resolve, reject) => {
    const do_spin = common.resolve_spin(options?.spin);
    if (do_spin) {
      log.spinner.text(command);
      log.spinner.start();
    }
    const child = cp.spawn(command, {
      stdio: options?.stdio || 'inherit',
      shell: options?.shell || true,
      cwd: options?.cwd,
      detached: options?.detached,
    });
    const id_command = `[${child.pid}] ${command}`;
    log.trace(id_command);
    log.spinner.text(id_command);
    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on(
        'data',
        _process_std(weights.params.spawn.log.stdout, options)
      );
    }
    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on(
        'data',
        _process_std(weights.params.spawn.log.stderr, options)
      );
    }
    child.on('error', (err) => {
      if (do_spin) {
        log.spinner.stop();
      }
      log.fail(err.message);
      log.error(err);
    });
    // This `close` event is different than the `exit` event because multiple
    // child processes might share the same stdio streams and so one child
    // process exiting does not mean that the streams got closed.
    child.on('close', (code, signal) => {
      if (do_spin) {
        log.spinner.stop();
      }
      switch (code) {
        case 0: {
          log.success(`Child process [${child.pid}] successfully closed.`);
          resolve(true);
          break;
        }
        default: {
          log.fail(
            `Child process exited with code ${code} and signal ${signal}`
          );
          const err = new Error(
            `Child process closed with a code different than 0`
          );
          reject(err);
        }
      }
    });
    child.on('exit', (code, signal) => {
      if (do_spin) {
        log.spinner.stop();
      }
      switch (code) {
        case 0: {
          log.success(`Child process [${child.pid}] successfully exit.`);
          resolve(true);
          break;
        }
        default: {
          log.fail(
            `Child process exited with code ${code} and signal ${signal}`
          );
          const err = new Error(
            `Child process exited with a code different than 0`
          );
          reject(err);
        }
      }
    });
  });
}

function _process_std(
  log_method: types.LogMethod,
  options?: Partial<SpawnOption>
) {
  return (chunk: string) => {
    if (options?.spin) {
      const one_line = _one_line(chunk);
      log.spinner.text(one_line);
      log.spinner.start();
    } else {
      const splitted_chunk = chunk.split('\n');
      for (const split of splitted_chunk) {
        const clean_chunk = _clean_chunk(split);
        if (clean_chunk === '') {
          continue;
        }
        common.use_ion_method(log_method, clean_chunk);
      }
    }
  };
}

function _one_line(chunk: string): string {
  const one_line_text = chunk.replace(/\r?\n|\r/g, ' ');
  return one_line_text;
}

function _clean_chunk(chunk: string): string {
  const plain_text = chunk
    .toString()
    .replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '')
    .replace(/\r?\n|\r/g, ' ');
  return plain_text;
}
