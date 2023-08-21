/**
 *
 * Main module
 *
 * @packageDocumentation
 *
 */
// import crypto from 'crypto';
import { promisify } from 'util';
import cp from 'child_process';
import ion from 'i0n';
const exe = promisify(cp.exec);
export async function execute(command) {
    ion.debug(command);
    const response = await exe(command);
    return response.stdout.trim();
}
export async function spawn(command, options) {
    return await new Promise((resolve, reject) => {
        // const id = _generate_unique_id();
        const spin = options.spin === false ? false : true;
        const child = cp.spawn(command, {
            stdio: options.stdio || 'inherit',
            shell: options.shell || true,
            cwd: options.cwd,
            detached: options.detached,
        });
        ion.debug(`[${child.pid}] ${command}`);
        if (child.stdout) {
            child.stdout.setEncoding('utf8');
            child.stdout.on('data', _process_std(options));
        }
        if (child.stderr) {
            child.stderr.setEncoding('utf8');
            child.stderr.on('data', _process_std(options));
        }
        child.on('error', (err) => {
            ion.fail(err.message);
            ion.error(err);
        });
        // This `close` event is different than the `exit` event because multiple
        // child processes might share the same stdio streams and so one child
        // process exiting does not mean that the streams got closed.
        child.on('close', (code, signal) => {
            if (spin) {
                ion.spinner.stop();
            }
            switch (code) {
                case 0: {
                    ion.success(`Child process [${child.pid}] successfully closed.`);
                    resolve(true);
                    break;
                }
                default: {
                    ion.fail(`Child process exited with code ${code} and signal ${signal}`);
                    reject();
                }
            }
        });
        child.on('exit', (code, signal) => {
            if (spin) {
                ion.spinner.stop();
            }
            switch (code) {
                case 0: {
                    ion.success(`Child process [${child.pid}] successfully exit.`);
                    resolve(true);
                    break;
                }
                default: {
                    ion.fail(`Child process exited with code ${code} and signal ${signal}`);
                    reject();
                }
            }
        });
    });
}
function _process_std(options) {
    return (chunk) => {
        if (options.spin) {
            const one_line = _one_line(chunk);
            ion.spinner.text = one_line;
            ion.spinner.start();
        }
        else {
            const splitted_chunk = chunk.split('\n');
            for (const split of splitted_chunk) {
                const clean_chunk = _clean_chunk(split);
                if (clean_chunk === '') {
                    continue;
                }
                ion.trace(clean_chunk);
            }
        }
    };
}
function _one_line(chunk) {
    const one_line_text = chunk.replace(/\r?\n|\r/g, ' ');
    return one_line_text;
}
function _clean_chunk(chunk) {
    const plain_text = chunk
        .toString()
        .replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '')
        .replace(/\r?\n|\r/g, ' ');
    return plain_text;
}
// function _generate_unique_id(): string {
//   const timestamp = Date.now().toString();
//   const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
//   const unique_id = hash.slice(0, 4).toUpperCase();
//   return unique_id;
// }
//# sourceMappingURL=main.js.map