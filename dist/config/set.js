"use strict";
/**
 *
 * Config set module
 *
 * @packageDocumentation
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const i0n_1 = __importDefault(require("i0n"));
const config_js_1 = require("../config/config.js");
const index_js_1 = require("../log/index.js");
function set(params) {
    if (!params ||
        typeof params !== 'object' ||
        Object.entries(params).length === 0) {
        return;
    }
    _merge_defaults(config_js_1.config, params);
    if (config_js_1.config.debug === true) {
        index_js_1.log.params.log_level = i0n_1.default.LOG_LEVEL.TRACE;
    }
}
exports.set = set;
function _merge_defaults(defaults, partial) {
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
        }
        else {
            defaults[key] = partial[key];
        }
    }
}
//# sourceMappingURL=set.js.map