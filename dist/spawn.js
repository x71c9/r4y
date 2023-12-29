"use strict";
/**
 *
 * Spawn module
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
exports.spawn = void 0;
const child_process_1 = __importDefault(require("child_process"));
const index_1 = require("./log/index");
const index_2 = require("./config/index");
const common = __importStar(require("./common"));
async function spawn(command, options) {
    return await new Promise((resolve, reject) => {
        const do_spin = common.resolve_spin(options === null || options === void 0 ? void 0 : options.spin);
        if (do_spin) {
            index_1.log.spinner.text(command);
            index_1.log.spinner.start();
        }
        const child = child_process_1.default.spawn(command, {
            stdio: (options === null || options === void 0 ? void 0 : options.stdio) || 'inherit',
            shell: (options === null || options === void 0 ? void 0 : options.shell) || true,
            cwd: options === null || options === void 0 ? void 0 : options.cwd,
            detached: options === null || options === void 0 ? void 0 : options.detached,
        });
        const id_command = `[${child.pid}] ${command}`;
        index_1.log.trace(id_command);
        index_1.log.spinner.text(id_command);
        if (child.stdout) {
            child.stdout.setEncoding('utf8');
            child.stdout.on('data', _process_std(index_2.weights.params.spawn.log.stdout, options));
        }
        if (child.stderr) {
            child.stderr.setEncoding('utf8');
            child.stderr.on('data', _process_std(index_2.weights.params.spawn.log.stderr, options));
        }
        child.on('error', (err) => {
            if (do_spin) {
                index_1.log.spinner.stop();
            }
            index_1.log.fail(err.message);
            index_1.log.error(err);
        });
        // This `close` event is different than the `exit` event because multiple
        // child processes might share the same stdio streams and so one child
        // process exiting does not mean that the streams got closed.
        child.on('close', (code, signal) => {
            if (do_spin) {
                index_1.log.spinner.stop();
            }
            switch (code) {
                case 0: {
                    index_1.log.success(`Child process [${child.pid}] successfully closed.`);
                    resolve(true);
                    break;
                }
                default: {
                    index_1.log.fail(`Child process exited with code ${code} and signal ${signal}`);
                    const err = new Error(`Child process closed with a code different than 0`);
                    reject(err);
                }
            }
        });
        child.on('exit', (code, signal) => {
            if (do_spin) {
                index_1.log.spinner.stop();
            }
            switch (code) {
                case 0: {
                    index_1.log.success(`Child process [${child.pid}] successfully exit.`);
                    resolve(true);
                    break;
                }
                default: {
                    index_1.log.fail(`Child process exited with code ${code} and signal ${signal}`);
                    const err = new Error(`Child process exited with a code different than 0`);
                    reject(err);
                }
            }
        });
    });
}
exports.spawn = spawn;
function _process_std(log_method, options) {
    return (chunk) => {
        if (options === null || options === void 0 ? void 0 : options.spin) {
            const one_line = _one_line(chunk);
            index_1.log.spinner.text(one_line);
            index_1.log.spinner.start();
        }
        else {
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
//# sourceMappingURL=spawn.js.map