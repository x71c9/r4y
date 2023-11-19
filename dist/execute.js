"use strict";
/**
 *
 * Execute module
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
exports.execute = void 0;
const child_process_1 = __importDefault(require("child_process"));
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const index_js_1 = require("./log/index.js");
const common = __importStar(require("./common.js"));
const exe = (0, util_1.promisify)(child_process_1.default.exec);
async function execute(command, options) {
    const id = _generate_unique_id();
    const do_spin = common.resolve_spin(options === null || options === void 0 ? void 0 : options.spin);
    const id_command = `[${id}] ${command}`;
    index_js_1.log.trace(id_command);
    if (do_spin) {
        index_js_1.log.spinner.text(command);
        index_js_1.log.spinner.start();
    }
    try {
        const response = await exe(command, { cwd: options === null || options === void 0 ? void 0 : options.cwd });
        const trimmed_response = response.stdout.trim();
        if (do_spin) {
            index_js_1.log.spinner.stop();
        }
        index_js_1.log.success(`Command [${id}] successfully terminated.`);
        return trimmed_response;
    }
    catch (e) {
        const err = e;
        let err_message = typeof err.message === 'string' ? `. ${err.message}` : '';
        index_js_1.log.error(`Command threw an error${err_message}`);
        throw e;
    }
}
exports.execute = execute;
function _generate_unique_id() {
    const timestamp = Date.now().toString();
    const hash = crypto_1.default.createHash('sha256').update(timestamp).digest('hex');
    const unique_id = hash.slice(0, 4).toUpperCase();
    return unique_id;
}
//# sourceMappingURL=execute.js.map