"use strict";
/**
 *
 * Run module
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const i0n_1 = __importDefault(require("i0n"));
const log = i0n_1.default.create({});
index_js_1.default.config.set({
    debug: true,
    spin: true,
    spinner: log.spinner,
});
async function main() {
    await index_js_1.default.execute('sleep 3');
    // console.log(response);
    await index_js_1.default.spawn('sleep 2');
}
main();
//# sourceMappingURL=run.js.map