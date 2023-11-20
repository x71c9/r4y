"use strict";
/**
 *
 * Common module
 *
 * @packageDocumentation
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve_spin = exports.use_ion_method = void 0;
const index_js_1 = require("./config/index.js");
const index_js_2 = require("./log/index.js");
function use_ion_method(log_method, data) {
    switch (log_method) {
        case 'trace': {
            index_js_2.log.trace(data);
            break;
        }
        case 'debug': {
            index_js_2.log.debug(data);
            break;
        }
        case 'info': {
            index_js_2.log.info(data);
            break;
        }
        case 'warn': {
            index_js_2.log.warn(data);
            break;
        }
        case 'error': {
            index_js_2.log.error(data);
            break;
        }
    }
}
exports.use_ion_method = use_ion_method;
function resolve_spin(spin) {
    if (spin === true) {
        return true;
    }
    if (spin === false) {
        return true;
    }
    return index_js_1.weights.params.spin;
}
exports.resolve_spin = resolve_spin;
//# sourceMappingURL=common.js.map