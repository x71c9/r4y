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
async function main() {
    const response = await index_js_1.default.spawn('ls');
    console.log(response);
}
main();
//# sourceMappingURL=run.js.map