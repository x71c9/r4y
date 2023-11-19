"use strict";
/**
 *
 * Main module
 *
 * @packageDocumentation
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.execute = void 0;
// import crypto from 'crypto';
const util_1 = require("util");
const child_process_1 = __importDefault(require("child_process"));
const i0n_1 = __importDefault(require("i0n"));
const types = __importStar(require("./types/index.js"));
const config_js_1 = require("./config/config.js");
const exe = (0, util_1.promisify)(child_process_1.default.exec);
async function execute(command, options) {
    if (options && options.spin === true) {
        i0n_1.default.spinner.text(command);
        i0n_1.default.spinner.start();
    }
    else {
        _use_ion_method(types.METHOD.execute, command);
    }
    const response = await exe(command, { cwd: options === null || options === void 0 ? void 0 : options.cwd });
    const trimmed_response = response.stdout.trim();
    if ((options === null || options === void 0 ? void 0 : options.spin) === true) {
        i0n_1.default.spinner.stop();
    }
    return trimmed_response;
}
exports.execute = execute;
async function spawn(command, options) {
    return await new Promise((resolve, reject) => {
        // const id = _generate_unique_id();
        const spin = (options === null || options === void 0 ? void 0 : options.spin) === false ? false : true;
        const child = child_process_1.default.spawn(command, {
            stdio: (options === null || options === void 0 ? void 0 : options.stdio) || 'inherit',
            shell: (options === null || options === void 0 ? void 0 : options.shell) || true,
            cwd: options === null || options === void 0 ? void 0 : options.cwd,
            detached: options === null || options === void 0 ? void 0 : options.detached,
        });
        _use_ion_method(types.METHOD.spawn, `[${child.pid}] ${command}`);
        if (child.stdout) {
            child.stdout.setEncoding('utf8');
            child.stdout.on('data', _process_std(options));
        }
        if (child.stderr) {
            child.stderr.setEncoding('utf8');
            child.stderr.on('data', _process_std(options));
        }
        child.on('error', (err) => {
            if (spin) {
                i0n_1.default.spinner.stop();
            }
            i0n_1.default.fail(err.message);
            i0n_1.default.error(err);
        });
        // This `close` event is different than the `exit` event because multiple
        // child processes might share the same stdio streams and so one child
        // process exiting does not mean that the streams got closed.
        child.on('close', (code, signal) => {
            if (spin) {
                i0n_1.default.spinner.stop();
            }
            switch (code) {
                case 0: {
                    i0n_1.default.success(`Child process [${child.pid}] successfully closed.`);
                    resolve(true);
                    break;
                }
                default: {
                    i0n_1.default.fail(`Child process exited with code ${code} and signal ${signal}`);
                    const err = new Error(`Child process closed with a code different than 0`);
                    reject(err);
                }
            }
        });
        child.on('exit', (code, signal) => {
            if (spin) {
                i0n_1.default.spinner.stop();
            }
            switch (code) {
                case 0: {
                    i0n_1.default.success(`Child process [${child.pid}] successfully exit.`);
                    resolve(true);
                    break;
                }
                default: {
                    i0n_1.default.fail(`Child process exited with code ${code} and signal ${signal}`);
                    const err = new Error(`Child process exited with a code different than 0`);
                    reject(err);
                }
            }
        });
    });
}
exports.spawn = spawn;
function _process_std(options) {
    return (chunk) => {
        if (options === null || options === void 0 ? void 0 : options.spin) {
            const one_line = _one_line(chunk);
            i0n_1.default.spinner.text(one_line);
            i0n_1.default.spinner.start();
        }
        else {
            const splitted_chunk = chunk.split('\n');
            for (const split of splitted_chunk) {
                const clean_chunk = _clean_chunk(split);
                if (clean_chunk === '') {
                    continue;
                }
                _use_ion_method(types.METHOD.spawn, clean_chunk);
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
function _use_ion_method(method, data) {
    // const was_spinning = ion.spinner.is_spinning();
    // if (was_spinning) {
    //   ion.spinner.stop();
    // }
    switch (config_js_1.config[method].log_metod) {
        case 'trace': {
            i0n_1.default.trace(data);
            break;
        }
        case 'debug': {
            i0n_1.default.debug(data);
            break;
        }
        case 'info': {
            i0n_1.default.info(data);
            break;
        }
        case 'warn': {
            i0n_1.default.warn(data);
            break;
        }
        case 'error': {
            i0n_1.default.error(data);
            break;
        }
        case 'success': {
            i0n_1.default.success(data);
            break;
        }
        case 'fail': {
            i0n_1.default.fail(data);
            break;
        }
    }
    // if (was_spinning) {
    //   ion.spinner.start();
    // }
}
//# sourceMappingURL=main.js.map