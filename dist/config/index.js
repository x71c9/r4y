"use strict";
/**
 *
 * Config module
 *
 * @packageDocumentation
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.weights = void 0;
const i0n_1 = __importDefault(require("i0n"));
const w3i_1 = require("w3i");
const index_js_1 = require("../log/index.js");
exports.weights = new w3i_1.Weights({
    debug: false,
    spin: false,
    spawn: {
        log: {
            stdout: 'trace',
            stderr: 'error',
        }
    },
});
const set = (params) => {
    exports.weights.set(params);
    if (params.debug === true) {
        index_js_1.log.params.log_level = i0n_1.default.LOG_LEVEL.TRACE;
    }
};
exports.set = set;
//# sourceMappingURL=index.js.map