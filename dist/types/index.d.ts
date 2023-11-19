/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */
import { ObjectValue } from './utils.js';
export type MethodConfig = {
    log_method: LogMethod;
};
export type Config = {
    debug: boolean;
    spin: boolean;
} & {
    [k in Method]: MethodConfig;
};
export type LogOption = {
    spin: boolean;
};
export declare const METHOD: {
    readonly execute: "execute";
    readonly spawn: "spawn";
};
export type Method = ObjectValue<typeof METHOD>;
export declare const LOG_METHOD: {
    readonly trace: "trace";
    readonly debug: "debug";
    readonly info: "info";
    readonly warn: "warn";
    readonly error: "error";
    readonly success: "success";
    readonly fail: "fail";
};
export type LogMethod = ObjectValue<typeof LOG_METHOD>;
