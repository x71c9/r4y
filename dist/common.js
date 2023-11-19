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
const config_js_1 = require("./config/config.js");
const index_js_1 = require("./log/index.js");
function use_ion_method(method, data) {
    switch (config_js_1.config[method].log_method) {
        case 'trace': {
            index_js_1.log.trace(data);
            break;
        }
        case 'debug': {
            index_js_1.log.debug(data);
            break;
        }
        case 'info': {
            index_js_1.log.info(data);
            break;
        }
        case 'warn': {
            index_js_1.log.warn(data);
            break;
        }
        case 'error': {
            index_js_1.log.error(data);
            break;
        }
        case 'success': {
            index_js_1.log.success(data);
            break;
        }
        case 'fail': {
            index_js_1.log.fail(data);
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
    return config_js_1.config.spin;
}
exports.resolve_spin = resolve_spin;
//# sourceMappingURL=common.js.map