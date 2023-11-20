/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */
import { ObjectValue } from './utils.js';
export type Config = {
    debug: boolean;
    spin: boolean;
    spawn: {
        log: {
            stdout: LogMethod;
            stderr: LogMethod;
        };
    };
};
export type LogOption = {
    spin: boolean;
};
export declare const LOG_METHOD: {
    readonly trace: "trace";
    readonly debug: "debug";
    readonly info: "info";
    readonly warn: "warn";
    readonly error: "error";
};
export type LogMethod = ObjectValue<typeof LOG_METHOD>;
